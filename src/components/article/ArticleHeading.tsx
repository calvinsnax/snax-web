/**
 * External imports
 */
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";

/**
 * Internal imports
 */
import { colorGrey, mobileBreakpoint } from "../../lib/styles";
import { Box, Container } from "../atom";

interface ArticleHeadingProps {
  data: Queries.getMdxPostByIdQueryQuery;
}

export const ArticleHeading = (props: ArticleHeadingProps) => {
  const {
    data: { mdx },
  } = props;

  const renderThumbnail = useMemo(() => {
    if (mdx?.frontmatter?.type === "blank") return null;
    if (!mdx?.frontmatter?.featuredImage?.publicURL) return null;
    return (
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        <ThumbnailImage
          src={mdx?.frontmatter?.featuredImage?.publicURL}
          alt={mdx?.frontmatter?.featuredImage?.name}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          background={rgba("black", 0.2)}
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
      </Box>
    );
  }, [
    mdx?.frontmatter?.featuredImage?.publicURL,
    mdx?.frontmatter?.featuredImage?.name,
  ]);

  return (
    <CoverArea
      $type={mdx?.frontmatter?.type as any}
      backgroundColor={mdx?.frontmatter?.color ?? "black"}
    >
      {renderThumbnail}

      <TextArea>
        <Container
          isArticle
          style={{
            maxWidth: "640px",
          }}
        >
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
            <Heading>{mdx?.frontmatter?.title}</Heading>
            <Box as="time" opacity={0.5}>
              {mdx?.frontmatter?.date}
            </Box>
          </Box>
        </Container>
      </TextArea>
    </CoverArea>
  );
};

interface commonStyleProps {
  $type?: "blank" | null;
  backgroundColor?: string;
}

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TextArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding-bottom: 4rem;

  @media (max-width: ${mobileBreakpoint}) {
    padding-bottom: 2rem;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  word-break: keep-all;

  @media (max-width: ${mobileBreakpoint}) {
    font-size: 1.5rem;
  }
`;

const blankTypeStyle = css`
  height: auto;
  margin-top: var(--header-safe-area);
  padding-top: 2rem;
  padding-bottom: 2rem;

  color: var(--color-grey-900);
  background-color: var(--color-background);

  h1 {
    color: var(--color-grey-900);
    font-size: 2.5rem;
  }

  ${TextArea} {
    position: relative;
  }
`;

const CoverArea = styled.div<commonStyleProps>`
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  color: white;

  @media (max-width: ${mobileBreakpoint}) {
    padding-top: 3rem;
    height: 300px;
  }

  ${({ backgroundColor }) =>
    !!backgroundColor &&
    `
    background-color: ${backgroundColor};
  `}

  ${({ $type }) => {
    if (!$type) return null;
    if ($type === "blank") return blankTypeStyle;
    return null;
  }}
`;
