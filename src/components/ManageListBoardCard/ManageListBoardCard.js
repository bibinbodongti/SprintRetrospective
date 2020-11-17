import React, { useState, useEffect } from 'react';
import './ManageListBoardCard.css';
import { Redirect } from "react-router-dom";
import { Container, Row, Col} from 'react-bootstrap';
import BoardCard from '../BoardCard/BoardCard'
import handleCookie from '../../services/handleCookie';
import AddNewBoardCard from '../BoardCard/AddNewBoardCard';
import getListBoard,{deleteBoardAPI, addBoardAPI} from '../../api/boardAPI';

const ManageListBoardCard = () => {
    const [listBoard, setListBoard] = useState([]);
    const [redirect, setRedirect] = useState(null);
    const [refesh, setRefesh] = useState(true);
    const deleteBoard = async (id) => {
        const access_token = await handleCookie(document.cookie);
        deleteBoardAPI(id,access_token).then((ans)=>{
            console.log(ans);
            setRefesh(!refesh);
        });
    };
    const addBoard = async (name) => {
        if (!name || /^\s*$/.test(name)) {
            return;
        }
        const access_token = await handleCookie(document.cookie);
        addBoardAPI(name,access_token).then((res)=>{
            console.log(res);
            setRefesh(!refesh);
        })
        
    };
    useEffect(() => {
        const fetchListBoard = async () => {
            try {
                if (!document.cookie.includes('access_token')) {
                    console.log("k co cookie")
                    setRedirect('/login');
                }
                const access_token = await handleCookie(document.cookie);
                getListBoard(access_token).then((ans)=>{
                    setListBoard(ans);
                })
                
            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
        fetchListBoard();
    }, [refesh]);
    if (redirect) return <Redirect to={redirect} />
    else {
        return (
            <div className="mainBoardContainer">
                <h3>My Boards</h3>
                <h4>Public boards <span style={{ color: 'black' }}>collaborate by sharing URL with people</span></h4>
                <Container className="managerBoardContainer">
                    <Row>
                        <Col xs={3}>
                            <AddNewBoardCard addBoard={addBoard} />
                        </Col>
                        {
                            Array.isArray(listBoard) ? listBoard.map((board, index) => {
                                return (
                                    <Col xs={3}>
                                        <BoardCard deleteBoard={deleteBoard} board={board} index={index} />
                                    </Col>
                                )
                            }) : null
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}
export default ManageListBoardCard;