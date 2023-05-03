<template>
      <div class="project-detail-wrap">
          <div class="project-detail-header">
              <div class="project-img-box">
                  <img :src="require(`@/assets/images/${ projectThumb }`)" :alt="`${ projectTitle } thumb`">
              </div>

              <div class="project-info-box">
                  <icon-arr></icon-arr>

                  <div class="project-title">{{ projectTitle }}</div>
                  <div class="project-subtitle">{{ projectSubTitle }}</div>

                  <div class="line-box">
                      <div class="date-box">
                          <div class="company-name">Haeju</div>
                          <div class="project-date">{{ projectDate }}</div>
                      </div>
                      <div class="type-box">
                          <div class="project-type">{{ projectType }}</div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="project-detail-body">
              <section>
                  <div class="project-desc">{{ projectDesc }}</div>
                  <line-row-list :list-data="projectWorkItemList" :is-num="true"></line-row-list>
              </section>
          </div>

      </div>
</template>

<script>
import LineRowList from '../components/LineRowList'
import IconArr from "../components/IconArr";
import {mapState} from "vuex";

export default {
    components: {
        LineRowList,
        IconArr
    },
    data() {
        return {
            workId: this.$route.params.id,
        }
    },
    computed: {
        ...mapState(['projectTypeList', 'projectList']),
        projectType() {
            let projectType = '';
            for (let i = 0; i < this.projectTypeList.length; i++) {
                if (this.projectTypeList[i].id === this.checkProjectDetailData.type) {
                    projectType = this.projectTypeList[i].type
                }
            }
            return projectType;
        },
        checkProjectDetailData(){
            let detailData = {};
            for (let i = 0; i < this.projectList.length; i++) {
                if (this.projectList[i].id === this.workId) {
                    detailData = this.projectList[i]
                }
            }
            return detailData;
        },
        projectDate() {
            return this.checkProjectDetailData.date;
        },
        projectTitle() {
            return this.checkProjectDetailData.title;
        },
        projectSubTitle() {
            return this.checkProjectDetailData.subTitle;
        },
        projectDesc() {
            return this.checkProjectDetailData.desc;
        },
        projectThumb() {
            return this.checkProjectDetailData.detailThumb;
        },
        projectWorkItemList() {
            return this.checkProjectDetailData.workItem;
        },
    },
    mounted() {

    }
}
</script>
