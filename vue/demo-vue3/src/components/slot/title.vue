<template>
    <div>呵呵</div>
    <slot name="params" :data="title"></slot>
</template>
<script>
    import {
        ref
    } from 'vue'
    export default {
        setup() {
            const title = ref('健康自检')
            return {
                title
            }
        }
    }
</script>