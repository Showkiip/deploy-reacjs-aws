import Head from 'next/head';
import FileConversion from '../../components/FileConversion'; // Adjust the import if necessary

export default function FileConversionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>File Conversion</title>
        <meta name="description" content="PDF to Word and Word to PDF conversion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <FileConversion />
      </div>
    </main>
  );
}
