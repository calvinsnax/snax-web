import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

type Props = {
  pageTitle: string;
  children: React.ReactNode;
};

const Layout = ({ pageTitle, children }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <Helmet
        title={`${pageTitle} | ${data.site.siteMetadata.title}`}
        defer={false}
      />

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
