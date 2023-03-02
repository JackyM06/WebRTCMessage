<template>
  <div class="private">
    <div class="online-user-list">
      <div v-for="{ name } in onlineUserList" :key="name" class="item">
        <span class="name">{{ name }}</span>
        <button class="btn" @click="goMessage(name)">建连</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Pages } from '../router'

const router = useRouter()

const onlineUserList = ref<{
  name: string,
}[]>([
  {
    name: 'John'
  },
  {
    name: 'Bob'
  },
  {
    name: 'Fu'
  }
])

function goMessage (username: string) {
  router.push({
    name: Pages.MESSAGE,
    params: {
      username
    }
  })
}

</script>

<style scoped lang="less">
.private {
    display: flex;
    justify-content: center;
}
.online-user-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30vw;

    .item {
        display: flex;
        justify-content: space-between;
        width: 700px;
        padding: 10px 30px;
        margin-bottom: 10px;
        color: #fff;
        font-style: italic;
        font-weight: bold;
        background: linear-gradient(to right, rgb(0, 210, 255), rgb(146, 141, 171));
        border-radius: 6px;
        .name {
            flex: 1;
            font-size: 22px;
            text-align: center;
        }
        .btn {
            padding: 5px 30px;
            color: #fff;
            font-weight: bold;
            background: #c33764;
            border: none;
            border-radius: 20px;
            cursor: pointer;
        }
    }
}
</style>
