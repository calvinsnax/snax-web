import React from "react";

import { Layout } from "../components/base";
import { PostList } from "../components/post";
import { HomeHead } from "../components/home";

const IndexPage = () => {
  return (
    <Layout $overlay background="black">
      <HomeHead />
      <PostList />
    </Layout>
  );
};

export default IndexPage;
