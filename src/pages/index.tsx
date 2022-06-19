import React from "react";
import styled from "styled-components";

import { Layout } from "../components/base";
import { Box, Button, Container } from "../components/atom";
import { PostList } from "../components/post";

const IndexPage = () => {
  return (
    <Layout overlay>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        width="100vw"
        height="100vh"
        background="black"
        pb="10vh"
        overflow="hidden"
      >
        <Container>
          <PointObject>S</PointObject>
          <MainText>
            디자인과 개발 역량. <br />한 번에.
          </MainText>
          <Button color="primary" size="large">
            더보기
          </Button>
        </Container>
      </Box>

      <Container>
        <PostList />
      </Container>
    </Layout>
  );
};

const MainText = styled.h1`
  position: relative;
  z-index: 1;
  color: white;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2.5rem;
`;

const PointObject = styled.div`
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: -20vh;
  transform: rotate(-45deg);
  right: 0;
  color: var(--color-primary-400);
  font-size: 110vw;
  font-weight: 900;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(
    45deg,
    rgb(28, 33, 255) 10%,
    rgb(57, 167, 255) 62%
  );
`;

export default IndexPage;
