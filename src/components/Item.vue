<template>
    <el-container>
        <el-main>
            <div class="allItem">
                <div class="check">
                    <el-checkbox-group v-model="catags">
                        <el-checkbox-button label="Lane">出门装</el-checkbox-button>
                        <el-checkbox-button label="Jungle">打野</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="catags">
                        <el-checkbox-button label="GoldPer">工资装</el-checkbox-button>
                        <el-checkbox-button label="Consumable">消耗品</el-checkbox-button>
                        <el-checkbox-button label="Vision">视野</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="catags">
                        <el-checkbox-button label="Health">生命值</el-checkbox-button>
                        <el-checkbox-button label="HealthRegen">生命回复</el-checkbox-button>
                        <el-checkbox-button label="Armor">护甲</el-checkbox-button>
                        <el-checkbox-button label="SpellBlock">魔法抗性</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="catags">
                        <el-checkbox-button label="LifeSteal">生命偷取</el-checkbox-button>
                        <el-checkbox-button label="CriticalStrike">暴击</el-checkbox-button>
                        <el-checkbox-button label="AttackSpeed">攻击速度</el-checkbox-button>
                        <el-checkbox-button label="Damage">攻击力</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="catags">
                        <el-checkbox-button label="Mana">法力值</el-checkbox-button>
                        <el-checkbox-button label="SpellDamage">法术强度</el-checkbox-button>
                        <el-checkbox-button label="CooldownReduction">冷却缩减</el-checkbox-button>
                        <el-checkbox-button label="ManaRegen">法力恢复</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="catags">
                        <el-checkbox-button label="Boots">鞋</el-checkbox-button>
                        <el-checkbox-button label="NonbootsMovement">其他移动速度物品</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="catags">
                        <el-checkbox-button label="Active">主动</el-checkbox-button>
                        <el-checkbox-button label="MagicPenetration">法术穿透</el-checkbox-button>
                        <el-checkbox-button label="ArmorPenetration">护甲穿透</el-checkbox-button>
                        <el-checkbox-button label="Aura">光环</el-checkbox-button>
                        <el-checkbox-button label="OnHit">ONHIT</el-checkbox-button>
                        <el-checkbox-button label="Trinket">饰品</el-checkbox-button>
                        <el-checkbox-button label="Slow">减速</el-checkbox-button>
                        <el-checkbox-button label="Stealth">STEALTH</el-checkbox-button>
                        <el-checkbox-button label="SpellVamp">法术吸血</el-checkbox-button>
                        <el-checkbox-button label="Tenacity">韧性</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="maps">
                        <el-checkbox-button label="11">召唤师峡谷</el-checkbox-button>
                        <el-checkbox-button label="12">嚎哭深渊</el-checkbox-button>
                        <el-checkbox-button label="21">极限闪击</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="ifPurchase">
                        <el-checkbox-button label="1">可购买</el-checkbox-button>
                        <el-checkbox-button label="0">不可购买</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="ifHero">
                        <el-checkbox-button label="0">不需要特定英雄</el-checkbox-button>
                        <el-checkbox-button label="1">需要特定英雄</el-checkbox-button>
                    </el-checkbox-group>
                </div>

                <div class="itemBox">
                    <div
                        class="item"
                        v-for="(item,i) in showItem"
                        :key="i"
                        v-show="item['show']"
                        @click="itemClick(item,i,$event)"
                    >
                        <div class="itemPic">
                            <div
                                class="itemPicImg"
                                :style="{'background-image':'url(http://ddragon.leagueoflegends.com/cdn/10.19.1/img/sprite/'+item['image']['sprite']+')','background-position':'-'+item['image']['x']+'px -'+item['image']['y']+'px'}"
                            ></div>
                        </div>
                        <div class="itemName">{{item["name"]}}</div>
                    </div>
                </div>

                <item-detail
                    v-show="mouseHoverSeen"
                    v-bind:item="mouseHoverItem"
                    :style="mouseHoverStyle"
                ></item-detail>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import itemJson from "../data/itemJson.js";
import ItemDetail from "../components/ItemDetail.vue";

export default {
    name: "Item",
    components: {
        ItemDetail
    },
    props: {},
    data() {
        return {
            showItem: itemJson,
            catags: [],
            maps: [],
            ifPurchase: [],
            ifHero: [],
            mouseHoverIndex: "0",
            mouseHoverSeen: false,
            mouseHoverItem: {
                name: "",
                description: "",
                gold: {}
            },
            mouseHoverStyle: {
                position: "absolute",
                top: "100px",
                left: "100px"
            }
        };
    },
    mounted() {
        for (let i in this.showItem) {
            this.$set(this.showItem[i], "show", true);
        }
    },
    watch: {
        catags: function(val) {
            this.catagChange();
        },
        maps: function(val) {
            this.catagChange();
        },
        ifPurchase: function(val) {
            this.catagChange();
        },
        ifHero: function(val) {
            this.catagChange();
        }
    },
    methods: {
        catagChange() {
            var flag;
            for (var i in this.showItem) {
                flag = 1;
                for (var j in this.catags) {
                    if (
                        this.showItem[i]["tags"].indexOf(this.catags[j]) === -1
                    ) {
                        this.showItem[i]["show"] = false;
                        flag = 0;
                        break;
                    }
                }
                for (var k in this.maps) {
                    if (this.showItem[i]["maps"][this.maps[k]] === false) {
                        this.showItem[i]["show"] = false;
                        flag = 0;
                        break;
                    }
                }

                if (this.showItem[i]["gold"]["purchasable"] === true) {
                    if (
                        this.ifPurchase.length === 1 &&
                        this.ifPurchase[0] === "0"
                    ) {
                        this.showItem[i]["show"] = false;
                        flag = 0;
                    }
                } else if (this.showItem[i]["gold"]["purchasable"] === false) {
                    if (
                        this.ifPurchase.length === 1 &&
                        this.ifPurchase[0] === "1"
                    ) {
                        this.showItem[i]["show"] = false;
                        flag = 0;
                    }
                }

                if (
                    this.showItem[i].hasOwnProperty("requiredChampion") ||
                    this.showItem[i].hasOwnProperty("requiredAlly")
                ) {
                    if (this.ifHero.length === 1 && this.ifHero[0] === "0") {
                        this.showItem[i]["show"] = false;
                        flag = 0;
                    }
                } else {
                    if (this.ifHero.length === 1 && this.ifHero[0] === "1") {
                        this.showItem[i]["show"] = false;
                        flag = 0;
                    }
                }

                if (flag === 1) {
                    this.showItem[i]["show"] = true;
                }
            }
        },
        itemClick(item, i, e) {
            if (i === this.mouseHoverIndex) {
                this.mouseHoverSeen = !this.mouseHoverSeen;
            } else {
                this.mouseHoverSeen = true;
                this.mouseHoverItem = item;
            }

            this.mouseHoverIndex = i;

            this.mouseHoverStyle.top =
                (
                    e.target.getBoundingClientRect().top +
                    window.scrollY +
                    72
                ).toString() + "px";
            this.mouseHoverStyle.left =
                (
                    e.target.getBoundingClientRect().left + window.scrollX
                ).toString() + "px";
            if (
                e.target.getBoundingClientRect().left + window.scrollX + 300 >
                document.body.clientWidth
            ) {
                console.log(1);
                this.mouseHoverStyle.left =
                    (document.body.clientWidth - 300).toString() + "px";
            }
        }
    }
};
</script>

<style>
.itemBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
}
.item {
    width: 100px;
    height: 135px;
    text-align: center;
}
.itemPicImg {
    background-repeat: no-repeat;
    height: 48px;
    width: 48px;
    transform: scale(1.5);
    transform-origin: 0 0;
    margin-left: 14px;
}
.itemName {
    margin-top: 24px;
}
</style>