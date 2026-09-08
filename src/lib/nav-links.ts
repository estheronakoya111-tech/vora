export type NavLinkItem = {
  name: string;
  href: string;
};

export const primaryLinks: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Reservation", href: "/reservation" },
];

export const moreLinks: NavLinkItem[] = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Used by the mobile sidebar, which shows everything in one flat list
export const allNavLinks: NavLinkItem[] = [...primaryLinks, ...moreLinks];