import React from 'react';
import TaskTitle from '../TaskTitle/TaskTitle';
import TaskTag from '../TaskTag/TaskTag'


const TaskPanel=()=>{
    return(
        <div>
            <TaskTitle title="Went well" />
            <TaskTag />
        </div>
    )
}
export default TaskPanel;