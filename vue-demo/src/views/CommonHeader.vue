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
                <sort-type-box v-if="this.$route.name === 'main'"></sort-type-box>
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
import SortTypeBox from "../components/SortTypeBox";
import {MAIN_INIT} from "@/store/store";

export default {
  components: {
    SortTypeBox
  },
    data(){
        return {
            menuPath: '/menu-list',
            menuBtnText: 'Menu',
        }
    },
    methods: {
        onGoHome(){
            if (this.$route.path !== '/') {
                this.$router.push({path: '/'})
            } else {
                this.$store.commit(MAIN_INIT);
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
