<template>
    <view class="end">
        <img class="image" src="@/assets/images/logob.png" />
    </view>
</template>
<script>
    export default {}
</script>
<style lang="scss" scoped>
    .end {
        @include flex(center, center);
        height: 110px;
        background-color: #FAFBFC;
        // background-color: #F5F6F7;

        .image {
            @include w-h(578px, 38px);
        }
    }
</style>