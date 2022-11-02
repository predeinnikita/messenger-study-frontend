import { ChatItem } from '../chat-item/chat-item.componen';
import { Input } from '../../../../shared/components/input/input.component';
import './search-friend.component.css'
import { Button, ButtonEvent } from '../../../../shared/components/button/button.component';

export const SearchFriend = () => {
  const onClick = (e: ButtonEvent) => {
    e.preventDefault();
  }
  
  return (
      <div>
        <div className='search-friend'>
          <form className='search-friend__search'>
            <Input type='text' placeholder='Поиск' />
            <Button placeholder='Найти' onClickHandler={onClick}></Button>
          </form>
        </div>
        <div className="search-friend__result">
            Введите никнейм, чтобы найти собеседника
        </div>
      </div>
  )
}