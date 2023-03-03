import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getOnline(username: string): string[];
    sendOffer({ username, answerUser, sdp, }: {
        username: string;
        answerUser: string;
        sdp: any;
    }): boolean;
    sendAnswer({ username, offerUser, sdp, }: {
        username: string;
        offerUser: string;
        sdp: any;
    }): boolean;
    hasOffer({ username }: {
        username: string;
    }): {};
    hasAnswer({ username, answer }: {
        username: string;
        answer: string;
    }): {};
}
