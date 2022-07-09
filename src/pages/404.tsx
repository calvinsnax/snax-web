import React from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import { Box, Button, Container } from "../components/atom";
import { Layout } from "../components/base";

const NotFoundPage = () => {
  const handleClickHome = () => navigate("/");

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
              페이지를 <br />
              찾을 수 없어요
            </Box>

            <Box as="p" mb={4} lineHeight={1.5}>
              주소가 잘못되었거나, 글쓴이가 부끄러워서 자삭한 것 같아요. <br />
              대신 다른 글을 찾아볼래요?
            </Box>

            <Button
              color="primary"
              size="large"
              round
              onClick={handleClickHome}
            >
              홈으로 가기
            </Button>
          </Box>
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
