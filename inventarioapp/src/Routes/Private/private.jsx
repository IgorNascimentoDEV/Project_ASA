import React, { useContext } from "react";
import { Route, Navigate } from 'react-router-dom';
import StoreContext from "../../contexts/context";

const RoutesPrivate = ({ component: Component, ...rest }) => {
    const { token } = useContext(StoreContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default RoutesPrivate;
