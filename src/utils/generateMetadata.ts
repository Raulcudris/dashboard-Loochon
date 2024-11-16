import { config } from '@/config/config';

export function generateMetadata(titleSuffix: string): { title: string } {
  return { title: `${titleSuffix} | Dashboard | ${config.site.name}` };
}
