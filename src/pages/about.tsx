import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { Container, Seo } from "../components/atom";
import { Layout } from "../components/base";
import { PageProps, graphql } from "gatsby";
import { ArticleContent } from "../components/article/ArticleContent";
import { ArticleComment } from "../components/article/ArticleComment";

export default function About(props: PageProps<Queries.getAboutQuery>) {
  const { data, location } = props;
  const { mdx } = data;
  return (
    <Seo
      title="소개"
      description="안녕하세요. 프론트엔드 개발자 SNAX입니다. 저는 자동차와 여행을 좋아하고, 음악을 사랑해요. 제 관심사와 커리어에 대한 이야기를 하기 위해서 블로그를 만들었어요."
      pathname={location.pathname}
    >
      <Layout>
        <Container>
          <ArticleContent>
            <MDXRenderer>{data.mdx?.body.toString() ?? ""}</MDXRenderer>
          </ArticleContent>
          <ArticleComment />
        </Container>
      </Layout>
    </Seo>
  );
}

export const pageQuery = graphql`
  query getAbout {
    mdx(slug: { eq: "about/" }) {
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
`;
