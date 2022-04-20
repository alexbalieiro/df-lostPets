import { Router } from "@vaadin/router";
import "./pages/home";
import "./pages/signin";
import "./pages/register";
import "./pages/report";
import "./pages/report-edit";
import "./pages/mypets";
const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/signin", component: "signin-page" },
  { path: "/register", component: "register-page" },
  { path: "/report", component: "report-page" },
  { path: "/report-edit", component: "reportedit-page" },
  { path: "/my-pets", component: "mypets-page" },
]);
