import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { Container } from "../atom";
import { ArticleContent } from "./ArticleContent";
import { ArticleHeading } from "./ArticleHeading";

interface Props {
  data: Queries.getMdxPostByIdQueryQuery;
}
export const Article = (props: Props) => {
  const { data } = props;

  return (
    <article>
      <ArticleHeading data={data} />
      <section>
        <Container isArticle>
          <ArticleContent>
            <MDXRenderer>{data.mdx?.body.toString() ?? ""}</MDXRenderer>
          </ArticleContent>
        </Container>
      </section>
    </article>
  );
};
