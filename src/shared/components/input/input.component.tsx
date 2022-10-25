import { useState } from 'react'
import './input.component.css'

export const Input = (props: IInputProps) => {
    const { type, placeholder, value, onChangeHandler } = props;

    return (
        <input className="input" 
               type={type} 
               placeholder={placeholder}  
               value={value}
               onChange={onChangeHandler}
        ></input>
    )
}

export interface IInputProps {
    type?: string,
    placeholder?: string,
    value?: string,
    onChangeHandler?: (e: InputEvent) => void;
}

export type InputEvent = React.FormEvent<HTMLInputElement>;