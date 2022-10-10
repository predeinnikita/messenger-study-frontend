import './input.component.css'

export const Input = (props: any) => {
    return (
        <input type={props.type} placeholder={props.placeholder} className="input"></input>
    )
  }