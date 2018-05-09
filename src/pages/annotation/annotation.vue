<template>
    <div class="annotation-container">
        <template v-if="getModel">
            <three-d-annotation :modelFile="modelFile" :id="id" :disableAnimate="false"></three-d-annotation>
        </template>
    </div>
</template>

<script>
    import threeDAnnotation from '../../components/threeD/threeDAnnotation.vue'
    import {mapState,mapActions} from 'vuex'

    export default {
        name: 'annotation',
        components:{
            threeDAnnotation
        },
        created(){
            this.id = this.$route.params.id;
            this.getAnnotationModelData({id:this.id,type:1})
        },
        data(){
            return{
                id:''
            }
        },
        computed:{
            ...mapState('three/annotation',[
                'modelFile','getModel'
            ])
        },
        methods:{
            ...mapActions('three/annotation',[
                'getAnnotationModelData'
            ])
        }
    }
</script>

<style scoped>
    .annotation-container{
        width: 100%;
        height: 100vh;
    }
</style>