export interface Difficulty {
  id: string;
  name: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}