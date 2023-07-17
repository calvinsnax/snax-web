/**
 * External imports
 */
import React, { useMemo } from "react";
import { graphql, PageProps } from "gatsby";

/**
 * Internal imports
 */
import { Layout } from "../../components/base";
import { PostList } from "../../components/post";
import { PostListType } from "../../components/post/PostList";

export default function BlogPost(
  props: PageProps<Queries.getPostsByCategoryQuery>
) {
  const {
    data: {
      allMdx: { edges },
    },
  } = props;

  const computedPosts = useMemo(() => {
    return edges.map((item) => {
      return {
        id: item.node.id,
        frontmatter: item.node.frontmatter,
      };
    });
  }, [edges]);

  return (
    <Layout pageTitle="블로그">
      <PostList posts={computedPosts as PostListType} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query getPostsByCategory($frontmatter__category: String) {
    allMdx(
      filter: { frontmatter: { category: { eq: $frontmatter__category } } }
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
            type
            date(locale: "ko", formatString: "YYYY.MM.DD")
            description
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
