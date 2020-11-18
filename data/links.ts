export interface INavigationLink {
  id: string;
  href: string;
  label: string;
}

export const navigationLinks: INavigationLink[] = [
  { id: "navlink__home", href: "/", label: "Home" },
  { id: "navlink__writing", href: "/writing", label: "Writing" },
  { id: "navlink__about", href: "/about", label: "About" },
];

export const socialLinks: INavigationLink[] = [
  {
    id: "social__dribbble",
    label: "Dribbble",
    href: "https://dribbble.com/phobon",
  },
  { id: "social__github", label: "Github", href: "https://github.com/phobon" },
  {
    id: "social__instagram",
    label: "Instagram",
    href: "http://instagram.com/thenoumenon",
  },
  {
    id: "social__linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ben-mccormick-a373304/",
  },
  {
    id: "social__twitter",
    label: "Twitter",
    href: "https://twitter.com/thenoumenon",
  },
];
