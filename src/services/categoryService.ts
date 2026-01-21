import { supabase } from '../lib/supabase';
import type { Category } from '../lib/supabase';

export const categoryService = {
    // Get all active categories
    async getCategories(): Promise<Category[]> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    // Get single category
    async getCategory(slug: string): Promise<Category> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data;
    },
};
