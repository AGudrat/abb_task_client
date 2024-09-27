export default function InputField({ url, setUrl, isLoading, handleScrape }) {
    return (
      <div className="flex w-full flex-col items-center gap-y-[16px]">
        <input
          className="rounded-[10px] border border-black border-opacity-[85%] bg-white bg-opacity-[85%] outline-none"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          style={{ width: "80%", padding: "10px" }}
          disabled={isLoading}
        />
        <button
          onClick={handleScrape}
          disabled={isLoading}
          className="flex h-full w-[200px] flex-row items-center justify-center gap-x-[8px] rounded-full bg-[#e9947f] p-[8px] px-[16px] text-white"
        >
          {isLoading ? "Scraping..." : "Scrape"}
        </button>
      </div>
    );
  }
  