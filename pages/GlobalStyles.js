import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* latin-ext */
  @font-face {
    font-family: 'Karla';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v7/qkBbXvYC6trAT7RbLtyU5rZPoAU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Karla';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v7/qkBbXvYC6trAT7RVLtyU5rZP.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nFrXyw023e1Ik.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* hebrew */
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nDrXyw023e1Ik.woff2) format('woff2');
    unicode-range: U+0590-05FF, U+20AA, U+25CC, U+FB1D-FB4F;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nPrXyw023e1Ik.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nBrXyw023e.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  :root, body {
    width: 100%;
    overflow-x: hidden;

    margin: 0;
    padding: 0;

    font-size: 8px;
    background-color: var(--c-background, hsl(0, 0%, 100%));
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.43;
  }

  *, ::before, ::after {
    box-sizing: border-box;
  }

  a,
  a:hover,
  a:visited {
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  code,
  kbd {
    font-family: "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Courier, monospace;
  }

  template {
    display: none;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }

  html,
  body,
  p,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  dl,
  img,
  pre,
  form,
  fieldset {
  }

  img,
  fieldset {
    border: 0;
  }

  figure {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  #__next {
    width: 100%;
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
  }

  body {
    font-family: 'Karla', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Rubik', sans-serif;
  }
`;

export default GlobalStyles;