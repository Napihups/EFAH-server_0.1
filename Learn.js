import { Observable } from 'rxjs/Observable';

var observable = Observable.create(observer => {
    observer.next('Hello World');
})


var promise1 = new Promise((resolve, reject) => {
    setTimeout(()=> {
        resolve('promise1 resolved'),
        2000
    })
})


const post = [
    {title: 'jscuefef', author : 'dvv', id : 1},
    {title: 'jscuefef', author : 'dvv', id : 2},
    {title: 'jscuefef', author : 'dvv', id : 3}
]

function findPostById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const post = post.fin
        })
    })
}
