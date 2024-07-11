export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
  id?: string;
};
export type SimpleUser = Pick<User, "username" | "image" | "name">;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type ProfileUser = User & {
  following: number;
  followers: number;
};
