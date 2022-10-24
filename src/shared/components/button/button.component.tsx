import './button.component.css'

export const Button = (props: any) => {
    return (
        <button 
            className={"custom-button " + props.className}
            onClick={props.onClick}
            disabled={props.disabled}
        >{props.placeholder}</button>
    )
}