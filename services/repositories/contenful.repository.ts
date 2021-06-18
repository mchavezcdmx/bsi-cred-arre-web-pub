import { Entry } from 'contentful';

export type GetPageParams = {
  pageEntryId: string;
  locale: string;
}

export type PageSlug = {
  slug: string;
  id: string;
}

export interface ContentfulRepository {
  getPage(params: GetPageParams): Promise<Entry<unknown>>;

  getAllSlugs(): Promise<PageSlug[]>;

  getPageEntries(params: GetPageParams): Promise<Entry<unknown>[]>;
}
