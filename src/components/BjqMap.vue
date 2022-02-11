<template>
    <div :id="mapDomID" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
declare let AMap: any
const mapDomID = Math.random() + '_'
const mapKeyVal = '664ddb7710051f2f18aa7262eb82ecde'
const emit = defineEmits(['mapComplete'])
let map: any = {}
type propsList = {
    location: string,
    zoom: number
}
const props = defineProps<propsList>();
onMounted(async () => {
    await mapScriptInit()
    mapInit()
    // createPoint({
    //     x: 116.500217,
    //     y: 38.571948
    // })
})
defineExpose({
    createPoint,
    createPolygon
})
async function mapScriptInit(this: any) {
    if (!window.Map) {
        const url =
            "https://webapi.amap.com/maps?v=1.4.15&key=" + mapKeyVal;
        const jsapi: any = await scryptInit(url);
        jsapi.setAttribute("id", this.scriptId);
        jsapi.charset = "utf-8";
        return await jsapi;
    }
}
function scryptInit(url: string) {
    const jsapi: any = document.createElement("script");
    jsapi.src = url;
    document.head.appendChild(jsapi);
    return new Promise(function (resolve, reject) {
        jsapi.onload = jsapi.onreadystatechange = function () {
            if (
                !this.readyState ||
                this.readyState === "loaded" ||
                this.readyState === "complete"
            ) {
                jsapi.onload = jsapi.onreadystatechange = null;
            }
            resolve(jsapi);
        };
    });
}
function mapInit() {
    const center = props.location.split(',')
    const config = {
        zoom: props.zoom,
        center: center,
        viewMode: "3D"
    }
    map = new AMap.Map(mapDomID, config)
    return new Promise<void>(function (resolve, reject) {
        map.on("complete", function () {
            emit('mapComplete', '地图加载完成')
            resolve()
        })
    })
}
function createPoint(obj: any) {
    const lanlat = translate(obj)
    let marker = new AMap.Marker({
        position: lanlat
    })
    map.add(marker)
}
function translate(obj: any) {
    const arr = [obj.x, obj.y]
    let lnglats: any = []
    AMap.convertFrom(arr, 'gps', function (status: any, result: any) {
        if (result.info === 'ok') {
            lnglats = result.locations; // Array.<LngLat>
        }
    });
    return lnglats
}
function createPolygon() { }
</script>
<style scoped>
</style>