import React from "react";
import styled from "styled-components";

import { Box, Button, Container } from "../atom";
import { AiFillGithub } from "react-icons/ai";
import { IoArrowForwardSharp } from "react-icons/io5";
import { mobileBreakpoint } from "../../lib/styles";
import { Link } from "gatsby";

export const HomeHead = () => {
  return (
    <Box>
      <Box
        position="relative"
        mt="calc(var(--header-safe-area) * -1)"
        display="flex"
        alignItems="center"
        // backgroundColor="var(--color-grey-100)"
        pt={["7rem", "10rem"]}
        pb={["1rem", "4rem"]}
        overflow="hidden"
        // borderBottomRightRadius="var(--border-radius-xlarge)"
        // borderBottomLeftRadius="var(--border-radius-xlarge)"
      >
        <Container>
          <MainText>
            <Box color="var(--color-grey-500)">
              DESIGNER, <br />
              DEVELOPLER를 넘어,
            </Box>
            {/* <br /> */}
            CREATOR를 넘보다
            <Box as="span" color="var(--color-primary-400)">
              .
            </Box>
          </MainText>
          <Box display="flex">
            <Button
              as="a"
              href="https://github.com/calvinsnax"
              target="_blank"
              color="black"
              size="large"
              style={{
                marginRight: "0.75rem",
              }}
            >
              <AiFillGithub
                style={{
                  marginRight: "0.5rem",
                }}
              />
              <span>Github</span>
            </Button>
            <Button as={Link} to="/about" color="grey" size="large">
              <span>소개</span>
              <IoArrowForwardSharp
                style={{
                  marginLeft: "0.5rem",
                }}
              />
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const MainText = styled.h1`
  position: relative;
  z-index: 1;
  /* color: white; */
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2.5rem;

  @media (max-width: ${mobileBreakpoint}) {
    font-size: 2rem;
    line-height: 1.3;
  }
`;
