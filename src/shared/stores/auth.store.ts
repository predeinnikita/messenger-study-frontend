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
    access_token: '',
    updateAccessToken(token: string) {
        this.access_token = token;
    }
});

export default authStore;