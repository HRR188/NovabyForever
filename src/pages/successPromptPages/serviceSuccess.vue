<template>
    <div class="w-940 auto service-plans-warp">
        <div class="success-note">
            <p>Congratulations！</p>
            <p>You have sucessfully renewed your plan, your new plan will start on 12:00:00, 1st, Jun, 2017</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'serviceSuccess'
}
</script>

<style lang="scss">
.service-plans-warp{
    .success-note{
        p{
            text-align: center;
        }
        p:first-child{
            font-size: 24px;
            color: #4A4A4A;
            margin-top:145px;
            &:before{
                content:'';
                display: block;
                width:94px;
                height:94px;
                margin:0 auto 50px;
                background:url(../../assets/images/projects-sprite.png) -123px -188px no-repeat;
            }
        }
        p:last-child{
            font-size: 18px;
            color: #4A4A4A;
            margin-top:20px;
        }
    }
}
</style>
