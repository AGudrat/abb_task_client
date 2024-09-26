import React, { useState } from "react";
import axios from "axios";
import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon, PauseIcon } from "@heroicons/react/24/solid"; // Optional

export default function ScraperModal({ toggleScraperModal }) {
  const [url, setUrl] = useState("");
  const [scrapedText, setScrapedText] = useState("");
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleScrape = async () => {
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Clear any previous errors
    try {
      const response = await axios.post(
        "http://localhost:8000/scraper/scrape-text/",
        { url },
      );
      if (response.data && response.data.message) {
        setScrapedText(response.data.text);
        setFilename(response.data.file);
      } else {
        setErrorMessage("Failed to scrape the text.");
      }
    } catch (error) {
      console.error("Error scraping text:", error);
      setErrorMessage("An error occurred while scraping text.");
    } finally {
      setIsLoading(false); // Stop loading after the request
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scrapedText).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([scrapedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename || "scraped_content.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <React.StrictMode>
      <div className="fixed left-0 z-40 flex h-screen w-screen items-center justify-center">
        <div
          onClick={() => toggleScraperModal()}
          className="fixed z-10 h-full w-full bg-[black] opacity-50"
        ></div>
        <div
          className={`z-20 flex flex-col gap-y-[16px] rounded-[10px] bg-white px-[16px] py-[16px] text-center transition-all ${scrapedText === "" ? "h-[350px] w-[500px]" : "h-[550px] w-[800px]"}`}
        >
          <div className="flex min-h-[32px] flex-row justify-between border-b border-b-black border-opacity-20 pb-[32px]">
            <h2 className="text-2xl font-bold text-opacity-[90%]">
              Scrape Website Text
            </h2>
            <div
              onClick={() => toggleScraperModal()}
              className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[10px] border border-black"
            >
              <XMarkIcon width={24} />
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-y-[16px]">
            <input
              className="rounded-[10px] border border-black border-opacity-[85%] bg-white bg-opacity-[85%] outline-none"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              style={{ width: "80%", padding: "10px" }}
              disabled={isLoading} // Disable input during loading
            />
            <button
              onClick={handleScrape}
              disabled={isLoading} // Disable button during loading
              className="flex h-full w-[200px] flex-row items-center justify-center gap-x-[8px] rounded-full bg-[#e9947f] p-[8px] px-[16px] text-white"
            >
              {isLoading ? "Scraping..." : "Scrape"}{" "}
              {/* Change button text during loading */}
            </button>
          </div>
          {isLoading && (
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="border-gray-600 h-8 w-8 animate-spin rounded-full border-4 border-dashed"></div>
              <p className="mt-2 text-sm">
                Scraping in progress, please wait...
              </p>
            </div>
          )}
          {scrapedText && !isLoading && (
            <div style={{ marginTop: "20px" }}>
              <textarea
                value={scrapedText}
                rows="10"
                className="outline-none"
                style={{ width: "100%", maxHeight: "200px" }}
                readOnly
              />
              <div style={{ marginTop: "10px" }} className="flex flex-row">
                <button
                  onClick={handleCopy}
                  className="flex flex-row gap-x-[8px] rounded-[10px] border border-[#1d4ed8] bg-[#1d4ed8] text-white"
                  style={{ padding: "10px", marginRight: "10px" }}
                >
                  <ClipboardDocumentIcon width={20} />
                  <p>Copy Text</p>
                </button>
                <button
                  className="flex flex-row gap-x-[8px] rounded-[10px] border border-[#88cc9c] bg-[#88cc9c]  text-black text-opacity-70"
                  onClick={handleDownload}
                  style={{ padding: "10px" }}
                >
                  <ArrowDownTrayIcon width={20} />
                  Download Text
                  <p></p>
                </button>
              </div>
            </div>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </React.StrictMode>
  );
}
