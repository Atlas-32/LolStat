<template>
    <div>
        <div>
            <el-radio-group v-model="radio">
                <el-radio :label="0">全部显示</el-radio>
                <el-radio :label="1">基础属性</el-radio>
                <el-radio :label="2">成长属性</el-radio>
            </el-radio-group>
            <el-slider v-model="sliderValue" show-input :max="18" :min="1"></el-slider>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="image" label=" " width="64" fixed="left">
                    <template scope="scope">
                        <img class="championImg" :src="scope.row.image" />
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="姓名" width="100" fixed="left"></el-table-column>
                <el-table-column prop="tags" label="定位" width="180">
                    <template slot-scope="scope">
                        <el-tag
                            class="championTags"
                            v-for="(tag,i) in scope.row.tags"
                            :key="i"
                            type
                            effect="dark"
                        >{{tag}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column v-if="basicStatSeen" prop="hp-cur" label="生命值"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="hpperlevel" label="生命值成长"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="mp-cur" label="法力"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="mpperlevel" label="法力成长"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="movespeed" label="移速"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="armor-cur" label="护甲"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="armorperlevel" label="护甲成长"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="spellblock-cur" label="魔抗"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="spellblockperlevel" label="魔抗成长"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="attackrange" label="攻击范围"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="hpregen-cur" label="生命恢复"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="hpregenperlevel" label="生命恢复成长"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="mpregen-cur" label="法力恢复"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="mpregenperlevel" label="法力恢复成长"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="attackdamage-cur" label="攻击力"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="attackdamageperlevel" label="攻击力成长"></el-table-column>
                <el-table-column v-if="basicStatSeen" prop="attackspeed-cur" label="攻速"></el-table-column>
                <el-table-column v-if="perlevelStatSeen" prop="attackspeedperlevel" label="攻速成长"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            allChampion: {},
            tableData: [],
            radio: 0,
            basicStatSeen: true,
            perlevelStatSeen: true,
            sliderValue: 1
        };
    },
    watch: {
        radio: function(val) {
            if (val === 0) {
                this.basicStatSeen = true;
                this.perlevelStatSeen = true;
            } else if (val === 1) {
                this.basicStatSeen = true;
                this.perlevelStatSeen = false;
            } else if (val === 2) {
                this.basicStatSeen = false;
                this.perlevelStatSeen = true;
            }
        },
        sliderValue: function(val) {
            for (var i in this.tableData) {
                this.tableData[i]["hp-cur"] =
                    this.tableData[i]["hp"] +
                    (val - 1) * this.tableData[i]["hpperlevel"];
                this.tableData[i]["mp-cur"] =
                    this.tableData[i]["mp"] +
                    (val - 1) * this.tableData[i]["mpperlevel"];
                this.tableData[i]["armor-cur"] =
                    this.tableData[i]["armor"] +
                    (val - 1) * this.tableData[i]["armorperlevel"];
                this.tableData[i]["spellblock-cur"] =
                    this.tableData[i]["spellblock"] +
                    (val - 1) * this.tableData[i]["spellblockperlevel"];
                this.tableData[i]["hpregen-cur"] =
                    this.tableData[i]["hpregen"] +
                    (val - 1) * this.tableData[i]["hpregenperlevel"];
                this.tableData[i]["mpregen-cur"] =
                    this.tableData[i]["mpregen"] +
                    (val - 1) * this.tableData[i]["mpregenperlevel"];
                this.tableData[i]["attackdamage-cur"] =
                    this.tableData[i]["attackdamage"] +
                    (val - 1) * this.tableData[i]["attackdamageperlevel"];
                this.tableData[i]["attackspeed-cur"] =
                    this.tableData[i]["attackspeed"] +
                    (val - 1) * this.tableData[i]["attackspeedperlevel"];
            }
        }
    },
    created() {
        axios
            .get("http://127.0.0.1:8082/allChampion")
            .then(res => {
                console.log("success");
                this.allChampion = res["data"];
                this.tableData = this.allChampion;
                for (let i in this.tableData) {
                    this.tableData[i]["image"] =
                        "http://127.0.0.1:8082/static/img/champion/" +
                        this.tableData[i]["image"];
                    for (let j in this.tableData[i]["stats"]) {
                        this.tableData[i][j] = this.tableData[i]["stats"][j];
                    }
                    // this.tableData[i]["hp-cur"] = this.tableData[i]["hp"];
                    // this.tableData[i]["mp-cur"] = this.tableData[i]["mp"];
                    // this.tableData[i]["armor-cur"] = this.tableData[i]["armor"];
                    // this.tableData[i]["spellblock-cur"] = this.tableData[i]["spellblock"];
                    // this.tableData[i]["hpregen-cur"] = this.tableData[i]["hpregen"];
                    // this.tableData[i]["mpregen-cur"] = this.tableData[i]["mpregen"];
                    // this.tableData[i]["attackdamage-cur"] = this.tableData[i][
                    //   "attackdamage"
                    // ];
                    // this.tableData[i]["attackspeed-cur"] = this.tableData[i][
                    //   "attackspeed"
                    // ];

                    this.$set(
                        this.tableData[i],
                        "hp-cur",
                        this.tableData[i]["hp"]
                    );
                    this.$set(
                        this.tableData[i],
                        "mp-cur",
                        this.tableData[i]["hp"]
                    );
                    this.$set(
                        this.tableData[i],
                        "armor-cur",
                        this.tableData[i]["hp"]
                    );
                    this.$set(
                        this.tableData[i],
                        "spellblock-cur",
                        this.tableData[i]["hp"]
                    );
                    this.$set(
                        this.tableData[i],
                        "hpregen-cur",
                        this.tableData[i]["hp"]
                    );
                    this.$set(
                        this.tableData[i],
                        "mpregen-cur",
                        this.tableData[i]["hp"]
                    );
                    this.$set(
                        this.tableData[i],
                        "attackdamage-cur",
                        this.tableData[i]["hp"]
                    );
                    this.$set(
                        this.tableData[i],
                        "attackspeed-cur",
                        this.tableData[i]["hp"]
                    );
                }
                // console.log(this.allChampion);
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>

<style>
.championImg {
    max-width: 42px;
    max-height: 42px;
}
.championTags {
    margin-right: 5px;
}
</style>