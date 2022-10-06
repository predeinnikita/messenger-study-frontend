import { observable } from "mobx";

const authStore = observable({
    auth: false,
    changeAuth(auth: boolean) {
        this.auth = auth;
    },
    name: '',
    changeName(name: string) {
        this.name = name;
    },
});

export default authStore;