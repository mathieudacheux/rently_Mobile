const BASE_ROUTE_API = 'https://back-rently.mathieudacheux.fr'

const ROUTE_API = {
  // Auth
  AUTH: `${BASE_ROUTE_API}/authentifications`,
  // Role
  ROLE: `${BASE_ROUTE_API}/roles`,
  // User by id
  USER_BY_ID: `${BASE_ROUTE_API}/users/`,
  // User by mail
  USER_BY_MAIL: `${BASE_ROUTE_API}/users/users_filter?mail=`,
  // Users filters
  USERS: `${BASE_ROUTE_API}/users/users_filter?`,
  // Property filters
  PROPERTY_FILTERS: `${BASE_ROUTE_API}/properties/properties_filter?`,
  // Property types
  PROPERTY_STATUS: `${BASE_ROUTE_API}/statuses`,
  // Property types
  PROPERTY_TYPES: `${BASE_ROUTE_API}/property_types`,
  // Appointments by id
  APPOINTMENT_BY_ID: `${BASE_ROUTE_API}/appointments/user/`,
  // Post property
  PROPERTY: `${BASE_ROUTE_API}/properties`,
  // Tags
  TAGS: `${BASE_ROUTE_API}/appointment_tags`,
  // All images
  IMAGES: `${BASE_ROUTE_API}/file/img/`,
  // Address
  ADDRESS: `${BASE_ROUTE_API}/addresses/`,
  // Get chat
  GET_CHAT: `${BASE_ROUTE_API}/messages`,
  // Post chat
  POST_CHAT: `${BASE_ROUTE_API}/messages`,
}

export { BASE_ROUTE_API, ROUTE_API }
