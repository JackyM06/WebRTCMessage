"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalSocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const signal_socket_service_1 = require("./signal-socket.service");
const dgram_1 = require("dgram");
let onlineUser = ['Bob', 'John'];
let SignalSocketGateway = class SignalSocketGateway {
    constructor(signalSocketService) {
        this.signalSocketService = signalSocketService;
    }
    join(username) {
        onlineUser = onlineUser.filter((e) => e !== username);
        onlineUser.unshift(username);
        return onlineUser.filter((e) => e !== username);
    }
    peerOffer(data, clinet) {
        return this.signalSocketService.findAll();
    }
    peerAnswer(id) {
        return this.signalSocketService.findOne(id);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SignalSocketGateway.prototype, "join", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('peerOffer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dgram_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalSocketGateway.prototype, "peerOffer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('peerAnswer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SignalSocketGateway.prototype, "peerAnswer", null);
SignalSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001),
    __metadata("design:paramtypes", [signal_socket_service_1.SignalSocketService])
], SignalSocketGateway);
exports.SignalSocketGateway = SignalSocketGateway;
//# sourceMappingURL=signal-socket.gateway.js.map