<template>
    <h1>{{aboutInfo}}</h1>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        aboutInfo: ""
    }),
    created(){
        this.getInfo();
    },
    methods: {
        getInfo() {
            let me = this;
            axios
            .get("configuracion/list")
            .then(function(response){
                me.aboutInfo = response.data[0].aboutInfo;
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
}

</script>