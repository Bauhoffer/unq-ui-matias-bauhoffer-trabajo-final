import axios, { type AxiosResponse } from "axios";
import type { Difficulty } from "../types/api";
import { handleApiError } from "./errorHandler";

export const difficultyService = {
  /**
   * Fetches available difficulty levels from the API
   * @returns Promise<Difficulty[]> Array of difficulty objects with id and name
   * @throws {ApiError} When the API request fails
   *
   * @example
   * // Response format:
   * // [
   * //   { id: 1, name: "Easy" },
   * //   { id: 2, name: "Medium" },
   * //   { id: 3, name: "Hard" },
   * //   { id: 4, name: "Expert" }
   * // ]
   */
  async getDifficulties(): Promise<Difficulty[]> {
    try {
      const response: AxiosResponse<Difficulty[]> = await axios.get(
        `/api/difficulties`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
