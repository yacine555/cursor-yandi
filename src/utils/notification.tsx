import { toast } from 'react-hot-toast';

type NotificationType = 'success' | 'error';

export const notify = (message: string, type: NotificationType) => {
  toast[type](message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: type === 'success' ? '#10B981' : '#EF4444',
      color: 'white',
    },
  });
}; 