import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/admin/propiedades",
          name: "admin-propiedades",
          component: () => import("../views/admin/AdminView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/admin/nueva",
          name: "nueva-propiedad",
          component: () => import("../views/admin/NuevaPropiedadView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/admin/editar/:id",
          name: "editar-propiedad",
          component: () => import("../views/admin/EditarPropiedadView.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

//Guard de navegacion
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  if (requiresAuth) {
    //Comporbamos que el usuario esté autentificado.
    try {
      await authenticateUser();
      next();
    } catch (error) {
      console.log(error);
      next({ name: "login" });
    }
  } else {
    //No está protegido por loque mostramos la vista.
    next();
  }
});

function authenticateUser() {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      unsuscribe();
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}

export default router;
