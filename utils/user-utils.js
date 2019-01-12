// Utils


exports.generateUID =  generateUID = () => {

    let a = Math.floor(Math.random() * 10).toString()
    let b = Math.floor(Math.random() * 10).toString()
    let c = Math.floor(Math.random() * 10).toString()
    let d = Math.floor(Math.random() * 10).toString()
    let e = Math.floor(Math.random() * 10).toString()
    let f = Math.floor(Math.random() * 10).toString()
    return a + b + c + d + e + f;
}