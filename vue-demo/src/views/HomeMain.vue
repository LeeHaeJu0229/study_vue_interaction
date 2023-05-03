<template>
    <!-- S: project-list -->
    <project-gallery v-if="sortType === 'gallery'"></project-gallery>
    <project-index v-else></project-index>
    <!-- E: project-list -->
</template>

<script>
import {mapState} from "vuex";

import ProjectGallery from "../components/ProjectGallery";
import ProjectIndex from "../components/ProjectIndex";
import {MAIN_INIT} from "@/store/store";

export default {
    components: {
        ProjectGallery,
        ProjectIndex,
    },
    computed: {
        ...mapState(['sortType']),
    },
    methods: {
        mainInit(){
            this.$store.commit(MAIN_INIT);
        },
    },
    mounted() {
        this.mainInit()
    },
    beforeDestroy() {
        this.$store.state.hasFooter = true;
    },
}
</script>
