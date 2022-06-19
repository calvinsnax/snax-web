import React from "react";
import styled, { css } from "styled-components";
import { ButtonFrame, ButtonFrameProps } from "./ButtonFrame";

interface Props extends ButtonFrameProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  color?: "primary" | "primary-plain" | "white" | "grey" | "black";
}

const ColorPrimary = css`
  color: white;
  background-color: var(--color-primary-400);
  border-color: var(--color-primary-400);

  &:hover {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-500);
  }
  &:active {
    background-color: var(--color-primary-600);
    border-color: var(--color-primary-600);
  }
`;

const ColorPrimaryPlain = css`
  color: var(--color-primary-400);
`;

const ColorBlack = css`
  color: white;
  background-color: var(--color-grey-900);
  border-color: var(--color-grey-900);

  &:hover {
    background-color: var(--color-grey-800);
    border-color: var(--color-grey-800);
  }
  &:active {
    background-color: var(--color-grey-700);
    border-color: var(--color-grey-700);
  }
`;

const ColorWhite = css`
  color: var(--color-primary-400);
  background-color: white;
  border-color: white;

  &:hover {
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-100);
  }
  &:active {
    background-color: var(--color-grey-200);
    border-color: var(--color-grey-200);
  }
`;

export const Button = styled(ButtonFrame)<Props>`
  ${({ color }) => {
    if (!color) return null;

    switch (color) {
      case "primary":
        return ColorPrimary;
      case "primary-plain":
        return ColorPrimaryPlain;
      case "white":
        return ColorWhite;
      case "black":
        return ColorBlack;

      default:
        return null;
    }
  }}
`;

Button.defaultProps = {
  type: "button",
  color: "grey",
};
