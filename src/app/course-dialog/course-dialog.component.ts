import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { concatMap, exhaustMap, filter, mergeMap,  } from 'rxjs/operators';
import { concat, from, fromEvent, Observable } from 'rxjs';
import { StoreService } from '../common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

    form: FormGroup;

    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private _storeService: StoreService
    ) {
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });
    }

    ngOnInit(): void { }

    close() {
        this.dialogRef.close();
    }

    public save(): void { 
        this._storeService.saveChangesInCourse(this.course.id, this.form.value)
            .subscribe(
                _ => this.close(),
                err => console.error("Ocorreu um erro ao atualizar as informações do curso: ", err)
            )
    }

}
