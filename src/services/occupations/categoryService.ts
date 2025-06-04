import { createApiClient } from "@/config/apiRequest";
import { services } from "@/config/services";
import {  CategoryResponse , NewCategory } from "@/interface/occupations/categoryInterface";
import axios from "axios";

// Crear instancia para el microservicio Utility (puerto 6074)
const api = createApiClient(services.utility);

// Obtener todas las ocupaciones con paginación
export const getAllCategories = async (
  page: number = 1
): Promise<{ categories: NewCategory[]; total: number }> => {
  try {
    const response = await api.get<CategoryResponse>(`api/utility/services/getallCategory`, {
      params: { page },
    });
   const { rspData, rspPagination } = response.data;
    return { categories: rspData, total: rspPagination.totalResults };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al obtener categorías:", error.response?.data || error.message);
    } else {
      console.error("Error inesperado al obtener categorías:", error);
    }
    return { categories: [], total: 0 };
  }
};



// Crear una nueva categoría
export const createCategory = async (newCategory: NewCategory): Promise<void> => {
  try {
    const requestData = {
      rspValue: "",
      rspMessage: "",
      rspParentKey: "",
      rspAppKey: "",
      rspData: [newCategory],
    };
    await api.post(`api/utility/services/createCategory`, requestData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear categoría:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al crear la categoría.");
    }
    throw error;
  }
};

// Editar una categoría existente
export const editCategory = async (category: NewCategory): Promise<void> => {
  try {
    const requestData = { rspData: [category] };
    await api.put(`api/utility/services/updateCategory`, requestData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al actualizar la categoría:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al actualizar la categoría.");
    }
    throw error;
  }
};

// Eliminar (cambiar estado lógico)
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    const data = [{ recPKey: id }];
    console.log("Data" , data)
    await api.delete(`api/utility/services/deleteCategory`, { data });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al eliminar la categoría:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al eliminar la categoría.");
    }
    throw error;
  }
};

// Cambiar el estado de una categoría (activo/inactivo)
export const changeCategoryStatus = async (id: number, newStatus: string): Promise<void> => {
  try {
    const data = [{ recPKey: id, recEstreg: newStatus }];
    await api.patch(`api/utility/services/changestatusCategory`, data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al cambiar el estado de la categoría:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error al cambiar el estado de la categoría.");
    }
    throw error;
  }
};
