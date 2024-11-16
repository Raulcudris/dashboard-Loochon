import api from "@/config/apiConfig";
import { Data, EditUser, User } from "../interface/userInterface";

// Función para obtener todos los usuarios
export const GetAllUsers = async (page: number = 1): Promise<{ users: User[]; total: number }> => {
  try {
    const response = await api.get<Data>(`/api/users/getall`, { params: { page } });
    const { rspData, rspPagination } = response.data;
    return { users: rspData, total: rspPagination.totalResults };
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    return { users: [], total: 0 };
  }
};

// Función para crear un usuario
export const createUser = async (body: User): Promise<Data> => {
  const data = {
    rspData: [
      {
        ...body,
        recNroregReus: 'NA',
        recNomusuReus: `${body.recNombreReus} ${body.recApelidReus}`,
        recImgvisReus: 'pr10157781214290956_800x500.png*9ae46c3d-a4d4-49b1-ae8f-20ebd27bcaf6',
        sisCodpaiSipa: '205',
        sisIdedptSidp: '205020',
        sisCodproSipr: '205020001000',
        recCodposReus: '205020001000',
        recGeolatReus: 0.0,
        recGeolonReus: 0.0,
      },
    ],
  };

  const response = await api.post<Data>(`/api/users/create`, data);
  return response.data;
};

// Función para obtener un usuario por su ID
export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<Data>(`/api/users`, {
    params: { currentpage: 1, pagesize: 10, parameter: 'PKEY', filter: id },
  });
  return response.data.rspData[0];
};

// Función para actualizar un usuario
export const editUser = async (user: EditUser): Promise<void> => {
  try {
    const requestData = {
      rspData: [
        {
          recIdeunikeyReus: user.recIdeunikeyReus,
          recNroregReus: user.recNroregReus || 'NA',
          recNiknamReus: user.recNiknamReus || 'NA',
          recNombreReus: user.recNombreReus || '',
          recApelidReus: user.recApelidReus || '',
          recFecnacReus: user.recFecnacReus || new Date().toISOString().split('T')[0],
          recSexusuReus: user.recSexusuReus || '1',
          recNomusuReus: user.recNomusuReus || `${user.recNombreReus} ${user.recApelidReus}`,
          recImgvisReus: user.recImgvisReus || 'https://example.com/default-avatar.jpg',
          recDirresReus: user.recDirresReus || 'No street',
          recTelefoReus: user.recTelefoReus || 'No phone',
          apjCorreoApgm: user.apjCorreoApgm || 'No email',
          sisCodpaiSipa: user.sisCodpaiSipa || '170',
          sisIdedptSidp: user.sisIdedptSidp || '205020',
          sisCodproSipr: user.sisCodproSipr || '205020001000',
          recCodposReus: user.recCodposReus || '20001001',
          recGeolatReus: user.recGeolatReus || 0.0,
          recGeolonReus: user.recGeolonReus || 0.0,
          sisCountaRkey: user.sisCountaRkey || 0,
          sisCountbRkey: user.sisCountbRkey || 0,
          sisCountcRkey: user.sisCountcRkey || 0,
          sisCountdRkey: user.sisCountdRkey || 0,
          sisCounteRkey: user.sisCounteRkey || 0,
          sisCountfRkey: user.sisCountfRkey || 0,
          recEstregReus: user.recEstregReus || '3'
        }
      ]
    };

    await api.put(`/api/users/update`, requestData);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// Función para cambiar el estado de un usuario
export const changeUserStatus = async (id: number): Promise<Data> => {
  const data = [
    {
      recPKey: id,
      recEstreg: 2, // Suponiendo que este campo indica el cambio de estado
    },
  ];

  const response = await api.patch<Data>(`/api/users/changestatus`, data);
  return response.data;
};

// Función para eliminar un usuario
export const deleteUser = async (id: number): Promise<void> => {
  const data = [{ recPKey: id }];

  await api.patch(`/api/users/delete`, {
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
