<template>
    <div class="toggle" @click.stop="show = !show">
        {{showSelectedValue}}
        <div class="toggle-select-container" :class="selectType" v-show="show">
            <div :class="{active:valueSelected(value.name) > -1}" v-for="value in values" @click.stop="selectValue(value.name)">{{value.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'slide-down',
        props:{
            defaultValue:{
                default:''
            },
            values:{
                required:true
            },
            selectType:{
                'default':'single'
            },
            disabled:{
                default:false
            }
        },
        watch:{
            selectType:function () {
                this.selectedValue = []
            },
        },
        computed:{
            showSelectedValue:function () {
                if(this.selectType === 'multiple'){
                    let number = this.selectedValue.length;
                    switch(number){
                        case 0:
                            return this.defaultValue
                        case 1:
                            return this.selectedValue[0]
                        case 2:
                            return this.selectedValue.join(', ')
                        case 3:
                            return this.selectedValue[0]+', '+this.selectedValue[1]+', '+this.selectedValue[2]
                        default:
                            return this.selectedValue[0]+', '+this.selectedValue[1]+', '+this.selectedValue[2]+' and '+(this.selectedValue.length-3)+' other'
                    }
                }
                else{
                    return this.selectedValue.length?this.selectedValue:this.defaultValue
                }
            }
        },
        data(){
            return{
                show:false,
                selectedValue:[]
            }
        },
        methods:{
            selectValue:function (value) {
                this.$emit('seletctValueChanged');
                if(this.selectType === 'multiple'){
                    if(this.valueSelected(value) === -1){
                        this.selectedValue.push(value)
                    }
                    else{
                        this.selectedValue.splice(this.selectedValue.indexOf(value),1)
                    }
                }
                else{
                    this.selectedValue = value
                    this.show = false
                }
            },
            valueSelected:function (value) {
                return this.selectedValue.indexOf(value)
            }
        }
    }
</script>

<style scoped lang="scss">
    .toggle{
        background: #FFFFFF;
        border: 1px solid #D2D2D2;
        border-radius: 2px;
        width: 100%;
        height: 40px;
        padding-left: 14px;
        font-size: 14px;
        color: #9B9B9B;
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding-right:12px;
        margin-bottom: 20px;
        position:relative;
        &:after{
            content: "";
            width: 0;
            height: 0;
            border: 6px solid;
            border-color: #8A8A8A #ffffff #ffffff #ffffff;
            border-bottom: none;
        }
        .toggle-select-container{
            width: calc(100% + 2px);
            position: absolute;
            top:39px;
            left:-1px;
            display: flex;
            max-height: 104px;
            overflow: auto;
            flex-wrap: wrap;
            background-color:white;
            z-index: 3;
            /*border:1px solid #D2D2D2;*/
            div{
                height: 34px;
                border-right:1px solid #D2D2D2;
                border-bottom:1px solid #D2D2D2;
                font-size: 14px;
                color: #9B9B9B;
                padding:6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: white;
                &.active{
                    color: #EA6264;
                    &:after{
                        content:url('../../assets/images/saas/icon-red-check.png');
                    }
                }
            }
            &.multiple div{
                width: 25%;
                &:nth-child(4n+1){
                    border-left:1px solid #D2D2D2;
                }
            }
            &.single div{
                width: 100%;
                &:nth-child(n){
                    border-left:1px solid #D2D2D2;
                }
            }
        }
    }
</style>