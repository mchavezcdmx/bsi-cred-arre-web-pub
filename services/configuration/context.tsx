import React, {
  createContext,
  useContext
} from 'react';
import { Container } from 'inversify';
import { repositoryContainer } from './inversify.config';

const RepositoryIocContext = createContext(null);

export const RepositoryIocProvider: React.FC<{ container?: Container }> = ({
  container,
  children
}) => {
  const value = { container: container || repositoryContainer };

  return <RepositoryIocContext.Provider value={value}>{children}</RepositoryIocContext.Provider>;
};

export const useRepositoryIoc = () => useContext(RepositoryIocContext);
