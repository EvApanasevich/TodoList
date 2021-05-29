import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type  TaskPropsType = {
    task: TaskType
    changeIsDone: (taskId: string, value: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {
        task,
        changeIsDone,
        changeTaskTitle,
        removeTask
    } = props

    console.log('task called')

    const removeTaskHandler = () => removeTask(task.id)
    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked
        changeIsDone(task.id, value)
    }
    const changeTaskTitleHandler = (title: string) => changeTaskTitle(task.id, title)

    return (
        <li className={'li'} key={task.id}>
            <Checkbox color={'primary'} onChange={changeIsDoneHandler} checked={task.isDone}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler} color="secondary">
                <Delete/>
            </IconButton>
        </li>
    )
})