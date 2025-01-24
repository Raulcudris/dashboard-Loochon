// **Información de una ocupación**
export interface NewOccupations {
    recPrimarykeyRcws: number; // Clave primaria única de la ocupación
    recIdentifikeyRcws: string; // Identificador único de la ocupación
    recIdentifikeyRcwk: string;  // Identificador único de la categoría padre
    recTitleworkRcws: string; // Título de la ocupación
    recDescrworkRcws: string; // Descripción breve de la ocupación
    recKeylocationRcws: string;  // Llave para búsqueda por palabras clave
    recOrdviewkeyRcws: number;// Orden de visualización dentro de la categoría
    recStatusregiRcws: string; // Estado del registro (1 = Activo, 0 = Inactivo)
    //dlist: any | null; // Lista adicional de información (actualmente d Desconocida)
  }

  // Valores predeterminados para una nueva coordenada
  export const defaultNewOccupations: NewOccupations = {
    recPrimarykeyRcws: 1,
    recIdentifikeyRcws: '',
    recIdentifikeyRcwk: '',
    recTitleworkRcws: 'Titulo', // Por defecto, Colombia
    recDescrworkRcws : "Descripcion",
    recKeylocationRcws : "Localizacion",
    recOrdviewkeyRcws : 1,
    recStatusregiRcws :"1"
  };

  // **Interfaz para editar una coordenada** (parcial de `NewCoordenate`)
  export interface EditOccupations extends NewOccupations {
    recPrimarykeyRcws: number; // Clave primaria única de la ocupación
  }
  
  export interface Occupations extends NewOccupations {
    recPrimarykeyRcws: number; // Clave primaria única de la ocupación
    recStatusregiRcws: string; // Estado del registro (1 = Activo, 0 = Inactivo)
  }
  
  // **Estructura de respuesta para ocupaciones**
  export interface OccupationsResponse {
    rspValue: string; // Valor de respuesta (por ejemplo, "OK")
    rspMessage: string; // Mensaje de respuesta
    rspParentKey: string; // Clave principal de la respuesta
    rspAppKey: string; // Clave de la aplicación
    rspPagination: RspPaginationOccupations; // Información de paginación
    rspData: NewOccupations[]; // Lista de ocupaciones
  }
  
  // **Información de paginación para ocupaciones**
  export interface RspPaginationOccupations {
    currentPage: number; // Página actual
    totalPageSize: number; // Tamaño total de la página
    totalResults: number; // Total de resultados
    totalPages: number; // Total de páginas
    hasNextPage: boolean; // Indicador si hay una página siguiente
    hasPreviousPage: boolean; // Indicador si hay una página anterior
    nextPageUrl: string; // URL de la siguiente página
    previousPageUrl: string; // URL de la página anterior
  }
  
  // **Estructura de respuesta de datos de la API**
    export interface DataOccupations {
      rspValue: string; // Valor de respuesta
      rspMessage: string; // Mensaje de respuesta
      rspParentKey: string; // Clave principal
      rspAppKey: string; // Clave de la aplicación
      rspPagination: RspPaginationOccupations; // Información de paginación
      rspData: Occupations[]; // Lista de usuarios
    }

    // **Props para el componente `OccupationsTable`**
    export interface OccupationsTableProps {
      rows: Occupations[];
      count: number;
      page: number;
      rowsPerPage: number;
      onPageChange: (event: unknown, newPage: number) => void;
      onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      onRefresh: () => void;
    }
  
    // **Props para el componente `OccupationsEditModal`**
    export interface OccupationsEditModalProps {
      open: boolean; // Estado del modal (abierto/cerrado)
      onClose: () => void; // Método para cerrar el modal
      occupations: EditOccupations | null; // Coordenada seleccionada para editar
      onSave: () => void; // Método para guardar cambios y refrescar la lista
    }
    