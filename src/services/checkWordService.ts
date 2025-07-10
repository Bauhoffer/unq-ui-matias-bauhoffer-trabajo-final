import axios, { AxiosError, type AxiosResponse } from "axios";
import type { CheckWordRequest, CheckWordResponse, ApiError } from "../types/api";

export const checkWordService = {
  /**
   * Checks if a word is valid for the current game session
   * @param request - Object containing sessionId and word to check
   * @returns Promise<CheckWordResponse> - Array of letter results with solution status
   * @throws {ApiError} When the API request fails
   */
  async checkWord(request: CheckWordRequest): Promise<CheckWordResponse> {
    try {
      const response: AxiosResponse<CheckWordResponse> = await axios.post(
        `/api/checkWord`,
        request
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