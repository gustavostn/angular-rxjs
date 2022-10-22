import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../model/course';
import { callHtpp } from './util';

@Injectable({
    providedIn: 'root'
})

export class StoreService {

    private _subject = new BehaviorSubject<Course[]>([])
    
    public courses$: Observable<Course[]> = this._subject.asObservable()

    public getAvailableCourses(): void {
        callHtpp("/api/courses")
            .pipe(map(response => response.payload))
            .subscribe(courses => this._subject.next(courses))
    }

    public getCoursesByCategory(category: "BEGINNER" | "ADVANCED"): Observable<Course[]> {
       return this.courses$
        .pipe(
            map(course => course
                .filter(course => course.category === category)
            )
        )
    }
}
