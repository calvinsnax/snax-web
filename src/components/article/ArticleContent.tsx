import React from "react";
import { MDXProvider } from "@mdx-js/react";
import styled, { css } from "styled-components";
import { Helmet } from "react-helmet";

import { mobileBreakpoint } from "../../lib/styles";

interface ArticleContentProps {
  children: React.ReactNode;
}

export const ArticleContent = (props: ArticleContentProps) => {
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
    ol: Ol,
    // code: CodeBlock,
    hr: Hr,
    blockquote: Blockquote,
    img: Img,
    a: Anchor,
    strong: Strong,
  };

  return (
    <ContentArea>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/katorlys/prism-theme-github/themes/prism-theme-github-light.css"
        />
      </Helmet>
      <MDXProvider components={components}>{children}</MDXProvider>
    </ContentArea>
  );
};

const ContentArea = styled.div`
  padding-top: 4rem;
  padding-bottom: 3rem;

  color: var(--color-grey-800);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.75;

  @media (max-width: ${mobileBreakpoint}) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  code.language-text {
    padding: 0.125rem 0.25rem;
    color: var(--color-primary-400);
    background-color: var(--color-primary-100);
    border-radius: 4px;
  }

  .gatsby-highlight {
    pre {
      border-radius: 0.75rem;
      font-size: 0.875rem;
    }
    code {
      background-color: inherit;
    }
  }

  .gatsby-resp-image-wrapper {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e5e5e5;
    border-radius: 1rem;
    overflow: hidden;

    @media (max-width: ${mobileBreakpoint}) {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const commonHeadingStyle = css`
  color: var(--color-grey-900);
  font-weight: 700;
  line-height: 1.4;
  margin-top: 2em;
  margin-bottom: 0.75em;
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
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Ul = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
`;

const Ol = styled.ol`
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
`;

const Hr = styled.hr`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-top: none;
  border-bottom: 1px solid var(--color-grey-200);
`;

const Blockquote = styled.blockquote`
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding: 1rem;
  color: var(--color-grey-700);
  background-color: var(--color-grey-100);
  border-radius: 0.75rem;
  overflow: hidden;

  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-left: 4px solid var(--color-grey-400);
  }

  & > ${Paragraph} {
    margin: 0;
  }
`;

const Img = styled.img``;

const Anchor = styled.a`
  color: var(--color-grey-600);
  text-decoration: none;
  border-bottom: 1px solid var(--color-grey-400);
  &:not(.gatsby-resp-image-link) {
    white-space: pre-wrap;
  }

  transition: 250ms ease;
  &:hover {
    color: var(--color-primary-300);
    border-color: var(--color-primary-200);
  }
`;

const Strong = styled.strong`
  font-weight: 600;
`;
