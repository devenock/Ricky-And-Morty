export interface Character {
  id: number | string;
  name: string;
  status: string;
  species: string;
  image: string;
  isLocal?: boolean;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
