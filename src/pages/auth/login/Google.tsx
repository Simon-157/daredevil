import React, { useEffect } from 'react';
import Button from '@components/button/Button';
import AW_API from '../../../appwrite/api';

interface OAuthResponse {
  redirect: string;
}

const GoogleOAuthButton: React.FC = () => {
  const handleGoogleSignIn = () => {
    AW_API.createAccount()
      .then((response: OAuthResponse) => {
        window.location.href = response.redirect;
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await AW_API.getAccount();
        // User is authenticated, perform necessary actions here
      } catch (error) {
        // User is not authenticated or session does not exist
        console.error('User is not authenticated:', error);
      }
    };

    checkAuthStatus();
  }, []);

  return <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>;
};

export default GoogleOAuthButton;
