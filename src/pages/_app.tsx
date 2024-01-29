import '../styles/globals.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);
  const [username, setUsername] = useState(null);

  // Wait for validation to complete before rendering the page and stop the
  // rendering if the hash is invalid. Comment out the following useEffect
  // hook to see the page render without the hash validation.
  // I will receive ID, name, username, language_code, photo
  useEffect(() => {
    axios.post('/api/validate-hash', { hash: window.Telegram.WebApp.initData }).then((response) => {
      setIsHashValid(response.status === 200);
      if (response.status === 200) {
        const { username } = response.data; // Assuming the user ID is returned in the response
        setUsername(username);
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
