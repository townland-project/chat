import { RenderComponent } from "@townland-project/dom";
import { UserComponent } from "../components/user";

export type Filter = 'all' | 'both' | 'sendable' | 'receivable'

class CUsers {
    public filter: Filter = 'all'
    public list: IUserWithPermission[] = []

    public Clear(): void {
        this.list = []
        this._ClearElement()
    }

    private _ClearElement() {
        document.getElementById('tl-chat-focus')!.innerHTML = ''
    }

    public AddUsersByFilter(filter: Filter): void {
        this.filter = filter
        this._ClearElement()

        let users: IUserWithPermission[] = []

        switch (filter) {
            case 'all':
                users = this.list
                break;
            case 'both':
                users = this.list.filter(item => item.receive && item.send)
                break;

            case 'sendable':
                users = this.list.filter(item => item.send)
                break;

            case 'receivable':
                users = this.list.filter(item => item.receive)
                break;

            default:
                break;
        }

        users.slice().reverse().forEach(item => this._AddUserElement(item))
    }

    public AddUser(user: IUser): IUserWithPermission {
        let receive = this.list.length == 0 ? true : this.list.filter(item => item.receive).length != 0; // i receive message from every body and a new user can recive too
        let send = this.list.length == 0 ? true : this.list.filter(item => item.send).length != 0; // every body can send message and a new user can send too

        this.list.unshift({
            fullname: user.fullname,
            username: user.username,
            receive: receive,
            send: send
        })

        if (this.filter == 'all' || (this.filter == 'both' && (receive && send)) || (this.filter == 'sendable' && send) || (this.filter == 'receivable' && receive))
            this._AddUserElement(this.list[0])

        return this.list[0]
    }

    private async _AddUserElement(user: IUserWithPermission): Promise<void> {
        let element = await RenderComponent(UserComponent, {
            Values: {
                ...user,
                both: (user.send && user.receive) ? 'checked' : '',
                sendable: (user.send) ? 'checked' : '',
                receivable: (user.receive) ? 'checked' : '',
                ChangeBoth: () => this._ChangeBoth(user.username),
                // user can recive my message
                ChangeReceivable: () => this._ChangeReceivable(user.username),
                // user can send message to me
                ChangeSendable: () => this._ChangeSendable(user.username)
            }
        })
        element.setAttribute('username', user.username)
        let focus = document.getElementById('tl-chat-focus')!
        focus.insertBefore(element, focus.firstChild)
    }

    private _ChangeBoth(username: string): void {
        let input: HTMLInputElement = document.getElementById(`tl-chat-user-${username}-both`)! as HTMLInputElement;
        this.SetUserSendableByUsername(username, input.checked)
        this.SetUserReceivableByUsername(username, input.checked)
    }

    private _ChangeReceivable(username: string): void {
        let input: HTMLInputElement = document.getElementById(`tl-chat-user-${username}-receive`)! as HTMLInputElement;
        this.SetUserReceivableByUsername(username, input.checked)
        this.SetUserBothByUsername(username)
    }

    private _ChangeSendable(username: string): void {
        let input: HTMLInputElement = document.getElementById(`tl-chat-user-${username}-send`)! as HTMLInputElement;
        this.SetUserSendableByUsername(username, input.checked)
        this.SetUserBothByUsername(username)
    }

    public GetUserByUsername(username: string): IUserWithPermission | undefined {
        return this.list.find(item => item.username == username)
    }

    public GetUserIndexByUsername(username: string): number {
        return this.list.findIndex(item => item.username == username)
    }

    public RemoveUserByUsername(username: string): boolean {
        let index = this.list.findIndex(item => item.username == username)
        if (index != -1) {
            this.list.splice(index, 1)
            this._RemoverUserElementByUsername(username)
        }
        return index != -1
    }

    private _RemoverUserElementByUsername(username: string): void {
        let element = document.querySelector(`tl-chat-user[username="${username}"]`)!
        element.classList.add('remove')
        setTimeout(() => {
            document.getElementById('tl-chat-focus')?.removeChild(element)
        }, 1000);
    }

    /**
     * Can recive my message
     */
    public get GetSendableUsers(): string[] {
        return this.list.filter(item => item.send).map(item => item.username)
    }

    /**
     * Cannot recive their message
     */
    public get GetReceivableUsers(): string[] {
        return this.list.filter(item => item.receive).map(item => item.username)
    }

    public SetAllUserSendable(value: boolean): void {
        for (let item of this.list) {
            item.send = value;
            (<HTMLInputElement>document.getElementById(`tl-chat-user-${item.username}-send`)).checked = value
        }
    }

    public SetAllUserReceivable(value: boolean): void {
        for (let item of this.list) {
            item.receive = value;
            (<HTMLInputElement>document.getElementById(`tl-chat-user-${item.username}-receive`)).checked = value
        }
    }

    public SetUserSendableByUsername(username: string, value: boolean): void {
        let index = this.GetUserIndexByUsername(username)

        if (index != -1) {
            this.list[index].send = value;
            (<HTMLInputElement>document.getElementById(`tl-chat-user-${username}-send`)).checked = value
        }
    }

    public SetUserReceivableByUsername(username: string, value: boolean): void {
        let index = this.GetUserIndexByUsername(username)

        if (index != -1) {
            this.list[index].receive = value;
            (<HTMLInputElement>document.getElementById(`tl-chat-user-${username}-receive`)).checked = value
        }
    }

    public SetUserBothByUsername(username: string): void {
        let index = this.GetUserIndexByUsername(username)

        if (index != -1) {
            let both =
                this.list[index].send &&
                this.list[index].receive;

            (<HTMLInputElement>document.getElementById(`tl-chat-user-${username}-both`)).checked = both
        }
    }
}

export interface IUserWithPermission extends IUser {
    receive: boolean // can recive my message
    send: boolean // can send message
}

export interface IUser {
    fullname: string
    username: string
}

export let Users: CUsers = new CUsers()