import { ContentfulRepository } from '../services/repositories/contenful.repository';
import { createServer } from 'http';
import next from 'next';
import { pageIds } from './routes';
import { TYPES } from '../services/configuration/types';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(async () => {
  const routes = require('next-routes');
  const repositoryContainer = require('../services/configuration/inversify.config').repositoryContainer;
  const contentfulRepository: ContentfulRepository = repositoryContainer.get(TYPES.ContentfulRepository);
  const slugs = await contentfulRepository.getAllSlugs();
  const appRoutes = routes();

  slugs.forEach(pageSlug => {
    Object.entries(pageIds).forEach(pageId => {
      if (pageId[1].entryId === pageSlug.id) {
        appRoutes.add(pageId[0], pageSlug.slug, pageId[0]);
      }
    });
  });

  const handler = appRoutes.getRequestHandler(app);

  createServer(handler).listen(port);

  // eslint-disable-next-line no-console
  console.log(
    `> Server listening at port ${ port } as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
