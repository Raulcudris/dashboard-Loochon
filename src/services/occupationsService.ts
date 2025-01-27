import api from "@/config/apiRequest";
import { DataOccupations, NewOccupations } from "@/interface";

// Obtener todas las ocupaciones con paginación
export const GetAllOccupations = async (
  page: number = 1
): Promise<{ occupations: NewOccupations[]; total: number }> => {
  try {
    const response = await api.get<DataOccupations>(`/api/utility/services/getAllServices`, {
      params: { page },
    });
    const { rspData, rspPagination } = response.data;
    return { occupations: rspData, total: rspPagination.totalResults };
  } catch (error) {
    console.error("Error al obtener todas las ocupaciones:", error);
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
    const response = await api.post(`/api/utility/services/create`, requestData);
    console.log("Response Data (createOccupation):", response.data);
  } catch (error) {
    console.error("Error al crear una ocupación:", error);
    throw error;
  }
};

// Actualizar una ocupación existente
export const editOccupation = async (occupation: NewOccupations): Promise<void> => {
  try {
    const requestData = {
      rspData: [occupation], // Verifica si esta estructura es la que espera el backend
    };

    const response = await api.put(`/api/utility/services/update`, requestData);

  } catch (error: any) {
    console.error("Error al actualizar la ocupación:", error);

    // Captura el mensaje de error del backend
    if (error.response) {
      console.error("Response Error Data:", error.response.data);
      throw new Error(error.response.data.message || "Error al actualizar la ocupación.");
    }

    throw error;
  }
};


// Eliminar una ocupación
export const deleteOccupation = async (id: string): Promise<void> => {
  try {
    const data = [{ recPKey: id }];
    await api.patch(`/api/utility/services/delete`, {
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Ocupación eliminada exitosamente:", id);
  } catch (error) {
    console.error("Error al eliminar la ocupación:", error);
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
    const response = await api.patch<DataOccupations>(`/api/utility/services/changestatus`, data);
    console.log("Response Data (changeOccupationStatus):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cambiar el estado de la ocupación:", error);
    throw error;
  }
};
