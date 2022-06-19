/**
 * External imports
 */
import React from "react";
import { graphql, PageProps } from "gatsby";

/**
 * Internal imports
 */
import { Layout } from "../components/base";
import { Box, Container } from "../components/atom";
import { IContent } from "../lib/types/contentTypes";
import styled from "styled-components";
import { rgba } from "polished";
import { colorGrey } from "../lib/styles/styles";

type DataType = {
  markdownRemark: {
    frontmatter: IContent;
    html: string;
  };
};

const Template = (props: PageProps<DataType>) => {
  const { data } = props;
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout pageTitle={frontmatter.title} overlay>
      <article>
        <CoverArea>
          <img
            src={frontmatter.featuredImage.publicURL}
            alt={frontmatter.featuredImage.name}
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
                color="var(--color-grey-500)"
                fontSize={3}
                fontWeight={700}
                mb={3}
                background={rgba("white", 1)}
                borderRadius="2rem"
              >
                {frontmatter.category}
              </Box>
              <Box as="h1" fontSize={6} fontWeight={700} mb={4}>
                {frontmatter.title}
              </Box>
              <Box as="time" opacity={0.5}>
                {frontmatter.date}
              </Box>
            </Box>
          </Box>
        </CoverArea>

        <Container>
          <ContentArea
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </article>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(locale: "ko", formatString: "YYYY.MM.DD")
        slug
        title
        category
        featuredImage {
          publicURL
          name
        }
      }
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

export default Template;
