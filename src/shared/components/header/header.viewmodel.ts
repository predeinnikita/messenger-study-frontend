import { NavigateFunction } from "react-router-dom";
import { IModalEvent } from "../../interfaces/modal-event.interface";
import authStore from "../../stores/auth.store";
import { ModalViewModel } from "../../view-models/modal.view-model";
import { ButtonEvent } from "../button/button.component";

export default function useHeaderViewModel(navigate: NavigateFunction) {
    const logout = (e: ButtonEvent) => {
        authStore.logout().subscribe(() => navigate('/login'));
    }

    const modalViewModel = new ModalViewModel({
        id: 'search-friend-modal',
        title: 'Заголовок'
    });

    modalViewModel.events$.subscribe((event: IModalEvent) => {
        console.log(event.type);
    });

    return {
        logout,
        modalViewModel,
    }
}