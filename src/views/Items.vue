<template>
    <div>
        <NaviHead activeIndex="2"></NaviHead>
        <Item></Item>
    </div>
</template>

<script>
import NaviHead from "@/components/NaviHead.vue";
import itemJson from "../data/itemJson.js";
import Item from "../components/Item.vue"

export default {
    components: {
        NaviHead,
        Item
    },   
};
</script>
