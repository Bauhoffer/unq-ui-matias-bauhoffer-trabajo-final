import axios, { AxiosError } from "axios";

export type HandledApiError = {
  message: string;
  statusCode?: number;
  isHandled: true;
};

export function handleApiError(error: unknown): HandledApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = extractMessage(error);

    switch (status) {
      case 400:
        return {
          message: message || "Solicitud inválida",
          statusCode: 400,
          isHandled: true,
        };
      case 401:
        return {
          message: "No estás autenticado",
          statusCode: 401,
          isHandled: true,
        };
      case 403:
        return {
          message: "No tenés permisos",
          statusCode: 403,
          isHandled: true,
        };
      case 404:
        return { message: message || "No encontrado", statusCode: 404, isHandled: true };
      case 500:
        return {
          message: "Error interno del servidor",
          statusCode: 500,
          isHandled: true,
        };
      default:
        return {
          message: message || `Error HTTP ${status}`,
          statusCode: status,
          isHandled: true,
        };
    }
  }

  if (error instanceof Error) {
    return { message: error.message, isHandled: true };
  }

  return { message: "Error desconocido", isHandled: true };
}

function extractMessage(error: AxiosError): string | undefined {
  const data = error.response?.data;

  if (typeof data === "string") return data;

  if (typeof data === "object" && data !== null) {
    if ("message" in data && typeof data.message === "string") {
      return data.message;
    }
    if (
      "error" in data &&
      typeof data.error === "object" &&
      data.error !== null &&
      "message" in data.error &&
      typeof (data.error as { message?: unknown }).message === "string"
    ) {
      return (data.error as { message: string }).message;
    }
  }

  return undefined;
}
