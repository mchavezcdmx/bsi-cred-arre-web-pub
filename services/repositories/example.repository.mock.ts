
import {
  ExampleRepository,
  ExampleType
} from './example.repository';

import { injectable } from 'inversify';

@injectable()
class ExampleRepositoryMock implements ExampleRepository {
  getData(): Promise<ExampleType> {
    return Promise.resolve({
      code: 200,
      message: 'Example Message'
    });
  }
}

export { ExampleRepositoryMock };
