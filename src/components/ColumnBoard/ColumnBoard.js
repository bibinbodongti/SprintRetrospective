import React, { useState } from 'react';
import { Row, Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import TaskTagView from '../TaskTag/TaskTagView';
import TaskTagEdit from '../TaskTag/TaskTagEdit';
import { Droppable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
const ColumnBoard = ({ col: { list, id },type,nameColumn,name,addTag,doneTag,editTag,edit ,delTag}) => {
    const [input, setInput] = useState('');
    //edit
    
    const handleChangeInput = (e) => {
        setInput(e.target.value);
    }
    
    return (
        <Container className="container">
            <Row className="row">
                <h5 style={{ float: "left" }}>{name}</h5>
            </Row>
            <Row className="row" style={{ marginBottom: "10px" }}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter things what you want"
                        value={input}
                        onChange={handleChangeInput}
                        aria-label="Enter things what you want"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button onClick={() => {
                            addTag(input, type);
                            setInput('');
                        }}
                            variant="outline-secondary">Add</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
            
            {
                <Droppable droppableId={id}>
                {provided => (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '120px'
                            }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {list.map((item, index) =>{
                                return(
                                (item._id===edit.id)?<TaskTagEdit nameColumn={nameColumn} key={item._id} text={item.content} idTag={item._id} index={index} delTag={delTag} doneTag={doneTag} type={type.toString()} />:
                                <TaskTagView nameColumn={nameColumn} key={item._id} text={item.content} idTag={item._id} index={index} editTag={editTag} type={type.toString()}/>
                            )
                            } )}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>}
            {/* {Array.isArray(tags) ? tags.map((tag, i) => {
                return (
                    <div>
                        {
                            tag.type === type ? edit.id ? <TaskTagEdit nameColumn={nameColumn} key={i} data={tag} delBoard={delTag} editTag={editTag} doneTag={doneTag} type={type.toString()} />
                                : <TaskTagView nameColumn={nameColumn} key={i} data={tag} delBoard={delTag} editTag={editTag} doneTag={doneTag} type={type.toString()} />
                                : null
                        }
                    </div>
                )
            }) : null
            } */}
        </Container>
    )
}
export default ColumnBoard;