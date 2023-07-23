import React from "react";
import { PageProps, graphql } from "gatsby";

import { Layout } from "../components/base";
import { PostList } from "../components/post";
import { HomeHead } from "../components/home";
import { Seo } from "../components/atom";

const IndexPage = (props: PageProps<Queries.getPostsQuery>) => {
  const { data } = props;
  const posts = data.allMdx.edges;

  return (
    <Seo>
      <Layout>
        <HomeHead />
        <PostList posts={posts} />
      </Layout>
    </Seo>
  );
};

export const pageQuery = graphql`
  query getPosts {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { slug: { ne: "about/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            category
            color
            description
            date(locale: "ko", formatString: "YYYY.MM.DD")
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 400, placeholder: BLURRED, quality: 100)
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
