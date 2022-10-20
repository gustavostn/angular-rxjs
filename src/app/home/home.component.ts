import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
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
        // this._getBeginnerCoursesV3()
        this._getBeginnerCoursesV4()
        this._getBeginnerCoursesV5()
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

    // Utilizando o map p/ obter o payload da requisição
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

    // Utilizando o tap p/ saber que a requisição foi executada
    // Utilizando o shareReplay p/ compartilhar o retorno da requisição com os subscribes
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

    // Utiliazando o catchError para validar os erros da requisição
    // Utilizando o finalize p/ saber quando a requisição foi finalizada
    private _getBeginnerCoursesV4(): void {
        const response$ = callHtpp("/api/courses")
        const courses$: Observable<Course[]> = response$
            .pipe(
                catchError(
                    err => {
                        console.log(`Some error occured: ${err}`)
                        return throwError(err)
                    }
                ),
                tap(() => console.log("HTTP executed")),
                map(response => response.payload),
                shareReplay(),
                finalize(() => console.warn("Finalize request"))
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

    private _getBeginnerCoursesV5(): void {
        const response$ = callHtpp("/api/courses")
        const courses$: Observable<Course[]> = response$
            .pipe(
                tap(() => console.log("HTTP executed")),
                map(response => response.payload),
                shareReplay(),
                retryWhen(
                    errros => errros.pipe(
                        delayWhen(() => timer(2000))
                    )
                )
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
