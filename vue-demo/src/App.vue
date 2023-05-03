<template>
    <div id="wrap" class="wrap">
        <common-header></common-header>

        <div class="contents-wrap" v-visible="!this.isLoading">
            <div class="sec">
                <router-view></router-view>
            </div>
        </div>

        <common-footer v-if="this.hasFooter"></common-footer>

        <page-loading v-if="this.isLoading"></page-loading>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from "vuex";

import CommonHeader from './views/CommonHeader'
import CommonFooter from './views/CommonFooter'
import PageLoading from './views/PageLoading'


Vue.directive('visible', function (el, binding) {
    el.style.visibility = binding.value ? 'visible' : 'hidden';
})

export default {
    components: {
        CommonHeader,
        CommonFooter,
        PageLoading,
    },
    computed: {
        ...mapState(['isLoading', 'hasFooter']),
    },
}
</script>

<style>
@import 'assets/css/reset.css';
@import 'assets/css/vuedemo.css';
</style>
