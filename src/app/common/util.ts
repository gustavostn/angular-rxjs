import { Observable } from "rxjs"

export function callHtpp(url: string): Observable<any> {
    return new Observable(observable => {
        fetch(url)
            .then(response => { return response.json() })
            .then(body => {
                observable.next(body)
                observable.complete()
                observable.next()
            })
            .catch(err => observable.error(err))
    })
}

