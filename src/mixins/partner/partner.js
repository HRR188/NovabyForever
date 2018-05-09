export default {
    data(){
        return{
            page:0,
            partnerList:[],
            loading:false,
            noMoreData:false
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData:function () {
            this.page++;
            this.loading = true
            this.$store.dispatch('partner/partnerList',{pagesize:5,page:this.page,act:this.act}).then( (response) => {
                if(response.code === 200) {
                    this.loading = false;
                    this.partnerList = this.partnerList.concat(response.data.users);
                    if(response.data.users.length < 5){
                        this.noMoreData = true
                    }
                }
                else {
                    this.noMoreData = true
                }
            })
        }
    }
}