<template>
    <!--  <ul class="line-row-list" v-if="listData.length > 1">-->
    <ul class="line-row-list" v-if="listData.length > 1">
        <li :class="[isNum ? 'num-text' : 'line-text']" v-for="(item, index) in listData" :key="index">
            <span class="num" v-if="isNum">{{ addZeroNum(listData, index + 1) }}</span>{{ item }}
        </li>
    </ul>
    <div v-else class="line-text"><span class="num">01</span>{{ listData[0] }}</div>
</template>

<script>
export default {
    props: {
        listData: Array,
        isNum: Boolean,
    },
    computed: {
        addZeroNum() {
            return (el, index) => {
                if (el.length >= 100) {
                    if (index < 10) {
                        return '00' + index;
                    } else if (index < 100) {
                        return '0' + index;
                    } else {
                        return index;
                    }
                } else {
                    if (index < 10) {
                        return '0' + index;
                    } else {
                        return index;
                    }
                }
            };
        }
    },
}
</script>
