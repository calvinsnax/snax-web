/**
 * External imports
 */
import React from "react";
import { graphql, PageProps } from "gatsby";

/**
 * Internal imports
 */
import { Layout } from "../../components/base";
import { Article } from "../../components/article";
import { Seo } from "../../components/atom";

export default function BlogPost(
  props: PageProps<Queries.getMdxPostByIdQueryQuery>
) {
  const { data } = props;
  const { mdx } = data;

  return (
    <Seo
      title={mdx?.frontmatter?.title}
      image={mdx?.frontmatter?.featuredImage?.publicURL}
      description={mdx?.frontmatter?.description}
    >
      <Layout $overlay={mdx?.frontmatter?.type !== "blank"}>
        <Article data={data} />
      </Layout>
    </Seo>
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
        description
        featuredImage {
          publicURL
          name
        }
      }
      body
    }
  }
`;
