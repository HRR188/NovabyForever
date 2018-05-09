<template>
    <div class="projects-success-container w-940 auto text-center">
        <p>Congratulations! Please wait for proposals</p>
        <router-link :to="{name:'biddingGallery'}" class="btn btn-default btn-175">View my projects</router-link>
    </div>
</template>

<script>
export default {
    name:'newProjectsSuccess',
    data(){
        return {

        }
    }
}
</script>