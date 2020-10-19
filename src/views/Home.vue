<template>
    <div class="home">
        <NaviHead activeIndex="0"></NaviHead>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import NaviHead from "@/components/NaviHead.vue";

export default {
    name: "Home",
    components: {
        NaviHead
    }
};
</script>
