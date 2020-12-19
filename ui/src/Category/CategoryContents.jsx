import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import categoryRoutes from "./categoryRoutes.js";

export default function CategoryContents() {
    return (
        <Switch>
            {categoryRoutes.map(attrs => <Route {...attrs} key={attrs.path} />)}
        </Switch>
    );
}
