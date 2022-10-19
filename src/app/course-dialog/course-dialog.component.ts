import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { concatMap, exhaustMap, filter, mergeMap,  } from 'rxjs/operators';
import { concat, from, fromEvent, Observable } from 'rxjs';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;

    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course
    ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit(): void {
        // this._subscribeUsingConcactMap()
        this._subscribeUsingMergeMap()
    }

    ngAfterViewInit(): void {
        fromEvent(this.saveButton.nativeElement, "click")
            .pipe(exhaustMap(_ => this._saveCourse(this.form.value))) // Ignora novas requisições enquanto a anterior não finalizar
            .subscribe()
    }

    private _subscribeUsingConcactMap(): void {
        this.form.valueChanges
            .pipe(
                filter(_ => this.form.valid),
                concatMap(changes => this._saveCourse(changes)) // Aguarda a conclusão da requisição p/ então iniciar uma nova
            )
            .subscribe()
    }
    
    private _subscribeUsingMergeMap(): void {
        this.form.valueChanges
        .pipe(
            filter(_ => this.form.valid),
            mergeMap(changes => this._saveCourse(changes)) // Realiza uma nova requisição assim que a anterior for iniciada
        )
        .subscribe()
    }

    private _saveCourse(changes): Observable<any> {
        return from(fetch(`api/courses/${this.course.id}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: { 'content-type': 'application/json' }
        }));
    }

    close() {
        this.dialogRef.close();
    }

    save() { }

}
