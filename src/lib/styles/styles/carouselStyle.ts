import { css } from "styled-components";

export const carouselUl = css`
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: "";
    padding-right: 0.02px;
  }
`;
