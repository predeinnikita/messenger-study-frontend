import { Input } from '../../../../shared/components/input/input.component';
import './search-friend.component.css'
import { Button } from '../../../../shared/components/button/button.component';
import UseSearchFriendViewModel from './search-friend.viewmodel';

export const SearchFriend = () => {
  const {
    setInputValue,
    searchingUser,
    onClick,
    createChat
  } = UseSearchFriendViewModel()
  
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