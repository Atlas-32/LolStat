<template>
    <div class="naviHead">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="1">英雄数据</el-menu-item>
            <el-menu-item index="2">物品数据</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "NaviHead",
    data() {
        return {};
    },
    props: {
        activeIndex: String
    },
    methods: {
        handleSelect(key) {
            switch (key) {
                case "1":
                    this.$router.push("/champions");
                    break;
                case "2":
                    this.$router.push("/items");
                    break;
            }
        }
    }
};
</script>