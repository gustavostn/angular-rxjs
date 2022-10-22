import { Component, OnInit } from '@angular/core';
import { concat, fromEvent, interval, merge, observable, Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { callHtpp, callHtpp as callHttp } from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

    ngOnInit() {

    }

}






