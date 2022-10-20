import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { callHtpp } from '../common/util';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

    public course$: Observable<Course[]>
    public lessons$: Observable<Lesson[]>

    private _idCourse: number = 0

    constructor(private _activatedRouter: ActivatedRoute) {}

    ngOnInit(): void {
        this._idCourse = this._activatedRouter.snapshot.params.id
        this._getCourseInfos(this._idCourse)
        this._getLessons(this._idCourse)
    }

    private _getCourseInfos(idCourse: number): void {
        this.course$ = callHtpp(`/api/courses/${idCourse}`)
    }

    private _getLessons(idCourse: number): void {
        this.lessons$ = callHtpp(`/api/lessons?courseId=${idCourse}&pageSize=100`)
            .pipe(map(response => response.payload))
    }


}











