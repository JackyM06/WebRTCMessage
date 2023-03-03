<template>
  <div class="private">
    <div class="online-user-list">
      <div v-for="name in onlineUserList" :key="name" class="item">
        <span class="name">{{ name }}</span>
        <button class="btn" @click="goMessage(name)">建连</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Pages } from '../router'
import { PeerType, Peer } from '@/common/peer'
import { Store } from '@/store'
import { sleep } from '@/common/utils'
import { baseURL } from '@/const/url'

const router = useRouter()

const onlineUserList = ref<string[]>([])

const isOnline = ref(false);

const pc = new Peer(Store.username.value);

async function  getOnlineUserList() {
  const response = await fetch( `${baseURL}/online?username=${Store.username.value}`)
  onlineUserList.value = await response.json();
  isOnline.value=true
  await sleep(3000);
  if(!isOnline.value) {
    return;
  }
  getOnlineUserList();
}


function goMessage (username: string, peerType = PeerType.OFFER) {
  router.push({
    name: Pages.MESSAGE,
    params: {
      username,
      peerType,
    }
  })
}

async function loopGetOffer() {
  const user = await Store.pc.hasOffer();
  const { sdp, offer } = user;
  if(confirm(`收到来自${offer}的会话邀请，是否开始聊天？`)) {
      Store.pc.pushLog(`${offer}'s offer was received!`)
      Store.pc.connect(PeerType.ANSWER, offer, sdp);
      goMessage(offer, PeerType.ANSWER)
      return;
  }
  Store.pc.pushLog(`rejected ${offer}'s offer!`)
  await sleep(3000);
  return Store.pc.hasOffer();
}


function setUserName() {
  if(Store.username.value) {
    loopGetOffer();
    getOnlineUserList();
    return;
  }
  const input = prompt('请输入你的会话昵称', '') || '';

  if(!input) {
    setUserName();
    return;
  } 
  
  Store.username.value = input;
  loopGetOffer();
  getOnlineUserList();
}

setUserName();

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
