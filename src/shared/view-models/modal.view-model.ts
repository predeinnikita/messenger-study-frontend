import { Subject, Observable } from "rxjs";
import { ModalEventType, ModalResult } from "../enums";
import { IModalEvent } from "../interfaces/modal-event.interface";

export class ModalViewModel {
    public readonly id: string;
    public readonly title: string;

    private _result: ModalResult = ModalResult.None;
    private _events$: Subject<IModalEvent> = new Subject<IModalEvent>();

    constructor(data: IModalViewModelData) {
        this.id = data.id;
        this.title = data.title;
    }

    public get events$(): Observable<IModalEvent> {
        return this._events$.asObservable();
    }

    public open(): void {
        const modal = document.getElementById(this.id);
        if (modal) modal.style.display = "block";
        this._events$.next({
            type: ModalEventType.Open
        });
    }

    public close(): void {
        const modal = document.getElementById(this.id);
        if (modal) modal.style.display = "none";
        this._events$.next({
            type: ModalEventType.Close,
            result: this._result
        });
    }

    public initOverlayClickHandler(): void {
        const modal = document.getElementById(this.id);
        if (modal) {
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            })
        }
    }
}

export interface IModalViewModelData {
    id: string;
    title: string;
}