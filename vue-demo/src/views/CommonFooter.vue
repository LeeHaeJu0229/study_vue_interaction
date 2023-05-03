<template>
    <footer class="footer-wrap">
        <div class="sec">
            <div class="footer-info-wrap">
                <line-col-list :list-data="companyInfoList"></line-col-list>
            </div>
        </div>
    </footer>
</template>

<script>
import {mapState} from "vuex";
import LineColList from "../components/LineColList";

export default {
    components: {
        LineColList,
    },
    computed: {
        ...mapState({
            companyInfoList: state => state.companyInfoList,
        }),
    },
}
</script>
