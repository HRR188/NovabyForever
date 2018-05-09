/**
 * Created by harryliu on 24/5/17.
 */
const nav = {
    state:{
        showNav:true
    },
    mutations:{
        showNav:function (state) {
            state.showNav = true;
        },
        hideNav:function (state) {
            state.showNav = false;
        }
    }
};

export default nav