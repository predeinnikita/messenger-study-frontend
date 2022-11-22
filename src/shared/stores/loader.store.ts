import { makeAutoObservable, observable } from "mobx";

class LoaderStore {
    public loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setState(state: boolean): void {
        this.loading = state;
    }
}

const loaderStore = observable(new LoaderStore());

export default loaderStore;