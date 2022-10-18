import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, observable, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { callHtpp as callHttp } from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

    ngOnInit() {
        /*
        -- Interval com rxjs
        const interval$ = interval(1000)
        interval$.subscribe(value => console.log("Stream 1:", value))
        interval$.subscribe(value => console.log("Stream 2:", value))
        */

        /*
        -- Executa o time (1000) após o tempo inicial (3000)
        const interval$ = timer(3000, 1000);
        interval$.subscribe(value => console.log("Time: ", value))
        */

        /* 
        -- Escutar eventos com o rxjs
        const click$ = fromEvent(document, 'click')
        click$.subscribe(evt => console.log(evt))
        */

        /*
        -- Parametros dentro do subscribe
        const clickOnDocument$ = fromEvent(document, 'click')
        clickOnDocument$.subscribe(
            evt => console.log('Get events: ', evt),
            err => console.log('Get streams errs: ', err),
            () => console.log('Completed')
        )
        */

        /*
        Chamada promise -> this._getCoursesUsingPromise()
        Chamada com observable -> this._getCoursesUsingObservable()
        */
    }

    /*
    -- Chamanda HTTP promise
    private async _getCoursesUsingPromise(): Promise<any> {
        return await fetch('/api/courses')
    }
    */

    /*
    private _getCoursesUsingObservable(): any {
        const http$ = callHttp('/api/courses')
        const courses$ = http$
            .pipe(
                map(response => response.payload)
            )

        courses$.subscribe(
            response => console.log(response),
            err => console.error('error response: ', err),
            () => console.warn("Completed!")
        )
    }
    */




}






