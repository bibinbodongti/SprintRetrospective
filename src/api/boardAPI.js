const getListBoard = (access_token) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/boards", requestOptions)
            .then(response => response.text())
            .then(result => {
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
}
export const deleteBoardAPI = (id, access_token) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${access_token}`);
        var urlencoded = new URLSearchParams();
        urlencoded.append("_id", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/deleteboard", requestOptions)
            .then(response => response.text())
            .then(result => {
                resolve(result);
            })
            .catch(error => console.log('error', error));
    });
}
export const addBoardAPI = (name, access_token) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${access_token}`);
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/addboard", requestOptions)
            .then(response => response.text())
            .then(result => {
                resolve(result);
            })
            .catch(error => console.log('error', error));
    });
}
export const updateBoardAPI = (data) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        var urlencoded = new URLSearchParams();
        urlencoded.append("_id", data._id);
        urlencoded.append("name", data.name);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/updateBoard", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                resolve(result);
            })
            .catch(error => console.log('error', error));
    })
}
export const updateTypeAPI = (type, content) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        var urlencoded = new URLSearchParams();
        urlencoded.append("content", content);
        urlencoded.append("type", type);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/tag/changecolumn", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    });
}
export const getMyBoardAPI = (idBoard) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://server-sprintretrospective.herokuapp.com/board/${idBoard}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result));
                resolve(JSON.parse(result));

            })
            .catch(error => console.log('error', error));
    })

}
export default getListBoard;