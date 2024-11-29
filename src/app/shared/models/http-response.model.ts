export interface IHttpResponse<T> {
  items: T[];
  links: ILinks;
  meta: IMeta;
}

export interface ILinks {
  first: string;
  last: string;
  next: string;
  previous: string;
}

export interface IMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export const ROWS_PER_PAGE = 10;
