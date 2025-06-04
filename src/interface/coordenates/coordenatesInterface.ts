// ==============================
// INTERFACES PRINCIPALES
// ==============================

// **Interfaz para una coordenada** (estructura esperada de la API)
export interface NewCoordenate {
  sisIdeunikeySipr: number; // Clave primaria única
  sisCodproSipr: string;    // Código de la provincia
  sisCodmunSimu: string;    // Código del municipio
  sisIdedptSidp: string;    // ID del departamento
  sisCodpaiSipa: string;    // Código del país
  sisNombreSipr: string;    // Nombre de la provincia
  sisCodposSipr: string;    // Código postal
  sisCapitaSipr: string;    // Indicador de capital
  sisProclaSipr: string;    // Clase de la provincia
  sisGeolatSipr: number;    // Latitud geográfica
  sisGeolonSipr: number;    // Longitud geográfica
  sisCountaRkey: number;    // Contador A
  sisEstregSipr: string;    // Estado de registro
  sisCheckprossSipr: string;// Estado del proceso

  country?: Country;        // Objeto país
  state?: State;            // Objeto departamento
  city?: City;              // Objeto ciudad
}

// Valores predeterminados para una nueva coordenada
export const defaultNewCoordenate: NewCoordenate = {
  sisIdeunikeySipr: 1,
  sisCodproSipr: '',
  sisCodmunSimu: '',
  sisIdedptSidp: '',
  sisCodpaiSipa: '170', // Por defecto: Colombia
  sisNombreSipr: '',
  sisCodposSipr: 'NA',
  sisCapitaSipr: '0',
  sisProclaSipr: '0',
  sisGeolatSipr: 0.0,
  sisGeolonSipr: 0.0,
  sisCountaRkey: 0,
  sisEstregSipr: "1",
  sisCheckprossSipr: 'OK',
  country: { sisCodpaiSipa: '170', sisNombreSipa: 'Colombia' },
  state: { sisIdedptSidp: '', sisCoddptSidp: '', sisNombreSidp: '' },
  city: { sisCodmunSimu: '', sisIdemunSimu: '', sisNombreSimu: '' },
};

// ==============================
// VARIANTES DE COORDENADAS
// ==============================

// **Interfaz para editar una coordenada**
export interface EditCoordenate extends NewCoordenate {
  sisIdeunikeySipr: number;
}

export interface Coordenates extends NewCoordenate {
  sisIdeunikeySipr: number;
  sisCodproSipr: string;
  sisEstregSipr: string;
}

// ==============================
// ENTIDADES RELACIONADAS
// ==============================

// **Información de un país**
export interface Country {
  sisCodpaiSipa: string;   // Código del país (ej: '170')
  sisNombreSipa: string;   // Nombre del país
}

// **Información de un departamento**
export interface State {
  sisIdedptSidp: string;   // ID del departamento
  sisCoddptSidp: string;   // Código del departamento
  sisNombreSidp: string;   // Nombre del departamento
}

// **Información de una ciudad**
export interface City {
  sisIdemunSimu: string;   // ID único del municipio
  sisCodmunSimu: string;   // Código visible o de integración
  sisNombreSimu: string;   // Nombre del municipio

}

// ==============================
// RESPUESTAS DE API
// ==============================

export interface CoordenatesResponse {
  rspValue: string;
  rspMessage: string;
  rspParentKey: string;
  rspAppKey: string;
  rspPagination: RspPaginationCoordenates;
  rspData: NewCoordenate[];
}

export interface DataCoordenates {
  rspValue: string;
  rspMessage: string;
  rspParentKey: string;
  rspAppKey: string;
  rspPagination: RspPaginationCoordenates;
  rspData: Coordenates[];
}

export interface RspPaginationCoordenates {
  currentPage: number;
  totalPageSize: number;
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
}

// ==============================
// PROPS DE COMPONENTES
// ==============================

export interface CoordenatesTableProps {
  rows: Coordenates[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
}

export interface CoordenateEditModalProps {
  open: boolean;
  onClose: () => void;
  coordenate: EditCoordenate | null;
  onSave: () => void;
}
