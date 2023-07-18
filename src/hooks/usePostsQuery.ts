import { graphql, useStaticQuery } from "gatsby";

export const usePostsQuery = () => {
  const { allMdx } = useStaticQuery<Queries.getPostsQuery>(graphql`
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
