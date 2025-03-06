import api from "@/config/apiRequest";
import { DataOccupations, NewOccupations } from "@/interface";
import axios from "axios"; // Importa Axios para manejar errores correctamente

// Obtener todas las ocupaciones con paginación
export const GetAllOccupations = async (
  page: number = 1
): Promise<{ occupations: NewOccupations[]; total: number }> => {
  try {
    const response = await api.get<DataOccupations>(`/api/utility/services/getAllServices`, {
      params: { page },
      timeout: 30000,
    });
    const { rspData, rspPagination } = response.data;
    return { occupations: rspData, total: rspPagination.totalResults };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al obtener ocupaciones:", error.response?.data || error.message);
    } else {
      console.error("Error inesperado al obtener ocupaciones:", error);
    }
    return { occupations: [], total: 0 };
  }
};

// Crear una nueva ocupación
export const createOccupation = async (newOccupation: NewOccupations): Promise<void> => {
  try {
    const requestData = {
      rspValue: "",
      rspMessage: "",
      rspParentKey: "",
      rspAppKey: "",
      rspData: [newOccupation],
    };

    console.log("Request Data (createOccupation):", requestData);
    await api.post(`/api/utility/services/create`, requestData, {
      timeout: 30000,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear ocupación:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al crear la ocupación.");
    }
    throw error;
  }
};

// Editar una ocupación
export const editOccupation = async (occupation: NewOccupations): Promise<void> => {
  try {
    const requestData = {
      rspData: [occupation],
    };

    await api.put(`/api/utility/services/update`, requestData, {
      timeout: 30000,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al actualizar la ocupación:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al actualizar la ocupación.");
    }
    throw error;
  }
};

// Eliminar una ocupación
export const deleteOccupation = async (id: string | number): Promise<void> => {
  try {
    const data = [{ recPKey: id }];
    await api.patch(`/api/utility/services/delete`, data, {
      timeout: 30000,
    });
    console.log("Ocupación eliminada exitosamente:", id);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al eliminar ocupación:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al eliminar la ocupación.");
    }
    throw error;
  }
};

// Cambiar el estado de una ocupación
export const changeOccupationStatus = async (id: number): Promise<DataOccupations> => {
  try {
    const data = [
      {
        recPKey: id,
        recEstreg: 2, // Cambiar al estado deseado (ejemplo: 2 para "desactivado")
      },
    ];

    const response = await api.patch<DataOccupations>(`/api/utility/services/changestatus`, data, {
      timeout: 30000,
    });

    console.log("Estado de la ocupación cambiado exitosamente:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al cambiar el estado de la ocupación:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al cambiar el estado de la ocupación.");
    }
    throw error;
  }
};
