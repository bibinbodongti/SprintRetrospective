export const delTagAPI=(idTag)=>{
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        var urlencoded = new URLSearchParams();
        urlencoded.append("_id", idTag);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/tag/deletetag", requestOptions)
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => console.log('error', error));
    });
}
export const updateTagAPI=(idTag,newContent)=>{
    return new Promise((resolve,reject)=>{
        var myHeaders = new Headers();
        var urlencoded = new URLSearchParams();
        urlencoded.append("content", newContent);
        urlencoded.append("_id", idTag);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/tag/updatetag", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                resolve(true);
            })
            .catch(error => console.log('error', error));
    })
}
export const getMyTagsAPI=(idBoard)=>{
    return new Promise((resolve,reject)=>{
        var myHeaders = new Headers();
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://server-sprintretrospective.herokuapp.com/boardetail/${idBoard}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(JSON.parse(result));
                    resolve(JSON.parse(result));
                })
                .catch(error => console.log('error', error));
    })
}