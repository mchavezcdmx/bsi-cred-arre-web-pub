import { ContentfulRepository, GetPageParams, PageSlug } from './contenful.repository';
import { createClient, Entry } from 'contentful';
import getConfig from 'next/config';
import { injectable } from 'inversify';

const { publicRuntimeConfig } = getConfig();

const client = createClient({
  accessToken: publicRuntimeConfig.CF_DELIVERY_ACCESS_TOKEN,
  space: publicRuntimeConfig.CF_SPACE_ID,
});

interface IPageFields {
  slug: string;
}

@injectable()
class ContentfulRepositoryImpl implements ContentfulRepository {
  async getPageEntries(params: GetPageParams): Promise<Entry<unknown>[]> {
    const page = await this.getPage(params);
    const { content } = page.fields;

    if (!Array.isArray(content) || content.length === 0) {
      return Promise.resolve([]);
    }

    return Promise.resolve(content);
  }

  async getAllSlugs(): Promise<PageSlug[]> {
    const query = {
      content_type: 'page',
      include: 1,
      limit: 100,
      locale: 'es-MX',
    };

    const { items } = await client.getEntries<IPageFields>(query);

    return items.map((item) => {
      return {
        id: item.sys.id,
        slug: item.fields.slug,
      };
    });
  }

  async getPage(params: GetPageParams): Promise<Entry<any>> {
    const query = {
      content_type: 'page',
      include: 10,
      limit: 1,
      locale: params.locale,
      'sys.id': params.pageEntryId,
    };

    const {
      items: [page],
    } = await client.getEntries(query);

    return page || null;
  }
}

export { ContentfulRepositoryImpl };
