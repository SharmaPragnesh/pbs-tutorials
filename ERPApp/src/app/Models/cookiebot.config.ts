// cookiebot.config.ts
import { NgxCookiebotConfig } from 'ngx-cookiebot-angular7';
import { environment } from 'src/environments/environment';

export class CookiebotConfig extends NgxCookiebotConfig {
  blockingMode: string = 'auto';
  cbId: string = environment.CbId;
  culture?: string;
  framework?: string;
  level?: string;
  type?: string;
}