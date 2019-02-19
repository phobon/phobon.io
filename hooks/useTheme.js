import React, { useState, useEffect } from 'react';
import { theme } from 'base';

const grayscale =  [...theme.colors.grayscale];
const reverseGrayscale = [...grayscale];
reverseGrayscale.reverse();

const getTheme = (type) => {
  const themeDefinitions = {
    light: {
      foreground: grayscale[0],
      background: theme.colors.white,
      grayscale: [...grayscale],
    },
    dark: {
      foreground: theme.colors.white,
      background: 'hsl(228, 34%, 9%)',
      grayscale: reverseGrayscale,
    },
  };

  return themeDefinitions[type];
};

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => void requestAnimationFrame(() => {
    const root = document.querySelector(':root');
    const newTheme = getTheme(theme, root);

    root.style.setProperty('--c-foreground', newTheme.foreground);
    root.style.setProperty('--c-background', newTheme.background);
    newTheme.grayscale.forEach((c, i) => {
      root.style.setProperty(`--c-grayscale-${i}`, c);
    });
  }, [theme]));

  return [theme, setTheme];
};

export default useTheme;