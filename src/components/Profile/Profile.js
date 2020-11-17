import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import handleCookie from '../../services/handleCookie';
import updateAccountAPI from '../../api/accountAPI';

const Profile = () => {
    const [account, setAccount] = useState({ name: "", username: "", email: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [noticeForm, setNoticeForm] = useState('');
    useEffect(() => {
        const fetchAccountInformation = async () => {
            if (!document.cookie.includes('access_token')) {
                setRedirect('/login');
            }
            const access_token = await handleCookie(document.cookie);
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${access_token}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch("https://server-sprintretrospective.herokuapp.com/profile", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        setAccount(JSON.parse(result));
                    })
                    .catch(error => console.log('error', error));
            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
        fetchAccountInformation();
    }, [])
    const handleChangeInputName = (e) => {

        setAccount({
            name: e.target.value,
            username: account.username,
            email: account.email,
        })
    }
    const handleChangeInputEmail = (e) => {
        setAccount({
            name: account.name,
            username: account.username,
            email: e.target.value,
        })
    }
    const handleUpdateInfo = () => {
        setIsEdit(true);
    }
    const submitUpdateInfo = async() => {
        if (account.username === "" || account.name === "" || account.email === "") {
            console.log("Không điền full dữ liệu");
            return;
        } else {
            try {
                if (!document.cookie.includes('access_token')) {
                    setRedirect('/login');
                }
                const access_token = await handleCookie(document.cookie);
                updateAccountAPI(account,access_token).then((res)=>{
                    console.log(res);
                    setIsEdit(false);
                    setNoticeForm('Cập nhật thông tin thành công');
                })
                
            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
    }
    if(redirect) return <Redirect to={redirect}></Redirect>
    return (
        <div className="profileContainer">
            <Form className="mainLogin">
                <h5 style={{ color: 'blue' }}>Profile</h5>
                <Form.Group controlId="username">
                    <Form.Label >Username</Form.Label>
                    <Form.Control readOnly={true} value={account.username} type="text" placeholder="Enter your username" className="input" />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control readOnly={!isEdit} onChange={handleChangeInputName} value={account.name} className="input" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control readOnly={!isEdit} onChange={handleChangeInputEmail} value={account.email} className="input" placeholder="Enter your email" required={true} />
                </Form.Group>
                <div className="notice">{noticeForm}</div>
                <div className="submit">
                    <Button href='/changepassword' id="changePass" variant="primary" type="button">
                        Đổi mật khẩu</Button>
                    <Button onClick={handleUpdateInfo} hidden={isEdit} id="updateInfo" variant="primary" type="button">
                        Cập nhật thông tin</Button>
                    <Button onClick={submitUpdateInfo} hidden={!isEdit} id="savaInfo" variant="primary" type="button">
                        Lưu</Button>
                </div>
            </Form>
        </div>
    )
}
export default Profile;