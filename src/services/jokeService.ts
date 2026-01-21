import { supabase } from '../lib/supabase';
import type { Joke } from '../lib/supabase';

export interface JokeFilters {
    categoryId?: string;
    status?: 'pending' | 'approved' | 'rejected';
    authorId?: string;
    isFeatured?: boolean;
    search?: string;
}

export interface JokesResponse {
    jokes: Joke[];
    total: number;
}

export const jokeService = {
    // Get jokes with filters and pagination
    async getJokes(
        filters: JokeFilters = {},
        page = 1,
        limit = 20
    ): Promise<JokesResponse> {
        let query = supabase
            .from('jokes')
            .select(`
        *,
        category:categories(*),
        author:profiles!jokes_author_id_fkey(*),
        reviewer:profiles!jokes_reviewed_by_fkey(*)
      `, { count: 'exact' });

        // Apply filters
        if (filters.categoryId) {
            query = query.eq('category_id', filters.categoryId);
        }

        if (filters.status) {
            query = query.eq('status', filters.status);
        } else {
            // Default to approved for public
            query = query.eq('status', 'approved');
        }

        if (filters.authorId) {
            query = query.eq('author_id', filters.authorId);
        }

        if (filters.isFeatured !== undefined) {
            query = query.eq('is_featured', filters.isFeatured);
        }

        if (filters.search) {
            query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
        }

        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        query = query
            .order('created_at', { ascending: false })
            .range(from, to);

        const { data, error, count } = await query;

        if (error) throw error;

        return {
            jokes: data || [],
            total: count || 0,
        };
    },

    // Get single joke by ID
    async getJoke(id: string, userId?: string): Promise<Joke> {
        let query = supabase
            .from('jokes')
            .select(`
        *,
        category:categories(*),
        author:profiles!jokes_author_id_fkey(*),
        reviewer:profiles!jokes_reviewed_by_fkey(*)
      `)
            .eq('id', id)
            .single();

        const { data, error } = await query;

        if (error) throw error;

        // Check if user liked/saved this joke
        if (userId) {
            const [likeResult, saveResult] = await Promise.all([
                supabase
                    .from('likes')
                    .select('id')
                    .eq('joke_id', id)
                    .eq('user_id', userId)
                    .single(),
                supabase
                    .from('saved_jokes')
                    .select('id')
                    .eq('joke_id', id)
                    .eq('user_id', userId)
                    .single(),
            ]);

            data.is_liked = !!likeResult.data;
            data.is_saved = !!saveResult.data;
        }

        // Increment view count
        await supabase.rpc('increment_view_count', { joke_uuid: id });

        return data;
    },

    // Create new joke
    async createJoke(joke: {
        title: string;
        content: string;
        category_id: string;
        author_id: string;
    }): Promise<Joke> {
        const { data, error } = await supabase
            .from('jokes')
            .insert({
                ...joke,
                status: 'pending',
            })
            .select(`
        *,
        category:categories(*),
        author:profiles!jokes_author_id_fkey(*)
      `)
            .single();

        if (error) throw error;
        return data;
    },

    // Update joke
    async updateJoke(
        id: string,
        updates: Partial<Joke>
    ): Promise<Joke> {
        const { data, error } = await supabase
            .from('jokes')
            .update(updates)
            .eq('id', id)
            .select(`
        *,
        category:categories(*),
        author:profiles!jokes_author_id_fkey(*),
        reviewer:profiles!jokes_reviewed_by_fkey(*)
      `)
            .single();

        if (error) throw error;
        return data;
    },

    // Delete joke
    async deleteJoke(id: string): Promise<void> {
        const { error } = await supabase
            .from('jokes')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // Like/Unlike joke
    async toggleLike(jokeId: string, userId: string): Promise<boolean> {
        // Check if already liked
        const { data: existing } = await supabase
            .from('likes')
            .select('id')
            .eq('joke_id', jokeId)
            .eq('user_id', userId)
            .single();

        if (existing) {
            // Unlike
            const { error } = await supabase
                .from('likes')
                .delete()
                .eq('joke_id', jokeId)
                .eq('user_id', userId);

            if (error) throw error;
            return false;
        } else {
            // Like
            const { error } = await supabase
                .from('likes')
                .insert({ joke_id: jokeId, user_id: userId });

            if (error) throw error;
            return true;
        }
    },

    // Save/Unsave joke
    async toggleSave(jokeId: string, userId: string): Promise<boolean> {
        const { data: existing } = await supabase
            .from('saved_jokes')
            .select('id')
            .eq('joke_id', jokeId)
            .eq('user_id', userId)
            .single();

        if (existing) {
            // Unsave
            const { error } = await supabase
                .from('saved_jokes')
                .delete()
                .eq('joke_id', jokeId)
                .eq('user_id', userId);

            if (error) throw error;
            return false;
        } else {
            // Save
            const { error } = await supabase
                .from('saved_jokes')
                .insert({ joke_id: jokeId, user_id: userId });

            if (error) throw error;
            return true;
        }
    },

    // Track reading history
    async trackReading(jokeId: string, userId: string): Promise<void> {
        const { error } = await supabase
            .from('reading_history')
            .upsert(
                { joke_id: jokeId, user_id: userId, last_read_at: new Date().toISOString() },
                { onConflict: 'user_id,joke_id' }
            );

        if (error) throw error;
    },

    // Admin: Approve joke
    async approveJoke(jokeId: string, reviewerId: string): Promise<Joke> {
        return this.updateJoke(jokeId, {
            status: 'approved',
            reviewed_by: reviewerId,
            reviewed_at: new Date().toISOString(),
        });
    },

    // Admin: Reject joke
    async rejectJoke(
        jokeId: string,
        reviewerId: string,
        reason: string
    ): Promise<Joke> {
        return this.updateJoke(jokeId, {
            status: 'rejected',
            reviewed_by: reviewerId,
            reviewed_at: new Date().toISOString(),
            rejection_reason: reason,
        });
    },
};
