export default function LoadingSpinner() {
    return (
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="border-gray-600 h-8 w-8 animate-spin rounded-full border-4 border-dashed"></div>
        <p className="mt-2 text-sm">Scraping in progress, please wait...</p>
      </div>
    );
  }
  