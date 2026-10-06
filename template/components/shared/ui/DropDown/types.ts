import { RefObject } from "react";
import { ViewStyle, StyleProp, View } from "react-native";
import { InputSize } from "../Input/types";

export interface SelectionItem {
  label: string;
  value: string | number;
}

export type DropDownValue = string | number | (string | number)[];

export interface DropDownProps {
  data: SelectionItem[];
  onChange: (e: DropDownValue | null | undefined) => void;
  inputValue: DropDownValue;
  InputLabel?: string;
  InputPlaceholder?: string;
  error?: string;
  containerStyle?: ViewStyle;
  customInputStyle?: ViewStyle;
  isLoading?: boolean;
  arrowPosition?: "prefix" | "suffix";
  emptyPlaceholder?: string;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  disabled?: boolean;
  isMulti?: boolean;
  isRadio?: boolean;
  containerHeight?: number;
  coloredSelected?: boolean;
  dropDownSize?: InputSize;
  modalOptionsCustomStyle?: StyleProp<ViewStyle>;
  customRef?: RefObject<View | null>;
}

export type DropdownPosition = {
  top: number;
  start?: number;
  end?: number;
  width: number;
};
