import { Observable } from "rxjs"

export function callHtpp(url: string): Observable<any> {
    return new Observable(observable => {

        const controller = new AbortController();
        const signal = controller.signal

        fetch(url, { signal })
            .then(response => { return response.json() })
            .then(body => {
                observable.next(body)
                observable.complete()
                observable.next()
            })
            .catch(err => observable.error(err))
        
        return () => controller.abort()
    })
}

