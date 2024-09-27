import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const Header = ({ onClose }) => {
  return (
    <div className="flex min-h-[32px] flex-row justify-between border-b border-b-black border-opacity-20 px-[16px] pb-[8px]">
      <div className="flex flex-row items-center gap-x-[8px]">
        <h2 className="text-2xl font-bold">Import text file</h2>
        <div className="group relative flex cursor-pointer">
          <InformationCircleIcon width={20} />
          <div className="absolute bottom-6 hidden min-w-[400px] rounded-[10px] bg-black bg-opacity-90 px-[16px] py-[4px] text-white group-hover:flex">
            <p className="w-full">
              After uploading the text file, a new session will open, allowing you to ask questions within it.
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={onClose}
        className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[10px] border border-black border-opacity-60"
      >
        <XMarkIcon width={24} />
      </div>
    </div>
  );
};

export default Header;
