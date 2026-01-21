import { supabase } from '../lib/supabase';

export interface AdminStats {
    totalJokes: number;
    pendingJokes: number;
    totalUsers: number;
    totalLikes: number;
}

export const adminService = {
    async getStats(): Promise<AdminStats> {
        const [
            { count: totalJokes },
            { count: pendingJokes },
            { count: totalUsers },
            { count: totalLikes }
        ] = await Promise.all([
            supabase.from('jokes').select('*', { count: 'exact', head: true }),
            supabase.from('jokes').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
            supabase.from('likes').select('*', { count: 'exact', head: true })
        ]);

        return {
            totalJokes: totalJokes || 0,
            pendingJokes: pendingJokes || 0,
            totalUsers: totalUsers || 0,
            totalLikes: totalLikes || 0
        };
    }
};
