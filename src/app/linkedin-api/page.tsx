import Head from 'next/head';
import LinkedInApi from '../../components/LinkedInApi';

export default function LinkedInApiPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>LinkedIn API</title>
        <meta name="description" content="LinkedIn job search and API interactions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <LinkedInApi />
      </div>
    </main>
  );
}
