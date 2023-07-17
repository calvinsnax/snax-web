import React, { createRef, useEffect } from "react";
import styled from "styled-components";

export const ArticleComment = () => {
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (containerRef?.current?.children.length) return;
    const utterances = document.createElement("script");
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo: "calvinsnax/snax-web",
      "issue-term": "title",
      label: "comment",
      theme: "github-light",
      crossOrigin: "anonymous",
      async: "true",
    };
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    containerRef?.current?.appendChild(utterances);
  }, []);

  return <Comment ref={containerRef} id="comment" className="utterances" />;
};

const Comment = styled.div`
  padding-bottom: 3rem;
`;
