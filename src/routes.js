import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import TeamsList from './views/TeamsList';
import TeamForm from './views/TeamForm';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/quimioterapia" />
  },
  {
    path: "/quimioterapia",
    layout: DefaultLayout,
    component: Quimioterapia
  },
  {
    path: "/quimioterapia/:id",
    layout: DefaultLayout,
    component: ShowQuimioterapia
  },
  {
    path: "/admnQuimioterapia",
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
