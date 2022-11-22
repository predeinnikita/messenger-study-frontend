import { ReactNode, useEffect } from 'react';
import { ModalViewModel } from '../../view-models/modal.view-model';
import './modal.component.css';

export interface IModalProps {
    children: ReactNode,
    modalViewModel: ModalViewModel,
}

export const Modal = (props: IModalProps) => {    
    const { modalViewModel, children } = props;

    useEffect(() => {
        modalViewModel.initOverlayClickHandler();
    }, []);
    
    return <>
        <div id={modalViewModel.id} className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => modalViewModel.close()}>&times;</span>
                    <h2>{ modalViewModel.title }</h2>
                </div>
                { children }
            </div>
        </div>
    </>
}