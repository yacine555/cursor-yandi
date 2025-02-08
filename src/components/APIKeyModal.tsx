import { Dialog as HeadlessDialog } from '@headlessui/react';
import { APIKey } from '@/services/apiKeyService';

interface APIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onCopy: (key: string) => void;
  newKeyName: string;
  setNewKeyName: (name: string) => void;
  newMonthlyLimit: number;
  setNewMonthlyLimit: (limit: number) => void;
  newUsage: number;
  setNewUsage: (usage: number) => void;
  newlyCreatedKey: string | null;
  editingKey: APIKey | null;
}

export function APIKeyModal({
  isOpen,
  onClose,
  onSave,
  onCopy,
  newKeyName,
  setNewKeyName,
  newMonthlyLimit,
  setNewMonthlyLimit,
  newUsage,
  setNewUsage,
  newlyCreatedKey,
  editingKey
}: APIKeyModalProps) {
  const handleClose = () => {
    onClose();
    setNewKeyName('');
    setNewMonthlyLimit(1000);
    setNewUsage(0);
  };

  return (
    <HeadlessDialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialog.Panel className="mx-auto max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6">
          <HeadlessDialog.Title className="text-lg font-medium mb-4">
            {newlyCreatedKey ? 'API Key Created' : editingKey ? 'Edit API Key' : 'Create New API Key'}
          </HeadlessDialog.Title>

          {newlyCreatedKey ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Make sure to copy your API key now. You won't be able to see it again!
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <code className="text-sm break-all">{newlyCreatedKey}</code>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => onCopy(newlyCreatedKey)}
                  className="px-4 py-2 text-sm rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Copy
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter key name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Usage Limit
                </label>
                <input
                  type="number"
                  value={newMonthlyLimit}
                  onChange={(e) => setNewMonthlyLimit(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter monthly limit"
                />
              </div>

              {editingKey && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Usage
                  </label>
                  <input
                    type="number"
                    value={newUsage}
                    onChange={(e) => setNewUsage(Number(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter current usage"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  disabled={!newKeyName.trim()}
                  className="px-4 py-2 text-sm rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingKey ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </div>
          )}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
} 