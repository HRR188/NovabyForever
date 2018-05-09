<template>
    <div class="edit-toggle-container">
        <div class="edit-header" @click="show = !show">
            <a class="title" :class="{active:show}">{{title}}</a>
            <a class="hint" :data-hint="hint">
                <img src="../../assets/images/threeD/edit/ic_question_mark.png" alt="">
            </a>
        </div>
        <transition name="toggle">
            <div class="edit-body" v-show="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'edit-toggle',
        data(){
            return{
                show:false
            }
        },
        props:{
            title:{
                required:true,
                type:String
            },
            hint:{
                type:String
            },
            showToggle:{
                type:Boolean,
                default:false
            }
        },
        created(){
            this.show = this.showToggle
        }
    }
</script>

<style scoped lang="scss">
    .toggle-enter-active,.toggle-leave-active{
        transition:all ease .2s;
        max-height: 2000px;
    }
    .toggle-enter,.toggle-leave-to{
        max-height: 0;
    }
    .edit-toggle-container{
        display: flex;
        flex-flow: column;
        .edit-header{
            display: flex;
            align-items: center;
            padding-left:20px;
            position: relative;
            width: 100%;
            height: 30px;
            background: #3E3E4D;;
            border-top: 1px solid #1E1E29;
            border-bottom: 1px solid #1E1E29;
            .title{
                font-size: 12px;
                color: #DDDDDD;
                transition:all ease .2s;
                &:before{
                    content:" ";
                    border: 5px solid transparent;
                    border-right: 0;
                    border-left: 5px solid #cccccc;
                    position: absolute;
                    left: 8px;
                    top: 10px;
                    transform:rotate(0deg);
                    transition:all ease .2s;
                }
                &.active:before{
                    transform:rotate(90deg);
                }
            }
            .hint{
                margin-left: 12px;
                position: relative;
                margin-top: 4px;
                &:before{
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    z-index: 4;
                    display: block;
                    margin-left: -5px;
                    pointer-events: none;
                    content: " ";
                    border: 5px solid transparent;
                    border-top: 0;
                    border-bottom: 5px solid rgba(0, 0, 0, 0.8);
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                &:after{
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    z-index: 4;
                    width: 130px;
                    padding: 6px;
                    margin-top: 5px;
                    margin-left: -65px;
                    font-size: 12px;
                    line-height: 17px;
                    color: #ffffff;
                    text-align: center;
                    text-transform: uppercase;
                    pointer-events: none;
                    content: attr(data-hint);
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 6px;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                &:hover:before,
                &:hover:after{
                    opacity: 1;
                }
            }
            &:hover{
                .title{
                    color:white;
                    &:before{
                        border-left-color: white;
                    }
                }
            }
        }
        .edit-body{
            overflow: hidden;
            background-color:  #565664;
        }
    }
</style>