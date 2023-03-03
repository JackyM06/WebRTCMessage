import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

let onlineUser: { name: string; time: number }[] = [];

const waitAnswerMap: Record<string, { offer: string; sdp: any }> = {};
const answerMap: Record<string, { answer: string; sdp: any }> = {};

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
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('online')
  getOnline(@Query('username') username: string): string[] {
    onlineUser = onlineUser.filter(e => e.name !== username);
    onlineUser.unshift({ name: username, time: Date.now() });
    return onlineUser.filter(e => e.name !== username).map(e => e.name);
  }

  @Post('sendOffer')
  sendOffer(
    @Body()
    {
      username,
      answerUser,
      sdp,
    }: {
      username: string;
      answerUser: string;
      sdp: any;
    },
  ) {
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

  @Post('sendAnswer')
  sendAnswer(
    @Body()
    {
      username,
      offerUser,
      sdp,
    }: {
      username: string;
      offerUser: string;
      sdp: any;
    },
  ) {
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

  @Post('hasOffer')
  hasOffer(
    @Body()
    { username }: { username: string },
  ) {
    // 轮询是否需要返回Answer
    if (waitAnswerMap[username]) {
      return waitAnswerMap[username];
    }
    return {};
  }

  @Post('hasAnswer')
  hasAnswer(
    @Body()
    { username, answer }: { username: string; answer: string },
  ) {
    // 发出Offer后，轮询获取是否返回Answer;
    if (answerMap[username] && answerMap[username].answer === answer) {
      return answerMap[username];
    }
    return {};
  }
}
