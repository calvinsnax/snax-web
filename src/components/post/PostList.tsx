import React from "react";
import styled from "styled-components";

import { PostItem } from "./PostItem";
import { useBlog } from "../../hooks/useBlog";

export const PostList = () => {
  const posts = useBlog();

  return (
    <Ul>
      {posts.map((post) => (
        <PostItem
          key={post.node.id}
          {...(post.node.frontmatter as Queries.MdxFrontmatter)}
        />
      ))}
    </Ul>
  );
};

const Ul = styled.ul`
  padding-top: 5rem;
  padding-bottom: 5rem;

  & > li {
    &:not(:last-child) {
      margin-bottom: 0.375rem;
    }
  }
`;
