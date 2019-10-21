// For getting users
export const getUsers = () => {
     return {
          type: "GET_USERS_START"
     }
}

// For finding is admin
export const isAdmin = (id) => {
     return {
          type: "IS_ADMIN_START",
          id
     }
}