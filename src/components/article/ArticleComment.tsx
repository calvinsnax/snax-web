import React, { createRef, useEffect } from "react";
import styled from "styled-components";
import Giscus from "@giscus/react";

export const ArticleComment = () => {
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    // if (containerRef?.current?.children.length) return;
    const giscus = document.createElement("script");
    const attributes = {
      src: "https://giscus.app/client.js",
      "data-repo": "calvinsnax/snax-web",
      "data-repo-id": "R_kgDOHhdy4Q",
      "data-category": "Announcements",
      "data-category-id": "DIC_kwDOHhdy4c4CX9fd",
      "data-mapping": "title",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "light",
      "data-lang": "ko",
      crossOrigin: "anonymous",
      async: "true",
    };
    Object.entries(attributes).forEach(([key, value]) => {
      giscus.setAttribute(key, value);
    });
    containerRef?.current?.appendChild(giscus);
  }, []);

  return <Comment ref={containerRef} id="comment" className="giscus" />;
  // return (
  //   <Comment>
  //     <Giscus
  //       id="comments"
  //       repo="calvinsnax/snax-web"
  //       repoId="R_kgDOHhdy4Q"
  //       category="Announcements"
  //       categoryId="DIC_kwDOHhdy4c4CX9fd"
  //       mapping="title"
  //       strict="0"
  //       reactionsEnabled="1"
  //       emitMetadata="0"
  //       inputPosition="top"
  //       theme="light"
  //       lang="ko"
  //     />
  //   </Comment>
  // );
};

const Comment = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;
