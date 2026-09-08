import { menuItems, type MenuItem } from "@/data/menu";

export type SearchItem = {
  id: string;
  name: string;
  category: string;
  slug: string;
  price: number;
};

// Auto-generate search index from menuItems
export const searchIndex: SearchItem[] = menuItems.map((dish: MenuItem) => {
  const generatedSlug = dish.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return {
    id: String(dish.id),
    name: dish.name,
    category: dish.category,
    slug: generatedSlug,
    price: dish.price,
  };
});

export function filterSearchIndex(query: string): SearchItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return searchIndex.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
}