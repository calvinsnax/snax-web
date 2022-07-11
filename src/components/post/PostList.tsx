import React from "react";
import styled from "styled-components";

import { PostItem, PostItemProps } from "./PostItem";
import { Box } from "../atom";
import { mobileBreakpoint } from "../../lib/styles";

export interface PostType {
  id: string;
  slug: string;
  frontmatter: PostItemProps;
}

export type PostListType = PostType[];

interface Props {
  posts: PostListType;
}

export const PostList = (props: Props) => {
  const { posts } = props;

  return (
    <Box overflow="hidden">
      <Ul>
        {posts.map((post) => (
          <PostItem key={post.id} {...post.frontmatter} />
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

    @media (max-width: ${mobileBreakpoint}) {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
`;
