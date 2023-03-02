import { sleep } from '@/common/utils'
// 1对1 P2P连接
export enum PeerType {
    OFFER = 'offer',
    ANSWER = 'answer',
}

export class Peer {
    SDP: any;
    type = PeerType.OFFER;
    receiveHandlers: ((message: string) => void)[] = []; // 消息句柄
    isConnected = false;
    log: string[] = [];

    userToken = '';

    pc = new RTCPeerConnection({
        iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302'
            },
          ]
    })

    dc: RTCDataChannel | null = null;

    constructor(public token: string = 'channel', public currentUser: string) {
        this.pc.onicecandidate = () => this.SDP = this.pc.localDescription;
    }

    async connect(type = PeerType.OFFER, userToken: string) {
        this.type = type;
        if(type === PeerType.OFFER) {
            this.dc = this.pc.createDataChannel('channel');
            this.dc.onmessage = this.runReceiveHandler.bind(this.dc);
            
            const offer = await this.pc.createOffer();
            this.pc.setLocalDescription(offer);
            // 等待Answer端返回SDP
            const answer = await this.requestAnswer();
            
        }
        this.isConnected = true;
    }

    async disconnect() {
        
    }

    send(message: string) {

    }

    addReceiveHandler(cb: (message: string) => void) {
        this.receiveHandlers.push(cb);
    }

    runReceiveHandler(e: any) {
        this.receiveHandlers.forEach(cb => cb(e.data));
    }

    async requestAnswer() {
        const response = await fetch('http://localhost:8080/signal', {
            method: 'POST',
            body: JSON.stringify({
                currentUser: this.currentUser,
                remoteUser: this.userToken,
            })
        })

        const data = await response.json();
    }


}