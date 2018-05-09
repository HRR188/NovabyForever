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
                        <div class="file-warp position-absolute text-center">
                            <input type="file" accept="image/png,image/jpg,image/jpeg" @change="tirggerFile($event)">
                            <span class="upp" v-lang.edit></span>
                        </div>
                    </div>
                    <img src="../../assets/images/business-icon.png" class="user-status">
                </div>
                <div class="company-name float-left">
                    <p class="tag-title">Company name</p>
                    <input type="text" v-model="companyName"/>
                </div>
                <div class="company-country float-left">
                    <p class="tag-title" v-lang.cr></p>
                    <select v-model="companyCountry">
                        <option v-for="item in countryList" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="company-city float-right">
                    <p class="tag-title" v-lang.city></p>
                    <select v-model="companyCity">
                        <option v-for="item in citylist" :value="item.id">{{item.name}}</option>
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
                        <p class="tag-title" v-lang.cs></p>
                        <select v-model="companySize">
                            <option v-for="c in companyLevelList" :value="c.id">{{c.name}}</option>
                         </select>
                    </li>
                    <li>
                        <p class="tag-title" v-lang.yf></p>
                        <input type="text" v-model="yearFounded" />
                    </li>
                    <li>
                        <p class="tag-title" v-lang.ct></p>
                        <select v-model="companyType">
                            <option v-for="c in companyTypeList" :value="c.id">{{c.name}}</option>
                        </select>
                    </li>
                </ul>
                <ul class="flex" style="margin-top:28px;">
                    <li style="width:100%;">
                        <p class="tag-title" v-lang.website></p>
                        <input style="width:100%;" type="text" v-model="website" placeholder="example:https://www.google.com">
                    </li>
                </ul>
            </div>
            <div class="padding-box">
                <p class="tag-title" v-lang.sp></p>
                <div class="pro-field" @click="filedResult($event)" id="pro-field">
                    <span :class="{active:item.status}" :data-value="item.id" v-for="item in fieldType">{{item.name}}</span>
                </div>
            </div>
            <div class="padding-box">
                <p class="tag-title" v-lang.cd></p>
                <textarea placeholder="Say something about yourself , don't be shy!" v-model="companyDescription"></textarea>
            </div>
        </form>
        <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
    name:'businessEdit',
    data(){
        return {
            noteStatus:false,
            vuerifyStr:'',
            companyName:'',
            companyCountry:'',
            companyCity:'',
            companyDescription:'',
            companySize:'',
            companyType:'',
            yearFounded:'',
            website:'',
            field:[],
            fieldType:[],
            headUrl:'',
            english:3,
            englishList:[],
            companyTypeList:[],
            companyLevelList:[]
        }
    },
    messages:{
        en:{
            cr:'Country/Region',
            city:'City',
            el:'English level',
            cs:'Company size',
            yf:'Year founded',
            ct:'Company type',
            website:'Website',
            sp:'Please pick 3 specialities',
            cd:'Company description',
            companyName: 'Please input company name',
            companyCountry: 'Please input country',
            companyCity: 'Please input city',
            english: 'Please select english level',
            companySize: 'Please select company size',
            companyType: 'Please select company type',
            yearFounded: 'Please input the year your company was founded',
            website: 'Please input Website',
            companyDescription: 'Please select company description',
            pick: 'Please pick 1-3 which you are interested in',
            spec: "Please pick 3 specialities",
            upload: 'please upload images'
        },
        zh:{
            cr:'国家/地区',
            city:'城市',
            el:'英语水平',
            cs:'公司规模',
            yf:'成立年份',
            ct:'公司类型',
            website:'网站',
            sp:'请选择3个专长领域',
            cd:'公司描述',
            companyName: '请输入公司名称',
            companyCountry: '请输入国家',
            companyCity: '请输入城市',
            english: '请选择英语等级',
            companySize: '请选择公司规模',
            companyType: '请选择企业类型',
            yearFounded: '请输入贵公司成立日期',
            website: '请输入网址',
            companyDescription : '请选择公司描述',
            pick: '请选择1-3个您感兴趣的',
            spec: '请选择3个特长',
            upload: '请上传图片'
        }
    },
    created(){
        this.$store.dispatch('countryAc').then((response) => {
            if(response.code === 200) {
                this.$store.dispatch('getUserInfoAc').then((response) => {
                    this.headUrl = response.data.user.avatar;
                    this.companyName = response.data.user.company_name;
                    this.companyCountry = response.data.user.country.id;
                    this.english = response.data.user.english_level
                    this.companyDescription = response.data.user.user_description;
                    if(response.data.user.city) {
                        this.$store.dispatch('cityAc',{id:this.companyCountry}).then((res) => {
                            if(res.code === 200) {
                                this.companyCity = response.data.user.city.id;
                            }
                        })
                    }
                    if(response.data.user.company_size == '') {
                        this.companySize = 1
                    }
                    else {
                        this.companySize = response.data.user.company_size
                    }
                    if(response.data.user.company_type == '') {
                        this.companyType = 1
                    }
                    else {
                        this.companyType = response.data.user.company_type
                    }
                    this.yearFounded = response.data.user.year_founded;
                    this.website = response.data.user.homepage;
                    this.field = response.data.user.fields
                    this.$store.dispatch('fieldAc').then((response) => {
                        if(response.code === 200) {
                            this.$store.state.dict.fieldList.forEach((item,index) => {
                                this.fieldType.push(item)
                            });
                            this.fieldType.forEach((item,index) => {
                                this.field.forEach((val) => {
                                    if(item.id == val) {
                                        item.status = true
                                    }
                                })
                            })
                        }
                    })

                    this.englishList = response.data.user_select.english_level
                    this.companyTypeList = response.data.user_select.company_type
                    this.companyLevelList = response.data.user_select.company_size
                })
            }
        })
    },
    watch:{
        companyCountry(val){
            let data = {
                id:val
            };
            this.city = '';
            this.$store.dispatch('cityAc',data)
        }
    },
    computed:{
        userInfo(){
            return this.$store.state.user.userInfo
        },
        countryList(){
            return this.$store.state.dict.countryList
        },
        citylist(){
           return this.$store.state.dict.citylist
        }
    },
    methods:{
        saveEdit(){
            let verifyList  = {
                companyName:{
                    test: 'required',
                    value: this.companyName,
                    message: this.translate('companyName')
                },
                companyCountry:{
                    test: 'required',
                    value: this.companyCountry,
                    message: this.translate('companyCountry')
                },
                companyCity:{
                    test:'required',
                    value: this.companyCity,
                    message: this.translate('companyCity')
                },
                english:{
                    test: 'required',
                    value: this.english,
                    message: this.translate('english')
                },
                companySize:{
                    test: 'required',
                    value: this.companySize,
                    message: this.translate('companySize')
                },
                companyType:{
                    test: 'required',
                    value: this.companyType,
                    message: this.translate('companyType')
                },
                yearFounded:{
                    test: 'regex',
                    rule: /^\d{4}$/,
                    value: this.yearFounded,
                    message: this.translate('yearFounded')
                },
                website:{
                    test: 'regex',
                    rule: /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/,
                    value: this.website,
                    message: this.translate('website')
                },
                companyDescription:{
                    test: 'required',
                    value: this.companyDescription,
                    message: this.translate('companyDescription')
                }
            }  
            
            this.$verify(verifyList).then((response) => {
                if(response.res) {
                    if(this.field.length === 0) {
                        this.vuerifyStr = this.translate('pick')
                        this.noteStatus = true;
                        let timer = setTimeout(() => {
                            this.noteStatus = false
                            clearTimeout(timer)
                        },1500)
                    }
                    else {
                        let data = {
                            company_name:this.companyName,
                            country:this.companyCountry,
                            city:this.companyCity,
                            english:this.english,
                            company_size:this.companySize,
                            year_founded:this.yearFounded,
                            company_type:this.companyType,
                            homeid:this.website,
                            fileds:this.field,
                            description:this.companyDescription
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
                            },1500)
                        });
                    }
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
                    if(item.className == 'active') {
                        curLength++
                    }
                });
                if(curLength > 3 ) {
                    this.vuerifyStr = this.translate('spec')
                    this.noteStatus = true;
                    let timer = setTimeout(() => {
                        this.noteStatus = false
                        clearTimeout(timer)
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
                this.vuerifyStr = this.translate('upload')
                this.noteStatus = true;
                let timer = setTimeout(() => {
                    this.noteStatus = false
                    clearTimeout(timer)
                },1500)
            }
            else {
                reader.addEventListener("load", function () {
                    //console.log(reader.result)
                    _this.headUrl = reader.result;
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
