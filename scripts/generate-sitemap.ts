import * as fs from 'fs';
import * as path from 'path';
import format from 'date-fns/format';

import { PRODUCTION_ROOT_URL } from '../utils/config';

const SITEMAP_EXCLUDED_PAGES: string[] = [];

const HIGH_PRIORITY_PAGES = ['/'];

const getStaticPages = () => {
  const filesObj: PagesObject = {};

  const walkSync = (currentDir: string) => {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      if (
        file.startsWith('[') ||
        file.startsWith('_') ||
        SITEMAP_EXCLUDED_PAGES.some((p) => file.includes(p))
      ) {
        continue;
      }

      const filePath = path.join(currentDir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        walkSync(`${filePath}/`);
      } else {
        const cleanFileName = filePath
          .substr(0, filePath.lastIndexOf('.'))
          .replace('/index', '/')
          .replace('pages/', '')
          .trim();

        const page = `/${cleanFileName}`;

        filesObj[page] = {
          page,
          priority: HIGH_PRIORITY_PAGES.includes(page) ? 1 : 0.75,
          lastModified: fileStat.mtime,
        };
      }
    }
  };

  walkSync('pages/');

  return filesObj;
};

export const generateSitemap = () => {
  console.log('Generating sitemap.xml');
  const pages: PagesObject = { ...getStaticPages() };

  const generatePageItem = (page: PageInfo) => `  <url>
    <loc>https://${PRODUCTION_ROOT_URL}${page.page}</loc>
    <lastmod>${format(page.lastModified, 'yyyy-MM-dd')}</lastmod>
    <priority>${page.priority}</priority>
  </url>`;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
${Object.values(pages).map(generatePageItem).join('\n')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemapXml);

  console.log('Sitemap successfully generated');
};

generateSitemap();

interface PagesObject {
  [key: string]: PageInfo;
}

interface PageInfo {
  page: string;
  priority: number;
  lastModified: Date;
}
