import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white p-8 sm:p-20">
      <main className="flex flex-col gap-6 text-center sm:text-left">
        <h1 className="text-4xl font-bold tracking-wide text-green-400">
          Rick and Morty Characters
        </h1>
        <p className="text-lg text-gray-300 max-w-lg">
          Explore and create your favorite Rick and Morty characters. Dive into
          the multiverse!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/characters"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-white text-lg shadow-md"
          >
            View Characters
          </Link>
          <Link
            href="/create-character"
            className="px-6 py-3 bg-green-600 hover:bg-green-500 transition rounded-lg text-white text-lg shadow-md"
          >
            Create Character
          </Link>
        </div>
      </main>
    </div>
  );
}
