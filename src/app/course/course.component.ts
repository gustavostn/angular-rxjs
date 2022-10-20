import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { callHtpp } from '../common/util';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit, AfterViewInit {

    @ViewChild("searchInput", { static: false }) private _searchInput: ElementRef

    public course$: Observable<Course[]>
    public lessons$: Observable<Lesson[]>
    public searchBarEvent$: Observable<any>

    private _idCourse: number = 0

    constructor(private _activatedRouter: ActivatedRoute) { }

    ngOnInit(): void {
        this._idCourse = this._activatedRouter.snapshot.params.id
        this._getCourseInfos(this._idCourse)
    }

    // Neste caso é utilizado o concat p/ formar o valor inicial do lessons$
    /*
    ngAfterViewInit(): void {
        this.searchBarEvent$ = fromEvent(this._searchInput.nativeElement, "keyup")
            .pipe(
                map((event: any) => event.target.value),
                debounceTime(400), // Aguarda 400ms p/ emitir um novo evento
                distinctUntilChanged(), // So emite evento caso tenha diferença no valor
                switchMap(search => this._getLessons(this._idCourse, search)) // Caso receba uma nova informação cancela o evento antigo | Neste caso, quando recebe um novo valor, cancela a requisição antiga
            )
        const initialLessonsValue$ = this._getLessons(this._idCourse, '')
        this.lessons$ = concat(initialLessonsValue$, this.searchBarEvent$)
    }
    */

    // Neste caso estamos setando que o valor inicial da busca será uma string vazia
    ngAfterViewInit(): void {
        this.lessons$ = fromEvent(this._searchInput.nativeElement, "keyup")
            .pipe(
                map((event: any) => event.target.value),
                startWith(''),
                debounceTime(400), // Aguarda 400ms p/ emitir um novo evento
                distinctUntilChanged(), // So emite evento caso tenha diferença no valor
                switchMap(search => this._getLessons(this._idCourse, search)) // Caso receba uma nova informação cancela o evento antigo | Neste caso, quando recebe um novo valor, cancela a requisição antiga
            )
    }

    private _getCourseInfos(idCourse: number): void {
        this.course$ = callHtpp(`/api/courses/${idCourse}`)
    }

    private _getLessons(idCourse: number, search: string): Observable<Lesson[]> {
        return callHtpp(`/api/lessons?courseId=${idCourse}&pageSize=100&filter=${search}`)
            .pipe(map(response => response.payload))
    }


}











