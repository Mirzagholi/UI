import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseService } from 'src/app/core/services/base.service';
import { Login, AdminInfo, Captcha } from 'src/app/shared/models/login';
import { ResultService } from 'src/app/shared/models/general';

@Injectable()
export class LoginService extends BaseService {

    constructor() {
        super();
    }

    public login(model: Login): Observable<ResultService<AdminInfo>> {
        return new Observable<ResultService<AdminInfo>>(observer => {
            super.post<Login, ResultService<AdminInfo>>('Api/Hypertension/AdminLogin255', model, 'json').subscribe(
                response => {
                    observer.next(response);
                }
            );
        });
    }

    public getNewCaptcha(): Observable<Captcha> {
        return new Observable<Captcha>(observer => {
            super.get<Captcha>('Api/Hypertension/GetCaptcha', 'json').subscribe(
                response => {
                    observer.next(response);
                }
            );
        });
    }

    public getStatusCodeMessage(status: number): string {
        switch (status) {
            case -21: { return 'شماره ملی یا رمز عبور صحیح نمی باشد'; }
            case -31: { return 'امکان ارتباط با سرویس ثبت احوال وجود ندارد'; }
            case -32: { return 'اطلاعات قبلا ثبت شده است'; }
            case -33: { return 'شماره ملی یا تاریخ تولد معتبر نمی باشد'; }
            case -34: { return 'تاریخ تولد معتبر نمی باشد'; }
            case -35: { return 'شماره ملی صحیح نمی باشد'; }
            case -41: { return 'مقادیر وارد شده صحیح نمی باشد'; }
            case -61: { return 'کد امنیتی وارد شده صحیح نمی باشد'; }
        }
    }

}
