<template>
    <div class="upload-tabs-container">
        <div class="upload-nav-container">
            <ul class="w-940">
                <li v-for="tab in tabs" :class="{'active':active(tab.id),'current':current(tab.id)}">
                    <span>{{tab.name}}</span>
                </li>
            </ul>
        </div>
        <div class="details">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'upload-tabs',
        props:{
            finishedSteps:{
                required:true,
                type:Number
            },
            currentStep:{
                required:true,
                type:Number
            }
        },
        created(){
            this.tabs = this.$children
        },
        data(){
            return {
                tabs:[]
            }
        },
        methods:{
            active:function (id) {
                return this.finishedSteps >= id
            },
            current:function (id) {
                return this.currentStep === id
            }
        }
    }
</script>

<style scoped>
    .upload-tabs-container .upload-nav-container{
        background-color: white;
        margin-right: auto;
        margin-left: auto;
        width: 100%;
        border-bottom:1px solid #EFEFF1;
    }
    .upload-tabs-container .upload-nav-container ul{
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: center;
    }
    .upload-tabs-container .upload-nav-container ul li{
        width: auto;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        position: relative;
        text-align: center;
        color: #B1B5BC;
        padding:0 45px;
    }
    .upload-tabs-container .upload-nav-container ul li:last-child:after{
        content:'';
    }
    .upload-tabs-container .upload-nav-container ul li:after{
        content: url('../../assets/images/icon-right-black.png');
        position: absolute;
        right: 0;
        margin-top: 1px;
        width: 6px;
        height: 12px;
    }
    .upload-tabs-container .upload-nav-container ul li.active{
        color: #EA6264;
    }
    .upload-tabs-container .upload-nav-container ul li.active:after{
        content:url('../../assets/images/icon-right-red.png');
    }
    .upload-tabs-container .upload-nav-container ul li.current{
        color: #EA6264;
    }
    .upload-tabs-container .upload-nav-container ul li.current span{
        position: relative;
    }
    .upload-tabs-container .upload-nav-container ul li.current span:after{
        content: "";
        width: 100%;
        border-top: 1px solid #EA6264;
        border-bottom: 1px solid #EA6264;
        position: absolute;
        bottom:-16px;
        left:0;
    }
</style>