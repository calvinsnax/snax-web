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
              description
              date(locale: "ko", formatString: "YYYY.MM.DD")
              featuredImage {
                childImageSharp {
                  gatsbyImageData(width: 400, placeholder: BLURRED)
                }
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
