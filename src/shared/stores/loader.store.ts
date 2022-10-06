import { observable } from "mobx";

const loaderStore = observable({
    loading: true,
    setState(state: boolean) {
        this.loading = state;
    },
});

export default loaderStore;