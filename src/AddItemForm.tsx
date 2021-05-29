import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [newTitle, setNewTitle] = useState<string>('')

    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const value = e.currentTarget.value
        setNewTitle(value)
    }
    const addItem = () => {
        if (newTitle.trim()) {
            props.addItem(newTitle.trim())
        } else {
            setError('Title is required!')
        }
        setNewTitle('')
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField onChange={changeNewTitle} onKeyPress={onKeyPressAddItem} value={newTitle}
                       variant={'outlined'} label={'enter task title'}
                       error={!!error} helperText={error}/>
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})