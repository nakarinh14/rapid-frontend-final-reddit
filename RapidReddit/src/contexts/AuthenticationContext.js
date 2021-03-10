import React from 'react'

export default React.createContext({
    user: null,
    isLoggedIn: () => {},
    loginUser: (user) => {},
    logoutUser: () => {}
})
