import Image from "next/image";

export default function EmptyState({ welcomeImage }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-[16px]">
      <div className="h-[64px] w-[64px] rounded-[20px] bg-black-light p-3">
        <Image loading="lazy" src={welcomeImage} className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-col items-center justify-center gap-x-[8px] text-center">
        <p className="w-full text-3xl font-bold text-black opacity-80">Hi, Can I help you with anything?</p>
        <p className="w-[75%] text-sm text-black opacity-40">
          You will get more accurate information if your questions are about the text file you added.
        </p>
      </div>
    </div>
  );
}
