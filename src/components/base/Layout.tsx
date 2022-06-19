/**
 * External imports
 */
import React, { useMemo } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

/**
 * Internal imports
 */
import { GlobalStyles } from "../../lib/styles/styles";
import { Header, HeaderProps } from "./Header";
import styled from "styled-components";

export interface LayoutProps extends HeaderProps {
  pageTitle?: string;
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { pageTitle, children, overlay } = props;
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
    <LayoutWrap overlay={overlay}>
      <Helmet title={title} defer={false} />
      <GlobalStyles />
      <Header overlay={overlay} />

      <Main>{children}</Main>
    </LayoutWrap>
  );
};

const LayoutWrap = styled.div<Partial<LayoutProps>>`
  ${({ overlay }) => {
    if (!overlay) return `padding-top: var(--header-safe-area);`;
    return null;
  }}
`;

const Main = styled.main`
  background-color: white;
`;
