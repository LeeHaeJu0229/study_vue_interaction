import Vue from 'vue'
import VueRouter from 'vue-router'
import store, {PROJECT_SWIPER_HIDE, SORT_HIDE} from '../store/store'

import HomeMain from '../views/HomeMain.vue'
import MenuList from "../views/MenuList";
import SubLayout from '../views/SubLayout.vue'

// import ProjectGallery from '../components/ProjectGallery.vue'
// import ProjectIndex from '../components/ProjectIndex.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'main', component: HomeMain,
        // children: [
        //     { path: 'gallery', component: ProjectGallery },
        //     { path: 'index', component: ProjectIndex},
        // ],
    },
    { path: '/menu-list', name: 'menu', component: MenuList },
    { path: '/project/:id', name: 'project', component: SubLayout },
]

const router = new VueRouter({
    // mode: 'history',
    routes,
    store,
    linkExactActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
        // 라우터 이동시 스크롤 위치 적용
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    const projectSwiperTl = store.state.projectSwiperTl;
    const sortType = store.state.sortType;

    // 화면 이동 시 제어 필요 내역
    // if (document.getElementById('wrap').classList.contains('menu-list')){
    //     document.getElementById('wrap').classList.remove('menu-list');
    // }

    // 메인 화면에서 이동할 때
    if (from.name === 'main'){
        store.commit(SORT_HIDE);

        switch(sortType){
            case 'gallery' :
                store.commit(PROJECT_SWIPER_HIDE);
                projectSwiperTl.call(() => {
                    next();
                })
                break;
            case 'index' :
                next();
                break;
            default :
                return;
        }
    } else {
        next();
    }
})

export default router
