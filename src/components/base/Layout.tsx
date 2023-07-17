/**
 * External imports
 */
import React, { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";

/**
 * Internal imports
 */
import { GlobalStyles } from "../../lib/styles";
import { Header, HeaderProps } from "./Header";
import { Footer } from "./Footer";

export interface LayoutProps extends HeaderProps {
  children: React.ReactNode;
  background?: string;
}

export const Layout = (props: LayoutProps) => {
  const { children, $overlay, background } = props;

  return (
    <LayoutWrap $overlay={$overlay}>
      <GlobalStyles />
      <Header $overlay={$overlay} />

      <Main background={background}>{children}</Main>
      <Footer />
    </LayoutWrap>
  );
};

const LayoutWrap = styled.div<Partial<LayoutProps>>`
  ${({ $overlay }) => {
    if (!$overlay) return `padding-top: var(--header-safe-area);`;
    return null;
  }}
`;

const Main = styled.main<Partial<LayoutProps>>`
  background-color: white;
  ${({ background }) => !!background && `background-color: ${background};`}
`;
