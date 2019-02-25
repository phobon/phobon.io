import React, { useEffect } from 'react';
import { Grid, useAccent } from 'base';

export default ({ children, ...props }) => {
  const [accent, setAccent] = useAccent();

  useEffect(() => {
    const accents = ['reds', 'blues', 'purples', 'greens', 'oranges'];
    setAccent(accents[Math.floor(Math.random() * accents.length)]);
  }, []);

  return (
    <Grid
      fullHeight
      fullWidth
      gridTemplateRows="auto 1fr auto"
      gridTemplateColumns="1fr"
      alignItems="flex-start"
      bg="background">
      {children}
    </Grid>
  );
};