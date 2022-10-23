import { useState } from 'react'
import './input.component.css'

export const Input = (props: any) => {
    return (
        <input type={props.type} placeholder={props.placeholder} className="input" value={props.value}
            onChange={props.onChangeHandler}></input>
    )
  }