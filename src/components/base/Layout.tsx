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

type Props = {
  pageTitle?: string;
  children: React.ReactNode;
};

const Layout = ({ pageTitle, children }: Props) => {
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
    <div>
      <Helmet title={title} defer={false} />
      <GlobalStyles />

      <header>{data.site.siteMetadata.title}</header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <main>{children}</main>
    </div>
  );
};
export default Layout;
