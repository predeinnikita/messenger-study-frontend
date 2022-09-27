import { STATUS_CODES } from 'http';
import React, { Component, Dispatch, SetStateAction, useState } from 'react';

let name = '';

const login = (func: Dispatch<SetStateAction<string>>) => function () {
  console.log({
    type: 'LOGIN_REQUEST',
  });

  //eslint-disable-next-line no-undef
  VK.Auth.login((r) => {
    if (r.session) {
      let username = r.session.user.first_name;
      func(username);
      console.log({
        type: 'LOGIN_SUCCESS',
        payload: username,
      });
    } else {
      console.log({
        type: 'LOGIN_FAIL',
        error: true,
        payload: new Error('Ошибка авторизации'),
      });
    }
  }, 4); // запрос прав на доступ к photo
};

const logout = (func: Dispatch<SetStateAction<string>>) => function(){
  VK.Auth.logout((r) => {
    console.log(r);
    func('');
  });
}



export const App = () => {
    const [name, setName] = useState('');
    return (
      <div className="app">
        <div id='vk'>{name}</div>
        <button onClick={login(setName)}>Войти</button>
        <button onClick={logout(setName)}>Выйти</button>
      </div>
    )
}

