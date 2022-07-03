/**
 * External imports
 */
import React from "react";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql, PageProps } from "gatsby";
import { rgba } from "polished";

/**
 * Internal imports
 */
import { Layout } from "../../components/base";
import { colorGrey } from "../../lib/styles/styles";
import { Box, Container } from "../../components/atom";
import { PostArticle } from "../../components/post";

export default function BlogPost(
  props: PageProps<Queries.getMdxPostByIdQueryQuery>
) {
  const { data } = props;
  const { mdx } = data;

  return (
    <Layout pageTitle={mdx?.frontmatter?.title} overlay>
      <article>
        <CoverArea>
          <img
            src={mdx?.frontmatter?.featuredImage?.publicURL ?? ""}
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
                  color={
                    mdx?.frontmatter?.categoryTextColor ||
                    "var(--color-grey-600)"
                  }
                  fontSize={3}
                  fontWeight={700}
                  mb={3}
                  background={
                    mdx?.frontmatter?.categoryBackgroundColor || "white"
                  }
                  borderRadius="2rem"
                >
                  {mdx?.frontmatter?.category}
                </Box>
                <Box as="h1" fontSize={6} fontWeight={700} mb={4}>
                  {mdx?.frontmatter?.title}
                </Box>
                <Box as="time" opacity={0.5}>
                  {mdx?.frontmatter?.date}
                </Box>
              </Box>
            </Container>
          </Box>
        </CoverArea>

        <Container isArticle>
          <PostArticle>
            <MDXRenderer>{data.mdx?.body.toString() ?? ""}</MDXRenderer>
          </PostArticle>
        </Container>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query getMdxPostByIdQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(locale: "ko", formatString: "YYYY.MM.DD")
        slug
        title
        category
        categoryTextColor
        categoryBackgroundColor
        featuredImage {
          publicURL
          name
        }
      }
      body
    }
  }
`;

const CoverArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

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

const ContentArea = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;

  font-size: 1.125rem;
  line-height: 1.75;
  word-break: keep-all;

  h1,
  h2,
  h3,
  h4 {
    font-weight: 700;
    margin-bottom: 1em;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.25rem;
  }

  p {
    margin-bottom: 2rem;
  }
`;
