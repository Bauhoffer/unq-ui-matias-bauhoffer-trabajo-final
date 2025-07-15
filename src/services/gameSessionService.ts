import axios, { type AxiosResponse } from "axios";
import type { GameSession } from "../types/api";
import { handleApiError } from "./errorHandler";

export const gameSessionService = {
  async getGameSession(id: string): Promise<GameSession> {
    try {
      const response: AxiosResponse<GameSession> = await axios.get(
        `/api/difficulties/${id}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};