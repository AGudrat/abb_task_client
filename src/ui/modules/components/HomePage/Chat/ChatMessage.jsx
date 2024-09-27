import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbDownIcon as HandThumbDownIconActive, HandThumbUpIcon as HandThumbUpIconActive, CheckIcon } from "@heroicons/react/24/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export default function ChatMessage({ message, index, copiedMessageIndex, handleLikeDislike, handleCopyMessage }) {
  const isHuman = message.type === "human";
  const isLoading = message.loading;

  return (
    <div className={`flex ${isHuman ? "justify-end" : "mb-2 justify-start"} relative`}>
      <div className="max-w-2xl rounded-lg bg-white p-2 text-black">
        {isLoading ? (
          <div className="flex w-[90px] items-center justify-center rounded-[12px]">
            <div className="loading">
              <div className="dot dot--one"></div>
              <div className="dot dot--two"></div>
              <div className="dot dot--three"></div>
            </div>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: message.content }}></div>
        )}
      </div>
      {!isHuman && !isLoading && (
        <div className="absolute bottom-[-32px] mt-2 flex gap-x-[3px]">
          <button
            disabled={message.liked === true}
            className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-opacity-85 hover:bg-custom-gradient hover:text-white"
            onClick={() => handleLikeDislike(index, true)}
          >
            {message.liked === true ? <HandThumbUpIconActive width={18} /> : <HandThumbUpIcon width={18} />}
          </button>
          <button
            disabled={message.liked === false}
            className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-opacity-85 hover:bg-custom-gradient hover:text-white"
            onClick={() => handleLikeDislike(index, false)}
          >
            {message.liked === false ? <HandThumbDownIconActive width={18} /> : <HandThumbDownIcon width={18} />}
          </button>
          <button
            className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-opacity-85 hover:bg-custom-gradient hover:text-white"
            onClick={() => handleCopyMessage(message.content, index)}
          >
            {copiedMessageIndex === index ? <CheckIcon width={18} /> : <DocumentDuplicateIcon width={18} />}
          </button>
        </div>
      )}
    </div>
  );
}
