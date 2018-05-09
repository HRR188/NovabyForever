<template>
    <div class="edit-container">
        <three-d-edit :modelFile="modelFile" :id="wid" v-if="modelFile.id"></three-d-edit>
    </div>
</template>

<script>
    import threeDEdit from '../../components/threeD/threeDEdit.vue'

    export default {
        name: 'edit-model',
        components:{
            threeDEdit
        },
        data(){
            return{
                wid:0,
                modelFile:{}
            }
        },
        created(){
            let data = {
                wid:this.$route.params.id
            };
            this.wid = this.$route.params.id;
            let _this = this;
            this.$store.dispatch('uploadModel/getModelMessage',data).then((response) => {
                if(response.code === 200) {
                    if(response.data.work.model){
                        _this.modelFile = response.data.work.model.model_3d
                    }
                }
            })
        }
    }
</script>

<style scoped>
    .edit-container{
        width: 100%;
        height: 100vh;
    }
</style>