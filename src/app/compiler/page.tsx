import Head from 'next/head';
import CompilerApi from '../../components/CompilerApi';

export default function Compiler() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Compiler</title>
        <meta name="description" content="LinkedIn job search and API interactions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <CompilerApi />
      </div>
    </main>
  );
}
