import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { Layout } from "../components/base";
import { Container } from "../components/atom";
import { IContent } from "../lib/types/contentTypes";

type DataType = {
  allMarkdownRemark: {
    nodes: {
      id: string;
      frontmatter: IContent;
    }[];
  };
};

const BlogPage = (props: PageProps<DataType>) => {
  const { data } = props;
  const { allMarkdownRemark } = data;

  return (
    <Layout pageTitle="블로그">
      <Container>
        <ul>
          {allMarkdownRemark.nodes.map((post) => (
            <li key={post.id}>
              <Link to={post.frontmatter.slug}>
                <img
                  src={post.frontmatter.featuredImage.publicURL}
                  alt={post.frontmatter.featuredImage.name}
                />
                <h2>{post.frontmatter.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          slug
          date(locale: "ko", fromNow: false, formatString: "YYYY (dd)")
          featuredImage {
            publicURL
            name
          }
        }
      }
    }
  }
`;

export default BlogPage;
