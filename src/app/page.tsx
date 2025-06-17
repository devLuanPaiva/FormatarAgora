"use client";
import dynamic from "next/dynamic";

const Transform = dynamic(
  () => import("@/components/transform").then((mod) => mod.Transform),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <h1>Formatar agora!</h1>
      <Transform />
    </main>
  );
}
