export const themeDefinitions = {
  light: {
    foreground: 'hsl(213, 10%, 20%)',
    background: 'hsl(0, 0%, 100%)',
    grayscale: [
      'hsl(213, 10%, 17%)',
      'hsl(213, 10%, 20%)',
      'hsl(215, 9%, 25%)',
      'hsl(214, 8%, 35%)',
      'hsl(216, 6%, 49%)',
      'hsl(217, 7%, 65%)',
      'hsl(220, 9%, 79%)',
      'hsl(216, 10%, 90%)',
      'hsl(240, 7%, 97%)',
      'hsl(240, 5%, 99%)',
    ],
  },
  dark: {
    foreground: 'hsl(220, 62%, 95%)',
    background: 'hsl(221, 20%, 22%)',
    grayscale: [
      'hsl(215, 42%, 91%)',
      'hsl(216, 40%, 88%)',
      'hsl(217, 33%, 81%)',
      'hsl(217, 24%, 72%)',
      'hsl(215, 17%, 60%)',
      'hsl(217, 13%, 47%)',
      'hsl(217, 14%, 36%)',
      'hsl(218, 15%, 28%)',
      'hsl(217, 15%, 24%)',
      'hsl(220, 16%, 22%)',
    ],
  },
}

export const getTheme = (type) => themeDefinitions[type]
