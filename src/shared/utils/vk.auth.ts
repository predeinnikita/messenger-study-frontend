import { Observable, Subject, Subscription, takeUntil } from "rxjs";



export class VkAuth {
    public static response: string;
    public static readonly loginChange$: Subject<string> = new Subject<string>();

    private static _subscriptions: Subscription[] = [];

    public static login(): any{
        VK.Auth.login((r) => {
          if (r.session) {
            let username = r.session.user.first_name;
            this.response = username;
            this.loginChange$.next(username);
          } else {
            this.loginChange$.next('');
          }
        }, 4);
    }

    public static logout(): void {
        VK.Auth.logout((r) => {
            console.log(r);
            this.loginChange$.next('');
        });
    }

    public static addSubscription(sub: Subscription): void {
      this._subscriptions.push(sub);
    }

    public static unsubscribe(): void {
      this._subscriptions.forEach(sub => {
        sub.unsubscribe();
      })
    }
}