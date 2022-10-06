import { useEffect } from 'react';
import './chat-list.component.css'

export const ChatList = (props: any) => {
    // useEffect(() => {
    //     VK.Api.call('messages.getConversations', {
    //         v: '5.131',
    //         offset: '30',
    //         count: '50',
    //     }, function(r) {
    //         console.log(r);
    //     });
    // }, [])

    return (
      <div className="chat-list">
        <ul>
            {props.list.map((element: any) => {
                return <li>{element}</li>
            })}
        </ul>
      </div>
    )
  }