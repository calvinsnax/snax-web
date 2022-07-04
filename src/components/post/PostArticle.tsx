import { MDXProvider } from "@mdx-js/react";
import React from "react";
import styled, { css } from "styled-components";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

interface PostArticleProps {
  children: React.ReactNode;
}

export const PostArticle = (props: PostArticleProps) => {
  const { children } = props;

  const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: Paragraph,
    ul: Ul,
    code: Code,
    hr: Hr,
  };

  return (
    <ContentArea>
      <MDXProvider components={components}>{children}</MDXProvider>
    </ContentArea>
  );
};

const ContentArea = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;

  font-size: 1rem;
  line-height: 1.75;
  word-break: keep-all;

  code {
    padding: 0.25rem;
    background-color: var(--color-grey-100);
    border-radius: 4px;
  }

  deckgo-highlight-code {
    font-size: 1rem;
  }
`;

const commonHeadingStyle = css`
  font-weight: 700;
  margin-bottom: 0.5em;
`;

const H1 = styled.h1`
  ${commonHeadingStyle}
  font-size: 2rem;
`;
const H2 = styled.h2`
  ${commonHeadingStyle}
  font-size: 1.75rem;
`;
const H3 = styled.h3`
  ${commonHeadingStyle}
  font-size: 1.5rem;
`;
const H4 = styled.h4`
  ${commonHeadingStyle}
  font-size: 1.25rem;
`;
const H5 = styled.h5`
  ${commonHeadingStyle}
  font-size: 1rem;
`;
const H6 = styled.h6`
  ${commonHeadingStyle}
  color: var(--color-grey-500);
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: 2rem;

  & > span.gatsby-resp-image-wrapper {
    margin-bottom: -1rem;
  }
`;

const Code = styled.code`
  padding: 0.25rem;
  background-color: var(--color-grey-100);
  border-radius: 4px;
`;

const Ul = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
`;

const Hr = styled.hr`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-top: none;
  border-bottom: 1px solid var(--color-grey-200);
`;
