import '../styles/globals.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

interface WebAppUserNew {
  /**
   * A unique identifier for the user or bot.
   */
  id?: number;
  /**
   * True, if this user is a bot. Returns in the receiver field only.
   */
  is_bot: boolean;
  /**
   * First name of the user or bot.
   */
  first_name: string;
  /**
   * Last name of the user or bot.
   */
  last_name?: string;
  /**
   * Username of the user or bot.
   */
  username?: string;
  /**
   * IETF language tag of the user's language. Returns in user field only.
   */
  language_code?: string;
  /**
   * URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. Only returned for Web Apps launched from the attachment menu.
   */
  photo_url?: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.post('/api/validate-hash', { hash: window.Telegram.WebApp.initData }).then((response) => {
      setIsHashValid(response.status === 200);
      if (response.status === 200) {
        // After hash validation, retrieve user data from initDataUnsafe
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
          const webAppUserData: WebAppUserNew | undefined =
            window.Telegram.WebApp.initDataUnsafe.user;
          if (webAppUserData) {
            // Rest of the code
          }
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
