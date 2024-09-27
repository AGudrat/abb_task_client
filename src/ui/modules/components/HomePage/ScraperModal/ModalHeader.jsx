import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalHeader({ toggleScraperModal }) {
  return (
    <div className="flex min-h-[32px] flex-row justify-between border-b border-b-black border-opacity-20 pb-[8px]">
      <div className="flex flex-row items-center gap-x-[8px]">
        <h2 className="text-2xl font-bold text-opacity-[90%]">
          Scrape Website Text
        </h2>
        <div className="group relative flex cursor-pointer">
          <InformationCircleIcon width={20} />
          <div className="absolute bottom-6 hidden min-w-[400px] rounded-[10px] bg-black bg-opacity-90 px-[16px] py-[4px] text-white group-hover:flex">
            <p className="w-full">
              This scraper fetches text from the URL you enter and saves it to a
              text file. You can easily copy or download the data provided.
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={toggleScraperModal}
        className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[10px] border border-black"
      >
        <XMarkIcon width={24} />
      </div>
    </div>
  );
}
