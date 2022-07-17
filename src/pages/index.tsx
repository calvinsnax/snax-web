import React, { useMemo } from "react";

import { Layout } from "../components/base";
import { PostList } from "../components/post";
import { HomeHead } from "../components/home";
import { usePost } from "../hooks";
import { PostListType } from "../components/post/PostList";

const IndexPage = () => {
  const post = usePost();

  const computedPosts = useMemo(() => {
    return post.map((item) => {
      return {
        id: item.node.id,
        frontmatter: item.node.frontmatter,
      };
    });
  }, [post]);

  return (
    <Layout>
      <HomeHead />
      <PostList posts={computedPosts as PostListType} />
    </Layout>
  );
};

export default IndexPage;
