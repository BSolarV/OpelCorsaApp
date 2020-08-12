import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Quimioterapia from "./views/Quimioterapia";
import ShowQuimioterapia from "./views/ShowQuimioterapia";
import AdminQuimioterapia from "./views/AdminQuimioterapia";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/quimioterapia" />
  },
  {
    path: "/quimioterapia",
    exact: true,
    layout: DefaultLayout,
    component: Quimioterapia
  },
  {
    path: "/quimioterapia/show/:id",
    exact: true,
    layout: DefaultLayout,
    component: ShowQuimioterapia
  },
  {
    path: "/quimioterapia/admin",
    exact: true,
    layout: DefaultLayout,
    component: AdminQuimioterapia
  },
  /*
  {
    path: "/teams-list",
    layout: DefaultLayout,
    component: TeamsList
  },
  {
    path: "/teams-form",
    layout: DefaultLayout,
    component: TeamForm
  },
  */
];
