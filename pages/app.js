import { useEffect } from 'react';
import { useRouter } from 'next/router';

const App = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, []);

  // Rest of your App component
};