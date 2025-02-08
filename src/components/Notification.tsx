import toast, { Toaster } from 'react-hot-toast';

type NotificationType = 'success' | 'error';

export const showNotification = (message: string, type: NotificationType = 'success') => {
  const styles = {
    success: {
      style: {
        background: '#22c55e',
        color: '#fff',
        padding: '12px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#22c55e',
      },
    },
    error: {
      style: {
        background: '#ef4444',
        color: '#fff',
        padding: '12px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444',
      },
    },
  };

  toast.success(message, {
    ...styles[type],
    duration: 2000,
  });
};

export const NotificationProvider = () => {
  return <Toaster position="top-center" />;
}; 