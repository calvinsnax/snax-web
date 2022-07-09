import { graphql, useStaticQuery } from "gatsby";

export const useBlog = () => {
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
              categoryTextColor
              categoryBackgroundColor
              backgroundColor
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
