const bcrypt = require('bcryptjs');
const updateAccountAPI = (data, access_token) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${access_token}`);
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", data.username);
        urlencoded.append("email", data.email);
        urlencoded.append("name", data.name);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/profile", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                resolve(result);
            })
            .catch(error => console.log('error', error));
    })
}
export const registerAPI = (data) => {
    return new Promise((resolve, reject) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", data.name);
        urlencoded.append("username", data.username);
        urlencoded.append("password", data.pw);
        urlencoded.append("email", data.email);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/accounts/register", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                if(result==='true') resolve(true);
                else resolve(false);
            })
            .catch(error => console.log('error', error));
    })
}
export const changePasswordAPI = (access_token, oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${access_token}`);
        hashPassword(newPassword).then((pw) => {
            var urlencoded = new URLSearchParams();
            urlencoded.append("oldpassword", oldPassword);
            urlencoded.append("newpassword", pw);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch("https://server-sprintretrospective.herokuapp.com/changepassword", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (result === 'false') {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                })
                .catch(error => console.log('error', error));
        })
    });

}
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        var result = await bcrypt.hash(password, salt);
        return result;
    } catch (error) {
        throw new Error('Hashing failed', error)
    }
}
export default updateAccountAPI;