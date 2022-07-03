import { MDXProvider } from "@mdx-js/react";
import React from "react";
import styled, { css } from "styled-components";
import { Box } from "../atom";

interface PostArticleProps {
  children: React.ReactNode;
}

export const PostArticle = (props: PostArticleProps) => {
  const { children } = props;

  const components = {
    h1: H1,
    p: Paragraph,
  };

  return (
    <ContentArea>
      <MDXProvider components={components}>{children}</MDXProvider>;
    </ContentArea>
  );
};

const ContentArea = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;

  font-size: 1.125rem;
  line-height: 1.75;
  word-break: keep-all;
`;

const commonHeadingStyle = css`
  font-weight: 700;
  margin-bottom: 1em;
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

const Paragraph = styled.p`
  margin-bottom: 2rem;
`;
