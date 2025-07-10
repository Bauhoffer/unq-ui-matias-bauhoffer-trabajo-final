import axios, { AxiosError, type AxiosResponse } from "axios";
import type { GameSession, ApiError } from "../types/api";

export const gameSessionService = {
  async getGameSession(id: string): Promise<GameSession> {
    try {
      const response: AxiosResponse<GameSession> = await axios.get(
        `/api/difficulties/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
          code: error.code,
        };
        throw apiError;
      }
      throw { message: "Unknown error" } as ApiError;
    }
  },
};