<template>
    <div class="join-step-2">
        <div class="box flex top-message">
            <div class="head-portrait position-relative">
                <img :src="defaultImg" alt="" class="img-max">
                <div class="file-warp position-absolute text-center">
                    <span class="upp" v-lang.edit></span>
                    <input type="file" class="pointer" accept="image/png,image/jpg,image/jpeg" @change="tirggerFile($event)">
                </div>
            </div>
            <ul>
                <li>
                    <p class="tag-name" v-lang.cn></p>
                    <input type="text" v-model="companyName">
                </li>
                <li>
                    <p class="tag-name" v-lang.e></p>
                    <input type="text" v-model="email">
                </li>
                <li class="flex">
                    <div>
                        <p class="tag-name" v-lang.cr></p>
                        <select v-model="country">
                            <option v-for="item in countryList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <p class="tag-name" v-lang.city></p>
                        <select v-model="city">
                            <option value="aaa" v-for="item in citylist" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                </li>
                <li class="flex">
                    <div>
                        <p class="tag-name" v-lang.p></p>
                        <input type="password" v-model="password" maxlength="20">
                    </div>
                    <div>
                        <p class="tag-name" v-lang.rp></p>
                        <input type="password" v-model="enterPassword" maxlength="20">
                    </div>
                </li>
            </ul>
        </div>
        <div class="box bottom-message">
            <p class="tag-name" v-lang.el></p>
            <div>
                <label class="input-radio-sm" v-for="e in englishList">
                    <input type="radio" name="english" v-model="english" :value="e.id">{{e.name}}
                </label>
            </div>
            <div class="flex">
                <div style="width:258px;">
                    <p class="tag-name" v-lang.cs></p>
                    <select v-model="companySize">
                        <option v-for="c in companySizeList" :value="c.id">{{c.name}}</option>
                    </select>
                </div>
                <div style="width:258px;">
                    <p class="tag-name" v-lang.yf></p>
                    <input type="text" v-model="year">
                </div>
                <div style="width:258px;">
                    <p class="tag-name" v-lang.ct></p>
                    <select v-model="companyType">
                        <option v-for="c in companyTypeList" :value="c.id">{{c.name}}</option>
                    </select>
                </div>
            </div>
            <div>
                <p class="tag-name" v-lang.website></p>
                <input type="text" placeholder="example:https://www.google.com" v-model="webSite">
            </div>
            <div class="notes"  @click="file($event)" id="pro-field">
                <p class="tag-name" v-lang.spe></p>
                <span v-for="item in fileType" :data-value="item.id">{{item.name}}</span>
            </div>
            <div>
                <p class="tag-name" v-lang.bi></p>
                <textarea :placeholder="translate('shy')" v-model="introduction"></textarea>
            </div>
        </div>
        <div class="form-footer flex" style="justify-content: center;">
            <button class="btn btn-default btn-175" type="button" @click="signup">{{btnMsg.text}}</button>
        </div>
        <div class="form-note" v-show="noteStatus">{{noteStr}}</div>
    </div>
</template>
<script>
    export default {
        name:'joinBusinessTwo',
        data(){
            return {
                defaultImg:require('../../../assets/images/default-portrait.png'),
                companyName:'',
                email:'',
                country:'',
                city:'',
                password:'',
                enterPassword:'',
                english:'3',
                companySize:'1',
                year:'',
                companyType:'1',
                webSite:'',
                introduction:'',
                fileType:[],
                fileId:[],
                noteStr:'',
                noteStatus:false,
                imgId:'',
                btnMsg:{
                    status:false,
                    text:"Signup"
                },
                companySizeList:[],
                companyTypeList:[],
                englishList:[]
            }
        },
        messages:{
            en:{
                cn:'Company name',
                e:'Email',
                cr:'Country/Region',
                city:'City',
                el:'English level',
                we:'Working experience',
                hr:'Hourly rate',
                ho:'Homepage',
                sp:'Please pick 3 specialities',
                bi:'Brief introduction',
                shy:'Say something about yourself , don\'t be shy!',
                p:'Password',
                rp:'Re-enter password',
                cs:'Company size',
                ct:'Company type',
                website:'Website',
                spe:'Specialties',
                yf:'Year founded'
            },
            zh:{
                yf:'创立年份',
                spe:'擅长方面',
                website:'公司官网',
                cs:'公司规模',
                ct:'公司类型',
                p:'密码',
                cn:'公司名称',
                e:'邮箱',
                cr:'国家/地区',
                city:'城市',
                el:'英语水平',
                we:'工作经验',
                hr:'时薪',
                ho:'个人主页地址',
                sp:'请选择3个专长领域',
                bi:'简介',
                shy:'做点自我介绍，别害羞',
                rp:'确认密码'
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
            this.$store.dispatch('fieldAc').then((response) => {
                this.fileType = response.data.field;
            });
            this.$store.dispatch('countryAc');
            this.$store.dispatch('companyBasicInfo').then(response => {
                this.companySizeList = response.data.company_size;
                this.companyTypeList = response.data.company_type;
                this.englishList = response.data.english_level;
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
            file(event){
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
                        this.noteStr = "Pick 3 of your most skilled or interested model categories";
                        this.noteStatus = true;
                        setTimeout(() => {this.noteStatus = false},1500);
                        event.target.className = ""
                    }
                    else {
                        valeList.splice(valeList,valeList.length);
                        proFieldItem.forEach((item,index) => {
                            if(item.className === 'active') {
                                valeList.push(item.getAttribute('data-value'))
                            }
                        });
                        this.fileId = valeList
                    }
                }
            },
            signup(){
                let validation = [
                    {
                        regex:'required',
                        data:this.companyName,
                        message:'Please Company name'
                    },
                    {
                        regex:'email',
                        data:this.email,
                        message:'Please type correct email address'
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
                        regex:'password',
                        data:this.password,
                        message:'Please type password with 6-20 characters'
                    },
                    {
                        regex:'conformPassword',
                        data:this.enterPassword,
                        message:'These passwords don\'t match Try again'
                    },
                    {
                        regex:/^\d{4}$/,
                        data:this.year,
                        message:'Please input the year your company was founded'
                    },
                    {
                        regex:'required',
                        data:this.introduction,
                        message:'Please input Brief introduction'
                    },
                    //将website输入框的后台required验证改为前端验证，修正错误提示信息显示问题
                    {
                        regex:'required',
                        data:this.webSite,
                        message:'Please input WebSite'
                    },
                    {
                        regex:/^((http|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?$/,
                        data:this.webSite,
                        message:'Please input Correct WebSite'
                    },
                ];
                let result = this.$validation(validation);
                if(result === true) {
                    if(this.fileId.length) {
                        let data = {
                            company_name:this.companyName,
                            country:this.country,
                            city:this.city,
                            email:this.email,
                            password:this.password,
                            password_confirmation:this.enterPassword,
                            english:this.english,
                            company_size:this.companySize,
                            year:this.year,
                            company_type:this.companyType,
                            web:this.webSite,
                            fileds:this.fileId,
                            description:this.introduction,
                            icon:this.imgId
                        };
                        if(!this.btnMsg.status) {
                            this.btnMsg.status = true;
                            this.btnMsg.text = 'Waiting';
                            this.$store.dispatch('registerAc',data).then((response) => {
                                this.btnMsg.status = false;
                                if(response.code === 200) {
                                    this.$router.push({ name: 'joinBusinessThree' })
                                }
                                else {
                                    //邮件与web返回的错误信息是一个对象数组，其余验证返回信息是字符串，需单独处理
                                    if(typeof response.msg === 'object'){
                                        if(response.msg['email']){
                                            this.noteStr = response.msg['email'][0]
                                        }else if(response.msg['web']){
                                            this.noteStr = response.msg['web'][0];
                                        }
                                    }else{
                                        this.noteStr = response.msg;
                                    }
                                    this.noteStatus = true;
                                    setTimeout(() => {this.noteStatus = false},1500);
                                    this.btnMsg.text = 'Signup';
                                }
                            });
                        }
                    }
                    else {
                        this.noteStr = "Pick 3 of your most skilled or interested model categories";
                        this.noteStatus = true;
                        setTimeout(() => {this.noteStatus = false},1500);
                    }
                }
                else {
                    this.noteStr = result;
                    this.noteStatus = true;
                    setTimeout(() => {
                        this.noteStatus = false
                    },1500)
                }
            },
            tirggerFile(event){
                let file = event.target.files[0],
                    reader = new FileReader();
                if(!/image\/\w+/.test(file.type)){
                    this.noteStr = 'please upload images';
                    this.noteStatus = true;
                    setTimeout(() => {this.noteStatus = false},1500)
                }
                else {
                    reader.addEventListener("load", () => {
                        //console.log(reader.result)
                        this.defaultImg = reader.result;
                        //reader.readAsBinaryString(file)  二进制
                        //console.log(file.type)
                        let data = {
                            pic:this.defaultImg,
                            ext:file.type,
                            key:1
                        };
                        this.$store.dispatch('editHeadPortraitAc',data).then((response) => {
                            if(response.code === 200) {
                                this.imgId = response.data.icon;
                            }
                        });
                    }, false);
                    reader.readAsDataURL(file);
                }
            }
        }
    }
</script>