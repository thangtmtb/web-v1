import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Joke {
  id: string;
  title: string;
  content: string;
  category_id: string | null;
  author_id: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  save_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  category?: Category;
  author?: Profile;
  reviewer?: Profile;
  is_liked?: boolean;
  is_saved?: boolean;
}

export interface Comment {
  id: string;
  joke_id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  is_edited: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  user?: Profile;
  replies?: Comment[];
}

export interface Like {
  id: string;
  user_id: string;
  joke_id: string;
  created_at: string;
}

export interface SavedJoke {
  id: string;
  user_id: string;
  joke_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  joke_id: string;
  user_id: string;
  reason: string;
  description: string | null;
  status: 'pending' | 'reviewed' | 'resolved';
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}
