<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-select v-model="selectedChamp" filterable placeholder="请选择">
                <el-option
                    v-for="champ in champs"
                    :key="champ.value"
                    :label="champ.label"
                    :value="champ.value"
                ></el-option>
            </el-select>
            <el-button style="float: right; padding: 3px 0" type="text" @click="deleteChamp">X</el-button>
        </div>
        <el-slider class="levelSlider" v-model="level" show-input :max="18" :min="1"></el-slider>
        <div class="champStatBox">
            <div v-for="(champAttr,i) in champStatShowAttr" :key="i" class="champStat">
                <div class="champStatLeft">{{champAttr["zh"]}}</div>
                <div class="champStatRight">{{(stat[champAttr["en"]]).toFixed(2)}}</div>
            </div>
        </div>
    </el-card>
</template>

<script>
import championJson from "../data/championJson.js";

export default {
    name: "ChampCube",
    data() {
        return {
            champStatShowAttr: [
                { zh: "生命值", en: "hp" },
                { zh: "法力值", en: "mp" },
                { zh: "移动速度", en: "movespeed" },
                { zh: "护甲", en: "armor" },
                { zh: "魔法抗性", en: "spellblock" },
                { zh: "攻击范围", en: "attackrange" },
                { zh: "生命恢复", en: "hpregen" },
                { zh: "法力恢复", en: "mpregen" },
                { zh: "暴击", en: "crit" },
                { zh: "攻击力", en: "attackdamage" },
                { zh: "攻速", en: "attackspeed" }
            ],
            champs: [],
            selectedChamp: "",
            level: 1
        };
    },
    computed: {
        stat: function() {
            if (!championJson["data"].hasOwnProperty(this.selectedChamp)) {
                return {
                    hp: 0,
                    mp: 0,
                    movespeed: 0,
                    armor: 0,
                    spellblock: 0,
                    attackrange: 0,
                    hpregen: 0,
                    mpregen: 0,
                    crit: 0,
                    attackdamage: 0,
                    attackspeed: 0
                };
            } else {
                let j = championJson["data"][this.selectedChamp]["stats"];
                return {
                    hp: j["hp"] + (this.level - 1) * j["hpperlevel"],
                    mp: j["mp"] + (this.level - 1) * j["mpperlevel"],
                    movespeed: j["movespeed"],
                    armor: j["armor"] + (this.level - 1) * j["armorperlevel"],
                    spellblock:
                        j["spellblock"] +
                        (this.level - 1) * j["spellblockperlevel"],
                    attackrange: j["attackrange"],
                    hpregen:
                        j["hpregen"] + (this.level - 1) * j["hpregenperlevel"],
                    mpregen:
                        j["mpregen"] + (this.level - 1) * j["mpregenperlevel"],
                    crit: j["crit"] + (this.level - 1) * j["critperlevel"],
                    attackdamage:
                        j["attackdamage"] +
                        (this.level - 1) * j["attackdamageperlevel"],
                    attackspeed:
                        j["attackspeed"] +
                        (this.level - 1) * j["attackspeedperlevel"]
                };
            }
        }
    },
    mounted: function() {
        for (var i in championJson["data"]) {
            this.champs.push({
                value: i,
                label: championJson["data"][i]["name"]
            });
        }
    },
    methods: {
        deleteChamp() {
            this.$emit("deleteChampCube");
        }
    }
};
</script>

<style>
.levelSlider {
    margin: 2px 10px;
}
.champStatBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.champStat {
    width: 120px;
}
.champStatLeft {
    width: 80px;
    float: left;
    text-align: center;
}
.champStatRight {
    width: 40px;
    float: left;
    text-align: center;
}
.champStat:after {
    content: "";
    width: 120px;
}
</style>