import api from "@/config/apiRequest";
import { DataCoordenates, Coordenate } from "@/interface";

// Obtener todas las ciudades con parámetros personalizados
export const GetAllCity = async (
  currentPage: number = 1,
  pageSize: number = 10,
  parameter: string = "170",
  filter: string = ""
): Promise<{ coordenates: Coordenate[]; total: number }> => {
  try {
    const response = await api.get<DataCoordenates>(`api/utility/city/pages`, {
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
