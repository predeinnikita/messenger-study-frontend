import { MouseEventHandler } from 'react';
import './button.component.css'

export const Button = (props: IButtonProps) => {
    const { className, disabled, placeholder, onClickHandler } = props;

    return (
        <button 
            className={"custom-button " + className}
            onClick={onClickHandler}
            disabled={disabled}
        >{placeholder}</button>
    )
}

export interface IButtonProps {
    className?: string,
    disabled?: boolean,
    placeholder?: string,
    onClickHandler?: (e: ButtonEvent) => void
}

export type ButtonEvent = React.FormEvent<HTMLButtonElement>