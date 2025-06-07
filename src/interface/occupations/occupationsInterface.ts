// -----------------------------------------------
// INTERFACES DE OCUPACIONES (Admin UI / API)
// -----------------------------------------------

// Información base para una nueva ocupación
export interface NewOccupations {
  recPrimarykeyRcws: number;           // Clave primaria
  recIdentifikeyRcws: string;          // Identificador único de la ocupación
  recIdentifikeyRcwk: string;          // Identificador de la categoría padre
  recTitleworkRcws: string;            // Título o nombre de la ocupación
  recDescrworkRcws: string;            // Descripción de la ocupación
  recKeylocationRcws: string;          // Palabras clave para búsqueda
  recOrdviewkeyRcws: number;           // Orden de visualización
  recStatusregiRcws: '1' | '2';        // Estado: 1=Activo, 2=Inactivo
}

// Valores por defecto para formulario de creación
export const defaultNewOccupations: NewOccupations = {
  recPrimarykeyRcws: 1,
  recIdentifikeyRcws: '',
  recIdentifikeyRcwk: '',
  recTitleworkRcws: 'Titulo',
  recDescrworkRcws: 'Descripcion',
  recKeylocationRcws: 'Palabras claves',
  recOrdviewkeyRcws: 1,
  recStatusregiRcws: '1',
};

// Para edición: hereda de NewOccupations
export interface EditOccupations extends NewOccupations {
  recPrimarykeyRcws: number;
}

// Para consumo general en tablas u otras vistas
export interface Occupations extends NewOccupations {
  recPrimarykeyRcws: number;
  recStatusregiRcws: '1' | '2';
}

// -----------------------------------------------
// RESPUESTAS DE API Y PAGINACIÓN
// -----------------------------------------------

export interface RspPaginationOccupations {
  currentPage: number;
  totalPageSize: number;
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
}

// Respuesta cuando los datos aún no están convertidos completamente
export interface OcupationsResponse {
  rspValue: string;
  rspMessage: string;
  rspParentKey: string;
  rspAppKey: string;
  rspPagination: RspPaginationOccupations;
  rspData: NewOccupations[];
}

// Respuesta cuando ya se procesan como tipo Occupations completo
export interface DataOccupations {
  rspValue: string;
  rspMessage: string;
  rspParentKey: string;
  rspAppKey: string;
  rspPagination: RspPaginationOccupations;
  rspData: Occupations[];
}

// -----------------------------------------------
// PROPS DE COMPONENTES
// -----------------------------------------------

export interface OccupationsTableProps {
  rows: Occupations[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
}

export interface OccupationsEditModalProps {
  open: boolean;
  onClose: () => void;
  occupations: EditOccupations | null;
  onSave: () => void;
}
