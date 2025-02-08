'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      showNotification('Please provide an API key first', 'error');
      router.push('/playground');
    }
  }, [router]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
        <p>This is a protected page that can only be accessed with a valid API key.</p>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            Your API key is validated and you have access to this protected content.
          </p>
        </div>
      </div>
    </div>
  );
} 