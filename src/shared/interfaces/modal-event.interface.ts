import { ModalEventType, ModalResult } from "../enums";

export interface IModalEvent {
    type: ModalEventType,
    result?: ModalResult
}