import React from "react";
import styled from "styled-components";

import { Box, Button, Container } from "../atom";

export const HomeHead = () => {
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      backgroundColor="black"
      pt={7}
      overflow="hidden"
      borderBottomRightRadius="var(--border-radius-xlarge)"
      borderBottomLeftRadius="var(--border-radius-xlarge)"
    >
      <Container>
        <MainText>
          디자인과 개발 역량. <br />한 번에.
        </MainText>
        <Button color="primary" size="large">
          더보기
        </Button>
      </Container>
    </Box>
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
