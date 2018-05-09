<template>
    <div class="toggle pointer" @click.stop="show = !show" >
        {{defaultValue}}
        <div class="toggle-select-container single" v-show="show">
            <div :class="{active:valueSelected(value.name)}"
                 v-for="value in values"
                 @click.stop="selectValue(value,userInfo)"
            >{{value.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'member-slide-down',
        props:{
            defaultValue:{
                default:''
            },
            values:{
                required:true
            },
            userInfo:{
                required:true
            }
        },
        data(){
            return{
                show:false
            }
        },
        methods:{
            selectValue:function (value,userInfo) {
                userInfo.user_role = value.id;
                userInfo.role_name = value.name;
                this.show = false;
                this.$emit('saveChangeMembers',{userInfo});
            },
            valueSelected:function (value) {
                return this.defaultValue === value
            }
        }
    }
</script>

<style scoped lang="scss">
    .toggle{
        background: #FFFFFF;
        border: 1px solid #D2D2D2;
        border-radius: 2px;
        width: 130px;
        height: 22px;
        padding-left: 5px;
        font-size: 14px;
        color: #9B9B9B;
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding-right:12px;
        margin-top: 4px;
        margin-bottom: 4px;
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
            top:21px;
            left:-1px;
            display: flex;
            max-height: 104px;
            overflow: auto;
            flex-wrap: wrap;
            background-color:white;
            z-index: 3;
            /*border:1px solid #D2D2D2;*/
            div{
                height: 22px;
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
            &.single div{
                width: 100%;
                &:nth-child(n){
                    border-left:1px solid #D2D2D2;
                }
            }
        }
    }
</style>