import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import './Login.css';
import Auth from '../../api/authAPI';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = ({ isLogin, handleLogin,type }) => {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [noticeForm, setNoticeForm] = useState('');
    const [redirect, setRedirect] = useState(null);
    useEffect(()=>{
        if(type==='logout') handleLogin(false);
    },[]);
    const onChangeUsername = (e) => {
        setInputUsername(e.target.value);
    }
    const onChangePassword = (e) => {
        setInputPassword(e.target.value);
    }
    const onLogin = async () => {
        if (inputUsername === '') {
            setNoticeForm("Vui lòng điền username");
            return;
        }
        else {
            if (inputPassword === '') {
                setNoticeForm("Vui lòng điền mật khẩu");
                return;
            }
            else {
                if (inputPassword.length < 7) {
                    setNoticeForm("Mat khau phai >= 7 ky tu");
                    return;
                }
                else {
                    try {
                        Auth(inputUsername, inputPassword).then((ans) => {
                            if (ans) {
                                handleLogin(true);
                                setRedirect('/');
                                setNoticeForm('Đăng nhập thành công');
                            } else {
                                setNoticeForm('Mật khẩu sai');
                            }
                        });
                    } catch (error) {
                        console.log("Error: " + error.message);
                        setNoticeForm('Xảy ra lỗi khi đăng nhập, vui lòng thử lại sau');
                    }
                }
            }
        }
    }
    const responseFacebook = (response) => {
        console.log(response);
        var urlencoded = new URLSearchParams();
        urlencoded.append("access_token", response.accessToken);
        urlencoded.append("userID", response.userID);
        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/auth/facebook", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result.includes('access_token')) {
                    document.cookie = `access_token=${JSON.parse(result).access_token}; max-age=3600`;
                    handleLogin(true);
                    setRedirect('/');
                }
                else {
                    setNoticeForm('Login with Facebook fail');
                }
            })
            .catch(error => console.log('error', error));
    }
    const responseGoogle = (response) => {
        console.log(response);
        var urlencoded = new URLSearchParams();
        urlencoded.append("access_token", response.tokenId);
        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/auth/google", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result.includes('access_token')) {
                    document.cookie = `access_token=${JSON.parse(result).access_token}; max-age=3600`;
                    handleLogin(true);
                    setRedirect('/');
                }
                else {
                    setNoticeForm('Login with Google fail');
                }
            })
            .catch(error => console.log('error', error));
    }
    if (redirect || isLogin === true) return <Redirect to='/'></Redirect>
    return (
        <Form className="mainLogin">
            <h5 style={{ color: 'blue' }}>Đăng nhập</h5>
            <Form.Group controlId="username">
                <Form.Label >Username</Form.Label>
                <Form.Control onChange={onChangeUsername} value={inputUsername} type="text" placeholder="Enter your username" className="input" />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={onChangePassword} value={inputPassword} className="input" type="password" placeholder="Enter your password" />
            </Form.Group>
            <Form.Group className="cbSavePass" controlId="savepassword">
                <Form.Check type="checkbox" label="Lưu mật khẩu" />
            </Form.Group>
            <div className="notice">{noticeForm}</div>
            <div className="submit">
                <Button href='/signup' id="signup" variant="primary" type="button">
                    Đăng ký</Button>
                <Button onClick={onLogin} id="signin" variant="primary" type="button">
                    Đăng nhập</Button>
            </div>
            <div className="buttonSignInGG">
                <FacebookLogin
                    appId="383205282732112"
                    autoLoad={false}
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                    render={renderProps => (
                        <Button
                            variant="secondary" onClick={renderProps.onClick}>Login with Facebook</Button>
                    )}

                />
                <GoogleLogin
                    clientId="240672023608-4f2866cjcr4a85balfitk2eadkc7f4kc.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    isSignedIn={false}
                    buttonText="Login with google"
                />
            </div>
        </Form>
    )
}

export default Login;