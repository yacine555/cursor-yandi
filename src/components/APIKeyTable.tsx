import { 
  EyeIcon, 
  ClipboardDocumentIcon, 
  PencilSquareIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import { APIKey } from '@/services/apiKeyService';
import { showNotification } from '@/components/Notification';

interface APIKeyTableProps {
  apiKeys: APIKey[];
  viewingKeyId: string | null;
  onViewKey: (id: string) => void;
  onEditKey: (apiKey: APIKey) => void;
  onDeleteKey: (id: string) => void;
}

export function APIKeyTable({ 
  apiKeys, 
  viewingKeyId, 
  onViewKey, 
  onEditKey, 
  onDeleteKey 
}: APIKeyTableProps) {
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    showNotification('Copied API Key to clipboard');
  };

  return (
    <div className="bg-white dark:bg-black/[.05] rounded-xl shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <th className="px-6 py-4 text-left text-sm font-medium">NAME</th>
            <th className="px-6 py-4 text-left text-sm font-medium">USAGE</th>
            <th className="px-6 py-4 text-left text-sm font-medium">KEY</th>
            <th className="px-6 py-4 text-left text-sm font-medium">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No API keys found. Create one to get started.
              </td>
            </tr>
          ) : (
            apiKeys.map((apiKey) => (
              <tr key={apiKey.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-6 py-4 text-sm">{apiKey.name}</td>
                <td className="px-6 py-4 text-sm">{apiKey.usage}</td>
                <td className="px-6 py-4">
                  <code className="text-sm font-mono">
                    {viewingKeyId === apiKey.id 
                      ? apiKey.key 
                      : `${apiKey.key.substring(0, 12)}********************************`}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onViewKey(apiKey.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      title={viewingKeyId === apiKey.id ? "Hide API Key" : "View API Key"}
                    >
                      <EyeIcon className={`w-5 h-5 ${viewingKeyId === apiKey.id ? 'text-blue-500' : 'text-gray-500'}`} />
                    </button>
                    <button
                      onClick={() => handleCopyKey(apiKey.key)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      title="Copy to Clipboard"
                    >
                      <ClipboardDocumentIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => onEditKey(apiKey)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      title="Edit API Key"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => onDeleteKey(apiKey.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      title="Delete API Key"
                    >
                      <TrashIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 