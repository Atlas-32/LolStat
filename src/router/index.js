import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Items from "../views/Items.vue";
import Champions from "../views/Champions.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/items",
        name: "Items",
        component: Items,
    },
    {
        path: "/champions",
        name: "Champions",
        component: Champions,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
