// eslint-disable-next-line sort-imports
import 'reflect-metadata';

import { Container } from 'inversify';
import { ContentfulRepository } from '../repositories/contenful.repository';
import { ContentfulRepositoryImpl } from '../repositories/contenful.repository.impl';
import { ExampleRepository } from '../repositories/example.repository';
import { ExampleRepositoryMock } from '../repositories/example.repository.mock';
import { TYPES } from './types';

const repositoryContainer = new Container();

repositoryContainer.bind<ExampleRepository>(TYPES.ExampleRepository).to(ExampleRepositoryMock);
repositoryContainer.bind<ContentfulRepository>(TYPES.ContentfulRepository).to(ContentfulRepositoryImpl);

export { repositoryContainer };
