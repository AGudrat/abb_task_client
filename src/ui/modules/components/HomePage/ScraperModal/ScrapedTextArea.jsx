import { handleCopy } from "@/ui/modules/utils/handleCopy";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import {
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ScrapedTextArea({
  scrapedText,
  filename,
  handleDownload,
}) {
  const [isMessageCopied, setIsMessageCopied] = useState(false);

  const handleCopyMessage = (scrapedText) => {
    handleCopy(scrapedText);
    setIsMessageCopied(true);
    setTimeout(() => setIsMessageCopied(false), 2000);
  };
  return (
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
          onClick={() => handleCopyMessage(scrapedText)}
          className="flex flex-row gap-x-[8px] rounded-[10px] border border-[#1d4ed8] bg-[#1d4ed8] text-white"
          style={{ padding: "10px", marginRight: "10px" }}
        >
          {isMessageCopied ? (
            <CheckIcon width={18} />
          ) : (
            <DocumentDuplicateIcon width={18} />
          )}
          <p>Copy Text</p>
        </button>
        <button
          onClick={() => handleDownload(scrapedText, filename)}
          className="flex flex-row gap-x-[8px] rounded-[10px] border border-[#88cc9c] bg-[#88cc9c] text-black text-opacity-70"
          style={{ padding: "10px" }}
        >
          <ArrowDownTrayIcon width={20} />
          Download Text
        </button>
      </div>
    </div>
  );
}
