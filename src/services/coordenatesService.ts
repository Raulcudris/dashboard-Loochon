import axios from "axios";
import { createApiClient } from "@/config/apiRequest";
import { services } from "@/config/services";
import { DataCoordenates, NewCoordenate, EditCoordenate } from "@/interface";

// Crear instancia para microservicio Utility
const api = createApiClient(services.utility);

// Obtener todas las ciudades
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

    const response = await api.post(`/api/utility/city/create`, requestData);
    console.log("Response Data (createCity):", response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al crear la ciudad.");
    }
    throw error;
  }
};

// Actualizar ciudad
export const editCity = async (coordenates: EditCoordenate): Promise<void> => {
  try {
    const requestData = { rspData: [coordenates] };
    const response = await api.put(`/api/utility/city/update`, requestData);
    //console.log("Response Data (editCity):", response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al actualizar la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al actualizar la ciudad.");
    }
    throw error;
  }
};


// Eliminar estado de ciudad
export const deleteCity = async (id: string): Promise<DataCoordenates> => {
  try {
    const data = [{ recPKey: id }];
    const response = await api.delete<DataCoordenates>(`/api/utility/city/delete`, { data });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al eliminar la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al eliminar la ciudad.");
    }
    throw error;
  }
}

// Cambiar estado de ciudad
export const changeCityStatus = async (id: string, newStatus: string): Promise<DataCoordenates> => {
  try {
    const data = [{ recPKey: id, recEstreg: newStatus }];
    const response = await api.patch<DataCoordenates>(`api/utility/city/changestatus`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al cambiar el estado de la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al cambiar el estado de la ciudad.");
    }
    throw error;
  }
};
