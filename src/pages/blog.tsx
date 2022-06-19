import React from "react";

import { Layout } from "../components/base";
import { Container } from "../components/atom";
import { PostList } from "../components/post";

const BlogPage = () => {
  return (
    <Layout pageTitle="블로그">
      <Container>
        <PostList />
      </Container>
    </Layout>
  );
};

export default BlogPage;
