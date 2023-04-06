import V1 from "./v1/index.js";

export const routes = [
  {
    url: "/api/v1/sample",
    route: V1.sampleRoute,
  },
  {
    url: "/api/v1/users",
    route: V1.usersRoute,
  },
];

export const addRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.url, route.route);
  });
};
