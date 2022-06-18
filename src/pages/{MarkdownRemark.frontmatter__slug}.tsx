/**
 * External imports
 */
import React from "react";
import { graphql, PageProps } from "gatsby";

/**
 * Internal imports
 */
import { Layout } from "../components/base";

export interface IContent {
  slug: string;
  date: string;
  title: string;
}

type DataType = {
  markdownRemark: {
    frontmatter: IContent;
    html: string;
  };
};

const Template = (props: PageProps<DataType>) => {
  const { data } = props;
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout pageTitle={frontmatter.title}>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;

export default Template;
