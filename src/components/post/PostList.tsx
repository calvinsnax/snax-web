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
    <Container>
      <Ul>
        {posts.map((post) => (
          <PostItem key={post.id} {...post.frontmatter} />
        ))}
      </Ul>
    </Container>
  );
};

const Ul = styled.ul`
  padding: 3rem 0;
  & > li {
    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }
  }
`;
