/**
 * External imports
 */
import React, { createContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { AiFillGithub } from "react-icons/ai";

/**
 * Internal imports
 */
import { Box, Container, Logo } from "../atom";
import { headerDepth, mobileBreakpoint } from "../../lib/styles";

export const HeaderContext = createContext({
  isScrolled: false,
});

export interface HeaderProps {
  $overlay?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { $overlay } = props;

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
      <StyledHeader $overlay={$overlay} $isScrolled={isScrolled}>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <LogoArea $overlay={$overlay} $isScrolled={isScrolled} to="/">
              <Logo />
            </LogoArea>

            <Box display="flex" alignItems="center" height="100%">
              <Nav>
                <ul>
                  <li>
                    <Link to="/about">소개</Link>
                  </li>
                  <li>
                    <a href="https://github.com/calvinsnax" target="_blank">
                      <AiFillGithub fontSize="1.25rem" />
                    </a>
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
  $isScrolled?: boolean;
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

  background-color: rgba(255 255 255 / 90%);
  backdrop-filter: blur(18px);
  /* box-shadow: var(--color-opacity-200) 0 1px; */

  --header-text-color: var(--color-grey-600);

  transition: all 0.2s ease;

  ${({ $overlay, $isScrolled }) => {
    if (!$overlay) return null;
    if ($isScrolled) return null;
    return `
          --header-text-color: white;
          color: var(--header-text-color);
          background: rgba(0, 0, 0, 0);
          backdrop-filter: none;
          box-shadow: none;
        `;
  }}

  ${({ $isScrolled }) => {
    if (!$isScrolled) return null;

    return `
      position: fixed;
      top: 0;
      left: 0;
      height: var(--header-height);
      box-shadow: var(--color-opacity-200) 0 1px;
    `;
  }}
`;

const LogoArea = styled(Link)<CommonStyledProps>`
  display: flex;
  align-items: center;
  margin-right: 3rem;

  color: var(--color-gray-800);
  text-decoration: none;

  & > svg {
    width: auto;
    height: 1.125rem;

    @media (max-width: ${mobileBreakpoint}) {
      height: 1rem;
    }
  }
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

        transition: 0.2s ease;

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;
