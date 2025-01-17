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

/* // Crear usuario
export const createUser = async (newUser: NewUser): Promise<void> => {
  try {
    const completeUser = {
      ...newUser,
      recNroregReus: "NA",
      recNiknamReus: newUser.recNombreReus || "default",
      recNomusuReus: `${newUser.recNombreReus} ${newUser.recApelidReus}`,
      recImgvisReus: "pr10157781214290956_800x500.png*9ae46c3d-a4d4-49b1-ae8f-20ebd27bcaf6",
      sisCodpaiSipa: "170",
      sisIdedptSidp: "205020",
      sisCodproSipr: "205020001000",
      recCodposReus: "205020001000",
      recGeolatReus: 0.0,
      recGeolonReus: 0.0,
    };
    console.log({ completeUser })
    const requestData = {
      rspValue: "",
      rspMessage: "",
      rspParentKey: "",
      rspAppKey: "",
      rspData: [completeUser],
    };

    console.log("Request Data:", requestData); // Depuración

    const response = await api.post(`/api/users/create`, requestData);
    console.log("Response Data:", response.data); // Depuración de la respuesta
  } catch (error) {
    throw error;
  }
};

// Actualizar un usuario existente
export const editUser = async (user: NewUser): Promise<void> => {
  try {
    const requestData = {
      rspData: [
        {
          ...user,
          recNomusuReus: `${user.recNombreReus || ""} ${user.recApelidReus || ""}`.trim(),
        },
      ],
    };
    await api.put(`/api/users/update`, requestData);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<void> => {
  try {
    const data = [{ recPKey: id }];
    await api.patch(`/api/users/delete`, {
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

// Cambiar estado de usuario
export const changeUserStatus = async (id: number): Promise<DataUsers> => {
  try {
    const data = [
      {
        recPKey: id,
        recEstreg: 2, // Ejemplo de nuevo estado
      },
    ];
    const response = await api.patch<DataUsers>(`/api/users/changestatus`, data);
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el estado del usuario:', error);
    throw error;
  }
};

 */