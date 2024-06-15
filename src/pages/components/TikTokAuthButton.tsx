import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { Button } from 'src/common/components/Buttons'

const TikTokAuthButton = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)

    useEffect(() => {
        const token = Cookies.get('tiktok_access_token');
        setIsConnected(!!token);
      }, []);

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_TIKTOK_CLIENT_ID as string;
    const redirectUri = encodeURIComponent(process.env.REACT_APP_TIKTOK_REDIRECT_URL) as string;

    // You should generate a random string for CSRF state: https://developers.tiktok.com/doc/login-kit-web/
    const randomString = Math.random().toString(36).substring(2);
    const state = encodeURIComponent(randomString); 

    const tiktokAuthUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${clientId}&scope=user.info.basic&response_type=code&redirect_uri=${redirectUri}&state=${state}`;

    window.location.href = tiktokAuthUrl;
  };

  const handleLogout = () => {
    Cookies.remove('tiktok_access_token')
    setIsConnected(false)
}

  return (
    <div>
    {isConnected ? (
         <>
            <p>Connected to TikTok</p>
            <Button      type="primary" style={{ minWidth: '140px' }} onClick={handleLogout}>Logout from TikTok</Button>
         </>
    ) : (
      <>
        <p>Not connected to TikTok</p>
        <Button type="primary" style={{ minWidth: '140px' }} onClick={handleLogin}>Connect to TikTok</Button>
      </>
    )}
  </div>
  )
};

export default TikTokAuthButton;
