import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

class AdminInfo { }

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    accessTokenKey: string = '_access_token';
    userInfoKey: string = '_user_info';

    constructor(private router: Router) { }

    public checkIsLogin(): boolean {
        if (this.getAccessToken() ===
            `eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.hy5V39sJ0GAJPa7_Q-vrKw78MdwC4zsVKtMUb743YtkQIvDlpgNwpA.9Zg9zzshMt4sSs1AMOcLtA.vVCv27Mg1vcbEpp_NXbuWhBBtAdw4Blg79lThLw9h8zpjEulhocwv_yeXs1G90lmQIXHs2JR4Nwwii761mB7FcGnviqIVW1A1JORsbljV6HbMyMixavTdOBPXW4YOZEWFDtajgoDXmE0pWsVTFrKm0_p8JTSGQcU02psbH_k7tW2odJrnGGIN5wrZXD019ZS9GtBZq-9F2hYB9Cbn8SQ056XuwHvVK-WPNsipYctn6ZKwiYIGqEi6CzK0jBJlTQiIL8lnah652MJQiLQjhkvsg.DXz0mjtZUs11E-IyO6MrmQ`) {
            return true;
        } else {
            return false;
        }
    }

    public setAccessToken(token: string) {
        window.sessionStorage.setItem(this.accessTokenKey, token);
    }

    public getAccessToken(): string {
        return window.sessionStorage.getItem(this.accessTokenKey);
    }

    public setUserInfo(model: AdminInfo) {
        window.sessionStorage.setItem(this.userInfoKey, JSON.stringify(model));
    }

    public getUserInfo(): AdminInfo {
        let str = window.sessionStorage.getItem(this.userInfoKey);
        return JSON.parse(str);
    }

    public removeAccessToken() {
        window.sessionStorage.removeItem(this.accessTokenKey);
    }

    public logout() {
        window.sessionStorage.clear();

        this.router.navigate(['login']);
    }
}
