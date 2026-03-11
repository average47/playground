import { Example } from '@/components';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto space-y-8">
      <Example />
    </main>
  );
}

// https://jsfiddle.net/21fx6ge7/
