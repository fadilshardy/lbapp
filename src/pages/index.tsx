import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const IndexPage = () => {
  const router = useRouter();

  const isUserAuthenticated = true;
  const userLanguage = 'en';

  useEffect(() => {
    if (isUserAuthenticated) {
      router.push('/dashboard');
    } else if (userLanguage === 'en') {
      router.push('/en');
    } else {
      router.push('/id');
    }
  }, [isUserAuthenticated, userLanguage, router]);

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
};

export default IndexPage;
