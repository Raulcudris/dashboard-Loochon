import axios from "axios";
import { createApiClient } from "@/config/apiRequest";
import { services } from "@/config/services";
import {
  DataCoordenates,
  NewCoordenate,
  EditCoordenate,
  Country,
  State,
  City,
} from "@/interface";

// Crear instancia para microservicio Utility
const api = createApiClient(services.utility);

// Obtener todas las ciudades (paginadas)
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

    await api.post(`/api/utility/city/create`, requestData);
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
    await api.put(`/api/utility/city/update`, requestData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al actualizar la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al actualizar la ciudad.");
    }
    throw error;
  }
};

// Eliminar ciudad
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
};

// Cambiar estado de ciudad (activar/inactivar)
export const changeCityStatus = async (id: string, newStatus: string): Promise<DataCoordenates> => {
  try {
    const data = [{ recPKey: id, recEstreg: newStatus }];
    const response = await api.patch<DataCoordenates>(`/api/utility/city/changestatus`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al cambiar el estado de la ciudad:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al cambiar el estado de la ciudad.");
    }
    throw error;
  }
};

// =======================
// NUEVAS FUNCIONES
// =======================

// Obtener todos los países
export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await api.get(`/api/utility/countries/getall`);
    return response.data.rspData;
  } catch (error) {
    console.error("Error al obtener los países:", error);
    return [];
  }
};

// Obtener departamentos por código de país
export const getStatesByCountry = async (countryCode: string): Promise<State[]> => {
  try {
    const response = await api.get(`/api/utility/state`, {
      params: {
        currentpage: 1,
        pagesize: 9999,
        parameter: "FKEY",
        filter: countryCode,
      },
    });
    return response.data.rspData;
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    return [];
  }
};

// Obtener municipios por código de departamento
export const getCitiesByState = async (stateCode: string): Promise<City[]> => {
  try {
    const response = await api.get<DataCoordenates>(
      `/api/utility/city/pages`,
      {
        params: {
          currentpage: 1,
          pagesize: 249,
          parameter: 'DEPT',
          filter: stateCode,
        },
      }
    );

    // Transformar los datos de Coordenates[] a City[]
    const cities: City[] = response.data.rspData.map((item) => ({
      sisIdemunSimu: item.city?.sisIdemunSimu ?? '', // fallback si no viene el objeto anidado
      sisCodmunSimu: item.sisCodmunSimu,
      sisNombreSimu: item.city?.sisNombreSimu ?? '', // o usar item.sisNombreSipr si aplica
    }));

    return cities;
  } catch (error) {
    console.error('❌ Error al obtener municipios:', error);
    return [];
  }
};
