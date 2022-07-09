import { graphql, useStaticQuery } from "gatsby";

export const usePost = () => {
  const { allMdx } = useStaticQuery<Queries.getPostsQuery>(graphql`
    query getPosts {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              category
              color
              date(locale: "ko", formatString: "YYYY.MM.DD")
              featuredImage {
                publicURL
                name
              }
            }
          }
        }
      }
    }
  `);
  const { edges } = allMdx;

  return edges;
};
