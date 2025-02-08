import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/notification';

const Protected = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      notify('Please provide an API key first', 'error');
      navigate('/playground');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Protected Page</h1>
        <p className="text-gray-600 text-center">
          You have successfully accessed the protected page with a valid API key!
        </p>
      </div>
    </div>
  );
};

export default Protected; 