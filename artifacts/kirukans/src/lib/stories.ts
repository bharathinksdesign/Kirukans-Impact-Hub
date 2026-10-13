import { useEffect } from 'react';
import { projects, type Project } from '@/lib/site-data';

export const HOME_URL = import.meta.env.BASE_URL;
export const homeHash = (h: string) => `${HOME_URL}${h}`;

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

export function storyYear(p: Project): string {
  return p.date.match(/\d{4}/)?.[0] ?? '';
}
function stamp(p: Project): number {
  const m = MONTHS.indexOf(p.date.split(' ')[0].toLowerCase());
  return Number(storyYear(p)) * 12 + Math.max(m, 0);
}
/** Every project, newest first. Future entries in site-data appear automatically. */
export const allStories: Project[] = [...projects].sort((a, b) => stamp(b) - stamp(a));
export const HOME_STORY_COUNT = 3;
export const storyYears: string[] = Array.from(new Set(allStories.map(storyYear).filter(Boolean)));

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    const prevDesc = tag.content;
    document.title = title;
    tag.content = description;
    return () => {
      document.title = prevTitle;
      if (created) tag!.remove();
      else tag!.content = prevDesc;
    };
  }, [title, description]);
}
