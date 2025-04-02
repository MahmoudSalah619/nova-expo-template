export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  pages_number: number;
  previous: string | null;
  results: T[];
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
}
