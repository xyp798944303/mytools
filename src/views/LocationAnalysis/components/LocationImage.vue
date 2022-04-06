<template>
    <div class="location">
        <div id="loc-image" ref="locImage"></div>
    </div>
</template>
<script lang="ts" setup>
import { useAttrs, onMounted, ref, onUnmounted, reactive } from 'vue';
import * as zrender from 'zrender'
import { ZRenderType } from 'zrender';
import { beaconData, positionPoint } from '../config/positionData';
import { circleOption } from '../config/type';
const locImage = ref(null)
let zr = reactive({}) as ZRenderType
const offsetX = 13404600
const offsetY = 3675000
onMounted(() => {
    zrenderInit()
    beaconData.forEach(e=>{
        drawCircle(e)
    })
    drawLine(beaconData[0],beaconData[1])
    drawLine(beaconData[1],beaconData[2])
    drawLine(beaconData[2],beaconData[0])
    drawCircle(positionPoint)
})
function zrenderInit() {
    let zrenderDom = locImage.value
    zr = zrender.init(zrenderDom)
    let xAxis = new zrender.Line({
        shape: {
            x1: 0,
            x2: 7000,
            y1: 800,
            y2: 800
        }
    })
    let yAxis = new zrender.Line({
        shape: {
            y1: 0,
            y2: 800
        }
    })
    zr.add(xAxis)
    zr.add(yAxis)
}
function drawCircle(option: circleOption) {
    let circle = new zrender.Circle({
        shape: {
            cx: option.x-offsetX,
            cy: 800-option.y+offsetY,
            r: option.d || 1
        },
        style: {
            fill: 'none',
            stroke: '#F00'
        }
    });
    zr.add(circle)
}
function drawLine (point1:circleOption,point2:circleOption){
    let line = new zrender.Line({
        shape: {
           x1:point1.x-offsetX,
           x2:point2.x-offsetX,
           y1:800-point1.y+offsetY,
           y2:800-point2.y+offsetY
        }
    })
    zr.add(line)
}
</script>




<style  scoped>
#loc-image {
    width: 100%;
    height: 800px;
}
</style>