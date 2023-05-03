<template>
    <div class="menu-list-wrap">
        MenuList 영역
    </div>
</template>

<script>
export default {
    mounted() {
        this.$parent.$data.menuBtnText = false;
    },
    beforeDestroy() {
        this.$parent.$data.menuBtnText = true;
    },
}
</script>
