import { ChatItem } from '../chat-item/chat-item.componen';
import { Input } from '../../../../shared/components/input/input.component';
import './search-friend.component.css'
import { Button, ButtonEvent } from '../../../../shared/components/button/button.component';
import usersStore from '../../../../shared/stores/users.store';
import { useState } from 'react';
import { IUser } from '../../../../shared/interfaces/user.interface';
import loaderStore from '../../../../shared/stores/loader.store';
import chatsStore from '../../../../shared/stores/chats.store';
import { PropTypes } from 'mobx-react';

export const SearchFriend = () => {
  const [ inputValue, setInputValue ] = useState('');
  const [ searchingUser, setSearchingUser ] = useState<IUser | null>(null)

  const onClick = (e: ButtonEvent) => {
    loaderStore.setState(true);
    e.preventDefault();
    usersStore.findUser(inputValue).subscribe(
      searchingUser => {
        setSearchingUser(searchingUser);
        loaderStore.setState(false);
      },
      error => {
        setSearchingUser(null);
        loaderStore.setState(false);
      }
    );
  }

  const createChat = (otherUserId: number) => {
    chatsStore.createChat(otherUserId).subscribe(() => chatsStore.updateChatList$.next());
  }
  
  return (
      <div>
        <div className='search-friend'>
          <form className='search-friend__search'>
            <Input type='text' placeholder='Поиск' onChangeHandler={(event: any) => setInputValue(event.target.value)}/>
            <Button placeholder='Найти' onClickHandler={onClick}></Button>
          </form>
        </div>
        <div className="search-friend__result">
        
            {searchingUser?.username 
            ? <div className="user">
                <div className="user__name">{searchingUser.username}</div>
                <Button placeholder='Создать чат' onClickHandler={() => createChat(searchingUser.id)}></Button>
              </div>
            :'Введите никнейм, чтобы найти собеседника'}
        </div>
      </div>
  )
}

export interface ISearchFriendProps {
  updateChat: () => void;
}