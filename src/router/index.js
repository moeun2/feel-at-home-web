import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Diary from "@/views/Diary.vue";
import Music from "@/views/Music.vue";
import Calendar from "@/components/diary/Calendar.vue";
import Statics from "@/views/Statics.vue";
import VueYoutube from "vue-youtube";
import Player from "@/components/music/MusicPlayer.vue";
import Player2 from "@/components/music/MusicPlayer copy.vue";
import Player3 from "@/components/music/MusicPlayer copy 2.vue";
import About from "@/views/About.vue";
import Mypage from "@/views/Mypage.vue";
import Follow from "@/views/Follow.vue";
import Following from "@/components/follow/Following.vue";
import Follower from "@/components/follow/Follower.vue";
import Search from "@/components/follow/Search.vue";
import LikelistPage from "@/views/LikelistPage.vue";

Vue.use(VueRouter);
Vue.use(VueYoutube);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/diary",
    name: "Diary",
    component: Diary,
    redirect: "/diary/calendar",
    children: [
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar,
        beforeEnter: requireAuth,
      },
      {
        path: "statics",
        name: "Statics",
        component: Statics,
      },
    ],
  },
  {
    path: "/music",
    name: "Music",
    component: Music,
    props: true,
    children: [
      {
        path: "player/:q",
        name: "Player",
        component: Player,
      },
      {
        path: "player2/:q",
        name: "Player2",
        component: Player2,
      },
      {
        path: "player3/:q",
        name: "Player3",
        component: Player3,
      },
    ],
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/follow",
    name: "Follow",
    redirect: "/follow/search",
    component: Follow,
    props: true,
    children: [
      {
        path: "following",
        name: "Following",
        component: Following,
      },
      {
        path: "follower",
        name: "Follower",
        component: Follower,
      },
      {
        path: "search",
        name: "Search",
        component: Search,
      },
    ],
  },
  {
    path: "/likelist",
    name: "Likelist",
    component: LikelistPage,
  },
];

function requireAuth(to, from, next) {
  //const { $cookies } = router.app.config.globalProperties;
  let access_token = Vue.$cookies.get("user");
  console.log(access_token);
  if (access_token) {
    next();
  } else {
    alert("Please Login First🙏!");
    next("");
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
