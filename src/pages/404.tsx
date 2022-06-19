import React from "react";
import styled from "styled-components";
import { Box, Container } from "../components/atom";
import { Layout } from "../components/base";

const NotFoundPage = () => {
  return (
    <Layout pageTitle="404" overlay>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        width="100vw"
        minHeight="100vh"
        background="black"
        pb="10vh"
        overflow="hidden"
      >
        <Container isArticle>
          <PointObject>404</PointObject>
          <Box
            position="relative"
            zIndex={1}
            color="white"
            fontSize={3}
            wordBreak="keep-all"
          >
            <Box as="h1" fontSize={8} fontWeight={800} mb="2rem">
              404, 찾을 수 없는 <br />
              페이지에 대한 고찰
            </Box>

            <Box as="p" mb={3}>
              페이지를 찾을 수 없다.
            </Box>

            <Box as="p" mb={3}>
              왜 이 페이지는 없는 것일까. 곰곰히 생각해보면 당연하다. 없는
              페이지를 찾으려고 했기 때문이다.
            </Box>
          </Box>
          {/* <Button color="primary" size="large" round>
            더보기
          </Button> */}
        </Container>
      </Box>
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
  position: absolute;
  top: 0;
  transform: rotate(-45deg);
  right: 0;
  color: var(--color-primary-400);
  font-size: 20vw;
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

export default NotFoundPage;
