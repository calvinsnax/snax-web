import React from "react";

import { Container, Seo } from "../components/atom";
import { Layout } from "../components/base";

export default function About() {
  return (
    <Seo title="소개">
      <Layout>
        <Container>
          <h1>안녕</h1>
        </Container>
      </Layout>
    </Seo>
  );
}
