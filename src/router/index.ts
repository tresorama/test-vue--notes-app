import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotesView_Flowbite from '../views/with-flowbite/NotesView.vue';
import NotesView_PrimeVue from '../views/with-primevue/NotesView.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/with-flowbite',
      component: NotesView_Flowbite,
    },
    {
      path: '/with-primevue',
      component: NotesView_PrimeVue,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});
