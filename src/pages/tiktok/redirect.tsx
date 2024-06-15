import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export const TikTokRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAuthToken = async (code: string) => {
      try {
        const response = await axios.post('/your-backend-url/exchange-code', { code });
        const { authToken } = response.data;

        // Save auth token in a cookie with an expiry date
        Cookies.set('tiktok_access_token', authToken, { expires: 7 }); // Expires in 7 days

        // Indicate success and redirect to home
        navigate('/');
      } catch (error) {
        console.error('Error exchanging auth code:', error);
        // Handle error appropriately
      }
    };

    // Extract authorization code from URL
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      fetchAuthToken(code);
    } else {
      console.error('Authorization code not found');
      // Handle error appropriately
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Finalizing TikTok Login: Loading...</p>
    </div>
  );
};

