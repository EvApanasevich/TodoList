import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from './TodoList'
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./State/TodoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/Tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    title: string
    filter: FilterValuesType
    id: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducer() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const todoListId_3 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to drink', filter: 'all'},
        {id: todoListId_3, title: 'Hey', filter: 'all'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'beer', isDone: true},
            {id: v1(), title: 'water', isDone: false}
        ],
        [todoListId_3]: [
            {id: v1(), title: 'Yo yo yo', isDone: true},
        ],
    })

    function addNewTask(newTitle: string, todoListId: string) {
        dispatchToTasks(addTaskAC(newTitle, todoListId))
    }

    function removeTask(taskId: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }

    function changeIsDone(taskId: string, value: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, value, todoListId))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function removeTodoList(todoListId: string) {
        let action = removeTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListId: string) {
        dispatchToTodoLists(changeTodoListFilterAC(newFilterValue, todoListId))
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListId))
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const getTasksForTodoList = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(t => {
        return (
            <Grid key={t.id} item={true}>
                <Paper elevation={6} style={{padding: '20px'}}>
                    <TodoList
                        id={t.id}
                        title={t.title}
                        tasks={getTasksForTodoList(t)}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeIsDone={changeIsDone}
                        addNewTask={addNewTask}
                        todoListFilter={t.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: '20px 0 20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

