/**
 * External imports
 */
import React, { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";

/**
 * Internal imports
 */
import { GlobalStyles } from "../../lib/styles/styles";
import { Header, HeaderProps } from "./Header";

export interface LayoutProps extends HeaderProps {
  pageTitle?: string;
  children: React.ReactNode;
  background?: string;
}

export const Layout = (props: LayoutProps) => {
  const { pageTitle, children, $overlay, background } = props;
  type SiteDataType = {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  const data = useStaticQuery<SiteDataType>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const title = useMemo(() => {
    if (!pageTitle) return data.site.siteMetadata.title;

    return `${pageTitle} | ${data.site.siteMetadata.title}`;
  }, [pageTitle, data.site.siteMetadata.title]);

  return (
    <LayoutWrap $overlay={$overlay}>
      <Helmet title={title} defer={false} />
      <GlobalStyles />
      <Header $overlay={$overlay} />

      <Main background={background}>{children}</Main>
    </LayoutWrap>
  );
};

const LayoutWrap = styled.div<Partial<LayoutProps>>`
  ${({ $overlay }) => {
    if (!$overlay) return `padding-top: var(--header-safe-area);`;
    return null;
  }}
`;

const Main = styled.main<Partial<LayoutProps>>`
  background-color: white;
  ${({ background }) => !!background && `background-color: ${background};`}
`;
