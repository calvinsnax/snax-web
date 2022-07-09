/**
 * External imports
 */
import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

/**
 * Internal imports
 */
import { colorGrey } from "../../lib/styles/styles";
import { Box, Container } from "../../components/atom";

interface PostCoverProps {
  data: Queries.getMdxPostByIdQueryQuery;
}

export const PostCover = (props: PostCoverProps) => {
  const {
    data: { mdx },
  } = props;

  return (
    <CoverArea backgroundColor={mdx?.frontmatter?.color ?? "black"}>
      {!!mdx?.frontmatter?.featuredImage?.publicURL && (
        <>
          <img
            src={mdx?.frontmatter?.featuredImage?.publicURL}
            alt={mdx?.frontmatter?.featuredImage?.name}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100px"
            background={`linear-gradient(180deg, ${rgba(
              colorGrey[900],
              0.2
            )}, transparent)`}
          />
        </>
      )}

      <Box
        position="absolute"
        top={0}
        left={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        color="white"
        background={rgba("black", 0.2)}
      >
        <Container isArticle>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Box
              as="p"
              display="inline-flex"
              p="0.5rem 1rem"
              color={mdx?.frontmatter?.color || "var(--color-grey-900)"}
              fontSize={3}
              fontWeight={700}
              mb={3}
              background="white"
              borderRadius="2rem"
            >
              {mdx?.frontmatter?.category}
            </Box>
            <Box
              as="h1"
              fontSize={6}
              fontWeight={700}
              mb={4}
              wordBreak="keep-all"
            >
              {mdx?.frontmatter?.title}
            </Box>
            <Box as="time" opacity={0.5}>
              {mdx?.frontmatter?.date}
            </Box>
          </Box>
        </Container>
      </Box>
    </CoverArea>
  );
};

const CoverArea = styled.div<{ backgroundColor?: string }>`
  position: relative;
  width: 100vw;
  height: 80vh;
  overflow: hidden;

  ${({ backgroundColor }) =>
    !!backgroundColor &&
    `
    background-color: ${backgroundColor};
  `}

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
