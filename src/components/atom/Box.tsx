import { CSSProperties } from "react";
import styled from "styled-components";
import {
  compose,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  shadow,
  ShadowProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  color,
  ColorProps,
} from "styled-system";

type Props = PositionProps &
  SpaceProps &
  TypographyProps &
  BackgroundProps &
  ShadowProps &
  BorderProps &
  FlexboxProps &
  LayoutProps &
  ColorProps &
  Pick<CSSProperties, "wordBreak">;

export const Box = styled.div<Props>`
  ${compose(
    position,
    space,
    typography,
    shadow,
    background,
    border,
    flexbox,
    layout,
    color
  )}

  ${({ wordBreak }) => !!wordBreak && `word-break: ${wordBreak};`}
`;
