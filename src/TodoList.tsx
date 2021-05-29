import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesType
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    changeIsDone: (taskId: string, value: boolean, todoListId: string) => void
    addNewTask: (newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

    const addTask = useCallback((newTitle: string) => {
        props.addNewTask(newTitle, props.id)
    }, [props.addNewTask, props.id])
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])

    const setAllFilterValue =
        useCallback(() => props.changeTodoListFilter('all', props.id), [props.changeTodoListFilter, props.id])
    const setActiveFilterValue =
        useCallback(() => props.changeTodoListFilter('active', props.id), [props.changeTodoListFilter, props.id])
    const setCompletedFilterValue =
        useCallback(() => props.changeTodoListFilter('completed', props.id), [props.changeTodoListFilter, props.id])

    const removeTask =
        useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeIsDone =
        useCallback((taskId: string, value: boolean) => props.changeIsDone(taskId, value, props.id), [props.changeIsDone, props.id])
    const changeTaskTitle =
        useCallback((taskId: string, title: string) => props.changeTaskTitle(taskId, title, props.id), [props.changeTaskTitle, props.id])

    function getTasksForTodoList (): Array<TaskType> {
        switch (props.todoListFilter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }

    const tasks = getTasksForTodoList().map(t => <Task
        key={t.id}
        task={t}
        changeIsDone={changeIsDone}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
    />)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', padding: '0px'}}>

                {tasks}

            </ul>
            <div>
                <Button style={{marginRight: '5px'}}
                        size={'small'}
                        color={'primary'} variant={props.todoListFilter === 'all' ? 'outlined' : 'contained'}
                        onClick={setAllFilterValue}>All
                </Button>
                <Button style={{marginRight: '5px'}}
                        size={'small'}
                        color={'primary'} variant={props.todoListFilter === 'active' ? 'outlined' : 'contained'}
                        onClick={setActiveFilterValue}>Active
                </Button>
                <Button size={'small'}
                        color={'primary'} variant={props.todoListFilter === 'completed' ? 'outlined' : 'contained'}
                        onClick={setCompletedFilterValue}>Completed
                </Button>
            </div>
        </div>
    )
})
