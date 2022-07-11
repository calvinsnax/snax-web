/**
 * External imports
 */
import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql, PageProps } from "gatsby";

/**
 * Internal imports
 */
import { Layout } from "../../components/base";
import { Container } from "../../components/atom";
import { PostArticle } from "../../components/post";
import { PostCover } from "../../components/post/PostCover";

export default function BlogPost(
  props: PageProps<Queries.getMdxPostByIdQueryQuery>
) {
  const { data } = props;
  const { mdx } = data;

  return (
    <Layout pageTitle={mdx?.frontmatter?.title} $overlay>
      <article>
        <PostCover data={data} />
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
        color
        type
        featuredImage {
          publicURL
          name
        }
      }
      body
    }
  }
`;
