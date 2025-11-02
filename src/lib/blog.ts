import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  content: string; // raw markdown or html depending on function
  localized?: {
    es?: { title?: string; description?: string };
    en?: { title?: string; description?: string };
  };
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function parseLangSections(markdown: string): Record<string, string> {
  const lines = markdown.split(/\r?\n/);
  const sections: Record<string, string[]> = {};
  let current: string | null = null;
  let inCode = false;
  for (const line of lines) {
    // Toggle code fence state
    if (/^\s*```/.test(line) || /^\s*~~~/.test(line)) {
      inCode = !inCode;
    }
    if (!inCode) {
    const m = line.match(/^\s*lang\s*=\s*([a-zA-Z-]+)/);
    if (m) {
      current = m[1].toLowerCase();
      if (current === 'eng') current = 'en';
      if (!sections[current]) sections[current] = [];
      continue;
    }
    }
    if (!current) {
      // before any lang= marker, treat as default 'es'
      current = 'es';
      if (!sections[current]) sections[current] = [];
    }
    sections[current].push(line);
  }
  // join
  const out: Record<string, string> = {};
  for (const [k, arr] of Object.entries(sections)) {
    out[k] = arr.join('\n').trim();
  }
  return out;
}

export function getPostBySlug(slug: string): { meta: Omit<BlogPost, 'content'>; markdown: string; sections: Record<string, string> } | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const file = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(file);
  const sections = parseLangSections(content);
  // localized front matter support
  const title_es = (data?.title_es as string) || (data?.titleEs as string);
  const title_en = (data?.title_en as string) || (data?.title_eng as string) || (data?.titleEn as string);
  const description_es = (data?.description_es as string) || (data?.descriptionEs as string);
  const description_en = (data?.description_en as string) || (data?.description_eng as string) || (data?.descriptionEn as string);
  // choose defaults preferring ES, then EN, then generic
  const defaultTitle = title_es || title_en || (data?.title as string) || slug;
  const defaultDesc = description_es || description_en || (data?.description as string) || '';
  return {
    meta: {
      slug,
      title: defaultTitle,
      description: defaultDesc,
      localized: {
        ...(title_es || description_es ? { es: { title: title_es, description: description_es } } : {}),
        ...(title_en || description_en ? { en: { title: title_en, description: description_en } } : {}),
      },
    },
    markdown: content,
    sections,
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .map((p) => (p as { meta: Omit<BlogPost, 'content'> }).meta);
}
