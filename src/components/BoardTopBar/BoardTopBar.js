import React, { useState, useEffect } from 'react';
import './BoardTopBar.css';
import { Card, Button, CardGroup } from 'react-bootstrap';
import { updateBoardAPI } from '../../api/boardAPI';
import handleCookie from '../../services/handleCookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const BoardTopBar = ({sendMessage, board, shared }) => {
    const [isEditName, setIsEditName] = useState(false);
    const [inputName, setInputName] = useState('Đang load');
    useEffect(() => {
        setInputName(board.name);
    }, [board]);
    console.log(board.name);
    console.log(inputName);
    const [noticeShared, setNoticeShared] = useState('');
    const handleChange = (e) => {
        console.log(inputName);
        setInputName(e.target.value);
    }
    const UpdateNameBoard = async () => {
        setIsEditName(false);
        const access_token = await handleCookie(document.cookie);
        updateBoardAPI({ _id: board._id, name: inputName }, access_token).then((res) => {
            if (res) {
                console.log("update thanh cong");
                sendMessage();
            }
        });
    }
    const handleClickShareBoard = () => {
        copyToClipboard('https://bibinbodongti.github.io/SprintRetrospective' + shared);
        setNoticeShared('Đường dẫn chia sẻ đã được lưu vào bộ nhớ đệm');
    }
    return (
        <div className="boardTopBar">
            {isEditName ? <CardGroup>
                <input
                    value={inputName}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                />
                <Card.Link onClick={UpdateNameBoard}>
                    <Button variant="success" style={{ height: "20px", marginTop: "5px", float: "left", paddingTop: "0", fontSize: "12px" }} >Done</Button>
                </Card.Link>
            </CardGroup> : <div className="groundNameBoard">
                    <h3>{inputName}</h3>
                    <div className="iconEditBoardName" onClick={() => setIsEditName(true)}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg></div>
                </div>}
            <div className="groundShareBoard">
                <p className="note">{noticeShared}</p>
                <button onClick={handleClickShareBoard} className="shareButton">Share</button>
            </div>

        </div>
    )
}
const copyToClipboard = (text) => {
    console.log('text', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
}
export default BoardTopBar;