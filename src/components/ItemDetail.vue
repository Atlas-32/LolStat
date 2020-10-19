<template>
    <div class="card">
        <div class="card-body">
            <div class="cardItemName">{{item["name"]}}</div>
            <div class="cardItemDescription" v-html="item['description']">{{item["description"]}}</div>
            <div class="cardItemGold">
                价格：
                <span class="cardItemGoldSpan">{{item['gold']['total']}}</span>
            </div>
            <div class="cardItemInto" v-if="item.hasOwnProperty('into')">
                可以合成：
                <div>
                    <div v-for="(intoItem,i) in item['into']" :key="i">{{allItem[intoItem]["name"]}}</div>
                </div>
            </div>
            <div class="cardItemFrom" v-if="item.hasOwnProperty('from')">
                合成所需：
                <div>
                    <div v-for="(fromItem,i) in item['from']" :key="i">{{allItem[fromItem]["name"]}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import itemJson from "../data/itemJson.js";

export default {
    name: "ItemDetail",
    props: {
        item: Object
    },
    data() {
        return {
            allItem: itemJson
        };
    }
};
</script>

<style>
.card {
    background-color: black !important;
    color: white;
    text-align: left;
    width: 300px;
    font-size: 0.8rem;
}
.cardItemName {
    color: rgb(0, 255, 0);
    font-weight: bold;
}
.cardItemGoldSpan {
    color: gold;
}
</style>