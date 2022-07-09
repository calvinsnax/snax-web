import React from "react";
import styled from "styled-components";

import { Layout } from "../components/base";
import { Container } from "../components/atom";
import { PostList } from "../components/post";
import { HomeHead } from "../components/home";

const IndexPage = () => {
  return (
    <Layout $overlay background="black">
      <HomeHead />
      <Container>
        <PostList />
      </Container>
    </Layout>
  );
};

export default IndexPage;
