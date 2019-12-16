import { Injectable } from '@angular/core';

import * as moment from 'moment-jalaali';

export enum MeasureType {
    years, quarters, months, weeks, days, hours, minutes, seconds, milliseconds
}

@Injectable({ providedIn: 'root' })
export class DateTimeService {

    public getDate(type: string = 'fa', format: string = 'jYYYY/jMM/jDD'): string {
        const date = moment().format('YYYY-MM-DD');

        if (type === 'fa') {
            return this.toShamsi(date, format);
        } else {
            return date.format(format);
        }
    }

    public getTime(format: string = 'hh:mm:ss a'): string {
        return moment().format(format);
    }

    public getDateTime(format: string = 'jYYYY/jMM/jDD hh:mm:ss a'): string {
        moment.loadPersian({ dialect: 'persian-modern' });
        return moment().format(format);
    }

    public toShamsi(date: string, format: string = 'jYYYY/jMM/jDD'): string {
        let d = moment(this.fixDateFormat(date));
        if (d.isValid()) {
            return d.format(format);
        } else {
            return null;
        }
    }

    public toMiladi(date: string, format: string = 'YYYY-MM-DD'): string {
        let d = moment(this.fixDateFormat(date), 'jYYYY/jMM/jDD');
        if (d.isValid()) {
            return d.format(format);
        } else {
            return null;
        }
    }

    public time(time: string, format: string = 'hh:mm:ss a'): string {
        return moment(time).format(format).replace('am', 'صبح').replace('pm', 'عصر');
    }

    public dateDiff(date1: any, date2: any, measure: MeasureType) {
        let _date1 = moment(date1);
        let _date2 = moment(date2);
        return _date1.diff(_date2, MeasureType[measure]);
        // return moment.duration(_date1.diff(_date2));
    }

    public dateAdd(date: any, value: number, measure: MeasureType, format: string = 'jYYYY/jMM/jDD') {
        return moment(date).add(value, MeasureType[measure]).format(format);
    }

    public dateSubtract(date: any, value: number, measure: MeasureType, format: string = 'jYYYY/jMM/jDD') {
        return moment(date).subtract(value, MeasureType[measure]).format(format);
    }

    public dateIsValid(date: string): boolean {
        return moment(date).isValid();
    }

    public dateToNumber(date: string): number {
        return moment(date, 'YYYY-MM-DD').unix();
    }

    public numberToDate(value: number, format: string = 'YYYY-MM-DD'): number {
        return moment.unix(value).format(format);
    }

    private fixDateFormat(date) {
        return date.replace(new RegExp('/', 'g'), '-').substr(0, 10);
    }
}
