import { ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';

declare var $: any;

export function FormValidator(form: FormGroup, formId: string = ''): Observable<string[]> {
    return new Observable<string[]>(observer => {
        let errors: KeyValue<string, string>[] = Array<KeyValue<string, string>>();

        Object.keys(form.controls).map(
            name => {
                let control = form.get(name) as any;

                if (control.value) {
                    control.value = convertNumber(control.value);
                }

                if (control.errors) {
                    errors.push({
                        key: name,
                        value: control.errors.error
                    });
                }

                if (typeof control.controls !== 'undefined') {
                    Object.keys(control.controls).map(
                        gName => {
                            let gControl = control.get(gName) as any;

                            if (gControl.value) {
                                gControl.value = convertNumber(gControl.value);
                            }

                            if (gControl.errors) {
                                errors.push({
                                    key: gName,
                                    value: control.errors.error
                                });
                            }
                        }
                    );
                }
            }
        );

        if (form.errors) {
            Object.keys(form.errors).map(
                err => {
                    errors.push({
                        key: err,
                        value: form.getError(err)
                    });
                }
            );
        }

        $(`#${formId} small.err`).remove();

        let oldDiv = document.querySelector(`#${formId} > div.form-alert`);
        if (oldDiv) oldDiv.remove();

        if (errors.length < 1) {
            observer.next();
        } else {
            addErrorsForInput(formId, errors);

            observer.error(errors);
        }
    });
}

function addErrorsForInput(formId: string, errors: KeyValue<string, string>[]) {
    let customErr: string[] = new Array<string>();

    for (let i = 0; i < errors.length; i++) {
        let elm = $(`#${formId} [formControlName="${errors[i].key}"], #${formId} [data-error="${errors[i].key}"]`);
        if (elm.length < 1) {
            customErr.push(errors[i].value);
        } else {
            $(`<small class="err">${errors[i].value}</small>`).insertAfter(elm);
        }
    }

    if (errors.length > 0) {
        $(`#${formId} [formControlName="${errors[0].key}"]`).focus();
    }

    if (customErr.length > 0) {
        addErrorsToForm(formId, customErr);
    }
}

function addErrorsToForm(formId: string, errors: string[]) {
    if (formId !== '') {
        let form = document.getElementById(formId) as HTMLElement;

        let div = document.createElement('div');
        div.classList.add('form-alert', 'alert-dismissible', 'alert');
        div.setAttribute('role', 'alert');

        let button = document.createElement('button');
        button.classList.add('close');
        button.setAttribute('type', 'button');
        button.setAttribute('data-dismiss', 'alert');
        button.setAttribute('aria-label', 'Close');
        button.innerHTML = '<span aria-hidden="true">&times;</span>';

        let h5 = document.createElement('h5');
        h5.classList.add('font-weight-bold');
        h5.innerHTML = '<i class="fa fa-exclamation-triangle"></i> خطا های زیر رو بررسی کنید';
        div.append(button);
        div.append(h5);

        errors.forEach(e => {
            let p = document.createElement('p');
            p.innerHTML = e;
            div.append(p);
        });
        form.prepend(div);
    }
}

export function CardLoading(className: string) {
    $(`.${className}.card`).toggleClass('loading');
}

export function AddCardLoading(className: string) {
    $(`.${className}.card`).addClass('loading');
}
export function RemoveCardLoading(className: string) {
    $(`.${className}.card`).removeClass('loading');
}

export function RequiredValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || /^[\s]*$/.test(control.value)) {
            return { 'error': err };
        }
        return null;
    };
}

export function MobileValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === '') {
            return null;
        }
        if (/^09\d{9}$/.test(control.value)) {
            return null;
        } else {
            return { 'error': err };
        }
    };
}

export function NationalNoValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || control.value === '') {
            return null;
        }
        if (!/^\d{10}$/.test(control.value)
            || control.value == '0000000000'
            || control.value == '1111111111'
            || control.value == '2222222222'
            || control.value == '3333333333'
            || control.value == '4444444444'
            || control.value == '5555555555'
            || control.value == '6666666666'
            || control.value == '7777777777'
            || control.value == '8888888888'
            || control.value == '9999999999') {
            return { 'error': err };
        } else {
            var check = parseInt(control.value[9]);
            var sum = 0;
            var i;
            for (i = 0; i < 9; ++i) {
                sum += parseInt(control.value[i]) * (10 - i);
            }
            sum %= 11;
            let result = (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
            if (result) {
                return null;
            } else {
                return { 'error': err };
            }
        };
    }
}

export function PasswordValidator(check_0_9: boolean, check_a_z: boolean, check_A_Z: boolean, check_special_chars: boolean,
    length: number, err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        let str: string = '';
        if (check_0_9) {
            str += '(?=.*[0-9])';
        }
        if (check_a_z) {
            str += '(?=.*[a-z])';
        }
        if (check_A_Z) {
            str += '(?=.*[A-Z])';
        }
        if (check_special_chars) {
            str += '(?=.*[!@#\$%\^&\*])';
        }
        str += `(?=.{${length},})`;

        if (new RegExp(str).test(control.value)) {
            return null;
        } else {
            return { 'error': err };
        }
    };
}

function convertNumber(val): number {
    let enNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let faNumber = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    let arNumber = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    for (let i = 0; i <= 9; i++) {
        let regex1 = new RegExp(faNumber[i], 'g');
        let regex2 = new RegExp(arNumber[i], 'g');
        val = val.replace(regex1, enNumber[i]);
        val = val.replace(regex2, enNumber[i]);
    }
    return val;
}