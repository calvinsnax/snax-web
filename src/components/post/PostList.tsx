import React from "react";
import styled from "styled-components";

import { PostItem, PostItemProps } from "./PostItem";
import { Box, Container } from "../atom";
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
      <Container>
        <Ul>
          {posts.map((post) => (
            <PostItem key={post.id} {...post.frontmatter} />
          ))}
        </Ul>
      </Container>
    </Box>
  );
};

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 2rem;
  margin: -0.5rem;

  & > li {
    flex-basis: 50%;
    max-width: 50%;
    padding: 0.5rem;

    @media (max-width: ${mobileBreakpoint}) {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
`;
