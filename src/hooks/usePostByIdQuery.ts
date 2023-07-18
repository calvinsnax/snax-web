import { graphql, useStaticQuery } from "gatsby";

export const usePostByIdQuery = () => {
  return useStaticQuery<Queries.getPostByIdQuery>(graphql`
    query getPostById($id: String) {
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
  `);
};
