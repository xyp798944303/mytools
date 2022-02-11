
<template>
    <div>
        <bjq-map :location="'116.500276,38.571969'" :zoom="17" ref="mapRef" @mapComplete="mapComplete"></bjq-map>
    </div>
</template>


<script lang="ts" setup context>
import { useAttrs, onMounted, ref, onUnmounted, reactive } from 'vue';
import $axios from '../../../plugins/axios'
import BjqMap from '../../../components/BjqMap.vue';
const mapRef = ref();
const year = ref(0)
let posList:any = []
// const {createPoint,createPolygon} = mapRef.value
// console.log(createPoint,createPolygon)
onMounted(() => {
    getData()
    console.log(year)
})
async function getData() {
    const res: any = await $axios.post('/loc/gettagpos', {
        mapId: "lfrlsycyxgs",
        tags: ["21105073"],
        key: "32432432432432432",
    })
    if (res.data.errcode == -1) {
        posList = res.data.data.tags;
    }
}
function mapComplete(msg:string){
    console.log(msg)
    // posList.forEach((e:any)=>{
    //  mapRef.value.createPoint(e)
    // })
   
}

</script>
