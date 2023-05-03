<template>
    <div class="icon-arr-wrap">
        <div class="icon-arr-box">
            <transition
                appear
                @enter="enterArrBox"
                @leave="leaveArrBox"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-arr" viewBox="0 0 157.381 157.38">
                <g data-name="Group 66" fill="none" stroke="currentColor" stroke-width="14">
                    <path data-name="Path 1" d="M20.352 104.704l84.352-.001.001-84.353"></path>
                    <path data-name="Path 2" d="M104.704 104.704L4.95 4.95"></path>
                </g>
            </svg>
            </transition>
        </div>
    </div>
</template>

<script>
    import {gsap} from "gsap";

    export default {
        data(){
            return {
                arrBoxTl: gsap.timeline(),
            }
        },
        methods: {
            enterArrBox(el) {
                gsap.timeline().to(el, {
                    x: '0', y: '0',
                    duration: 0.7,
                    // delay: 0.6,
                    ease: "showHideEase"
                });
            },
            leaveArrBox(el) {
                console.log(el)
            },
        },
    }
</script>