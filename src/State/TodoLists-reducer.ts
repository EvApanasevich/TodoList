import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

type ActionType = RemoveTodoListActionType | AddTodoListActionType |
                  ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST'
    todoListId: string
}
export type AddTodoListActionType = {
    type: 'ADD_TODOLIST'
    title: string
    todoListId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    title: string
    todoListId: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    newFilterValue: FilterValuesType
    todoListId: string
}

const initialState: Array<TodoListType> = []

export const todoListsReducer = (todoLists = initialState, action: ActionType): Array<TodoListType> => {

    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return todoLists.filter(t => t.id !== action.todoListId)
        }
        case 'ADD_TODOLIST':
            const newTodoList: TodoListType = {id: action.todoListId, title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(t => t.id === action.todoListId ? {...t, title: action.title} : t)
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(t => t.id === action.todoListId ? {...t, filter: action.newFilterValue} : t)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        todoListId: id
    }
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD_TODOLIST',
        title: title,
        todoListId: v1()
    }
}
export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        title: title,
        todoListId: todoListId
    }
}
export const changeTodoListFilterAC = (newFilterValue: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        newFilterValue: newFilterValue,
        todoListId: todoListId
    }
}