import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ModalHeader from "./ModalHeader";
import InputField from "./InputField";
import { scrapeText } from "@/services/scraper.service";
import { handleDownload } from "@/ui/modules/utils/handleDownload";
import ScrapedTextArea from "./ScrapedTextArea";
import LoadingSpinner from "./LoadingSpinner";

export default function ScraperModal({ toggleScraperModal }) {
  const [url, setUrl] = useState("");
  const [scrapedText, setScrapedText] = useState("");
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleScrape = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await scrapeText(url);
      if (response.data && response.data.message) {
        setScrapedText(response.data.text);
        setFilename(response.data.file);
      } else {
        setErrorMessage("Failed to scrape the text.");
      }
    } catch (error) {
      console.error("Error scraping text:", error.response.data.error);
      setErrorMessage(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed left-0 z-40 flex h-screen w-screen items-center justify-center">
      <div
        onClick={toggleScraperModal}
        className="fixed z-10 h-full w-full bg-[black] opacity-50"
      ></div>
      <div className={`z-20 flex flex-col gap-y-[16px] rounded-[10px] bg-white px-[16px] py-[16px] text-center transition-all ${scrapedText === "" ? "h-[350px] w-[500px]" : "h-[550px] w-[800px]"}`}>
        <ModalHeader toggleScraperModal={toggleScraperModal} />
        <InputField url={url} setUrl={setUrl} isLoading={isLoading} handleScrape={handleScrape} />
        {isLoading && <LoadingSpinner />}
        {scrapedText && !isLoading && (
          <ScrapedTextArea
            scrapedText={scrapedText}
            filename={filename}
            handleDownload={handleDownload}
          />
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}
