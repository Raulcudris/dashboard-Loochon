import { createApiClient } from "@/config/apiRequest";
import { services } from "@/config/services";
import { DataOccupations, NewOccupations } from "@/interface";
import axios from "axios";

// Crear instancia para el microservicio Utility (puerto 6074)
const api = createApiClient(services.utility);

// Obtener ocupaciones con paginación y filtro
export const GetAllOccupations = async (
  currentPage: number = 1,
  pageSize: number = 20,
  parameter: string = "SEARCH",
  filter: string = ""
): Promise<{ occupations: NewOccupations[]; total: number }> => {
  try {
    const response = await api.get<DataOccupations>(
      `/api/utility/services/pagesService`,
      {
        params: {
          currentpage: currentPage,
          pagesize: pageSize,
          parameter,
          filter: encodeURIComponent(filter),
        },
      }
    );

    const { rspData, rspPagination } = response.data;

    return {
      occupations: rspData,
      total: rspPagination.totalResults,
    };
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

    //console.log("Request Data (createOccupation):", requestData);
    await api.post(`/api/utility/services/create`, requestData);
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
    const requestData = { rspData: [occupation] };
    await api.put(`/api/utility/services/update`, requestData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al actualizar la ocupación:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al actualizar la ocupación.");
    }
    throw error;
  }
};

// Eliminar una ocupación
export const deleteOccupation = async (id: number): Promise<void> => {
  try {
    const data = [{ recPKey: id }];
    await api.delete(`/api/utility/services/delete`, { data });
    //console.log("Ocupación eliminada exitosamente:", id);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al eliminar ocupación:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al eliminar la ocupación.");
    }
    throw error;
  }
};

// Cambiar el estado de una ocupación (activar o inactivar)
export const changeOccupationStatus = async (
  id: number,
  newStatus: '1' | '2'
): Promise<DataOccupations> => {
  try {
    const data = [{ recPKey: id, recEstreg: newStatus }];
    const response = await api.patch<DataOccupations>(`/api/utility/services/changestatus`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al cambiar el estado de la ocupación:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al cambiar el estado de la ocupación.");
    }
    throw error;
  }
};
