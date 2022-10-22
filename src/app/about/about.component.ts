import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

    // Utilizando subject p/ criar um observable
    // Neste caso estou me inscrevendo no evento e emitindo os eventos depois
    // Logo irei escutar estes eventos emitidos
    /*
    ngOnInit() {
        const subject = new Subject()
        const subsInSubject$ = subject.asObservable()
        subsInSubject$.subscribe(console.log) // Inscrevendo no evento
        subject.next("Emissão 1")
        subject.next("Emissão 2")
        subject.next("Emissão 3")
        subject.complete() // Complemento evento
    }
    */

    // Neste exemplo estou realizando a inscrição nos eventos DEPOIS que as emissões foram realizadas
    // Utilizando o Subject não tenho acesso a eventos antigos, caso me inscreva após esses eventos terem sidos realizados
    // So irei receber os realizados após a inscrição
    /*
    ngOnInit(): void {
        const subject = new Subject()
        const subsInSubject$ = subject.asObservable()
        subsInSubject$.subscribe(sub => console.log("Inscrição antes das emissões: " + sub))
        subject.next("Emissão 1")
        subject.next("Emissão 2")
        subject.next("Emissão 3")
        subsInSubject$.subscribe(sub => console.log("Inscrição pós emissão: " + sub)) // Inscrevendo no evento pós ter sido realizada as emissão
        subject.complete() // Complemento evento
    }
    */

    // Neste exemplo está sendo utilziando o behaviorSubject
    // Necessario ter uma valor inicial
    // Ao se inscrever antes da emissão de novos eventos: 1* - Recebe o valor inicial depois os novos valores
    // Ao se inscrever depois de eventos emitidos: Recebe o ultimo valor emitido
    ngOnInit(): void {
        const behaviorSubject = new BehaviorSubject("Valor inicial")
        const subInBehaviorSubject$ = behaviorSubject.asObservable()
        subInBehaviorSubject$.subscribe(val => console.log("Inscrição antes das emissões, valor recebido: " + val))

        behaviorSubject.next("Emissão 1")
        behaviorSubject.next("Emissão 2")
        behaviorSubject.next("Emissão 3")

        setTimeout(() => {
            subInBehaviorSubject$.subscribe(val => console.log("Inscrição DEPOIS das emissões, valor recebido: " + val))
        }, 2500);
    }

}






