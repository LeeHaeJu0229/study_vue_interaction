<template>
    <div class="sort-type-box js-sort-type-box">
        <ul class="sort-type-list js-sort-type-list">
            <li class="sort-type active">
                <button type="button" class="btn-sort-type" @click="onClickSortSelect">Gallery</button>
            </li>
            <li class="sort-type">
                <button type="button" class="btn-sort-type" @click="onClickSortSelect">Index</button>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {PROJECT_SWIPER_HIDE} from "@/store/store";

export default {
  computed: {
    ...mapState(['sortType'])
  },
  methods: {
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
  },
}
</script>
