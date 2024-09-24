import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/ui/modules/components/HomePage"), {
  loading: () => <></>,
});
import React from "react";

export default function Home() {
  return (
    <div
      className={`ml-auto mr-auto grid max-h-screen w-full max-w-screen-3xl grid-cols-12 flex-row gap-x-[16px] sm:flex`}
    >
      <HomePage />
    </div>
  );
}
