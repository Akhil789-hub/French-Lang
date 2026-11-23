import { Suspense } from "react";
import { READING_TESTS } from "@/data/reading-tests";
import { ReadingSimulator } from "@/components/ReadingSimulator";

export async function generateStaticParams() {
  return READING_TESTS.map((t) => ({
    id: t.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;

  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-zinc-500 font-mono text-sm">
          Chargement du test de lecture TCF...
        </div>
      }
    >
      <ReadingSimulator testId={resolved.id} />
    </Suspense>
  );
}
