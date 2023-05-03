<template>
    <!-- S: project list - index type -->
    <div class="gallery-index-wrap" v-if="projectList.length > 0">
        <div class="project-thumb-wrap">
            <div class="img-box">
                <img :src="require(`@/assets/images/temp/temp_work_thumb_01.jpg`)" :alt="`work item 1 thumb`">
            </div>
        </div>

        <div class="project-list-wrap">
            <ul class="project-type-list" v-if="projectList.length > 1">
                <!-- S: repeat -->
                <li class="project-type" v-for="typeItem in projectTypeList" :key="typeItem.id">
                    <div class="project-type">{{ typeItem.type.toUpperCase() }}</div>

                    <ul class="project-list" v-if="!checkProjectTypeList(typeItem.id)">
                        <template v-for="projectItem in projectList">
                            <li class="project-item" :key="projectItem.id" v-if="typeItem.id === projectItem.type">
                                <router-link :to="{ name: 'project', params: { id: projectItem.id }, query: { title: projectItem.title } }" class="project-link">
                                    <div class="info-wrap">
                                        <div class="date-box">
                                            <div class="company-name">{{ projectItem.company }}</div>
                                            <div class="project-date">{{ projectItem.date }}</div>
                                        </div>
                                        <div class="project-title">{{ projectItem.title }}</div>
                                    </div>
                                </router-link>
                            </li>
                        </template>
                    </ul>

<!--                    <no-data v-else></no-data>-->
                </li>
                <!-- E: repeat -->
            </ul>
            <div class="project-type-list" v-else v-for="projectItem in projectList" :key="projectItem.id">
<!--                <div class="project-type">{{ inputProjectType }}</div>-->
                <div class="project-list">
                    <div class="project-item" :key="projectItem.id">
                        <router-link :to="{ name: 'project', params: { id: projectItem.id }, query: { title: projectItem.title } }" class="project-link">
                            <div class="info-wrap">
                                <div class="date-box">
                                    <div class="company-name">{{ projectItem.company }}</div>
                                    <div class="project-date">{{ projectItem.date }}</div>
                                </div>
                                <div class="project-title">{{ projectItem.title }}</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- E: project list - index type -->

    <no-data v-else></no-data>
</template>

<script>
import {mapState} from "vuex";
// import {gsap} from "gsap";

import NoData from '../components/NoData'

export default {
    components: {
        NoData,
    },
    computed: {
        ...mapState(['projectTypeList', 'projectList']),
    },
    methods: {
        // 타입별 프로젝트 데이터 유무 check
        checkProjectTypeList(type) {
            let hasTypeCnt;
            hasTypeCnt = 0;
            this.$store.state.projectList.forEach(function(item) {
                if (item.type === type) {
                    hasTypeCnt++;
                }
            })
            return !(hasTypeCnt > 0);
        },
        inputProjectType() {
            console.log('d')
        },
    },
}
</script>