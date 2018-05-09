<template>
    <div class="create-model-container mark">
        <show-upload
                :closeModelLayer="closeModelLayer"
                :bwid="bwid"
                :isre="isre"
        ></show-upload>
    </div>
</template>

<script>
    import showUpload from './showUpload.vue'
    import lockScreen from '../../mixins/lockScreen/lockScreen'

    export default {
        name: 'createNewModelLayer',
        mixins: [lockScreen],
        components: {
            showUpload,
        },

    }
</script>

<style scoped>
    .create-model-container {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
</style>
