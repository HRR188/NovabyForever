<template>
    <div class="join-step-2">
        <div class="box bottom-message">
            <div class="flex">
                <div style="width:270px">
                    <p class="tag-name upp" v-lang.gender></p>
                    <select v-model="sex">
                        <option v-for="g in genderList" :value="g.id">{{g.name}}</option>
                    </select>
                </div>
                <div style="width:270px">
                    <p class="tag-name" v-lang.cr></p>
                    <select v-model="country">
                        <option :value="item.id" v-for="item in countryList">{{item.name}}</option>
                    </select>
                </div>
                <div style="width:270px">
                    <p class="tag-name" v-lang.city></p>
                    <select v-model="city">
                        <option :value="item.id" v-for="item in citylist">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <p class="tag-name" v-lang.el></p>
            <div>
                <label class="input-radio-sm" v-for="e in englishList">
                    <input type="radio" name="english" v-model="english" :value="e.id">{{e.name}}
                </label>
            </div>
            <div class="flex">
                <div style="width:418px;">
                    <p class="tag-name" v-lang.we></p>
                    <select v-model="workYear">
                        <option v-for="w in workList" :value="w.id">{{w.name}}</option>
                    </select>
                </div>
                <div  style="width:418px;">
                    <p class="tag-name" v-lang.hr></p>
                    <select v-model="money">
                        <option v-for="r in rateList" :value="r.id">{{r.name}}</option>
                    </select>
                </div>
            </div>
            <div class="notes" id="pro-field" @click="filedResult">
                <p class="tag-name" v-lang.sp></p>
                <span v-for="item in fieldType" :data-value="item.id" :class="{active:item.status}">{{item.name}}</span>
            </div>
            <div>
                <p class="tag-name" v-lang.bi></p>
                <textarea :placeholder="translate('shy')" v-model="description"></textarea>
            </div>
        </div>
        <div class="form-footer flex" style="justify-content: center;">
            <button class="btn btn-default btn-175" type="button" @click="submit">{{btnMsg.text}}</button>
        </div>
        <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
    </div>
</template>
<script>
    export default {
        name:'joinArtistTwo',
        data(){
            return {
                noteStatus:false,
                vuerifyStr:'',
                sex:'',
                description:'',
                workYear:'',
                country:'',
                city:'',
                fieldType:[],
                field:[],
                money:'',
                english:'',
                btnMsg:{
                    status:false,
                    text:'Next'
                },
                englishList:[],
                workList:[],
                rateList:[],
                genderList:[]
            }
        },
        messages:{
            en:{
                cr:'Country/Region',
                city:'City',
                el:'English level',
                we:'Working experience',
                hr:'Hourly rate',
                ho:'Homepage',
                sp:'Please pick 3 specialities',
                bi:'Brief introduction',
                shy:'Say something about yourself , don\'t be shy!'
            },
            zh:{
                cr:'国家/地区',
                city:'城市',
                el:'英语水平',
                we:'工作经验',
                hr:'时薪',
                ho:'个人主页地址',
                sp:'请选择3个专长领域',
                bi:'简介',
                shy:'做点自我介绍，别害羞'
            }
        },
        watch:{
            country(val){
                let data = {
                    id:val
                };
                this.city = '';
                this.$store.dispatch('cityAc',data)
            }
        },
        created(){
            if(this.language === 'en'){
                this.btnMsg.text = 'Next'
            }
            if(this.language === 'zh'){
                this.btnMsg.text = '下一步'
            }
            this.$store.dispatch('countryAc').then((response) => {
                if(response.code === 200) {
                    this.$store.dispatch('getUserInfoAc').then((response) => {
                        this.sex = response.data.user.gender;
                        this.description = response.data.user.user_description;
                        this.workYear = response.data.user.work_exp.id;
                        this.country = response.data.user.country.id;
                        this.field = response.data.user.fields;
                        this.money = response.data.user.hourly_rate;
                        this.english = response.data.user.english_level;
                        if(response.data.user.city) {
                            this.$store.dispatch('cityAc',{id:this.country}).then((res) => {
                                if(res.code === 200) {
                                    this.city = response.data.user.city.id;
                                }
                            })
                        }
                        this.$store.dispatch('fieldAc').then((res) => {
                            if(res.code === 200) {
                                this.$store.state.dict.fieldList.forEach((item,index) => {
                                    this.fieldType.push(item)
                                });
                                this.fieldType.forEach((item,index) => {
                                    this.field.forEach((val) => {
                                        if(item.id === parseInt(val)) {
                                            item.status = true
                                        }
                                    })
                                })
                            }
                        });

                        this.englishList = response.data.user_select.english_level;
                        this.workList = response.data.user_select.work_exp;
                        this.rateList = response.data.user_select.hourly_rate;
                        this.genderList = response.data.user_select.gender
                    })
                }
            })
        },
        computed:{
            countryList(){
                return this.$store.state.dict.countryList
            },
            citylist(){
                return this.$store.state.dict.citylist
            }
        },
        methods:{
            submit(){
                let validation = [
                    {
                        regex:'required',
                        data:this.sex,
                        message:'Please type Gender'
                    },
                    {
                        regex:'required',
                        data:this.country,
                        message:'Please select country'
                    },
                    {
                        regex:'required',
                        data:this.city,
                        message:'Please select city'
                    },
                    {
                        regex:'required',
                        data:this.english,
                        message:'Please select English level'
                    },
                    {
                        regex:'required',
                        data:this.money,
                        message:'Please select Hourly rate'
                    },
                    {
                        regex:'required',
                        data:this.description,
                        message:'Please input Brief introduction'
                    }
                ];
                let result = this.$validation(validation);
                if(result === true) {
                    if(this.field.length) {
                        let data = {
                            gender:parseInt(this.sex),
                            country:this.country,
                            city:this.city,
                            work_exp:this.workYear,
                            fileds:this.field,
                            description:this.description,
                            english:this.english,
                            hourly:this.money
                        };
                        this.$store.dispatch('userEdit',data).then((response) => {
                            if(response.code === 200) {
                                this.$router.push({name:'joinArtistThree'})
                            }
                            else {
                                this.vuerifyStr = response.msg;
                                this.noteStatus = true;
                                setTimeout(() => {
                                    this.noteStatus = false
                                },1500)
                            }
                        });
                    }
                    else {
                        this.vuerifyStr = "Pick 3 of your most skilled or interested model categories";
                        this.noteStatus = true;
                        setTimeout(() => {this.noteStatus = false},1500);
                    }
                }
                else {
                    this.vuerifyStr = result;
                    this.noteStatus = true;
                    setTimeout(() => {this.noteStatus = false},1500);
                }
            },
            filedResult(event){
                let proFieldItem = document.querySelectorAll("#pro-field span");
                let target = event.target.tagName.toLowerCase();
                let curLength = 0,
                    valeList = [];
                if(target === 'span') {
                    if(event.target.className === "active") {
                        event.target.className = ""
                    }
                    else {
                        event.target.className = "active"
                    }
                    proFieldItem.forEach(function(item,index){
                        if(item.className == 'active') {
                            curLength++
                        }
                    });
                    if(curLength > 3 ) {
                        this.vuerifyStr = "Pick 3 of your most skilled or interested model categories";
                        this.noteStatus = true;
                        setTimeout(() => {this.noteStatus = false},1500);
                        event.target.className = ""
                    }
                    else {
                        valeList.splice(valeList,valeList.length);
                        proFieldItem.forEach(function(item,index){
                            if(item.className === 'active') {
                                valeList.push(item.getAttribute('data-value'))
                            }
                        });
                        this.field = valeList
                    }
                }
            },
        }
    }
</script>