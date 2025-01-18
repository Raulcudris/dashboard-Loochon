// **Información de una ocupación**
export interface Occupations {
    recPrimarykeyRcwk: number; // Clave primaria única de la ocupación
    recIdentifikeyRcwk: string; // Identificador único de la ocupación
    recTitleworkRcwk: string; // Título de la ocupación
    recDescrworkRcwk: string; // Descripción de la ocupación
    recKeylocationRcwk: string; // Ubicación clave o identificador semántico
    recImageviewRcwk: string; // URL o referencia de la imagen asociada
    recStatusregiRcwk: string; // Estado del registro (1 = Activo, 0 = Inactivo)
    //dlist: any | null; // Lista adicional de información (actualmente desconocida)
  }
  
  // **Estructura de respuesta para ocupaciones**
  export interface OccupationsResponse {
    rspValue: string; // Valor de respuesta (por ejemplo, "OK")
    rspMessage: string; // Mensaje de respuesta
    rspParentKey: string; // Clave principal de la respuesta
    rspAppKey: string; // Clave de la aplicación
    rspPagination: RspPaginationOccupations; // Información de paginación
    rspData: Occupations[]; // Lista de ocupaciones
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
  