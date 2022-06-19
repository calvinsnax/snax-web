import styled from "styled-components";

interface ContainerProps {
  expand?: boolean;
  isArticle?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  margin: 0 auto;

  ${({ expand }) => {
    if (!expand)
      return `
      max-width: var(--container-width);
      padding: 0 var(--spacing-base);
    `;
    return `
      padding: 0 var(--spacing-1000);
    `;
  }}

  ${({ isArticle }) => {
    if (!isArticle) return null;
    return `
      max-width: var(--article-width);
    `;
  }}
`;
