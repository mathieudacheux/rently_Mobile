const BASE_ROUTE_API = 'https://back-rently.mathieudacheux.fr'

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
}

export { ROUTE_API }
