<template>
    <dl class="component-select" :class="{active:slideDown}"  @mouseover="show"  @mouseout="hide">
        <dt>{{selectedValue[0].text}}</dt>
        <dd>
            <ul>
                <li v-for="items in slideDownData.data" @click.stop="choose(items.id)">{{items.text}}</li>
            </ul>
        </dd>
    </dl>
</template>
<script>
export default {
    name:'selected',
    data(){
        return {
            slideDown:false
        }
    },
    props:{
        slideDownData:{
            require:true
        }
    },
    computed:{
        selectedValue:function () {
            return this.slideDownData.data.filter(function (data) {
                return data.selected
            })
        }
    },
    methods:{
        show(){
            this.slideDown = true
        },
        hide(){
            this.slideDown = false
        },
        choose(id){
            if(id !== this.selectedValue[0].id) {
                this.$emit('changeSelectList',{
                    listName:this.slideDownData.name,
                    dataId:id
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.component-select{
    position: relative;
    display: inline-block;
    background-color:#fff;
    padding:15px 17px 15px 20px;
    cursor: pointer;
    border: 1px solid #EFEFF1;
    border-radius: 4px;
    height:50px;
    font-size: 14px;
    color: #AEAEAE;
    dt:after{
        content:'';
        display: inline-block;
        width:9px;
        height:5px;
        vertical-align: middle;
        background: url(../../assets/images/projects-sprite.png) -83px 0 no-repeat;
        margin-left:8px;
        transition: All 0.2s ease-in-out;
    }
    ul{
        background-color:#fff;
        width:100%;
        position: absolute;
        left:0;
        top:49px;
        display: none;
        z-index:10;
        li{
            line-height: 50px;
            cursor: pointer;
            text-align: center;
        }
    }
    &.active{
        dt:after{
            transform: rotate(180deg);
        }
        ul{
            display: block;
        }

    }
}
</style>
