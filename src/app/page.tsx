export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
          Welcome to the Home Page
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400">
          This is a sample application using Next.js and Tailwind CSS.
        </p>
      </main>
    </div>
  );
}
