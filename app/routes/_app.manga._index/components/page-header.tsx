export function PageHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            My Manga Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your reading journey and discover new favorites
          </p>
        </div>
      </div>
    </div>
  );
}