// errorCodes.ts
export const ErrorCodes = {
  // Autenticazione e autorizzazione
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  UNAUTHORIZED: "UNAUTHORIZED",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  PERMISSION_DENIED: "PERMISSION_DENIED",

  // Operazioni CRUD
  ENTITY_CREATION_FAILED: "ENTITY_CREATION_FAILED",
  ENTITY_UPDATE_FAILED: "ENTITY_UPDATE_FAILED",
  ENTITY_DELETION_FAILED: "ENTITY_DELETION_FAILED",
  ENTITY_RETRIEVAL_FAILED: "ENTITY_RETRIEVAL_FAILED",
  ENTITIES_LIST_FAILED: "ENTITIES_LIST_FAILED",

  // Errori database
  DUPLICATE_ENTITY: "DUPLICATE_ENTITY",
  ENTITY_NOT_FOUND: "ENTITY_NOT_FOUND",
  DATABASE_CONNECTION_ERROR: "DATABASE_CONNECTION_ERROR",
  TRANSACTION_FAILED: "TRANSACTION_FAILED",
  QUERY_TIMEOUT: "QUERY_TIMEOUT",

  // Errori di validazione
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
  INVALID_ID_FORMAT: "INVALID_ID_FORMAT",
  INVALID_DATE_FORMAT: "INVALID_DATE_FORMAT",
  INVALID_EMAIL_FORMAT: "INVALID_EMAIL_FORMAT",
  INVALID_PAGINATION_PARAMS: "INVALID_PAGINATION_PARAMS",

  // Errori di rete
  NETWORK_ERROR: "NETWORK_ERROR",
  API_TIMEOUT: "API_TIMEOUT",
  CORS_ERROR: "CORS_ERROR",

  // Errori server
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  MAINTENANCE_MODE: "MAINTENANCE_MODE",

  // Errori file system
  FILE_UPLOAD_FAILED: "FILE_UPLOAD_FAILED",
  FILE_DELETION_FAILED: "FILE_DELETION_FAILED",
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",
};
