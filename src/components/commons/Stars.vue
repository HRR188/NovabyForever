<template>
    <div class="stars-container clearfix">
        <img v-for="n in childScore" :src="redStar" @click="startClick(n,'red')" :class="{pointer:type}">
        <img v-for="n in totalScore" :src="gryStar" @click="startClick(n,'gry')" :class="{pointer:type}">
    </div>
</template>

<script>
    export default {
        name: 'stars',
        props:{
            score:{
                required:true,
                type:Number
            },
            type:{  // type类型  true是需要对外emit评价分数  false 仅仅是展示
                required:true,
                type:Boolean
            }
        },
        watch:{
            score(val,oldval){
                this.childScore = val
            }
        },
        data(){
            return {
                redStar:require('../../assets/images/icon-star-red.png'),
                gryStar:require('../../assets/images/icon-star-gry.png'),
                childScore:this.score
            }
        },
        computed:{
            totalScore:function () {
                return 5-this.childScore;
            }
        },
        methods:{
            startClick(index,type){
                if(this.type) {
                    if(type === 'gry') {
                        this.childScore+=index
                    }
                    else {
                        this.childScore-=Math.abs(index-this.childScore)
                    }
                    this.$emit('startNum',this.childScore)
                }
            }
        }
    }
</script>

<style>
    .stars-container{

    }
    .stars-container img{
        float: left;
        width:23px;
        height:22px;
    }
    .stars-container span{
        float: left;
    }
</style>
