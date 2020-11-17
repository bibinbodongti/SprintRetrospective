import React, { useState } from 'react';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import './BoardCard.css';



const AddNewBoardCard = ({ addBoard }) => {
    const [input, setInput] = useState('');
    const handleChangeInput = e => {
        setInput(e.target.value);
    };
    return (
        <>
            <Card key="add" className="boardContainer">
                    <Card.Body className="boardAddNewBoard">
                        <div className="boardButton">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Enter name to add new board"
                                    aria-label="Enter name to add new board"
                                    aria-describedby="basic-addon2"
                                    value={input}
                                    onChange={handleChangeInput}
                                />
                                <InputGroup.Append>
                                    <Button onClick={() => addBoard(input)} variant="outline-info">Add</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Body>
            </Card>
        </>
    )
}
export default AddNewBoardCard;