import React from 'react';
import './TaskTitle.css';
import {Button } from '@material-ui/core';

const TaskTitle=({title})=>{
    return(
        <div className="titleContainer">
            <h5>{title}</h5>
            <Button size='small' variant="contained" color="secondary">
                        Xóa
      </Button>
        </div>
    )
}
export default TaskTitle;