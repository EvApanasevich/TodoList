import {TasksStateType, TaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./TodoLists-reducer";

type ActionType = RemoveTaskActionType | AddTaskActionType |
                  ChangeTaskStatusActionType | ChangeTaskTitleActionType |
                  AddTodoListActionType | RemoveTodoListActionType


type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todoListId: string
}
type AddTaskActionType = {
    type: 'ADD_TASK'
    newTitle: string
    todoListId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    value: boolean
    todoListId: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todoListId: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE_TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD_TASK': {
            const newTask: TaskType = {id: v1(), title: action.newTitle, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case 'CHANGE_TASK_STATUS': {
            let copyState = {...state}
            const updatedTasks = copyState[action.todoListId].map(task => task.id === action.taskId ? {...task, isDone: action.value} : task)
            return {...state, [action.todoListId]: updatedTasks}
        }
        case 'CHANGE_TASK_TITLE': {
            let copyState = {...state}
            const updatedTasks = copyState[action.todoListId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            return {...state, [action.todoListId]: updatedTasks}
        }
        case 'ADD_TODOLIST': {
            return {...state, [action.todoListId]: []}
        }
        case 'REMOVE_TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todoListId}
}
export const addTaskAC = (newTitle: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', newTitle, todoListId}
}
export const changeTaskStatusAC = (taskId: string, value: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, value, todoListId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todoListId}
}