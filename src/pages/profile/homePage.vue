<template>
    <div>

    </div>
</template>
<script>
export default {
    name:'homePage',
    data(){
        return {
            aaa:'aaa'
        }
    },
    created(){
        let routeName = this.$route.path.split('/');
        let data = {
            name:routeName[routeName.length-1]
        };
        this.$store.dispatch('redirectRoutegGetUserId',data).then((response) => {
            if(response.code === 200) {
                this.$router.replace({name:'personalAbout',params:{id:response.data.user_id}})
            }
            else {
                this.$router.replace({name:'home'})
            }
        })
    }

}
</script>