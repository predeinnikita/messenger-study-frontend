import { useState } from 'react'
import './input.component.css'

export interface IInputProps {
    type?: string,
    placeholder?: string,
    value?: string,
    disabled?: boolean,
    pattern?: string,
    minLength?: number
    onChangeHandler?: (e: InputEvent) => void;
}

export type InputEvent = React.FormEvent<HTMLInputElement>;

export const Input = (props: IInputProps) => {
    const { 
        type,
        placeholder,
        value,
        onChangeHandler,
        disabled,
        pattern,
        minLength
    } = props;

    return (
        <input className="input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
            disabled={disabled}
            pattern={pattern}
            minLength={minLength}
        ></input>
    )
}