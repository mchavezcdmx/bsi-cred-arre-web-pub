import { ContentfulRepository } from '../services/repositories/contenful.repository';
import { ContentProvider } from '../components/features/content-inyector';
import { Entry } from 'contentful';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { pageIds } from '../server/routes';
import { repositoryContainer } from '../services/configuration/inversify.config';
import { TYPES } from '../services/configuration/types';

type HomeProps = {
  page: Entry<unknown>;
};

const Home: React.FC<HomeProps> = ({ page }) => {
  return (
    <>
      <ContentProvider componentEntries={page}>
        <Head>
          <title>Arrendadora</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        HOLA DESDE EL HOME
      </ContentProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentfulRepository: ContentfulRepository = repositoryContainer.get(TYPES.ContentfulRepository);

  const page = await contentfulRepository.getPageEntries({
    locale: 'es-MX',
    pageEntryId: pageIds.index.entryId
  });

  return { props: { page } };
};

export default Home;
