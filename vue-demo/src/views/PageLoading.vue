<template>
    <transition appear @enter="enterLoading(800)">
        <div class="page-loading-wrap">
            <div class="loading-bg-box">
                <div class="loading-bg lt-bg"></div>
                <div class="loading-bg rt-bg"></div>
            </div>

            <div class="loading-text-box">
                <div class="loading-text">JUST A SEC...</div>
            </div>
        </div>
    </transition>
</template>

<!--@leave="leaveLoading"-->

<script>
import { mapState } from "vuex";
import { UPDATE_LOADING_STATUS } from "@/store/store";

import { gsap } from "gsap";

export default {
    computed: {
        ...mapState(['isLoading']),
    },
    methods: {
        // loading animation
        enterLoading(completeTime){
            const _this = this;
            const hideTimer = completeTime / 1000;

            const textBox = document.querySelector('.page-loading-wrap > .loading-text-box .loading-text');
            const bgEle = document.querySelectorAll('.page-loading-wrap > .loading-bg-box .loading-bg');

            let tl = gsap.timeline();
            tl.fromTo(textBox,
                {opacity: 0, y: '20vh'},
                {opacity: 1, y: 0, duration: 0.6}
            ).to(textBox,
                {opacity: 0, y: '-20vh', duration: 0.6}, hideTimer
            ).fromTo(bgEle,
                {scaleY: 1},
                {scaleY: 0, duration: 0.6,
                    onComplete: () =>{
                        if (_this.isLoading) {
                            this.$store.commit(UPDATE_LOADING_STATUS, { isLoading: false })
                        }
                    }}, '>0.15'
            )
        },
    },
    mounted() {
    },
}
</script>
