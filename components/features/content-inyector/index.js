import { createContext, useContext } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const RICH_TEXT_CONTENT_TYPE = 'document';
const IMAGE_CONTENT_TYPE = 'image';

const transformContent = (content) => {
  // Transforma objetos especiales de contentful a props del componente.

  if (content?.nodeType === RICH_TEXT_CONTENT_TYPE) {
    return documentToHtmlString(content);
  }

  if (content?.fields?.file?.contentType.includes(IMAGE_CONTENT_TYPE)) {
    return content.fields.file.url.replace('//', 'https://');
  }

  return '';
};

export const ContentContext = createContext(null);

export const ContentProvider = ({ componentEntries, children }) => {
  return <ContentContext.Provider value={{ componentEntries }}>{children}</ContentContext.Provider>;
};

export const withContent = (WrappedComponent) => {
  return (props) => {
    const { componentEntries } = useContext(ContentContext);
    const { contentId, defaultProps } = WrappedComponent;

    const newProps = {
      content: {
        ...props,
        ...defaultProps.content,
      },
    };

    const componentEntry = componentEntries.find((entry) => entry.sys.id === contentId);

    if (!componentEntry) {
      return <WrappedComponent {...newProps} />;
    }

    const { content: componentFields } = componentEntry.fields;
    const { content: componentProps } = defaultProps;

    for (const fieldEntry of componentFields) {
      if (!fieldEntry.fields) {
        // Cuando el entry no está publicado en contentful.
        continue;
      }

      const { variable, content } = fieldEntry.fields;

      if (!componentProps.hasOwnProperty(variable)) {
        continue;
      }

      const transformedContent = transformContent(content);

      newProps.content[variable] = transformedContent || defaultProps[variable];
    }

    return <WrappedComponent {...newProps} />;
  };
};
