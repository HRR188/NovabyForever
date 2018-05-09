<template>
    <div class="edit-container" v-if="teamInfo">
        <div class="info-container w-940 auto">
            <div class="save-pane flex">
                 <div class="save" @click="save">
                    {{translate('save')}}
                </div>
            </div>
            <div class="team-name">
                <p class="text-left title" v-lang.teamTitle></p>
                <input :placeholder="translate('enterTeamName')" v-model="teamName"/>
            </div>
            <div class="team-memberList">
                <member-list :isEdit='true' :teamId='teamInfo.team_id' :memberList='teamInfo.team_members' ></member-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import memberList from './memberList'

export default {
    name: 'editTeam',
    data() {
        return{
            teamInfo:'',
            teamName:''
        }
    },
    messages:{ 
        en: {
            teamTitle: 'Team Name',
            save:'Save'
        },
        zh: {
            teamTitle: '团队名称',
            save:'保存'
        }
    },
    methods:{
        save() {
            if(!this.teamName) {
                return
            }

            let params = {
                id: this.teamInfo.team_id,
                name: this.teamName
            }
            this.$store.dispatch('saveTeam', params).then((response) => {
                if(response.code === 200) {
                    //save sucess
                    this.$router.push({name: 'personalTeam'})
                }
            })
        },
        getTeamInfo() {
            this.$store.dispatch('getTeamInfo', {id: this.userId}).then((response) => {
                if(response.code === 200) {
                    this.teamInfo = response.data
                    if(this.teamInfo) {
                        this.teamName =  this.teamInfo.team_name
                    }
                }
            })
        }
    },
    created() {
        this.getTeamInfo()
    },
    computed:mapState({
        userId: state => state.user.userId
    }),
    components: {
        memberList
    }
}
</script>

<style lang="scss" scoped>
.personal-warp{
    .edit-container{
        padding-bottom: 50px;
        .save-pane {
            padding: 10px 0px;
            justify-content: flex-end;
            .save{
                background: #EA6264;
                border-radius: 100px;
                width: 54px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                color:#ffffff;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .team-name {
            background-color: #ffffff;
            height: 120px;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: 40px;
            .title {
                padding-top: 25px;
                font-size: 18px;
                color: #515254;
            }
            input {
                margin-top: 14px;
                width: 858px;
                height: 36px;
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                text-indent: 10px;
                font-size: 16px;
            }
        }
        .team-memberList {
            margin-top: 20px;
        }
    }
}
</style>


