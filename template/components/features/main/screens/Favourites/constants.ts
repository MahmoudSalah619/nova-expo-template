import { iconsColorType, iconsListType } from "@/@types/mainTypes";

export type FavouriteCategory = "places" | "products" | "articles";
export type FavouriteFilter = FavouriteCategory | "all";

export interface FavouriteItem {
  id: number;
  /** Translation keys */
  title: string;
  caption: string;
  category: FavouriteCategory;
  icon: iconsListType;
}

export const FAVOURITE_FILTERS: { key: FavouriteFilter; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "places", label: "FAVORITES_PLACES" },
  { key: "products", label: "FAVORITES_PRODUCTS" },
  { key: "articles", label: "FAVORITES_ARTICLES" },
];

export const CATEGORY_ICON_COLORS: Record<FavouriteCategory, iconsColorType> = {
  places: "action",
  products: "success",
  articles: "secondary",
};

// Dummy data for demonstrating the favourites list in the template
export const DUMMY_FAVOURITES: FavouriteItem[] = [
  { id: 1, title: "FAVORITE_CAIRO_TOWER", caption: "FAVORITE_CAIRO_TOWER_CAPTION", category: "places", icon: "mapPin" },
  { id: 2, title: "FAVORITE_WIRELESS_CHARGER", caption: "FAVORITE_WIRELESS_CHARGER_CAPTION", category: "products", icon: "zap" },
  { id: 3, title: "FAVORITE_REACT_NATIVE_TIPS", caption: "FAVORITE_REACT_NATIVE_TIPS_CAPTION", category: "articles", icon: "code" },
  { id: 4, title: "FAVORITE_ALEXANDRIA_LIBRARY", caption: "FAVORITE_ALEXANDRIA_LIBRARY_CAPTION", category: "places", icon: "globe" },
  { id: 5, title: "FAVORITE_DESK_ORGANIZER", caption: "FAVORITE_DESK_ORGANIZER_CAPTION", category: "products", icon: "layers" },
  { id: 6, title: "FAVORITE_DESIGN_SYSTEMS", caption: "FAVORITE_DESIGN_SYSTEMS_CAPTION", category: "articles", icon: "star" },
];
