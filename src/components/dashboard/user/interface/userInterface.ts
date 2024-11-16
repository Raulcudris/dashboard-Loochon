// Estructura del usuario que utiliza la API (backend)
export interface User {
  recIdeunikeyReus: number;
  recNroregReus: string;
  recNiknamReus: string;
  recNroideReus: string;
  recNombreReus: string;
  recApelidReus: string;
  recFecnacReus: string;
  recSexusuReus: string;
  recNomusuReus: string;
  recImgvisReus: string;
  recDirresReus: string;
  recTelefoReus: string;
  apjCorreoApgm: string;
  sisCodpaiSipa: string;
  sisIdedptSidp: string;
  sisCodproSipr: string;
  recCodposReus: string;
  recGeolatReus: number;
  recGeolonReus: number;
  sisCountaRkey: number;
  sisCountbRkey: number;
  sisCountcRkey: number;
  sisCountdRkey: number;
  sisCounteRkey: number;
  sisCountfRkey: number;
  recEstregReus: string;
  resumEstadist: ResumEstadist;
  city?: City;
}

// Estructura de ciudad dentro de `CreateUser`
export interface City {
  sisCodproSipr: string;
  sisNombreSipr: string;
  sisProclaSipr: string;
  sisCodmunSimu: string;
  sisNombreSimu: string;
  sisIdedptSidp: string;
  sisCoddptSidp: string;
  sisNombreSidp: string;
  recUnikeySipa: number;
  sisCodpaiSipa: string;
  sisNombreSipa: string;
}

// Estadísticas de usuario
export interface ResumEstadist {
  recContractTotal: number;
  recContractOkey: number;
  recContractDown: number;
  recCommentsTotal: number;
}

// Estructura de la respuesta de datos de la API
export interface Data {
  rspValue: string;
  rspMessage: string;
  rspParentKey: string;
  rspAppKey: string;
  rspPagination: RspPagination;
  rspData: User[];
}

// Paginación dentro de la respuesta de la API
export interface RspPagination {
  currentPage: number;
  totalPageSize: number;
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
}

// Estructura para editar un usuario en la API
export interface EditUser extends Partial<User> {
  recIdeunikeyReus: number;
}

// Interfaces de props para componentes de tabla y modal

// Props para el componente `UsersTable`
export interface UsersTableProps {
  count?: number;
  page?: number;
  rows?: User[];
  rowsPerPage?: number;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Props para el componente `UserEditModal`
export interface UserEditModalProps {
  open: boolean;
  onClose: () => void;
  user: EditUser | null;
  onSave: (updatedUser: EditUser) => void;
}
