import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

import SortTypeBox from "../components/SortTypeBox";

import {gsap} from "gsap";
gsap . config ({
    nullTargetWarn : false ,
});

// S: Data
export const projectTypeList = [
    {id: 'prjType1', type: 'Commercial'},
    {id: 'prjType2', type: 'Residential'},
    {id: 'prjType3', type: 'Conservation'},
    {id: 'prjType4', type: 'In Development'},
];

export const projectList = [
    {
        id: 'prj1',
        type: 'prjType3',
        company: 'prj1 Company',
        date: 2021,
        title: 'Nang-Kong Project 01',
        subTitle: 'Bathing Safely',
        desc: 'A comprehensive redevelopment of this former shopping centre, which will be transformed from a vacant building to a vibrant skills hub, at this important gateway to Worksop town centre, supporting a sense of place.',
        listThumb: 'temp/temp_work_thumb_01.jpg',
        detailThumb: 'temp/temp_work_thumb_01.jpg',
        workItem: [
            'Site Analysis',
            'Concept Design',
            'Heritage Statements',
            'Listed Building Consent',
            'Visualisations',
            'Technical Design'
        ],
    },
    {
        id: 'prj2',
        type: 'prjType1',
        company: 'prj2 Company',
        date: 2020,
        title: 'Nang-Kong Project 02',
        subTitle: 'Feed and ChuruChuru',
        desc: 'An imaginative repurposing of this prominent site, creating a range of bespoke city living apartments, with extensive city views.',
        listThumb: 'temp/temp_work_thumb_02.jpg',
        detailThumb: 'temp/temp_work_thumb_02.jpg',
        workItem: [
            'Concept Design',
            'Planning Process',
            'Technical Design',
        ],
    },
    {
        id: 'prj3',
        type: 'prjType4',
        company: 'prj3 Company',
        date: 2019,
        title: 'Nang-Kong Project 03',
        subTitle: 'Play with Toys ',
        desc: 'Practical completion achieved at 1 Bow Lane, London.',
        listThumb: 'temp/temp_work_thumb_03.jpg',
        detailThumb: 'temp/temp_work_thumb_03.jpg',
        workItem: [
            'On Site Assistance',
            'Concept Design',
            'Planning Process',
            'Technical Design',
        ],
    },
    {
        id: 'prj4',
        type: 'prjType2',
        company: 'prj4 Company',
        date: 2018,
        title: 'Nang-Kong Project 04',
        subTitle: 'Clipping Nail',
        desc: 'New lease of life for mid 18th century waterfront warehouse.',
        listThumb: 'temp/temp_work_thumb_04.jpg',
        detailThumb: 'temp/temp_work_thumb_04.jpg',
        workItem: [
            'Site Analysis',
            'Heritage Statements',
        ],
    },
    {
        id: 'prj5',
        type: 'prjType3',
        company: 'prj5 Company',
        date: 2017,
        title: 'Nang-Kong Project 05',
        subTitle: 'Be Nice, Be Happy',
        desc: 'A transformation of this dormer bungalow sited in the heart of the village Conservation Area. The dwelling has been re-elevated to better reflect its context to the front, and to provide a contemporary aesthetic to the rear.',
        listThumb: 'temp/temp_work_thumb_05.jpg',
        detailThumb: 'temp/temp_work_thumb_05.jpg',
        workItem: [
            'Concept Design',
            'Site Analysis',
            'Heritage Statements',
            'Planning Process',
            'Technical Design',
        ],
    },
];

export const companyInfoList = [
    {id: 'ci1', link: false, info: `Create a new HJ's Space`},
    {id: 'ci2', link: false, info: '© 2021'},
    {id: 'ci3', link: true, href: '#', info: 'BROCHURE'},
    {id: 'ci4', link: true, href: '#', info: 'REQUEST'},
    {id: 'ci5', link: true, href: '#', info: 'Facebook'},
    {id: 'ci6', link: true, href: '#', info: 'Instagram'},
];
// E: Data

// S: mutations
export const MAIN_INIT = 'MAIN_INIT';
export const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS';
export const HAS_FOOTER = 'HAS_FOOTER';
export const PROJECT_SWIPER_SHOW = 'PROJECT_SWIPER_SHOW';
export const PROJECT_SWIPER_HIDE = 'PROJECT_SWIPER_HIDE';
export const SORT_HIDE = 'SORT_HIDE';
// E: mutations

export default new Vuex.Store({
    state: {
        isLoading: true,
        hasFooter: true,
        sortType: null,
        sortBox: SortTypeBox,
        projectSwiperEl: null,
        projectSwiperTl: gsap.timeline(),
        projectTypeList,
        projectList,
        companyInfoList,
    },
    mutations: {
        [MAIN_INIT](state) {
            state.sortType = 'gallery'
            state.hasFooter = false;

            const sortTypeLi = document.querySelectorAll('.js-sort-type-box .js-sort-type-list li');
            if (sortTypeLi.length > 0){
                sortTypeLi.forEach((item) => {
                    item.classList.remove('active')
                })
                sortTypeLi[0].classList.add('active');
            }
        },
        [UPDATE_LOADING_STATUS](state, payload) {
            state.isLoading = payload.isLoading;
        },
        [HAS_FOOTER](state, status) {
            state.hasFooter = status;
        },
        // project slide animation
        [PROJECT_SWIPER_SHOW](state, swiper){
            state.projectSwiperEl = swiper.$el;

            const wrap = document.getElementsByClassName('project-swiper-wrap')[0];
            const filter = wrap.querySelector('.project-filter-list');

            const slide = state.projectSwiperEl.querySelectorAll('.project-item');
            const thumb = [];
            const thumbImg = [];
            const info = [];

            slide.forEach((slide) => {
                thumb.push(slide.querySelectorAll('.thumb-wrap')[0])
                thumbImg.push(slide.querySelectorAll('.thumb-wrap .img-box > img')[0])
                info.push(slide.querySelectorAll('.info-wrap')[0])
            })

            state.projectSwiperTl.clear()
                .set(slide,
                    {opacity: 1, x: 0})
                .set(thumb,
                    {opacity: 1, x: 150})
                .set(thumbImg,
                    {x: 100})
                .set(info,
                    {opacity: 1});

            state.projectSwiperTl.add('start')
                .fromTo(thumb,
                    {opacity: 0, x: 50},
                    {opacity: 1, x: 0, duration: 0.6, ease:"circ.out"})
                .fromTo(thumbImg,
                    {x: 50},
                    {x: 0, duration: 0.8, ease:"circ.out"}, 'start')
                .fromTo(filter,
                    {opacity: 0},
                    {opacity: 1, duration: 0.6}, 'start')
                .fromTo(info,
                    {y: '100%'},
                    {y: 0, duration: 0.6, ease:"circ.out"}, "<0.45")
        },
        [PROJECT_SWIPER_HIDE](state){
            const wrap = document.getElementsByClassName('project-swiper-wrap')[0];
            const filter = wrap.querySelector('.project-filter-list');

            const slide = state.projectSwiperEl.querySelectorAll('.project-item');
            const thumbImg = [];

            slide.forEach((slide) => {
                thumbImg.push(slide.querySelectorAll('.thumb-wrap .img-box > img')[0])
            })

            state.projectSwiperTl.clear()
                .add('start')
                .to(slide,
                    {opacity: 0, x: -50, duration: 0.4, ease:"circ.out"})
                .to(filter,
                    {opacity: 0, duration: 0.4}, 'start')
                .to(thumbImg,
                    {x: -150, duration: 0.4, ease:"circ.in",
                        onStart() {
                            wrap.classList.add('is-move');
                        }}, '>-0.3')
        },
        [SORT_HIDE](){
            const sortBox = document.querySelector('.sort-type-box');
            const sortHide = gsap.to(".sort-type-box", {
                y: -10, opacity: 0, duration: 0.6, ease: "circ.out",
                onComplete() {
                    sortBox.remove();
                }
            });
            sortHide.play();
        },
    },
    getters: {
        getLoadingStatus(state) {
            return state.isLoading
        },
    },
    actions: {},
    modules: {},
})
