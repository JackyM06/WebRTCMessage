<template>
  <div class="home">
    <div class="select-box private" @click="router.push(Pages.PRIVATE)">
      私聊RTC通信
    </div>
    <div class="select-box room" @click="router.push(Pages.ROOM)">
      群聊RTC通信
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { Pages } from '../router'
const router = useRouter()
</script>

<style lang="less" scoped>
  .home {
    display: flex;
    justify-content: center;
    .select-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 200px;
        margin-top: 30vw;
        margin-right: 90px;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        background: linear-gradient(to right, rgb(77, 160, 176), rgb(211, 157, 56));
        border-radius: 20px;
        cursor: pointer;
        &.room {
            background: linear-gradient(to right, rgb(255, 78, 80), rgb(249, 212, 35));
        }
    }
}
</style>
