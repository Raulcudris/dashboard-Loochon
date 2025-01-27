// **Interfaz para una coordenada** (estructura esperada de la API)
export interface NewCoordenate {
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
  sisCheckprossSipr: string; // Estado del proceso
  state?: State; // Información del estado (departamento)
  city?: City; // Información de la ciudad (municipio)
}

// Valores predeterminados para una nueva coordenada
export const defaultNewCoordenate: NewCoordenate = {
  sisCodproSipr: '',
  sisCodmunSimu: '',
  sisIdedptSidp: '',
  sisCodpaiSipa: '170', // Por defecto, Colombia
  sisNombreSipr: '',
  sisCodposSipr: 'NA',
  sisCapitaSipr: '0',
  sisProclaSipr: '0',
  sisGeolatSipr: 0.0,
  sisGeolonSipr: 0.0,
  sisCountaRkey: 0,
  sisEstregSipr: "1", // Activo
  sisCheckprossSipr: 'OK',
  city: { sisCodmunSimu: '', sisIdemunSimu: '', sisNombreSimu: '' },
  state: { sisIdedptSidp: '', sisCoddptSidp: '', sisNombreSidp: '' },
};


// **Interfaz para editar una coordenada** (parcial de `NewCoordenate`)
export interface EditCoordenate extends NewCoordenate {
  sisCodproSipr: string; // Clave obligatoria para identificar la coordenada
}

export interface Coordenates extends NewCoordenate {
  sisCodproSipr: string; // Clave obligatoria para identificar la coordenada
  sisEstregSipr: string;
  city?: City; // Información de la ciudad
  state? : State;
}

// **Información de un estado (departamento)**
export interface State {
  sisIdedptSidp: string; // ID del departamento
  sisCoddptSidp: string; // Código del departamento
  sisNombreSidp: string; // Nombre del departamento
}

// **Información de una ciudad (municipio)**
 interface City {
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
  rspData: NewCoordenate[]; // Lista de coordenadas
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

// **Estructura de respuesta de datos para coordenadas**
export interface DataCoordenates {
  rspValue: string; // Valor de respuesta
  rspMessage: string; // Mensaje de respuesta
  rspParentKey: string; // Clave principal
  rspAppKey: string; // Clave de la aplicación
  rspPagination: RspPaginationCoordenates; // Información de paginación
  rspData: Coordenates[]; // Lista de coordenadas
}

// **Props para el componente `CoordenatesTable`**
export interface CoordenatesTableProps {
  rows: Coordenates[]; // Filas de coordenadas
  count: number; // Número total de filas
  page: number; // Página actual
  rowsPerPage: number; // Filas por página
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void; // Cambio de página
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Cambio en la cantidad de filas por página
  onRefresh: () => void; // Método para refrescar los datos
}

// **Props para el componente `EditCoordenatesModal`**
export interface CoordenateEditModalProps {
  open: boolean; // Estado del modal (abierto/cerrado)
  onClose: () => void; // Método para cerrar el modal
  coordenate: EditCoordenate | null; // Coordenada seleccionada para editar
  onSave: () => void; // Método para guardar cambios y refrescar la lista
}
