// **Interfaz para un nuevo usuario** (estructura esperada para creación)
export interface NewUser {
    recNroregReus: string; // Número de registro
    recNiknamReus: string; // Nickname
    recNroideReus: string; // Número de identificación
    recNombreReus: string; // Nombre
    recApelidReus: string; // Apellido
    recFecnacReus: string; // Fecha de nacimiento
    recSexusuReus: string; // Sexo
    recNomusuReus: string; // Nombre completo
    recImgvisReus: string; // Imagen visual
    recDirresReus: string; // Dirección
    recTelefoReus: string; // Teléfono
    apjCorreoApgm: string; // Correo electrónico
    sisCodpaiSipa: string; // Código de país
    sisIdedptSidp: string; // Código de departamento
    sisCodproSipr: string; // Código de provincia
    recCodposReus: string; // Código postal
    recGeolatReus: number; // Latitud geográfica
    recGeolonReus: number; // Longitud geográfica
  }
  
  // **Valores predeterminados para un nuevo usuario**
  export const defaultNewUser: NewUser = {
    recNroregReus: "",
    recNiknamReus: "",
    recNroideReus: "",
    recNombreReus: "",
    recApelidReus: "",
    recFecnacReus: "",
    recSexusuReus: "",
    recNomusuReus: "MI NOMBRE DE USUARIO",
    recImgvisReus: "default-image-url.png",
    recDirresReus: "",
    recTelefoReus: "",
    apjCorreoApgm: "",
    sisCodpaiSipa: "170",
    sisIdedptSidp: "205020",
    sisCodproSipr: "205020001000",
    recCodposReus: "205020001000",
    recGeolatReus: 0.0,
    recGeolonReus: 0.0,
  };
  
  // **Interfaz para un usuario existente** (estructura completa esperada del backend)
  export interface User extends NewUser {
    recIdeunikeyReus: number; // ID único del usuario
    recEstregReus: number; // Estado del usuario
    sisCountaRkey: number; // Contador A
    sisCountbRkey: number; // Contador B
    sisCountcRkey: number; // Contador C
    sisCountdRkey: number; // Contador D
    sisCounteRkey: number; // Contador E
    sisCountfRkey: number; // Contador F
    resumEstadist?: ResumEstadist; // Resumen de estadísticas
    city?: City; // Información de la ciudad
  }
  
  // **Información de una ciudad**
  export interface City {
    sisCodproSipr: string; // Código de provincia
    sisNombreSipr: string; // Nombre de la provincia
    sisProclaSipr: string; // Clase de provincia
    sisCodmunSimu: string; // Código del municipio
    sisNombreSimu: string; // Nombre del municipio
    sisIdedptSidp: string; // Código del departamento
    sisCoddptSidp: string; // ID del departamento
    sisNombreSidp: string; // Nombre del departamento
    recUnikeySipa: number; // Clave única para el país
    sisCodpaiSipa: string; // Código del país
    sisNombreSipa: string; // Nombre del país
  }
  
  // **Resumen de estadísticas del usuario**
  export interface ResumEstadist {
    recContractTotal: number; // Total de contratos
    recContractOkey: number; // Contratos aprobados
    recContractDown: number; // Contratos cancelados
    recCommentsTotal: number; // Total de comentarios
  }
  
  // **Estructura de respuesta de datos de la API**
  export interface Data {
    rspValue: string; // Valor de respuesta
    rspMessage: string; // Mensaje de respuesta
    rspParentKey: string; // Clave principal
    rspAppKey: string; // Clave de la aplicación
    rspPagination: RspPagination; // Información de paginación
    rspData: User[]; // Lista de usuarios
  }
  
  // **Información de paginación dentro de la respuesta de la API**
  export interface RspPagination {
    currentPage: number; // Página actual
    totalPageSize: number; // Tamaño total de la página
    totalResults: number; // Total de resultados
    totalPages: number; // Total de páginas
    hasNextPage: boolean; // Indicador de si hay más páginas
    hasPreviousPage: boolean; // Indicador de si hay páginas previas
    nextPageUrl: string; // URL de la siguiente página
    previousPageUrl: string; // URL de la página anterior
  }
  
  // **Interfaz para editar un usuario** (parcial de `NewUser`)
  export interface EditUser extends Partial<NewUser> {
    recIdeunikeyReus: number; // Clave única requerida para identificar al usuario en edición
  }
  
  // **Props para el componente `UsersTable`**
  export interface UsersTableProps {
    count?: number; // Total de usuarios
    page?: number; // Página actual
    rows?: User[]; // Lista de usuarios a mostrar
    rowsPerPage?: number; // Cantidad de usuarios por página
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRefresh: () => void; // Método para refrescar la lista de usuarios
  }
  
  // **Props para el componente `EditUserModal`**
  export interface UserEditModalProps {
    open: boolean; // Estado del modal (abierto/cerrado)
    onClose: () => void; // Método para cerrar el modal
    user: EditUser | null; // Usuario seleccionado para editar
    onSave: (updatedUser: EditUser) => void; // Método para guardar cambios
  }
  