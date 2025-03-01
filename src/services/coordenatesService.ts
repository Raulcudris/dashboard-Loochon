import api from "@/config/apiRequest";
import { DataCoordenates, NewCoordenate } from "@/interface";

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
    });
    const { rspData, rspPagination } = response.data;
    return { coordenates: rspData, total: rspPagination.totalResults };
  } catch (error) {
    console.error("Error al obtener todas las ciudades:", error);
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
  } catch (error) {
    console.error("Error al crear la ciudad:", error);
    throw error;
  }
};

// Actualizar una ciudad existente
export const editCity = async (coordenates: NewCoordenate): Promise<void> => {
  try {
    const requestData = {
      rspData: [coordenates],
    };

    await api.put(`/api/utility/city/update`, requestData);
  } catch (error) {
    console.error("Error al actualizar la ciudad:", error);
    throw error;
  }
};

// Eliminar una ciudad
export const deleteCity = async (id: String): Promise<void> => {
  try {
    const data = [{ recPKey: id }];
    //console.log("Request Data (deleteCity):", data);
    await api.delete(`/api/utility/city/delete`, {
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al eliminar la ciudad:", error);
    throw error;
  }
};

// Cambiar el estado de una ciudad
export const changeCityStatus = async (id: string): Promise<DataCoordenates> => {
  try {
    const data = [
      {
        "recPKey": id,
        "recEstreg": "2", // Cambiar estado
      },
    ];

    console.log(data)
    const response = await api.patch<DataCoordenates>(`/api/utility/city/changestatus`, data);
    console.log("Response Data (changeCityStatus):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cambiar el estado de la ciudad:", error);
    throw error;
  }
};