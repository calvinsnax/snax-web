import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { Box } from "../atom";
import { PostItem } from "./PostItem";
import { IContent } from "../../lib/types/contentTypes";

type DataType = {
  allMarkdownRemark: {
    nodes: {
      id: string;
      frontmatter: IContent;
    }[];
  };
};

export const PostList = () => {
  const { allMarkdownRemark } = useStaticQuery<DataType>(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
        nodes {
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
  `);
  const { nodes } = allMarkdownRemark;

  return (
    <Box as="ul" py={6}>
      {nodes.map((post) => (
        <PostItem key={post.id} {...post.frontmatter} />
      ))}
    </Box>
  );
};
