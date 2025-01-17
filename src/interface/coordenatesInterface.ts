// **Interfaz para una coordenada** (estructura esperada de la API)
export interface Coordenate {
  sisCodproSipr: string; // Código de la provincia
  sisCodmunSimu: string; // Código del municipio
  sisIdedptSidp: string; // ID del departamento
  sisCodpaiSipa: string; // Código del país
  sisNombreSipr: string; // Nombre de la provincia
  sisCodposSipr: string; // Código postal
  sisCapitaSipr: string; // Indicador de capital
  sisProclaSipr: string; // Clase de la provincia
  sisGeolatSipr: number; // Latitud geográfica
  sisGeolonSipr: number; // Longitud geográfica
  sisCountaRkey: number; // Contador A
  sisEstregSipr: string; // Estado de registro

  // Información del estado (departamento)
  state?: State; // Estado asociado a la coordenada

  // Información de la ciudad (municipio)
  city?: city; // Ciudad asociada a la coordenada
}

// **Información de un estado (departamento)**
export interface State {
  sisIdedptSidp: string; // ID del departamento
  sisCoddptSidp: string; // Código del departamento
  sisNombreSidp: string; // Nombre del departamento
}

// **Información de una ciudad (municipio)**
export interface city {
  sisCodmunSimu: string; // Código del municipio
  sisIdemunSimu: string; // ID del municipio
  sisNombreSimu: string; // Nombre del municipio
}

// **Estructura de respuesta de datos de la API**
export interface CoordenatesResponse {
  rspValue: string; // Valor de respuesta
  rspMessage: string; // Mensaje de respuesta
  rspParentKey: string; // Clave principal
  rspAppKey: string; // Clave de la aplicación
  rspPagination: RspPaginationCoordenates; // Información de paginación
  rspData: Coordenate[]; // Lista de coordenadas
}

// **Información de paginación dentro de la respuesta de la API**
export interface RspPaginationCoordenates {
  currentPage: number; // Página actual
  totalPageSize: number; // Tamaño total de la página
  totalResults: number; // Total de resultados
  totalPages: number; // Total de páginas
  hasNextPage: boolean; // Indicador de si hay más páginas
  hasPreviousPage: boolean; // Indicador de si hay páginas previas
  nextPageUrl: string; // URL de la siguiente página
  previousPageUrl: string; // URL de la página anterior
}

// **Estructura de respuesta de datos de la API**
  export interface DataCoordenates {
    rspValue: string; // Valor de respuesta
    rspMessage: string; // Mensaje de respuesta
    rspParentKey: string; // Clave principal
    rspAppKey: string; // Clave de la aplicación
    rspPagination: RspPaginationCoordenates; // Información de paginación
    rspData: Coordenate[]; // Lista de usuarios
  }
  

// **Props para el componente `CoordenatesTable`**
export interface CoordenatesTableProps {
  rows: Coordenate[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
}
