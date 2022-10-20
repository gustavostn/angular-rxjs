import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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

    constructor(private _activatedRouter: ActivatedRoute) {}

    ngOnInit(): void {
        this._idCourse = this._activatedRouter.snapshot.params.id

        this._getCourseInfos(this._idCourse)
        this._getLessons(this._idCourse)
      
    }

    ngAfterViewInit(): void {
        this.searchBarEvent$ = fromEvent(this._searchInput.nativeElement, "keyup")
            .pipe(
                map((event: any) => event.target.value),
                debounceTime(400), // Aguarda 400ms p/ emitir um novo evento
                distinctUntilChanged() // So emite evento caso tenha diferença no valor
            )
        
        this.searchBarEvent$.subscribe(console.log)
    }

    private _getCourseInfos(idCourse: number): void {
        this.course$ = callHtpp(`/api/courses/${idCourse}`)
    }

    private _getLessons(idCourse: number): void {
        this.lessons$ = callHtpp(`/api/lessons?courseId=${idCourse}&pageSize=100`)
            .pipe(map(response => response.payload))
    }


}











