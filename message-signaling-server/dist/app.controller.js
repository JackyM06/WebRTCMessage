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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let onlineUser = [];
const waitAnswerMap = {};
const answerMap = {};
function onlineCheck() {
    setTimeout(() => {
        const now = Date.now();
        onlineUser = onlineUser.filter(user => {
            if (now - user.time <= 6 * 1000) {
                return true;
            }
            waitAnswerMap[user.name] = null;
            answerMap[user.name] = null;
            return false;
        });
        onlineCheck();
    }, 3000);
}
onlineCheck();
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getOnline(username) {
        onlineUser = onlineUser.filter(e => e.name !== username);
        onlineUser.unshift({ name: username, time: Date.now() });
        return onlineUser.filter(e => e.name !== username).map(e => e.name);
    }
    sendOffer({ username, answerUser, sdp, }) {
        console.log('SendOffer', {
            username,
            answerUser,
            sdp,
        });
        waitAnswerMap[answerUser] = {
            offer: username,
            sdp,
        };
        answerMap[username] = null;
        return true;
    }
    sendAnswer({ username, offerUser, sdp, }) {
        console.log('Send Answer: ', {
            username,
            offerUser,
            sdp,
        });
        answerMap[offerUser] = {
            answer: username,
            sdp,
        };
        waitAnswerMap[username] = null;
        return true;
    }
    hasOffer({ username }) {
        if (waitAnswerMap[username]) {
            return waitAnswerMap[username];
        }
        return {};
    }
    hasAnswer({ username, answer }) {
        if (answerMap[username] && answerMap[username].answer === answer) {
            return answerMap[username];
        }
        return {};
    }
};
__decorate([
    (0, common_1.Get)('online'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], AppController.prototype, "getOnline", null);
__decorate([
    (0, common_1.Post)('sendOffer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sendOffer", null);
__decorate([
    (0, common_1.Post)('sendAnswer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sendAnswer", null);
__decorate([
    (0, common_1.Post)('hasOffer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "hasOffer", null);
__decorate([
    (0, common_1.Post)('hasAnswer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "hasAnswer", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map