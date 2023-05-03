<template>
    <!-- S: project list - default -->
    <div class="project-swiper-wrap" v-if="projectList.length > 0">
        <div class="project-filter-wrap">
            <ul class="project-filter-list">
                <li class="filter-item">
                    <button type="button" class="btn-project-type">ALL</button>
                </li>
                <li class="filter-item" v-for="typeItem in projectTypeList" :key="typeItem.id">
                    <button type="button" class="btn-project-type">{{ typeItem.type.toUpperCase() }}</button>
                </li>
            </ul>
        </div>

        <div class="project-list-wrap">
            <swiper class="project-list" ref="projectSwiper" :options="projectSwiperOpt">
                <!-- S: repeat -->
                <swiper-slide class="project-item" v-for="projectItem in projectList" :key="projectItem.id">
                    <router-link :to="{ name: 'project', params: { id: projectItem.id } }" class="project-link">
                        <div class="thumb-wrap">
                            <div class="img-box">
                                <img :src="require(`@/assets/images/${ projectItem.listThumb }`)" :alt="`${ projectItem.title } thumb`">
                            </div>
                            <div class="date-box">
                                <div class="company-name">{{ projectItem.company }}</div>
                                <div class="project-date">{{ projectItem.date }}</div>
                            </div>
                        </div>
                        <div class="info-wrap">
                            <div class="project-title">{{ projectItem.title }}</div>
                            <template v-for="type in projectTypeList">
                                <div class="project-type" :key="type.id" v-if="projectItem.type === type.id">{{ type.type }}</div>
                            </template>
                        </div>
                    </router-link>
                </swiper-slide>
                <!-- E: repeat -->
            </swiper>
        </div>
    </div>
    <!-- E: project list - default -->

    <no-data v-else></no-data>
</template>

<script>
import Vue from 'vue'
import {mapState} from "vuex";

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper);
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'

import NoData from '../components/NoData'
import {PROJECT_SWIPER_SHOW, PROJECT_SWIPER_HIDE} from "../store/store";

export default {
    components: {
        Swiper,
        SwiperSlide,
        NoData,
    },
    data() {
        return {
            // project list swiper
            projectSwiperOpt: {
                init: false,
                slidesPerView: 'auto',
                // spaceBetween: 130,
                loop: true,
                loopedSlides: 2,
                speed: 500,
                centeredSlides: true,
                grabCursor: true,
                freeMode: true,
                mousewheel: {
                    releaseOnEdges: true,
                },
            },
        }
    },
    computed: {
        ...mapState(['projectTypeList', 'projectList']),
        projectSwiperEl(){
            return this.$refs.projectSwiper;
        },
    },
    methods: {
        // project swiper init (수정 필요)
        projectSwiperInit() {
            const swiperWrap = this.$el;
            const slideLength = swiperWrap.querySelectorAll('.project-list .project-item').length;
            if(slideLength > 1){
                this.projectSwiperEl.$swiper.init();
            } else {
                swiperWrap.querySelector('.project-filter-wrap').remove();
                swiperWrap.classList.add('is-only');
            }
        },

        // project slide animation
        projectSlideShow() {
            this.$store.commit(PROJECT_SWIPER_SHOW, this.projectSwiperEl);
        },
        projectSlideHide() {
            this.$store.commit(PROJECT_SWIPER_HIDE);
        },
        projectMouseWheel() {
            console.log(this.projectSwiperEl.$el);
            // clearTimeout($.data(this, 'timer'));

            // $(".swiper-wrapper").addClass('mousewheel');


            // $.data(this, 'timer', setTimeout( function () {
            //     $(".swiper-wrapper").removeClass('mousewheel')
            //
            // }, 250));
        },
    },
    mounted() {
        if(this.$store.state.sortType === 'gallery'){
            this.projectSwiperInit();
            this.projectSlideShow();
        }

        this.$store.watch(() => this.$store.getters.getLoadingStatus, loading => {
            if (!loading){
                this.projectSlideShow();
            }
        })

        // document.querySelector('.project-swiper-wrap .project-list-wrap').addEventListener('mousewheel', this.projectMouseWheel)
    },
}
</script>