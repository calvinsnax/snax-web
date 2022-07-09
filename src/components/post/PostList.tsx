import React from "react";
import styled from "styled-components";

import { PostItem } from "./PostItem";
import { usePost } from "../../hooks/usePost";
import { Box } from "../atom";

export const PostList = () => {
  const posts = usePost();

  return (
    <Box overflow="hidden">
      <Ul>
        {posts.map((post) => (
          <PostItem
            key={post.node.id}
            {...(post.node.frontmatter as Queries.MdxFrontmatter)}
          />
        ))}
      </Ul>
    </Box>
  );
};

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  margin: -0.25rem;

  & > li {
    flex-basis: 50%;
    max-width: 50%;
    padding: 0.25rem;
    /* &:not(:last-child) {
      margin-bottom: 0.375rem;
    } */
  }
`;
