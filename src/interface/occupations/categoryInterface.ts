// Información de una categoría de ocupación o servicio
export interface NewCategory {
  recPrimarykeyRcwk: number;        // Clave primaria única
  recIdentifikeyRcwk: string;       // Identificador único
  recTitleworkRcwk: string;         // Título de la categoría
  recDescrworkRcwk: string;         // Descripción breve
  recKeylocationRcwk: string;       // Llave de búsqueda por palabra clave
  recImageviewRcwk: string;         // URL de imagen o ícono representativo
  recStatusregiRcwk: string;        // Estado del registro (1 = Activo, 2 = Inactivo)
}

// Valores predeterminados para una nueva categoría
export const defaultNewCategory: NewCategory = {
  recPrimarykeyRcwk: 0,
  recIdentifikeyRcwk: '',
  recTitleworkRcwk: '',
  recDescrworkRcwk: '',
  recKeylocationRcwk: '',
  recImageviewRcwk: '',
  recStatusregiRcwk: '1'
};

// Interfaz extendida para edición (si deseas mantener separado)
export interface EditCategory extends NewCategory {
  recPrimarykeyRcwk: number;
}

// Interfaz extendida para consumo general
export interface Category extends NewCategory {
  recPrimarykeyRcwk: number;
  recStatusregiRcwk: string;
}

// Información de paginación para categorías (reutiliza Occupations)
export interface RspPaginationCategory {
  currentPage: number;
  totalPageSize: number;
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
}

// Estructura de respuesta de la API para categorías
export interface CategoryResponse {
  rspValue: string;
  rspMessage: string;
  rspParentKey: string;
  rspAppKey: string;
  rspPagination: RspPaginationCategory;
  rspData: Category[];
}

// Props para la tabla de categorías
export interface CategoryTableProps {
  rows: Category[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
}

// Props para el modal de edición de categoría
export interface CategoryEditModalProps {
  open: boolean;
  onClose: () => void;
  category: EditCategory | null;
  onSave: () => void;
}
