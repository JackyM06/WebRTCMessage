import { sleep } from '@/common/utils'
import { ref } from 'vue'
import { baseURL } from '@/const/url'
// 1对1 P2P连接
export enum PeerType {
    OFFER = 'offer',
    ANSWER = 'answer',
}

export class Peer {
    SDP: any;
    type = PeerType.OFFER;
    receiveHandlers: ((message: string) => void)[] = [
        (message) => {
            this.pushLog(`received message: ${message}`)
        }
    ]; // 消息句柄
    isConnected = false;
    log = ref<{ message: string, time: number }[]>([]);

    remoteUser = '';

    pc = new RTCPeerConnection({
        iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302'
            },
          ]
    })

    dc: RTCDataChannel | null = null;

    constructor(public currentUser: string, public token: string = 'channel') {
    }

    async connect(type = PeerType.OFFER, remoteUser: string, remoteSPD?: any) {
        this.remoteUser = remoteUser;
        this.type = type;
        this.pushLog(`p2p begin connect, type is ${this.type}`)
        if(type === PeerType.OFFER) {
            this.offerConnect();
        } else if (type === PeerType.ANSWER && remoteSPD) {
            this.answerConnect(remoteSPD);
        }
        this.isConnected = true;
    }

    async offerConnect(){
        this.dc = this.pc.createDataChannel('channel');
        this.dc.onmessage = this.runReceiveHandler.bind(this);
        
        const offer = await this.pc.createOffer();
        this.pc.setLocalDescription(offer);
        this.pushLog(`offer created`)
        await this.waitSTUNReady();
        
        // 发送连接邀请
        await this.sendOffer()
        this.pushLog(`offer was send Signaling Server`)
        
        // 等待Answer端返回SDP
        this.pushLog(`waiting answer receive...`)
        const answerSDP = await this.hasAnswer(this.remoteUser);
        this.pushLog(`answer was received from Signaling Server`)
        
        this.pc.setRemoteDescription(answerSDP);
        this.pushLog('p2p was connect!')
    }

    async answerConnect(remoteSPD: any) {
        this.pc.ondatachannel = e => {
            this.pushLog(`datachannel was build`)
            this.dc = e.channel;
            this.dc.onmessage = this.runReceiveHandler.bind(this);
        }
        this.pc.setRemoteDescription(remoteSPD);
        this.pushLog(`remoteSDP was set`)
        const answer = await this.pc.createAnswer();
        this.pushLog(`answer created`)
        this.pc.setLocalDescription(answer);
        await this.waitSTUNReady();
        await this.sendAnswer()
        this.pushLog(`answer was send Signaling Server`)

    }

    async disconnect() {
        // 
    }

    send(message: string) {
        this.dc?.send(message)
    }

    addReceiveHandler(cb: (message: string) => void) {
        this.receiveHandlers.push(cb);
    }

    runReceiveHandler(e: any) {
        this.receiveHandlers.forEach(cb => cb(e.data));
    }

    async sendOffer() {
        const response = await fetch(`${baseURL}/sendOffer`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.currentUser,
                answerUser: this.remoteUser,
                sdp: this.SDP
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    async sendAnswer() {
        const response = await fetch(`${baseURL}/sendAnswer`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.currentUser,
                offerUser: this.remoteUser,
                sdp: this.SDP
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
    }


    pushLog(message: string) {
        this.log.value.push({
            message,
            time: Date.now(),
        })
    }

    waitSTUNReady() {
        return  new Promise((res, rej) => {
            this.pc.onicecandidate = (e) => {
                if(e.candidate?.type !== 'srflx' && e.candidate?.type !== 'host') {
                    return;
                }
                this.pushLog(`STUN Server response SUCCESS!`)
                this.SDP = this.pc.localDescription
                res(true);
            };
        })
    }

    async hasOffer(): Promise<any> {
        const response = await fetch(`${baseURL}/hasOffer`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.currentUser,
            }),
            headers: {
                'content-type': 'application/json'
            },
        } )
        const data = await response.json();
        if(!data.offer) {
            await sleep(3000);
            return await this.hasOffer();
        }
        this.pushLog(`${data.offer}'s offer was received!`)
        return data;
    }

    async hasAnswer(remoteUser: string): Promise<any> {
        const response = await fetch(`${baseURL}/hasAnswer`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.currentUser,
                answer: this.remoteUser
            }),
            headers: {
                'content-type': 'application/json'
            }

        } )
        const data = await response.json();
        if(!data.answer) {
            await sleep(3000);
            return await this.hasAnswer(remoteUser);
        }

        const { sdp, answer } = data;
        this.pushLog(`${answer}'s answer was received!`)
        return sdp;
    }
}