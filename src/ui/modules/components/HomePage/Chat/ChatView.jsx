import { useSessions } from "@/hooks/useSessions";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as HandThumbDownIconActive,
  HandThumbUpIcon as HandThumbUpIconActive,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";

function ChatView({ conversationHistory: initialConversationHistory, currentSessionId }) {
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState(initialConversationHistory);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  const handleLikeDislike = (index, liked) => {
    fetch("http://localhost:8000/api/like-dislike/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: currentSessionId,
        message_index: index,
        liked: liked,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the conversation history with the new like/dislike status
          setConversationHistory((prevHistory) =>
            prevHistory.map((message, i) =>
              i === index
                ? {
                    ...message,
                    liked: liked, // Update the liked status of the message
                  }
                : message
            )
          );
        } else {
          alert("Error updating like/dislike status.");
        }
      })
      .catch((error) => {
        console.error("Error updating like/dislike:", error);
        alert("Error updating like/dislike status.");
      });
  };
  return (
    <div className="relative mb-[80px] w-full max-w-5xl flex-1 overflow-y-auto p-4">
      {conversationHistory.length < 1 && (
        <div className="flex w-full flex-col items-center justify-center gap-y-[16px]">
          <div className="h-[64px] w-[64px] rounded-[20px] bg-black-light p-3">
            <svg
              className="rotate-[80deg]"
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#ffffff"
                stroke="none"
              >
                <path d="M4062 4550 c-52 -32 -77 -112 -51 -163 7 -12 71 -83 143 -157 203 -208 359 -434 457 -662 61 -141 107 -181 189 -163 81 18 122 98 94 182 -49 151 -222 449 -364 628 -75 94 -258 285 -314 326 -48 35 -105 39 -154 9z" />
                <path d="M1820 4281 c-52 -16 -109 -51 -128 -78 -27 -38 -42 -99 -35 -137 4 -17 159 -370 345 -785 196 -436 338 -766 338 -783 0 -42 -15 -64 -50 -77 -35 -12 -67 -3 -91 25 -9 11 -128 271 -265 579 -137 307 -258 573 -269 590 -25 37 -97 75 -145 75 -47 0 -130 -40 -162 -78 -34 -40 -52 -95 -44 -135 3 -18 144 -343 313 -723 l308 -692 213 -148 c118 -82 218 -157 223 -166 15 -27 10 -74 -8 -97 -10 -12 -34 -24 -53 -27 -33 -5 -58 11 -399 250 -233 164 -379 260 -405 267 -91 25 -196 -8 -258 -81 -41 -47 -58 -97 -58 -168 0 -90 18 -117 186 -277 86 -82 199 -200 252 -264 637 -767 1273 -982 1923 -650 273 140 468 318 569 519 83 166 115 311 115 530 0 172 -7 222 -52 365 -25 79 -752 1701 -799 1782 -96 165 -358 91 -356 -101 0 -44 29 -117 206 -527 113 -262 206 -486 206 -498 0 -31 -52 -81 -84 -81 -14 0 -36 10 -50 23 -16 14 -130 258 -331 712 -186 417 -317 701 -333 718 -74 79 -188 79 -280 2 -39 -32 -67 -103 -59 -150 3 -19 134 -323 291 -676 157 -352 286 -650 286 -661 0 -27 -53 -78 -83 -78 -13 0 -36 9 -49 20 -18 14 -125 243 -374 801 -191 430 -357 795 -368 812 -36 52 -129 86 -186 68z" />
                <path d="M453 3659 c-49 -14 -79 -60 -118 -182 -97 -298 -138 -632 -115 -931 16 -219 33 -302 66 -337 70 -74 182 -54 221 38 12 29 11 49 -4 151 -23 161 -23 467 0 622 23 147 47 249 92 390 28 85 35 121 30 148 -8 41 -63 102 -93 102 -11 0 -26 2 -34 4 -7 2 -27 0 -45 -5z" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center gap-x-[8px] text-center">
            <p className="w-full text-3xl font-bold text-black opacity-80">
              Hi, Can I help you with anything?
            </p>
            <p className="w-[75%] text-sm text-black opacity-40">
              You will get more accurate information if your questions are about
              the text file you added.
            </p>
          </div>
        </div>
      )}
      {conversationHistory.map((message, index) => {
        const isHuman = message.type === "human";
        const isLoading = message.loading;
        return (
          <div
            key={message.id || index}
            className={`flex ${isHuman ? "justify-end" : "justify-start"} relative mb-2`}
          >
            <div className={`max-w-2xl rounded-lg bg-white p-2 text-black `}>
              {isLoading ? (
                <div className="flex w-[90px] items-center justify-center rounded-[12px]">
                  <div className="loading">
                    <div className="dot dot--one"></div>
                    <div className="dot dot--two"></div>
                    <div className="dot dot--three"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  ></div>
                </div>
              )}
            </div>
            {!isHuman && !isLoading && (
              <div className="absolute bottom-[-32px] mt-2 flex gap-x-[3px]">
                <button
                  disabled={message.liked === true}
                   className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-custom-gradient hover:bg-opacity-85 hover:text-white"
                  onClick={() => handleLikeDislike(index, true)}
                >
                  {message.liked === true ? (
                    <HandThumbUpIconActive width={18} />
                  ) : (
                    <HandThumbUpIcon width={18} />
                  )}
                </button>
                <button
                  disabled={message.liked === false}
                  className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-custom-gradient hover:bg-opacity-85 hover:text-white"
                  onClick={() => handleLikeDislike(index, false)}
                >
                  {message.liked === false ? (
                    <HandThumbDownIconActive width={18} />
                  ) : (
                    <HandThumbDownIcon width={18} />
                  )}
                </button>
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatView;
