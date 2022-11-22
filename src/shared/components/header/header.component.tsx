import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import './header.component.css';
import { Button, ButtonEvent } from '../button/button.component';
import { getPath } from '../../utils/get-path';
import authStore from '../../stores/auth.store';
import { Modal } from '../modal/modal.component';
import { ModalViewModel } from '../../view-models/modal.view-model';
import { SearchFriend } from '../../../pages/main/components/search-friend/search-friend.component';
import { IModalEvent } from '../../interfaces/modal-event.interface';
import useHeaderViewModel from './header.viewmodel';

export const Header = observer(() => {
  const {
    modalViewModel,
    logout
  } = useHeaderViewModel(useNavigate());

  return <>
    <header className='header'>
      messenger-study-frontend
      { 
        getPath().includes('') || true
        ? <Button className='header__find-button' onClickHandler={() => modalViewModel.open()} placeholder='Найти собеседника' />
        : ''
      }
      { 
        getPath().includes('') || true
        ? <Button className='header__button' onClickHandler={logout} placeholder='Выйти' />
        : ''
      }
    </header>
    <Modal modalViewModel={modalViewModel}>
      <SearchFriend />
    </Modal>
    </>
});