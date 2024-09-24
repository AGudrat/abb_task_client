import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/ui/modules/components/HomePage"), {
  loading: () => <></>,
});
import React from "react";

export default function Home() {
  return (
    <div className="ml-auto mr-auto flex max-h-screen w-full max-w-screen-3xl flex-row gap-x-[16px]">
      <HomePage />
    </div>
  );
}
