<template>
    <div class="service-container">
        <ul>
            <li>
                <p>NovaHub plans</p>
                <div class="clearfix">
                    <p class="service-name">Silver</p>
                    <p class="service-data">12:00:00, 31, May, 2017 - 12:00:00, 31, Jun, 2017</p>
                    <div class="float-right">
                        <button type="button" class="btn btn-default-border">Upgrade</button>
                        <button type="button" class="btn btn-default">Renew</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"service",
    data(){
        return {

        }
    }

}
</script>

<style lang="scss">
.personal-warp{
    .service-container{
        li{
            margin-top:20px;
            background-color:#fff;
            padding:30px 40px;
            >p{
                font-size: 16px;
                color: #515254;
            }
            >p+div{
                margin-top:18px;
            }
            .service-name{
                font-size: 22px;
                color: #515254;
                float: left;
            }
            .service-data{
                font-size: 16px;
                color: #7A7A7A;
                float: left;
                line-height: 28px;
                margin-left:32px;
            }
            button{
                width:80px;
                height:25px;
                line-height: 25px;
            }
            .btn-default-border{
                margin-right:18px;
            }
        }
    }
}
</style>
