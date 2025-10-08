import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/loginpage.vue";
import Dashboard from "@/views/dashboard.vue";
import Profile from "@/views/profile.vue";
import Progress from "@/views/progress.vue";
import Checkin from "@/views/checkin.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const routes = [
  { path: "/", redirect: { name: "Login" } },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { requiresUnauth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/progress",
    name: "Progress",
    component: Progress,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkin",
    name: "Checkin",
    component: Checkin,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser();

  if (to.meta.requiresAuth && !currentUser) {
    next({ name: "Login " }); // if auth required and user not logged in
  } else {
    next();
  }
});

export default router;
