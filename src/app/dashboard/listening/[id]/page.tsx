import { Suspense } from "react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import { ListeningSimulator } from "@/components/ListeningSimulator";

export async function generateStaticParams() {
  return LISTENING_TESTS.map((t) => ({
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
          Chargement du test d'écoute TCF...
        </div>
      }
    >
      <ListeningSimulator testId={resolved.id} />
    </Suspense>
  );
}
