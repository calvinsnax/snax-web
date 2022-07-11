/**
 * External imports
 */
import React from "react";
import { graphql, PageProps } from "gatsby";

/**
 * Internal imports
 */
import { Layout } from "../../components/base";
import { Article } from "../../components/article";

export default function BlogPost(
  props: PageProps<Queries.getMdxPostByIdQueryQuery>
) {
  const { data } = props;
  const { mdx } = data;

  return (
    <Layout pageTitle={mdx?.frontmatter?.title} $overlay>
      <Article data={data} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query getMdxPostByIdQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(locale: "ko", formatString: "YYYY.MM.DD")
        slug
        title
        category
        color
        type
        featuredImage {
          publicURL
          name
        }
      }
      body
    }
  }
`;
