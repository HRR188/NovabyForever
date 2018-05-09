export default {
    data(){
        return {
            backStatus:false,
            scrollTop:0
        }
    },
    props:{
        target:{
            default:100
        }
    },
    created(){
        window.addEventListener('scroll',this.scrollFn,false)
    },
    methods:{
        scrollFn(){
            this.backStatus = (window.scrollY > this.target);
            this.scrollTop = window.scrollY
        },
        backToTop(){
            let _time = setInterval(() => {
                if(this.scrollTop > 0) {
                    window.scrollTo(0, (Math.floor(this.scrollTop/2))-10);
                }
                else {
                    clearInterval(_time)
                }
            },30)
        }
    },
    beforeDestroy () {
        window.removeEventListener('scroll',this.scrollFn,false)
    }
}