import React, { useState } from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';
import {updateBoardAPI} from '../../api/boardAPI';
import handleCookie from '../../services/handleCookie';
import './BoardCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//config datetime
const moment = require('moment');
moment.locale('vi');
const BoardCard = ({ board, index, deleteBoard }) => {
  const [isEditName, setIsEditName] = useState(false);
  const [inputName, setInputName] = useState(board.name);
  const handleChange = (e) => {
    setInputName(e.target.value);
  }
  const UpdateNameBoard=async()=>{
    setIsEditName(false);
    const access_token = await handleCookie(document.cookie);
    updateBoardAPI({_id:board._id,name:inputName},access_token).then((res)=>{
      if(res) console.log("update thanh cong");
    });
  }
  return (
    <>
      <CardGroup key={index} className="boardContainer">
        <Card.Body className="boardInformationDetail">
          {
            isEditName ? <CardGroup>
              <input
                value={inputName}
                style={{ width: "100%" }}
                onChange={handleChange}
              />
              <Card.Link onClick={UpdateNameBoard}>
                <Button variant="success" style={{ height: "20px", marginTop: "5px", float: "left", paddingTop: "0", fontSize: "12px" }} >Done</Button>
              </Card.Link>
            </CardGroup> : <div className="headerBoardCard"><Card.Title className="boardName">{inputName}</Card.Title>
                <Card.Link onClick={() => setIsEditName(true)}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </Card.Link></div>
          }

          <Card.Text className="boardDateCreate">
            Date created: {moment(board.dateCreate).format('LL')}
          </Card.Text>
          <div className="boardButton">
            <Button onClick={() => deleteBoard(board._id)} variant="outline-danger">Delete</Button>
            <Button href={`/boarddetail/${board._id}`} variant="outline-info">View Detail</Button>
          </div>
        </Card.Body>
      </CardGroup>
    </>
  )
}
export default BoardCard;