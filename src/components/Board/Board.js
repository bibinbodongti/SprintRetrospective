import React, { useEffect, useState } from 'react';
import './Board.css';
import { Row, Col, Container } from 'react-bootstrap'
import ColumnBoard from '../ColumnBoard/ColumnBoard';
import BoardTopBar from '../BoardTopBar/BoardTopBar';
import { DragDropContext } from 'react-beautiful-dnd';
import { delTagAPI, updateTagAPI,getMyTagsAPI } from '../../api/tagAPI';
import {updateTypeAPI,getMyBoardAPI} from '../../api/boardAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
// socket
import io from 'socket.io-client';

//decrale server
const socket = io('https://server-sprintretrospective.herokuapp.com');


const Board = ({ match }) => {
    const [board, setBoard] = useState([]);
    const [refesh, setRefesh] = useState(true);
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });
    const initialColumns = {
        todo: {
            id: 'wentwell',
            list: []
        },
        doing: {
            id: 'toimprove',
            list: []
        },
        done: {
            id: 'actionitems',
            list: []
        }
    }
    const [columns, setColumns] = useState(initialColumns);
    useEffect(() => {
        const fetchMyBoard = async () => {
            getMyBoardAPI(match.params.id).then((res)=>{
                setBoard(res);
            })
        }
        fetchMyBoard();
    }, [match.params.id]);
    useEffect(() => {
        const fetchMyTags = async () => {
            getMyTagsAPI(match.params.id).then((res)=>{
                const ans = Object.entries(res.reduce((data, item) => {
                    const { type } = item;
                    if (type === 1) data.wentwell.push({ _id: item._id, content: item.content });
                    if (type === 2) data.toimprove.push({ _id: item._id, content: item.content });
                    if (type === 3) data.actionitems.push({ _id: item._id, content: item.content });
                    return data;
                }, {
                    wentwell: [], toimprove: [], actionitems: []
                }));
                console.log(ans);
                setColumns({
                    wentwell: {
                        id: 'wentwell',
                        list: Object.values(Object.values(ans[0])[1]) ? Object.values(Object.values(ans[0])[1]) : [],
                    },
                    toimprove: {
                        id: 'toimprove',
                        list: Object.values(ans[1][1]) ? Object.values(Object.values(ans[1])[1]) : []
                    },
                    actionitems: {
                        id: 'actionitems',
                        list: Object.values(Object.values(ans[2])[1]) ? Object.values(Object.values(ans[2])[1]) : []
                    }
                })
            })
        }
        fetchMyTags();
    }, [refesh, match.params.id]);
    //socket
    useEffect(() => {
        const receivedMessage = (message) => {
            if (message.idBoard) {
                if (message.idBoard === match.params.id) {
                    setRefesh(!refesh);
                    console.log(message.idBoard);
                }
            }
        }
        socket.on('msgToClient', (msg) => {
            receivedMessage(msg);
        })
    }, [match.params.id,refesh,columns]);

    const sendMessage = () => {
        const message = {
            idBoard: board._id
        }
        socket.emit('msgToServer', message);
    }

    const doneTag = async (id, value) => {
        setEdit({
            id: null,
            value: value,
        });
        await updateTagAPI(id, value);
        setRefesh(!refesh);
        sendMessage();
    }
    const delTag = async (idTag) => {
        await delTagAPI(idTag);
        setRefesh(!refesh);
        sendMessage();
    };

    const updateType = async (type, content) => {
        await updateTypeAPI(type,content);
        sendMessage();
    }
    const onDragEnd = ({ source, destination }) => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null

        // If the source and destination columns are the same
        // AND if the index is the same, the item isn't moving
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null


        // Set start and end variables
        const start = columns[source.droppableId]
        const end = columns[destination.droppableId]

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter(
                (_, idx) => idx !== source.index
            )

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index])

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                list: newList
            }

            // Update the state
            setColumns(state => ({ ...state, [newCol.id]: newCol }))
            return null
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            updateType(end.id === 'wentwell' ? 1 : end.id === 'toimprove' ? 2 : 3, start.list[source.index].content);
            const newStartList = start.list.filter(
                (_, idx) => idx !== source.index
            )

            // Create a new start column
            const newStartCol = {
                id: start.id,
                list: newStartList
            }

            // Make a new end list array
            const newEndList = end.list

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, start.list[source.index])

            // Create a new end column
            const newEndCol = {
                id: end.id,
                list: newEndList
            }

            // Update the state
            setColumns(state => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
            }))
            return null
        }
    }
    const addTag = async (text, type) => {
        if (!text || /^\s*$/.test(text)) {
            return;
        }
        console.log(text + ' type ' + type);

        var myHeaders = new Headers();
        var urlencoded = new URLSearchParams();
        urlencoded.append("content", text);
        urlencoded.append("type", type);
        urlencoded.append("idBoard", board._id);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server-sprintretrospective.herokuapp.com/tag/addtag", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setRefesh(!refesh);
            })
            .catch(error => console.log('error', error));
        sendMessage();
    };
    const editTag = (id, value) => {
        console.log(value);
        setEdit({
            id: id,
            value: value
        })
    }
    return (
        <>
            <BoardTopBar sendMessage={sendMessage} board={board} shared={match.url} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Container fluid style={{ padding: '30px 40px' }}>
                    <Row>
                        {
                            Object.values(columns).map((col) => (
                                <Col>{
                                    col.id === 'wentwell' ?
                                        <ColumnBoard doneTag={doneTag} delTag={delTag} edit={edit} editTag={editTag} addTag={addTag} name="Went Well" col={col} key={col.id} match={match} type={1} idBoard={board._id} nameColumn="wentWell" />
                                        : col.id === 'toimprove' ?
                                            <ColumnBoard doneTag={doneTag} delTag={delTag} edit={edit} editTag={editTag} addTag={addTag} name="To Improve" col={col} key={col.id} match={match} type={2} idBoard={board._id} nameColumn="toImprove" />
                                            : <ColumnBoard doneTag={doneTag} delTag={delTag} edit={edit} editTag={editTag} addTag={addTag} name="Action Items" col={col} key={col.id} match={match} type={3} idBoard={board._id} nameColumn="actionItems" />
                                }</Col>
                            ))
                        }
                    </Row>
                </Container>
            </DragDropContext>
        </>
    )
}
export default Board;