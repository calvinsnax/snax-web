/**
 * External imports
 */
import React, { createContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

/**
 * Internal imports
 */
import { Box, Container } from "../atom";
import { rgba } from "polished";
import { headerDepth } from "../../lib/styles/styles";

export const HeaderContext = createContext({
  isScrolled: false,
});

export interface HeaderProps {
  overlay?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { overlay } = props;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop <= 16) {
      setIsScrolled(false);
      return;
    }

    setIsScrolled(true);
  };

  const memorizedContextValue = useMemo(() => {
    return { isScrolled };
  }, [isScrolled]);

  return (
    <HeaderContext.Provider value={memorizedContextValue}>
      <StyledHeader overlay={overlay} isScrolled={isScrolled}>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <LogoArea to="/">
              <Box fontSize="1.5rem" fontWeight={800} fontStyle="italic">
                SNAX
              </Box>
            </LogoArea>

            <Box display="flex" alignItems="center" height="100%">
              <Nav>
                <ul>
                  <li>
                    <Link to="/cow_and_dog">소개</Link>
                  </li>
                  <li>
                    <Link to="/blog">둘러보기</Link>
                  </li>
                </ul>
              </Nav>
            </Box>
          </Box>
        </Container>
      </StyledHeader>
    </HeaderContext.Provider>
  );
};

interface CommonStyledProps extends HeaderProps {
  isScrolled?: boolean;
}

const StyledHeader = styled.header<CommonStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${headerDepth};

  display: flex;
  align-items: stretch;
  width: 100%;
  height: var(--header-safe-area);

  background-color: ${rgba("white", 0.9)};
  backdrop-filter: blur(18px);

  transition: all 0.2s ease;

  ${({ overlay, isScrolled }) => {
    if (!overlay) return null;
    if (isScrolled) return null;
    return `
          --header-text-color: white;
          color: var(--header-text-color);
          background: rgba(0, 0, 0, 0);
          backdrop-filter: none;
          box-shadow: none;
        `;
  }}

  ${({ isScrolled }) => {
    if (!isScrolled) return null;

    return `
      position: fixed;
      top: 0;
      left: 0;
      height: var(--header-height);
      box-shadow: var(--color-opacity-100) 0 1px;
    `;
  }}
`;

const LogoArea = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 3rem;

  color: var(--header-text-color);
  text-decoration: none;
`;

const Nav = styled.div`
  & > ul {
    display: flex;
    align-items: center;

    & > li {
      &:not(:last-child) {
        margin-right: 2rem;
      }

      & > a {
        display: block;
        color: var(--header-text-color);
        font-size: 1rem;
        font-weight: 700;
        text-decoration: none;
      }
    }
  }
`;
