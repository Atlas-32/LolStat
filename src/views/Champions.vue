<template>
    <div>
        <NaviHead activeIndex="1"></NaviHead>
        <div class="addChamp" @click="addChampCube">添加英雄</div>
        <div>
            <ChampCube
                v-for="(champCube,i) in champCubes"
                :key="champCube"
                @deleteChampCube="deleteChampCube(i)"
            ></ChampCube>
        </div>
    </div>
</template>

<script>
import NaviHead from "@/components/NaviHead.vue";
import ChampCube from "@/components/ChampCube.vue";

export default {
    name: "Champions",
    components: {
        NaviHead,
        ChampCube
    },
    data() {
        return {
            champCubes: [],
            champCubesCnt: 0
        };
    },
    methods: {
        addChampCube() {
            this.champCubes.push(this.champCubesCnt);
            this.champCubesCnt++;
        },
        deleteChampCube(i) {
            this.champCubes.splice(i, 1);
        }
    }
};
</script>

<style>
.addChamp {
    border-style: dashed;
    border-width: 2.5px;
    border-radius: 10px;
    height: 100px;
    line-height: 100px;
    margin: 10px;
    text-align: center;
    font-weight: bold;
}
</style>