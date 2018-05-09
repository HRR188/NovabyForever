<template>
    <div id="app">
        <custom-nav v-show="showNav"></custom-nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import baseCss from './assets/scss/base.scss'
    import customNav from './components/nav/nav.vue'

    export default {
        name: 'app',
        components: {
            customNav
        },
        computed: {
            showNav: function () {
                return this.$store.state.nav.showNav;
            }
        }
    };
</script>
