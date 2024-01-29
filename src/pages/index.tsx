import type { NextPage } from 'next';
import Head from 'next/head';

type HomeProps = {
  username: string | null;
};

const Home: NextPage<HomeProps> = ({ username }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-telegram-white">
      <Head>
        <title>LFG 🚀</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <span className="text-2xl font-bold text-telegram-black">hi {`${username}`} 😍</span>
      </main>
    </div>
  );
};

export default Home;
