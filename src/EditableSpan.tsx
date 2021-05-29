import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')

    const [error, setError] = useState<string | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.title)

    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const value = e.currentTarget.value
        setNewTitle(value)

    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        if (newTitle.trim()) {
            setEditMode(false)
            props.changeTitle(newTitle)
        } else {
            setError('Title is required!')
        }
    }
    const onKeyPressAddTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        editMode ? <TextField value={newTitle} placeholder={error ? 'Title is required!' : 'enter new title'}
                              autoFocus onKeyPress={onKeyPressAddTitle} onBlur={offEditMode}
                              onChange={changeNewTitle} variant={'standard'} color={'primary'} error={!!error}/>
            : <span onDoubleClick={onEditMode}>
                    {props.title}
                </span>
    )
})