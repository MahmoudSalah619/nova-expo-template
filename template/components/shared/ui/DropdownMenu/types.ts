export interface DialogOption {
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

export interface DropdownProps {
  options: DialogOption[];
  children?: React.ReactNode;
  onChange?: (value: string, option: DialogOption) => void;
}
