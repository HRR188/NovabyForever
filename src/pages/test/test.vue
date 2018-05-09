<template>
    <div style="width: 100vw;height: 100vh">
        <three-d :modelFile="modelFile"></three-d>
    </div>
</template>

<script>
    import threeD from '../../components/threeD/threeD.vue'
    export default {
        name: 'test',
        components:{
            threeD
        },
        data(){
            return{
                modelFile:
                    {
                        "model_format": "gltf",
                        "model_url": {
                            "dir":  "https://elements.oss-cn-hongkong.aliyuncs.com/kama_dagger/",
                            "file": "scene.gltf"
                        },
                        "mtl": {},
                        "edit": [],
                        "id": 333
                    }
            }
        }
    }
</script>

<style scoped>

</style>
