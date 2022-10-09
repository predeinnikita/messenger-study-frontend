import './chat-item.component.css'
import photo from '../../../assets/photo.jpg'

export const ChatItem = (props: any) => {
  // console.log(props.index);
  
    return (
      <div className="chat-item">
        <div className="chat-item__name">Имя Фамилия</div>
        <div className="chat-item__message">Привет! Я слышал ты...</div>
      </div>
    )
  }