import { promises as fs } from 'fs';

export async function getOfflineData(id: number): Promise<any> {
  const file = await fs.readFile(
    process.cwd() + `/public/data/${id}.json`,
    'utf8'
  );
  return JSON.parse(file);
}
