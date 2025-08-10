export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type SortField = "postId" | "name" | "email";
export type SortDirection = "asc" | "desc" | null;

export interface TableState {
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortField: SortField | null;
  sortDirection: SortDirection;
}
