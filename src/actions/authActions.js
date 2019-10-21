//For signing in
export const createUser = (formData) => {
    return {
        type: "CREATE_USER_START",
        formData
    }
}

//For logging in
export const signIn = (formData) => {
    return {
        type: 'SIGN_IN_START',
        formData
    }
}

//For logout
export const signOut = () => {
    return {
        type: 'SIGN_OUT_START'
    }
}
