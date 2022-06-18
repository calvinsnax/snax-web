import React from "react";
import { graphql, PageProps } from "gatsby";

type DataType = {
  allMarkdownRemark: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        slug: string;
        date: string;
      };
    }[];
  };
};

const ListPage = (props: PageProps<DataType>) => {
  const { data } = props;
  const { allMarkdownRemark } = data;

  return (
    <main>
      <title>list</title>

      <ul>
        {allMarkdownRemark.nodes.map((post) => (
          <li key={post.id}>{post.frontmatter.title}</li>
        ))}
      </ul>
    </main>
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
        }
      }
    }
  }
`;

export default ListPage;
