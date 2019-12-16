import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

declare var $: any;

@Injectable({ providedIn: 'root' })
export class DialogService {

    dialog(id: string, backdropClose: boolean = true): Observable<boolean> {
        return new Observable<boolean>(observer => {
            let modal = $(`#${id}`).modal({
                backdrop: backdropClose ? true : 'static',
                focus: true,
            }).on('shown.bs.modal', (e) => {
                observer.next(true);
            }).on('hidden.bs.modal', (e) => {
                observer.next(false);
                modal.modal('dispose');
            });
        });
    }

    hideDialog(id: string) {
        $(`#${id}`).modal('hide');
    }
}
