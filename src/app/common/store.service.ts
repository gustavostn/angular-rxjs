import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable,  } from 'rxjs';
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

    public saveChangesInCourse(courseId: number, courseInfo: Course): Observable<any> {
        const courses = this._subject.getValue()
        const courseIndex = courses.findIndex(course => course.id === courseId)

        const newCourseInfo = courses.slice(0)
        newCourseInfo[courseIndex] = {
            ...courses[courseIndex],
            ...courseInfo
        }

        this._subject.next(newCourseInfo)
        
        return from(
            fetch(`/api/courses/${courseId}`, {
                method: "PUT",
                body: JSON.stringify(courseInfo),
                headers: { "content-type": "application/json "}
            })
            .then()
        )
    }
}
