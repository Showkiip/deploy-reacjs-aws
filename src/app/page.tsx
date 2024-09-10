import Head from "next/head";
import FetchCandidates from "../components/FetchCandidates";
import LInkedInApi from "../components/LInkedInApi";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>LinkedIn Candidate Fetcher</title>
        <meta name="description" content="Fetch LinkedIn candidates based on job description or skill set" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <LInkedInApi />
        {/* <FetchCandidates />
        <CandidateSearch /> */}
      </div>
    </main>
  );
}
