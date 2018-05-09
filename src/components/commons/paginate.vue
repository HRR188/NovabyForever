<template>
    <ul class="pagination">
        <li :class="{permit:this.index === 1}" @click.stop="prev()">prev</li>
        <li :class="{active: selectedPage === toPage}" v-for="toPage in totalPages" @click.stop="go(toPage)">{{ toPage }}</li>
        <li :class="{permit:this.index === pages}" @click.stop="next()">next</li>
    </ul>
</template>
<script>

    export default {
        name: 'pageBox',
        props: {
            showPageNum: {  //导航条共显示几页
                type: Number,
                required: false
            },
            pageSize: {   //每一页显示的条数
                type: Number,
                required: false
            },
            total: {    //总条数
                type: Number,
                required: false
            },
        },
        methods: {
            prev() {
                this.index > 1? this.go(this.index - 1): false;
            },
            next() {
                this.index < this.pages? this.go(this.index + 1):false;
            },
            go(page) {
                this.selectedPage = page;
                if (this.index !== page) {
                    this.index = page;
                    this.$emit('listenerPage', this.index)
                }
            }
        },
        created(){
            this.selectedPage = 1;
        },
        computed: {
            pages() {
                return Math.ceil(this.size / this.limit)
            },
            totalPages() {
                const array = [];
                const showPageNum = this.showPageNum;
                const pageCount = this.pages;
                let current = this.index;
                const _offset = (showPageNum - 1) / 2;
                const offset = {
                    start: current - _offset,
                    end: current + _offset
                };
                if (offset.start < 1) {
                    offset.end = offset.end + (1 - offset.start);
                    offset.start = 1
                }
                if (offset.end > pageCount) {
                    offset.start = offset.start - (offset.end - pageCount);
                    offset.end = pageCount
                }
                if (offset.start < 1) offset.start = 1;
                for (let i = offset.start; i <= offset.end; i++) {
                    array.push(i)
                }
                return array
            },
        },
        data() {
            return {
                index: 1,
                limit: this.pageSize,
                size: this.total,
                selectedPage: 0,
            }
        },
        watch: {
            pageSize(val) {
                this.limit = val || 10
            },
            total(val) {
                this.size = val
            }
        }
    }
</script>
<style lang="scss">
    .pagination-warp {
        justify-content: center;
        align-items: center;
        .pagination {
            li {
                cursor: pointer;
                display: inline;
                position: relative;
                float: left;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 38px;
                border: 1px solid #D8D8D8;
                margin-left: -1px;
                outline: none;
                font-size: 14px;
                color: #515254;
                background-color: #fff;
                &:hover {
                    background-color: #F2F2F2
                }
                &.active {
                    background-color: #EA6264;
                    color: #fff;
                    border: none;
                }
            }
            .permit {
                cursor: not-allowed;
                background-color: #F2F2F2
            }
            li:first-child {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                width: 55px;
            }
            li:last-child {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                width: 55px;
            }
        }
    }
</style>
