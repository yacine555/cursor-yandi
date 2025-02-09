import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ 
        success: false, 
        message: 'API key is required' 
      }, { 
        status: 400 
      });
    }

    // Query Supabase to check if the API key exists and is valid
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();

    console.log('API key validation result:', { apiKey, data });
    
    if (error || !data) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid API key' 
      }, { 
        status: 401 
      });
    }

  

    return NextResponse.json({ 
      success: true, 
      message: 'API key is valid',
      user: {
        id: data.user_id,
        created_at: data.created_at
      }
    });

  } catch (error) {
    console.error('API key validation error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error validating API key' 
    }, { 
      status: 500 
    });
  }
} 