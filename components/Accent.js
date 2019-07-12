import { useEffect } from 'react';
import { useAccent } from '@phobon/base';

const Accent = () => {
  const [accent, setAccent] = useAccent();
  useEffect(() => {
    const accents = ['reds', 'blues', 'purples', 'greens', 'oranges'];
    setAccent(accents[Math.floor(Math.random() * accents.length)]);
  }, []);

  return null;
};

export default Accent;