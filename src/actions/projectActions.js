// For creating new project
export const createProject = (formData, userId) => {
     return {
          type: "CREATE_PROJECT_START",
          payload: {
               formData, userId
          }
     }
}

// For removing a project
export const deleteProject = (id) => {
     return {
          type: 'DELETE_PROJECT_START',
          id
     }
}

//For getting projects
export const getProject = () => {
     return {
          type: "GET_PROJECTS_START"
     }
}

// For adding a task
export const addTask = (newTask, id) => {
     return {
          type: "ADD_TASK_START",
          payload: {
               newTask,
               id
          }
     }
}

//For adding a user
export const addUser = (userData, id) => {
     return {
          type: "ADD_USER_START",
          payload: {
               userData,
               id
          }
     }
}

// For removing a user from a projects
export const removeUser = (userId, id) => {
     return {
          type: "REMOVE_USER_START",
          payload: {
               userId, 
               id
          }
     }
}

//For removing a task
export const removeTask = (taskId, id) => {
     return {
          type: "REMOVE_TASK_START",
          payload: {
               taskId, 
               id
          }
     }
}

//For editing task
export const editTask = (taskId, id, editedTask) => {
     return {
          type: "EDIT_TASK_START",
          payload: {
               taskId,
               id,
               editedTask
          }
     }
}

//For editing task status
export const editTaskStatus = (taskId, id, status) => {
     return {
          type: "EDIT_TASKSTATUS_START",
          payload: {
               taskId,
               id, 
               status
          }
     }
}