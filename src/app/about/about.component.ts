import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

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
    }


}






