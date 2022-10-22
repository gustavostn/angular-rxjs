import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { StoreService } from '../common/store.service';
import { callHtpp } from '../common/util';
import { Course } from '../model/course';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public beginners$: Observable<Course[]>
    public advanced$: Observable<Course[]>

    constructor(private _storeService: StoreService) { }

    ngOnInit() { 
        this.beginners$ = this._storeService.getCoursesByCategory("BEGINNER")
        this.advanced$ = this._storeService.getCoursesByCategory("ADVANCED")
    }


}
