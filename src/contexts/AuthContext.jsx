import React, { createContext, useState } from "react";

const AuthContext = createContext({
    user: null,
    token: null,
    isAuth: false,
    setUser: () => {},
    setToken: () => {},
    setIsAuth: () => {},
});

export default AuthContext;
