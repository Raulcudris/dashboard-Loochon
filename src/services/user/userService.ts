import { createApiClient } from "@/config/apiRequest";
import { services } from "@/config/services";
import { DataUsers, NewUser, User } from "@/interface";

// Crear instancia para el microservicio de Usuarios (puerto 6078)
const api = createApiClient(services.users);

// Obtener todos los usuarios
export const GetAllUsers = async (
  page: number = 1
): Promise<{ users: User[]; total: number }> => {
  try {
    const response = await api.get<DataUsers>(`/api/users/getall`, {
      params: { page },
    });
    const { rspData, rspPagination } = response.data;
    return { users: rspData, total: rspPagination.totalResults };
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    return { users: [], total: 0 };
  }
};

// Crear usuario
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

    const requestData = {
      rspValue: "",
      rspMessage: "",
      rspParentKey: "",
      rspAppKey: "",
      rspData: [completeUser],
    };

    console.log("Request Data:", requestData);
    const response = await api.post(`/api/users/create`, requestData);
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Actualizar usuario
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
    await api.patch(`/api/users/delete`, data);
    console.log("Usuario eliminado exitosamente:", id);
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

// Cambiar estado de usuario
export const changeUserStatus = async (id: string): Promise<DataUsers> => {
  try {
    const data = [
      {
        recPKey: id,
        recEstreg: 2, // Estado de ejemplo
      },
    ];
    const response = await api.patch<DataUsers>(`/api/users/changestatus`, data);
    //console.log("Estado del usuario cambiado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cambiar el estado del usuario:", error);
    throw error;
  }
};
