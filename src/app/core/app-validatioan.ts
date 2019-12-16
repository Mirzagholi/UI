import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppValidation {

    isNullOrEmpty(value: any): boolean {
        return value === null || (/^[\s]*$/.test(value));
    }

    isMobile(str: string): boolean {
        return (/^09[0-9]{9}$/.test(str));
    }
}