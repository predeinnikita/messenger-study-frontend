import { useState } from 'react'
import './input.component.css'

export const Input = (props: IInputProps) => {
    const { type, placeholder, value, onChangeHandler, disabled } = props;

    return (
        <input className="input" 
               type={type} 
               placeholder={placeholder}  
               value={value}
               onChange={onChangeHandler}
               disabled={disabled}
        ></input>
    )
}

export interface IInputProps {
    type?: string,
    placeholder?: string,
    value?: string,
    disabled?: boolean,
    onChangeHandler?: (e: InputEvent) => void;
}

export type InputEvent = React.FormEvent<HTMLInputElement>;