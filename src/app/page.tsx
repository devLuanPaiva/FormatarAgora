"use client";
import { Header } from "@/components/shared/Header";
import dynamic from "next/dynamic";

const Transform = dynamic(
  () => import("@/components/transform").then((mod) => mod.Transform),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Header />
      <Transform />
    </main>
  );
}
