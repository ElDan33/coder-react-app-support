

const customFetch = (time, task) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            if(true){
                resolve(task);
                console.log(`The loading time is ${time}`);
            } else {
                reject("Error");
            }
        }, time)
    })
}

export default customFetch;