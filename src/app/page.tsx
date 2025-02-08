import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Yandi
          </h1>
          <p className="text-xl text-gray-600">
            Simplify your AI infrastructure management with comprehensive API key tracking and usage monitoring.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 mt-12">
          <Link 
            href="/manage"
            className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Manage API Keys →</h2>
            <p className="text-gray-600">
              Securely store and manage your AI provider API keys in one place.
            </p>
          </Link>
        </div>

        {/* Built with section */}
        <div className="pt-12 mt-12 border-t">
          <p className="text-sm text-gray-500">
            Built with{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Next.js
            </a>
            {' '}and{' '}
            <a 
              href="https://js.langchain.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LangChain
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
