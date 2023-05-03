<template>
    <!-- S: header-wrap -->
    <header class="header-wrap">
        <div class="sec">
            <!-- S: nav-wrap -->
            <nav class="nav-wrap">
                <div class="logo-box">
                    <h1 class="logo">
                        <button type="button" class="logo-link" @click="onGoHome">Vue<span class="fz-sm">Demo</span></button>
                    </h1>
                </div>
                <div class="sort-type-box js-sort-type-box">
                    <ul class="sort-type-list js-sort-type-list">
                        <li class="sort-type active">
<!--                            <router-link to="/gallery" class="btn-sort-type">Gallery</router-link>-->
                            <button type="button" class="btn-sort-type" @click="onClickSortSelect">Gallery</button>
                        </li>
                        <li class="sort-type">
<!--                            <router-link to="/index" class="btn-sort-type">Index</router-link>-->
                            <button type="button" class="btn-sort-type" @click="onClickSortSelect">Index</button>
                        </li>
                    </ul>
                </div>

                <div class="menu-btn-box">
                    <button class="btn-menu-list" @click="onToggleMenuList">{{ menuBtnText }}</button>
                </div>
            </nav>
            <!-- E: nav-wrap -->
        </div>
    </header>
    <!-- E: header-wrap -->
</template>

<script>
import {mapState} from "vuex";
import {MAIN_INIT, PROJECT_SWIPER_HIDE} from "@/store/store";

export default {
    data(){
        return {
            menuPath: '/menu-list',
            menuBtnText: 'Menu',
        }
    },
    computed: {
        ...mapState(['sortType'])
    },
    methods: {
        onGoHome(){
            if (this.$route.path !== '/') {
                this.$router.push({path: '/'})
            } else {
                this.$store.commit(MAIN_INIT);
            }
        },
        onClickSortSelect(e) {
            const selectedType = e.target.innerText.toLowerCase();
            const sortTypeList = document.querySelectorAll('.js-sort-type-box .js-sort-type-list li');

            if (this.sortType !== selectedType){
                console.log(`sort change :: ${this.sortType} -> ${selectedType}`)

                sortTypeList.forEach((item) => {
                    item.classList.remove('active');
                })
                e.target.parentNode.classList.add('active');

                switch(this.sortType){
                    case 'gallery' :
                        this.$store.commit(PROJECT_SWIPER_HIDE);
                        this.$store.state.projectSwiperTl.call(() => {
                            this.$store.state.sortType = selectedType;
                        })
                        break;
                    case 'index' :
                        this.$store.state.sortType = selectedType;
                        break;
                    default :
                        return;
                }
            }
        },
        onToggleMenuList() {
            if (this.$route.path !== this.menuPath) {
                this.$router.push({path: this.menuPath})
            } else {
                this.$router.go(-1)
            }

            // document.getElementById('wrap').classList.toggle('menu-list');
        },
    },
}
</script>
