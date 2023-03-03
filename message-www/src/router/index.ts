import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export enum Pages {
  HOME = 'home',
  PRIVATE = 'private',
  ROOM = 'room',
  MESSAGE = 'message',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: Pages.HOME,
    component: HomeView
  },
  {
    path: '/private',
    name: Pages.PRIVATE,
    component: () => import(/* webpackChunkName: "private" */ '../views/PrivateView.vue')
  },
  {
    path: '/message/:username/:peerType',
    name: Pages.MESSAGE,
    component: () => import(/* webpackChunkName: "message" */ '../views/MessageView.vue')
  },
  {
    path: '/room',
    name: Pages.ROOM,
    component: () => import(/* webpackChunkName: "room" */ '../views/RoomView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
