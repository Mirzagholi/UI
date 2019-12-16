import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-preload',
    templateUrl: './preload.component.html',
    styleUrls: ['./preload.component.scss']
})
export class PreloadComponent {

    @Input() show: boolean = false;
}
