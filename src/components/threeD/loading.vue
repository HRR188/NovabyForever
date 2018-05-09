<template>
    <div class="loading-container" :style="{background: transparentBack?'none':'rgba(33,33,33,1)'}">
        <p>{{translate('l')}} ... </p>
        <div class="loading-border">
            <div class="loading-content" :style="{'width':percent+'%'}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loading',
        props:{
            percent:{
                required:true,
                default:0,
                type:Number
            },
            transparentBack:{
                default:false
            }
        },
        messages:{
            en:{
                l:'Loading'
            },
            zh:{
                l:'正在载入'
            }
        }
    }
</script>

<style scoped>
    .loading-container{

        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column;
    }
    .loading-container p{
        font-size: 16px;
        color: #FFFFFF;
        margin-bottom: 22px;
        text-align: center;
    }
    .loading-container .loading-border{
        background: #FFFFFF;
        border: 1px solid #E7E7E7;
        border-radius: 100px;
        width: 364px;
        height: 8px;
    }
    .loading-container .loading-content{
        background: #EA6264;
        border-radius: 100px;
        height: 6px;
        transition: all .3s;
    }
</style>
