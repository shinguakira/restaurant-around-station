import type { Metadata } from "next";
import dynamic from "next/dynamic";

const MapComponentClient = dynamic(() => import("@components/map-component"), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "途中下車飲食店検索",
  description: "途中下車飲食店検索",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-8 text-4xl font-bold">駅回りレストラン検索</h1>
      <MapComponentClient />
    </main>
  );
}
