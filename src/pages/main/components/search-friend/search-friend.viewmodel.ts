import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { ButtonEvent } from "../../../../shared/components/button/button.component";
import { IUser } from "../../../../shared/interfaces/user.interface";
import chatsStore from "../../../../shared/stores/chats.store";
import loaderStore from "../../../../shared/stores/loader.store";
import usersStore from "../../../../shared/stores/users.store";

export default function UseSearchFriendViewModel() {
    const [inputValue, setInputValue] = useState('');
    const [searchingUser, setSearchingUser] = useState<IUser | null>(null)

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

    return {
        setInputValue,
        searchingUser,
        onClick,
        createChat
    }
}