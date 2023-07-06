import React, { Children } from "react";
import context from "./context";
import useStorage from "../utils/useStorage";

const StoreProvider = ({children}) => {
    const [token, setToken] = useStorage('token')

    return (
        <context.Provider
            value={{
                token,
                setToken
            }}
        >
            {children}
        </context.Provider>
    )
}

export default StoreProvider;