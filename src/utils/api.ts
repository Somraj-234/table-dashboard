import type { User, Comment } from "../types/index";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

export const fetchComments = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: Comment[]; total: number }> => {
  const params = new URLSearchParams({
    _page: page.toString(),
    _limit: limit.toString(),
  });

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?${params}`
  );

  const total = parseInt(response.headers.get("x-total-count") || "0");
  const data = await response.json();

  return { data, total };
};
