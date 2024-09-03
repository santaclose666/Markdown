export interface View {
  width?: string | number;
  height?: string | number;
  containerStyle?: string;
  onScroll?: (scroll: number) => void;
}
