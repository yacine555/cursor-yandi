'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function APIPlayground() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();
      
      if (data.success) {
        showNotification('Valid API key, /protected can be accessed', 'success');
        // Store both the API key and user data
        localStorage.setItem('apiKey', apiKey);
        localStorage.setItem('userData', JSON.stringify(data.user));
        router.push('/protected');
      } else {
        showNotification(data.message || 'Invalid API key', 'error');
      }
    } catch (error) {
      showNotification('Error validating API key', 'error');
      console.error('API key validation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">API Playground</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
              Enter your API Key
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="yandi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Your API key should start with 'yandi-' followed by 32 characters
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? 'Validating...' : 'Validate API Key'}
          </button>
        </form>
      </div>
    </div>
  );
} 