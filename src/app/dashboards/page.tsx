'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { 
  EyeIcon, 
  ClipboardDocumentIcon, 
  PencilSquareIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';
import { showNotification } from '@/components/Notification';
import { APIKey, apiKeyService } from '@/services/apiKeyService';
import { APIKeyTable } from '@/components/APIKeyTable';
import { APIKeyModal } from '@/components/APIKeyModal';

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newMonthlyLimit, setNewMonthlyLimit] = useState<number>(1000);
  const [newUsage, setNewUsage] = useState<number>(0);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState<APIKey | null>(null);
  const [viewingKeyId, setViewingKeyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAPIKeys();
  }, []);

  const fetchAPIKeys = async () => {
    try {
      setIsLoading(true);
      const data = await apiKeyService.fetchAPIKeys();
      setApiKeys(data);
    } catch (err) {
      console.error('Error fetching API keys:', err);
      setError('Failed to load API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKey = async () => {
    try {
      const newKey = await apiKeyService.createAPIKey(newKeyName, newMonthlyLimit);
      setApiKeys([newKey, ...apiKeys]);
      setNewlyCreatedKey(newKey.key);
      setNewKeyName('');
      setNewMonthlyLimit(1000);
      setNewUsage(0);
    } catch (error) {
      console.error('Failed to create API key:', error);
      setError('Failed to create API key');
    }
  };

  const handleEditKey = async () => {
    try {
      if (!editingKey) return;

      const { error } = await supabase
        .from('api_keys')
        .update({ 
          name: newKeyName,
          monthly_limit: newMonthlyLimit,
          usage: newUsage
        })
        .eq('id', editingKey.id);

      if (error) throw error;

      setApiKeys(apiKeys.map(key => 
        key.id === editingKey.id 
          ? { 
              ...key, 
              name: newKeyName, 
              monthly_limit: newMonthlyLimit,
              usage: newUsage
            }
          : key
      ));
      setIsCreateModalOpen(false);
      setEditingKey(null);
      setNewKeyName('');
      setNewMonthlyLimit(1000);
      setNewUsage(0);
    } catch (error) {
      console.error('Failed to edit API key:', error);
      setError('Failed to update API key');
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApiKeys(apiKeys.filter(key => key.id !== id));
      showNotification('API Key deleted successfully', 'error');
    } catch (error) {
      console.error('Failed to delete API key:', error);
      setError('Failed to delete API key');
    }
  };

  const handleViewKey = (id: string) => {
    setViewingKeyId(viewingKeyId === id ? null : id);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    showNotification('Copied API Key to clipboard');
  };

  const openEditModal = (apiKey: APIKey) => {
    setEditingKey(apiKey);
    setNewKeyName(apiKey.name);
    setNewMonthlyLimit(apiKey.monthly_limit);
    setNewUsage(apiKey.usage);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="min-h-screen p-8 bg-[#fafafa] dark:bg-[#111]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pages / Overview</div>
            <h1 className="text-3xl font-semibold">Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Operational</span>
            </div>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="mb-12 rounded-2xl p-8 bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200 dark:from-rose-900 dark:via-purple-900 dark:to-blue-900">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm font-medium mb-2">CURRENT PLAN</div>
              <h2 className="text-4xl font-bold mb-6">Researcher</h2>
              <div className="text-sm font-medium mb-2">API Usage</div>
              <div className="text-sm">0/1,000 Credits</div>
            </div>
            <button className="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full text-sm">
              Manage Plan
            </button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="rounded-full bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm hover:opacity-80 transition-opacity"
            >
              + Create New Key
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
          </p>

          <APIKeyTable 
            apiKeys={apiKeys}
            viewingKeyId={viewingKeyId}
            onViewKey={handleViewKey}
            onEditKey={openEditModal}
            onDeleteKey={handleDeleteKey}
          />
        </div>

        {/* Contact Section */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            Have any questions, feedback or need support? We'd love to hear from you!
          </p>
          <button className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            Contact us
          </button>
        </div>

        <APIKeyModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={editingKey ? handleEditKey : handleCreateKey}
          onCopy={handleCopyKey}
          newKeyName={newKeyName}
          setNewKeyName={setNewKeyName}
          newMonthlyLimit={newMonthlyLimit}
          setNewMonthlyLimit={setNewMonthlyLimit}
          newUsage={newUsage}
          setNewUsage={setNewUsage}
          newlyCreatedKey={newlyCreatedKey}
          editingKey={editingKey}
        />
      </div>
    </div>
  );
} 