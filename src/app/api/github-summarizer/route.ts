import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { githubUrl } = body;

    // Get API key from request header
    const apiKey = req.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json({ 
        success: false, 
        message: 'API key is required' 
      }, { 
        status: 400 
      });
    }

    // Validate the API key
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, user_id, created_at')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid API key' 
      }, { 
        status: 401 
      });
    }

    const readmeContent = await getGitHubReadme(githubUrl);
    console.log(readmeContent);

    return NextResponse.json({ 
      success: true,
      message: 'API key is valid. Summarization complete',
      user: {
        id: data.user_id,
        created_at: data.created_at
      }
      // Add your summarizer response data here
    });

  } catch (error) {
    console.error('GitHub summarizer error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error processing request' 
    }, { 
      status: 500 
    });
  }
} 

async function getGitHubReadme(repoUrl: string): Promise<string | null> {
  try {
    // Extract owner and repo from GitHub URL
    const urlParts = repoUrl.replace(/\.git$/, '').split('/');
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];

    // Construct API URL for README
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

    const response = await fetch(readmeUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw'
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch README:', response.statusText);
      return null;
    }

    const readmeContent = await response.text();
    return readmeContent;

  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    return null;
  }
}
