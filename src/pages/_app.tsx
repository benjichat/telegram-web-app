import '../styles/globals.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

type TelegramUserData = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.post('/api/validate-hash', { hash: window.Telegram.WebApp.initData }).then((response) => {
      setIsHashValid(response.status === 200);
      if (response.status === 200) {
        // After hash validation, retrieve user data from initDataUnsafe
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
          const webAppUserData = window.Telegram.WebApp.initDataUnsafe.user;
          if (webAppUserData) {
            if (webAppUserData.username && webAppUserData.username !== null) {
              setUsername(webAppUserData.username);
            }
          }
        }
      }
    });
  }, []);

  if (!isHashValid) {
    return null;
  }

  const modifiedPageProps = { ...pageProps, username };

  return <Component {...modifiedPageProps} />;
}

export default MyApp;
