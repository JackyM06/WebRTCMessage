<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router'
import { formatTime } from '@/common/utils'
import { Peer, PeerType } from '@/common/peer'
import { Store } from '@/store';

const route = useRoute()

const username = route.params.username as string;
const peerType = route.params.peerType as PeerType;

const currentMessage = ref('');

const messageContent = ref<HTMLDivElement>();

const remoteMessageList = ref<{message: string, time: number}[]>([])
const localMessageList = ref<{message: string, time: number}[]>([])

const messageList = computed(() => {
    const meMessage = localMessageList.value.map(e => {
        return {
            ...e,
            isMe: true,
        }
    })
    const list = [
        ...remoteMessageList.value,
        ...meMessage,
    ].sort((a, b) => a.time - b.time).map((e: any) => ({
        ...e,
        isMe: !!e.isMe
    }))
    return list as {
        message: string, time: number, isMe: boolean
    }[]
})

const listWatcher = watch(messageList, async () => {
    await nextTick();
    messageContent.value?.scrollTo({
      top:  messageContent.value.scrollHeight,
      behavior: 'smooth'
    });
})

function sendMessage() {
    const message = currentMessage.value;
    if(!message) {
        return;
    }
    localMessageList.value.push({
        message,
        time: Date.now(),
    })
    Store.pc.send(message)
    currentMessage.value = ''
}

async function beginConnect() {
    if(peerType === PeerType.OFFER) {
        Store.pc.connect(peerType, username)
    }
}

Store.pc.addReceiveHandler((message) => {
    remoteMessageList.value.push({
        message,
        time: Date.now(),
    })
})

beginConnect();

</script>

<template>
    <div class="message">
        <div class="message-box">
            <div class="username">
                <span>{{ username }}</span>
            </div>
            <div class="message-content" ref="messageContent">
                <div v-for="(item, index) in messageList" :key="index" >
                    <div v-if="!item.isMe" class="pop" >
                        <span class="name"> {{ username[0] }} </span>
                        <div class="info">
                            <span class="time"> {{ formatTime(item.time, 'yyyy-MM-dd HH:mm:ss') }}</span>
                            <span class="context"> {{ item.message }} </span>
                        </div>
                    </div>
                    <div class="pop myself" v-if="item.isMe">
                        <div class="info">
                            <span class="time"> {{ formatTime(item.time, 'yyyy-MM-dd HH:mm:ss') }}</span>
                            <span class="context"> {{ item.message }} </span>
                        </div>
                        <span class="name"> ??? </span>
                    </div>
                </div>
            </div>
            <input v-model="currentMessage" @keydown.enter="sendMessage" placeholder="????????????????????????????????????????????????" class="message-input"/>
        </div>
        <div class="debug-context">
            ????????????
            <p v-for="(log, index) in Store.pc.log.value" :key="index">
                <span>{{ log.message }}</span>
                <span>{{ formatTime(log.time, 'yyyy-MM-dd HH:mm:ss') }}</span>
            </p>
        </div>
    </div>
</template>

<style lang="less" scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.message {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30vh;
}

.message-box {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 700px;
    height: 600px;
    border-radius: 10px;
    .username {
        padding: 10px;
        font-size: 24px;
        font-style: italic;
        font-weight: bold;
        text-align: center;
        background-color: #366;
    }

    .message-content {
        flex: 1;
        overflow-y: scroll;
        padding: 10px 20px;
        background-color: #333;

        .pop {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;

            .info {
                display: flex;
                flex-direction: column;
                margin: 0 10px;
                margin-top: -5px;
            }

            .name {
                .center;
                width: 50px;
                height: 50px;
                color: #fff;
                font-weight: bold;
                background-color: #c03;
                border-radius: 25px;;
            }

            .context {
                max-width: 200px;
                padding: 10px 15px;
                margin-top: 4px;
                background: #963;
                border-radius: 10px;
            }

            .time {
                color: #ccc;
                font-size: 12px;
                font-style: italic;
            }

            &.myself {
                justify-content: flex-end;
                .name {
                    background-color: #09c;
                }
                .context {
                    background-color: #9c9;
                }
            }
        }
    }
    .message-input {
        height: 70px;
        padding: 0 20px;
        font-size: 18px;
        border: 0;
        outline-style: none ;

        &::placeholder {
            color: #ccc;
        }
    }
}
</style>

