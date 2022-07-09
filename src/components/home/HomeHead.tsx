import React from "react";
import styled from "styled-components";

import { Box, Button, Container } from "../atom";

export const HomeHead = () => {
  return (
    <Box px="0.5rem">
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        backgroundColor="black"
        pt={7}
        pb={5}
        overflow="hidden"
        borderBottomRightRadius="var(--border-radius-xlarge)"
        borderBottomLeftRadius="var(--border-radius-xlarge)"
        // background="linear-gradient(black, #0c1a46)"
      >
        <Container>
          <MainText>
            UI/UX 디자이너이자 Front-End 개발자, <br />
            SNAX의 블로그입니다.
          </MainText>
          <Button color="primary" size="large">
            더보기
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

const MainText = styled.h1`
  position: relative;
  z-index: 1;
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2.5rem;
`;
