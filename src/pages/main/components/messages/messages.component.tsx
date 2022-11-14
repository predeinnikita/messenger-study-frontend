import './messages.component.css'

export const Messages = (props: IMessagesProps) => {

  const { messages } = props;

  return (
    <div className="messages">
      {
        messages.map((message, index) => {
          return <div className={`message ${message.my? 'my': ''}`} key={index}>
          <div className='message__text'>
            {message.text}
            <div className='message__time'>{message.date.split('T')[0]}</div>
          </div>
        </div>
        })
      }
      
    </div>
  )
}

export interface IMessagesProps {
  messages: IMessage[]
}

export interface IMessage {
  id: number;
  text: string;
  date: string;
  my: boolean;
}