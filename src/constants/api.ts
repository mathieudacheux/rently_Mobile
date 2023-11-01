const BASE_ROUTE_API = 'https://back-rently.mathieudacheux.fr'

const ROUTE_API = {
  // Auth
  AUTH: `${BASE_ROUTE_API}/authentifications`,
  // Role
  ROLE: `${BASE_ROUTE_API}/roles`,
  // User by mail
  USER_BY_MAIL: `${BASE_ROUTE_API}/users/users_filter?mail=`,
}

export { ROUTE_API }
