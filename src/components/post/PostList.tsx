import React from "react";
import styled from "styled-components";

import { PostItem, PostItemProps } from "./PostItem";
import { Box, Container } from "../atom";

export interface PostType {
  id: string;
  slug?: string;
  frontmatter: PostItemProps;
}

export type PostListType = PostType[];

interface Props {
  posts: Queries.getPostsQuery["allMdx"]["edges"];
}

export const PostList = (props: Props) => {
  const { posts } = props;

  return (
    <Container>
      <Ul>
        {posts?.map((post) => (
          <PostItem
            key={post.node.id}
            slug={post.node.frontmatter?.slug || ""}
            title={post.node.frontmatter?.title || ""}
            date={post.node.frontmatter?.date || ""}
            description={post.node.frontmatter?.description || ""}
            featuredImage={
              post.node.frontmatter?.featuredImage?.childImageSharp
                ?.gatsbyImageData
            }
            category={post.node.frontmatter?.category || ""}
          />
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
