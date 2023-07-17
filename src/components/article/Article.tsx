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
    <>
      <article>
        <ArticleHeading data={data} />
        <section>
          <Container isArticle>
            <ArticleContent>
              <MDXRenderer>{data.mdx?.body.toString() ?? ""}</MDXRenderer>
            </ArticleContent>
            <div className="utterances utterances-frame"></div>
            <script
              src="https://utteranc.es/client.js"
              issue-term="pathname"
              async
              {...{
                repo: "calvinsnax/snax-web",
                label: "댓글",
                theme: "github-light",
                crossOrigin: "anonymous",
              }}
            />
          </Container>
        </section>
      </article>
    </>
  );
};
