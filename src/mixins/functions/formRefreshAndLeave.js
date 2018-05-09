/**
 * Created by harryliu on 11/8/17.
 */
export default {
    created(){
        window.onbeforeunload = function(e) {
            let dialogText = 'Are you sure to leave this page?';
            e.returnValue = dialogText;
            return dialogText;
        };
    },
    destroyed(){
        window.onbeforeunload = function () {}
    },
    beforeRouteLeave (to, from, next) {
        if(to.path === '/upload-model-success'){
            next()
        }
        else{
            this.$alert({
                type:'confirm',
                message: 'Are you sure to leave this page?',
                confirmTxt: 'leave',
                cancelTxt: 'cancel'
            }).then(function (response) {
                if(response.data === 'confirm'){
                    next()
                }
                else{
                    next(false)
                }
            })
        }
    }
}