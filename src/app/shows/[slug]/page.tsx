import { Suspense } from 'react';
import { getOfflineData } from '@/lib';
import { renderComponent } from '@/components/renderComponent';

async function getData(id: number) {
  console.log('Fetching data for id:', id);
  const res = await getOfflineData(id);
  return res.data;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(parseFloat(slug.split('--')[1]));

  return (
    <>
      {data.children.map((child: any, index: number) =>
        renderComponent(child, index)
      )}
    </>
  );
}

// https://jsfiddle.net/21fx6ge7/
