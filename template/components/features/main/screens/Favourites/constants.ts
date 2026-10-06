import { iconsColorType, iconsListType } from "@/@types/mainTypes";

export type FavouriteCategory = "places" | "products" | "articles";
export type FavouriteTone = "action" | "success" | "danger" | "neutral";

export interface FavouriteItem {
  id: number;
  /** Translation keys */
  title: string;
  subtitle: string;
  category: FavouriteCategory;
  icon: iconsListType;
  tone: FavouriteTone;
  isFavourite: boolean;
}

export const FAVOURITE_FILTERS: { key: FavouriteCategory | "all"; label: string }[] = [
  { key: "all", label: "favAll" },
  { key: "places", label: "favPlaces" },
  { key: "products", label: "favProducts" },
  { key: "articles", label: "favArticles" },
];

export const TONE_ICON_COLORS: Record<FavouriteTone, iconsColorType> = {
  action: "action",
  success: "success",
  danger: "danger",
  neutral: "secondary",
};

// Dummy data for demonstrating favourite cards in the template
export const DUMMY_FAVOURITES: FavouriteItem[] = [
  { id: 1, title: "fav1Title", subtitle: "fav1Subtitle", category: "places", icon: "mapPin", tone: "action", isFavourite: true },
  { id: 2, title: "fav2Title", subtitle: "fav2Subtitle", category: "products", icon: "zap", tone: "success", isFavourite: true },
  { id: 3, title: "fav3Title", subtitle: "fav3Subtitle", category: "articles", icon: "code", tone: "neutral", isFavourite: true },
  { id: 4, title: "fav4Title", subtitle: "fav4Subtitle", category: "places", icon: "globe", tone: "danger", isFavourite: true },
  { id: 5, title: "fav5Title", subtitle: "fav5Subtitle", category: "products", icon: "layers", tone: "action", isFavourite: true },
  { id: 6, title: "fav6Title", subtitle: "fav6Subtitle", category: "articles", icon: "star", tone: "success", isFavourite: true },
];
