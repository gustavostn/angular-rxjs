import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { callHtpp } from '../common/util';
import { Course } from '../model/course';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    /*
    -- Método inapropria p/ o uso o rxjs
    public beginners: Course[]
    public advanced: Course[]
    */

    public beginners$: Observable<Course[]>
    public advanced$: Observable<Course[]>

    constructor() { }

    ngOnInit() {
        //this._getBeginnerCourses()
        //this._getBeginnerCoursesV2()
        this._getBeginnerCoursesV3()
    }

    /*
    private _getBeginnerCourses(): void {
        const response$ = callHtpp("/api/courses")
        response$
            .pipe(map(response => response.payload))
            .subscribe(
                response => {
                    this.beginners = response.filter((course: Course) => course.category === "BEGINNER")
                    this.advanced = response.filter((course: Course) => course.category === "ADVANCED")
                },
            err => console.error(err),
            () => console.warn("Completed!")
            )
    }
    */

    /*
    private _getBeginnerCoursesV2(): void {
        const response$ = callHtpp("/api/courses")
        const courses$: Observable<Course[]> = response$
            .pipe(map(response => response.payload))

        this.beginners$ = courses$
            .pipe(
                map(response => response
                    .filter((course: Course) => course.category === "BEGINNER")
                )
            )

        this.advanced$ = courses$
            .pipe(
                map(response => response
                    .filter((course: Course) => course.category === "ADVANCED")
                )
            )
    }
    */

    private _getBeginnerCoursesV3(): void {
        const response$ = callHtpp("/api/courses")
        const courses$: Observable<Course[]> = response$
            .pipe(
                tap(() => console.log("HTTP executed")),
                map(response => response.payload),
                shareReplay()
            )

        this.beginners$ = courses$
            .pipe(
                map(response => response
                    .filter((course: Course) => course.category === "BEGINNER")
                )
            )

        this.advanced$ = courses$
            .pipe(
                map(response => response
                    .filter((course: Course) => course.category === "ADVANCED")
                )
            )
    }


}
