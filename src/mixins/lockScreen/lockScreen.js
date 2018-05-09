export default {
    created(){
        //固定页面滑动条
        document.body.style.overflow='hidden';
    },
    beforeDestroy () {
        //显示页面滑动条
        document.body.style.overflow='';
    }
}