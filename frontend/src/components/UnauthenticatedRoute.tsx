import React, { cloneElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

function querystring(name: string, url = window.location.href): string | boolean {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute(props: any): JSX.Element {
  const { isAuthenticated } = useAppContext();
  const { children } = props;
  const redirect = querystring("redirect");

  if (isAuthenticated) {
    return <Navigate to={redirect?.toString() || "/"} />;
  }

  return cloneElement(children, props);
}
