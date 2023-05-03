<template>
    <ul class="line-col-list" v-if="listData.length > 1">
        <li class="line-text" v-for="(item, index) in listData" :key="index">
            <a class="list-link" v-if="item.link" :href="item.href">{{ item.info }}</a>
            <span v-else>{{ item.info }}</span>
        </li>
    </ul>
    <div class="line-text" v-else>{{ listData[0].info }}</div>
</template>

<script>
export default {
    props: {
        listData: Array,
    },
}
</script>
