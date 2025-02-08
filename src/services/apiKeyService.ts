import { supabase } from '@/lib/supabase';

export interface APIKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  usage: number;
  monthly_limit: number;
  user_id: string;
}

export const apiKeyService = {
  async fetchAPIKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createAPIKey(name: string, monthlyLimit: number) {
    const newKey = {
      name,
      key: `yandi-${Math.random().toString(36).substr(2, 32)}`,
      monthly_limit: monthlyLimit,
      usage: 0,
    };

    const { data, error } = await supabase
      .from('api_keys')
      .insert([newKey])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateAPIKey(id: string, updates: Partial<APIKey>) {
    const { error } = await supabase
      .from('api_keys')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  },

  async deleteAPIKey(id: string) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 