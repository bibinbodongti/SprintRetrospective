import React, { useState } from 'react';
import handleCookie from '../../services/handleCookie';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { changePasswordAPI } from '../../api/accountAPI'
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [noticeForm, setNoticeForm] = useState('');
    const handleChangeOldPassword = (e) => {
        setOldPassword(e.target.value);
    }
    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }
    const handleChangeRenewPassword = (e) => {
        setReNewPassword(e.target.value);
    }
    const submitChangePassword = async () => {
        if (oldPassword === "" || newPassword === "" || reNewPassword === "") {
            setNoticeForm('Vui lòng điền đầy đủ thông tin');
            return;
        } else {
            try {
                if (!document.cookie.includes('access_token')) {
                    setRedirect('/login');
                }
                if (reNewPassword !== newPassword) {
                    setNoticeForm('Mật khẩu mới và retype mật khẩu mới không trùng khớp');
                    return;
                } else {
                    if (newPassword.length < 7) {
                        setNoticeForm('Độ dài mật khẩu phải >=7');
                    }
                }
                const access_token = await handleCookie(document.cookie);
                changePasswordAPI(access_token, oldPassword, newPassword).then((ans) => {
                    if (ans === true) {
                        setNoticeForm('Đổi mật khẩu thành công');
                        setOldPassword('');
                        setNewPassword('');
                        setReNewPassword('');
                        return;
                    } else {
                        console.log(ans);
                        setNoticeForm('Mật khẩu sai');
                        return;
                    }
                })




            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
    }
    if (redirect) return <Redirect to={redirect}></Redirect>
    return (
        <div className="profileContainer">
            <Form className="mainLogin">
                <h5 style={{ color: 'blue' }}>Profile</h5>
                <Form.Group controlId="username">
                    <Form.Label >Old Password</Form.Label>
                    <Form.Control value={oldPassword} onChange={handleChangeOldPassword} type="password" className="input" />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control onChange={handleChangeNewPassword} value={newPassword} className="input" type='password' />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Retype New Password</Form.Label>
                    <Form.Control onChange={handleChangeRenewPassword} value={reNewPassword} className="input" type='password' />
                </Form.Group>
                <div className="notice">{noticeForm}</div>
                <div className="submit">
                    <Button onClick={submitChangePassword} id="changePw" variant="primary" type="button">
                        Lưu</Button>
                </div>
            </Form>
        </div>
    )
}

export default ChangePass;