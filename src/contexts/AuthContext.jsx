import React, { createContext, useState } from "react";

const AuthContext = createContext({
    user: null,
    token: "",
    isAuth: false,
    setUser: () => {},
    setToken: () => {},
    setIsAuth: () => {},
});

export default AuthContext;