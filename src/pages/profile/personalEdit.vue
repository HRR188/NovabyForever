<template>
    <div class="edit-container">
        <form @submit.prevent="saveEdit">
            <p class="text-right">
                <button type="submit" class="save-btn btn-default btn upp" v-lang.save></button>
            </p>
            <div class="padding-box clearfix">
                <div class="head-portrait float-left position-relative">
                    <div>
                        <img :src="headUrl" class="img-max"/>
                        <div class="file-warp upp">
                            <input type="file" @change="tirggerFile($event)">
                            {{translate('edit')}}
                        </div>
                    </div>
                    <img src="../../assets/images/user-model-icon.png" class="user-status" v-if="userType === 3">
                </div>
                <div class="fist-name float-left">
                    <p class="tag-title" v-lang.firstName></p>
                    <input type="text" v-model.trim="firstName">
                </div>
                <div class="last-name float-left">
                    <p class="tag-title" v-lang.lastName></p>
                    <input type="text" v-model.trim="lastName">
                </div>
                <div class="sex float-left">
                    <p class="tag-title upp" v-lang.gender></p>
                    <select v-model="sex">
                        <option v-for="g in genderList" :value="g.id">{{g.name}}</option>
                    </select>
                </div>
                <div class="country float-left">
                    <p class="tag-title" v-lang.cr></p>
                    <select class="personal-country" v-model="country">
                        <option :value="item.id" v-for="item in countryList">{{item.name}}</option>
                    </select>
                </div>
                <div class="city float-left">
                    <p class="tag-title upp" v-lang.city></p>
                    <select v-model="city">
                        <option :value="item.id" v-for="item in citylist">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <div class="padding-box work-msg">
                <div>
                    <p class="tag-title" v-lang.el></p>
                    <div class="english">
                        <label class="input-radio-sm" v-for="e in englishList">
                            <input type="radio" name="english" v-model="english" :value="e.id">{{e.name}}
                        </label>
                    </div>
                </div>
                <ul class="flex">
                    <li>
                        <p class="tag-title" v-lang.we></p>
                        <select v-model="workYear" style="width:400px;">
                            <option v-for="w in workList" :value="w.id">{{w.name}}</option>
                        </select>
                    </li>
                    <li>
                        <p class="tag-title" v-lang.hr></p>
                        <select v-model="money" style="width:400px;">
                            <option v-for="r in rateList" :value="r.id">{{r.name}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="flex" style="margin-top:28px;">
                    <li>
                        <p class="tag-title" v-lang.ho></p>
                        https://www.novaby.com/homepage/
                        <input class="personal-homepage" type="text" v-model="homePage">
                    </li>
                </ul>
            </div>
            <div class="padding-box">
                <p class="tag-title" v-lang.sp></p>
                <div class="pro-field" @click="filedResult($event)" id="pro-field">
                    <span :class="{active:item.status}" v-for="item in fieldType" :data-value="item.id">{{item.name}}</span>
                </div>
            </div>
            <div class="padding-box">
                <p class="tag-title" v-lang.bi></p>
                <textarea placeholder="Say something about yourself , don't be shy!" v-model="description"></textarea>
            </div>
        </form>
        <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
    export default {
        name:'personalEdit',
        data(){
            return {
                noteStatus:false,
                vuerifyStr:'',
                headUrl:'',
                firstName:'',
                lastName:'',
                sex:'',
                description:'',
                workYear:'',
                country:'',
                city:'',
                homePage:'',
                fieldType:[],
                field:[],
                money:0,
                english:3,
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
                firstName: 'Please type first name',
                lastName: 'Please type last name',
                country: 'Please select country',
                cityDesc: 'Please select city'
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
                firstName: '请输入名字',
                lastName: '请输入姓氏',
                country: '请选择国家',
                cityDesc: '请选择城市'
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
        computed:{
            userType(){
                return this.$store.state.user.userType
            },
            countryList(){
                return this.$store.state.dict.countryList
            },
            coverTop(){
                return this.$store.state.userProfile.personalInfo.cover_top
            },
            citylist(){
                return this.$store.state.dict.citylist
            }
        },
        created(){
            this.$store.dispatch('countryAc').then((response) => {
                if(response.code === 200) {
                    this.$store.dispatch('getUserInfoAc').then((response) => {
                        this.headUrl = response.data.user.avatar;
                        this.firstName = response.data.user.firstname;
                        this.lastName = response.data.user.lastname;
                        this.sex = response.data.user.gender;
                        this.country = response.data.user.country.id;
                        this.english = response.data.user.english_level;
                        this.workYear = response.data.user.work_exp;
                        this.money = response.data.user.hourly_rate;
                        this.description = response.data.user.user_description;
                        this.homePage = response.data.user.homepage;
                        this.field = response.data.user.fields;
                        if(response.data.user.city) {
                            this.$store.dispatch('cityAc',{id:this.country}).then((res) => {
                                if(res.code === 200) {
                                    this.city = response.data.user.city.id;
                                }
                            })
                        }
                        this.$store.dispatch('fieldAc').then((response) => {
                            if(response.code === 200) {
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
                        })

                        this.englishList = response.data.user_select.english_level
                        this.workList = response.data.user_select.work_exp
                        this.rateList = response.data.user_select.hourly_rate
                        this.genderList = response.data.user_select.gender
                    })
                }
            })
        },
        methods:{
            saveEdit() {
                let verifyList  = {
                    firstName: {
                        test: 'required',
                        value: this.firstName,
                        message: this.translate('firstName')
                    },
                    lastName: {
                        test: 'required',
                        value: this.lastName,
                        message: this.translate('lastName')
                    },
                    country: {
                        test: 'required',
                        value: this.country,
                        message: this.translate('country')
                    },
                    city: {
                        test: 'required',
                        value: this.city,
                        message: this.translate('cityDesc')
                    }
                }
                
                this.$verify(verifyList).then((response) => {
                    if(response.res) {
                        let data = {
                            firstname:this.firstName,
                            lastname:this.lastName,
                            gender:parseInt(this.sex),
                            country:this.country,
                            city:this.city,
                            english:this.english,
                            work_exp:this.workYear,
                            hourly:this.money,
                            homeid:this.homePage,
                            fileds:this.field,
                            description:this.description
                        };
                        this.$store.dispatch('userEdit',data).then((response) => {
                            this.vuerifyStr = response.msg;
                            this.noteStatus = true;
                            let timer = setTimeout(() => {
                                this.noteStatus = false;
                                if(response.code === 200) {
                                    let id = this.$route.params.id;
                                    this.$store.dispatch('pageUsersAc',{uid:id});
                                    this.$router.push({name:'personalAbout',params:{id:id}})
                                }
                                clearTimeout(timer)
                            },1000)
                        });
                    }
                    else {
                        this.vuerifyStr = response.msg
                        this.noteStatus = true
                        let timer = setTimeout(() => {
                            this.noteStatus = false
                            clearTimeout(timer)
                        },1500)
                    }
                })
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
                        if(item.className === 'active') {
                            curLength++
                        }
                    });
                    if(curLength > 3 ) {
                        this.vuerifyStr = "Pick 3 of your most skilled or interested model categories"
                        this.noteStatus = true;
                        let timer = setTimeout(() => {
                            this.noteStatus = false;
                            clearTimeout(timer);
                        },1500);
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
            tirggerFile(event){
                let _this = this,
                    file = event.target.files[0],
                    reader = new FileReader();
                if(!/image\/\w+/.test(file.type)){
                    this.vuerifyStr = 'please upload images';
                    this.noteStatus = true;
                    let timer = setTimeout(() => {
                        this.noteStatus = false;
                        clearTimeout(timer);
                    },1500)
                }
                else {
                    reader.addEventListener("load", function () {
                        //console.log(reader.result)
                        _this.headUrl = reader.result
                        //reader.readAsBinaryString(file)  二进制
                        //console.log(file.type)
                        let data = {
                            pic:_this.headUrl,
                            ext:file.type
                        };
                        _this.$store.dispatch('editHeadPortraitAc',data).then(function (response) {
                        });
                    }, false);
                    reader.readAsDataURL(file);
                }
            }
        }
    }
</script>
