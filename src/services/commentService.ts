import { supabase } from '../lib/supabase';
import type { Comment } from '../lib/supabase';

export const commentService = {
    // Get comments for a joke
    async getComments(jokeId: string): Promise<Comment[]> {
        const { data, error } = await supabase
            .from('comments')
            .select(`
        *,
        user:profiles(*)
      `)
            .eq('joke_id', jokeId)
            .is('parent_id', null)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Get replies for each comment
        const commentsWithReplies = await Promise.all(
            (data || []).map(async (comment) => {
                const { data: replies } = await supabase
                    .from('comments')
                    .select(`
            *,
            user:profiles(*)
          `)
                    .eq('parent_id', comment.id)
                    .order('created_at', { ascending: true });

                return {
                    ...comment,
                    replies: replies || [],
                };
            })
        );

        return commentsWithReplies;
    },

    // Create comment
    async createComment(comment: {
        joke_id: string;
        user_id: string;
        content: string;
        parent_id?: string;
    }): Promise<Comment> {
        const { data, error } = await supabase
            .from('comments')
            .insert(comment)
            .select(`
        *,
        user:profiles(*)
      `)
            .single();

        if (error) throw error;
        return data;
    },

    // Update comment
    async updateComment(id: string, content: string): Promise<Comment> {
        const { data, error } = await supabase
            .from('comments')
            .update({ content, is_edited: true })
            .eq('id', id)
            .select(`
        *,
        user:profiles(*)
      `)
            .single();

        if (error) throw error;
        return data;
    },

    // Delete comment
    async deleteComment(id: string): Promise<void> {
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};
