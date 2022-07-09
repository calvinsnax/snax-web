/**
 * External imports
 */
import React from "react";
import { graphql, PageProps } from "gatsby";

/**
 * Internal imports
 */
import { Layout } from "../../components/base";

export default function BlogPost(
  props: PageProps<Queries.getPostsByCategoryQuery>
) {
  const {
    data: {
      allMdx: { edges },
    },
  } = props;

  return <Layout pageTitle="블로그">블로그입니다.</Layout>;
}

export const pageQuery = graphql`
  query getPostsByCategory($category: String) {
    allMdx(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            category
            color
            date(locale: "ko", formatString: "YYYY.MM.DD")
            featuredImage {
              publicURL
              name
            }
          }
        }
      }
    }
  }
`;
