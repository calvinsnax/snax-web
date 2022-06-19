/**
 * External imports
 */
import reset from "styled-reset";
import { mix, rgba } from "polished";
import { createGlobalStyle, css } from "styled-components";

/**
 * Internal imports
 */
import {
  containerWidth,
  colorBrand,
  fontFamily,
  colorGrey,
  headerHeight,
  headerSafeArea,
  articleWidth,
} from "./theme";

const StyledCss = css`
  :host,
  :root {
    --header-safe-area: ${headerSafeArea}px;
    --header-height: ${headerHeight}px;
    --nav-height: 58px;

    --container-width: ${containerWidth}px;
    --article-width: ${articleWidth}px;
    --spacing-base: 1.5rem;

    --border-radius-basic: 0.875rem;

    --color-primary-50: ${mix(0.95, "#ffffff", colorBrand)};
    --color-primary-100: ${mix(0.9, "#ffffff", colorBrand)};
    --color-primary-200: ${mix(0.5, "#ffffff", colorBrand)};
    --color-primary-300: ${mix(0.1, "#ffffff", colorBrand)};
    --color-primary-400: ${colorBrand};
    --color-primary-500: ${mix(0.1, "#000000", colorBrand)};
    --color-primary-600: ${mix(0.2, "#000000", colorBrand)};
    --color-primary-700: ${mix(0.3, "#000000", colorBrand)};
    --color-primary-800: ${mix(0.4, "#000000", colorBrand)};
    --color-primary-900: ${mix(0.5, "#000000", colorBrand)};

    --color-grey-50: ${colorGrey[50]};
    --color-grey-100: ${colorGrey[100]};
    --color-grey-200: ${colorGrey[200]};
    --color-grey-300: ${colorGrey[300]};
    --color-grey-400: ${colorGrey[400]};
    --color-grey-500: ${colorGrey[500]};
    --color-grey-600: ${colorGrey[600]};
    --color-grey-700: ${colorGrey[700]};
    --color-grey-800: ${colorGrey[800]};
    --color-grey-900: ${colorGrey[900]};

    --color-opacity-50: ${rgba(colorGrey[900], 0.02)};
    --color-opacity-100: ${rgba(colorGrey[900], 0.05)};
    --color-opacity-200: ${rgba(colorGrey[900], 0.1)};
    --color-opacity-300: ${rgba(colorGrey[900], 0.2)};
    --color-opacity-400: ${rgba(colorGrey[900], 0.3)};
    --color-opacity-500: ${rgba(colorGrey[900], 0.4)};
    --color-opacity-600: ${rgba(colorGrey[900], 0.6)};
    --color-opacity-700: ${rgba(colorGrey[900], 0.7)};
    --color-opacity-800: ${rgba(colorGrey[900], 0.8)};
    --color-opacity-900: ${rgba(colorGrey[900], 0.9)};

    --color-background: #ffffff;
    --color-grey-background: ${colorGrey[100]};
    --color-layered-background: #ffffff;
    --color-float-background: #ffffff;

    --spacing-50: 2px;
    --spacing-100: 4px;
    --spacing-300: 8px;
    --spacing-400: 16px;
    --spacing-500: 20px;
    --spacing-600: 24px;
    --spacing-700: 28px;
    --spacing-800: 30px;
    --spacing-900: 32px;
    --spacing-1000: 40px;
    --spacing-1100: 44px;
    --spacing-1200: 48px;
    --spacing-1300: 52px;
    --spacing-1400: 56px;
  }

  body {
    background: var(--color-background);
  }

  html,
  body {
    color: var(--color-grey-900);
    font-family: ${fontFamily};
    font-size: 16px;
    line-height: 1.2;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;

export const GlobalStyles = createGlobalStyle`
  ${reset}
  ${StyledCss}
`;

export default GlobalStyles;
