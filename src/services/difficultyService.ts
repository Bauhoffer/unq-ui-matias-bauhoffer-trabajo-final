import axios, { AxiosError, type AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';
import type { Difficulty, ApiError } from '../types/api';

export const difficultyService = {
  async getDifficulties(): Promise<Difficulty[]> {
    try {
      const response: AxiosResponse<Difficulty[]> = await axios.get(
        `${API_CONFIG.baseURL}/api/difficulties`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
          code: error.code
        };
        throw apiError;
      }
      throw { message: 'Unknown error' } as ApiError;
    }
  }
};