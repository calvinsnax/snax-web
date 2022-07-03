import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { Box } from "../atom";
import { PostItem } from "./PostItem";

export const PostList = () => {
  const { allMdx } = useStaticQuery<Queries.getPostsQuery>(graphql`
    query getPosts {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              category
              categoryTextColor
              categoryBackgroundColor
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
  `);
  const { edges } = allMdx;

  return (
    <Box as="ul" py={6}>
      {edges.map((post) => (
        <PostItem
          key={post.node.id}
          {...(post.node.frontmatter as Queries.MdxFrontmatter)}
        />
      ))}
    </Box>
  );
};
