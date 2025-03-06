import api from "@/config/apiRequest";
import { DataCoordenates, NewCoordenate, EditCoordenate } from "@/interface";
import axios from "axios"; // Importa Axios para manejar errores correctamente

// Obtener todas las ciudades con parámetros personalizados
export const GetAllCity = async (
  currentPage: number = 1,
  pageSize: number = 10,
  parameter: string = "170",
  filter: string = ""
): Promise<{ coordenates: NewCoordenate[]; total: number }> => {
  try {
    const response = await api.get<DataCoordenates>(`/api/utility/city/pages`, {
      params: {
        currentpage: currentPage,
        pagesize: pageSize,
        parameter,
        filter,
      },
      timeout: 30000,
    });

    const { rspData, rspPagination } = response.data;
    return { coordenates: rspData, total: rspPagination.totalResults };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al obtener todas las ciudades:", error.response?.data || error.message);
    } else {
      console.error("Error inesperado al obtener todas las ciudades:", error);
    }
    return { coordenates: [], total: 0 };
  }
};

// Crear una nueva ciudad
export const createCity = async (newCoordenates: NewCoordenate): Promise<void> => {
  try {
    const requestData = {
      rspValue: "",
      rspMessage: "",
      rspParentKey: "",
      rspAppKey: "",
      rspData: [newCoordenates],
    };

    console.log("Request Data (createCity):", requestData);
    const response = await api.post(`/api/utility/city/create`, requestData, {
      timeout: 30000,
    });
    console.log("Response Data (createCity):", response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al crear la ciudad.");
    }
    throw error;
  }
};

// Actualizar una ciudad existente
export const editCity = async (coordenates: EditCoordenate): Promise<void> => {
  try {
    const requestData = {
      rspData: [coordenates],
    };

    console.log("Request Data (editCity):", requestData);
    const response = await api.put(`/api/utility/city/update`, requestData, {
      timeout: 30000,
    });
    console.log("Response Data (editCity):", response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al actualizar la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al actualizar la ciudad.");
    }
    throw error;
  }
};

// Eliminar una ciudad
export const deleteCity = async (id: number): Promise<void> => {
  try {
    const data = [{ recPKey: id }];
    console.log("Request Data (deleteCity):", data);
    await api.patch(`/api/utility/city/delete`, data, {
      timeout: 30000,
    });
    console.log("Ciudad eliminada exitosamente:", id);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al eliminar la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al eliminar la ciudad.");
    }
    throw error;
  }
};

// Cambiar el estado de una ciudad
export const changeCityStatus = async (id: number, newStatus: string): Promise<DataCoordenates> => {
  try {
    const data = [
      {
        recPKey: id,
        recEstreg: newStatus,
      },
    ];

    console.log("Request Data (changeCityStatus):", data);

    const response = await api.patch<DataCoordenates>(`/api/utility/city/changestatus`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    console.log("Estado de la ciudad cambiado exitosamente:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al cambiar el estado de la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al cambiar el estado de la ciudad.");
    }
    throw error;
  }
};
