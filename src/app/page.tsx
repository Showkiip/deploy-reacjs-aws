import Head from "next/head";
import Link from "next/link";
import LInkedInApi from "../components/LInkedInApi";
import FileConversion from "../components/FileConversion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>LinkedIn Candidate Fetcher</title>
        <meta
          name="description"
          content="Fetch LinkedIn candidates based on job description or skill set"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <nav className="mb-4">
          <Link href="/linkedin-api">
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              LinkedIn API
            </button>
          </Link>
          <Link href="/file-conversion">
            <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 ml-4">
              File Conversion
            </button>
          </Link>
          <Link href="/compiler">
            <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 ml-4">
              Compiler
            </button>
          </Link>
        </nav>
        {/* <LInkedInApi /> */}
        {/* <FetchCandidates /> */}
        {/* <CandidateSearch /> */}
      </div>
    </main>
  );
}
