
export class Login {
    Username: string;
    Password: string;
    Captcha: string;
    CaptchaKey: string;
}

export class AdminInfo {
    Id_Owner: number;
    Name: string;
    Family: string;
    Token: string;
}

export class Captcha {
    Key: string;
    Image: string;
}