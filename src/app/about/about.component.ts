import { Component, OnInit } from '@angular/core';
import { concat, fromEvent, interval, merge, observable, Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { callHtpp as callHttp } from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

    ngOnInit() {
        // Interval com rxjs
        /*
        const interval$ = interval(1000)
        interval$.subscribe(value => console.log("Stream 1:", value))
        interval$.subscribe(value => console.log("Stream 2:", value))
        */

        // Executa o time (1000) após o tempo inicial (3000)
        /*
        const interval$ = timer(3000, 1000);
        interval$.subscribe(value => console.log("Time: ", value))
        */

        // Ouvir eventos com o rxjs (click na aplicação)
        /* 
        const click$ = fromEvent(document, 'click')
        click$.subscribe(evt => console.log(evt))
        */

        // Possíveis retornos do subscribe
        /*
        const clickOnDocument$ = fromEvent(document, 'click')
        clickOnDocument$.subscribe(
            evt => console.log('Get events: ', evt),
            err => console.log('Get streams errs: ', err),
            () => console.log('Completed')
        )
        */

        // Chamando o método p/ realizar a requisição http com promise ou observable
        /*
        Chamada promise -> this._getCoursesUsingPromise()
        Chamada com observable -> this._getCoursesUsingObservable()
        */

        // Utilizando o método concat p/ unir 2 variaveis observables em uma só
        /*
        const first$ = of('a', 'b', 'c')
        const second$ = of(1,2,3)
        const concatVariables$ = concat(first$, second$)
        concatVariables$.subscribe(console.log)
        */

        // Utilizando o método merge => Executar/Ouvir ações ao mesmo tempo
        /*
        const interval$ = interval(1000) //1s
        const interval2$ = interval$.pipe(map(value => value * 10))
        const mergeResult$ = merge(interval$, interval2$)
        mergeResult$.subscribe(console.log)
        */
    }

    // Chamanda HTTP promise
    /*
    private async _getCoursesUsingPromise(): Promise<any> {
        return await fetch('/api/courses')
    }
    */

    // Chamada HTTP com observable
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






