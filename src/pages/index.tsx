import React, { useMemo } from "react";

import { Layout } from "../components/base";
import { PostList } from "../components/post";
import { HomeHead } from "../components/home";
import { usePostsQuery } from "../hooks";
import { PostListType } from "../components/post/PostList";
import { Seo } from "../components/atom";

const IndexPage = () => {
  const posts = usePostsQuery();

  const computedPosts = useMemo(() => {
    return posts.map((item) => {
      return {
        id: item.node.id,
        frontmatter: item.node.frontmatter,
      };
    });
  }, [posts]);

  return (
    <Seo>
      <Layout>
        <HomeHead />
        <PostList posts={computedPosts as PostListType} />
      </Layout>
    </Seo>
  );
};

export default IndexPage;
