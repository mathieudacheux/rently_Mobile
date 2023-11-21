// const BASE_ROUTE_API = 'https://back-rently.mathieudacheux.fr'
const BASE_ROUTE_API = 'http://0.0.0.0:8083'

const ROUTE_API = {
  // Auth
  AUTH: `${BASE_ROUTE_API}/authentifications`,
  // Role
  ROLE: `${BASE_ROUTE_API}/roles`,
  // User by mail
  USER_BY_MAIL: `${BASE_ROUTE_API}/users/users_filter?mail=`,
  // Property filters
  PROPERTY_FILTERS: `${BASE_ROUTE_API}/properties/properties_filter?`,
  // Property types
  PROPERTY_STATUS: `${BASE_ROUTE_API}/statuses`,
  // All images
  IMAGES: `${BASE_ROUTE_API}/file/img/`,
  // Address
  ADDRESS: `${BASE_ROUTE_API}/addresses/`,
  // Chat
  GET_CHAT: `${BASE_ROUTE_API}/messages`,
  POST_CHAT: `${BASE_ROUTE_API}/messages`,
}

export { BASE_ROUTE_API, ROUTE_API }
