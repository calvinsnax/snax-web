import styled, { AnyStyledComponent, css } from "styled-components";

export interface ButtonFrameProps {
  size?: "small" | "medium" | "large" | "xlarge";
  round?: boolean;
  expand?: boolean;
}

interface Props extends ButtonFrameProps {
  defaultStyle?: AnyStyledComponent;
  hoverStyle?: AnyStyledComponent;
  activeStyle?: AnyStyledComponent;
}

const ButtonRounded = css`
  border-radius: 500px;
`;
const ButtonExpanded = css`
  width: 100%;
`;

const ButtonSizeXlarge = css`
  font-size: 1.125rem;
  height: 58px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 1rem;
`;
const ButtonSizeLarge = css`
  font-size: 1rem;
  height: 3rem;
  padding-left: 1.375rem;
  padding-right: 1.375rem;
  border-radius: 1rem;
`;
const ButtonSizeMedium = css``;
const ButtonSizeSmall = css`
  font-size: 0.875rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  height: 2rem;
`;

export const ButtonFrame = styled.button<Props>`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: 2.25rem;
  padding: 0 1rem;

  color: var(--color-grey-700);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;

  border-radius: 6px;
  border: 1px solid var(--color-grey-100);
  background: var(--color-grey-100);

  appearance: none;
  outline: none;

  transition: 0.2s ease;

  ${({ defaultStyle }) => defaultStyle ?? null}

  &:hover {
    ${({ hoverStyle }) => hoverStyle ?? null}
  }
  &:active {
    ${({ activeStyle }) => activeStyle ?? null}
  }

  ${({ size }) => {
    switch (size) {
      case "xlarge":
        return ButtonSizeXlarge;
      case "large":
        return ButtonSizeLarge;
      case "small":
        return ButtonSizeSmall;
      default:
        return ButtonSizeMedium;
    }
  }}

  ${({ round }) => (round ? ButtonRounded : null)}
  ${({ expand }) => (expand ? ButtonExpanded : null)}
`;

ButtonFrame.defaultProps = {
  size: "medium",
  round: false,
  expand: false,
};
