require('@testing-library/jest-dom');

jest.mock('next/config', () => () => ({publicRuntimeConfig: {
  CF_DELIVERY_ACCESS_TOKEN: '12345',
  CF_SPACE_ID: '12345'
}}));
