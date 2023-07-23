import React, { useMemo } from "react";

import { Layout } from "../components/base";
import { PostList } from "../components/post";
import { HomeHead } from "../components/home";
import { usePostsQuery } from "../hooks";
import { PostListType } from "../components/post/PostList";
import { Seo } from "../components/atom";

const IndexPage = () => {
  const posts = usePostsQuery();

  return (
    <Seo>
      <Layout>
        <HomeHead />
        <PostList posts={posts} />
      </Layout>
    </Seo>
  );
};

export default IndexPage;
