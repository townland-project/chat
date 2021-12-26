import { Eventer } from '@townland-project/eventer';
import { IMessage, Messages } from './messages';
import { IUser, Users } from './users';

export let Event: Eventer;

export function SetEventer(eventer: Eventer) {
    Event = eventer
    Listen()
}

function Listen() {
    Event.on('chat:user:reset', (users: IUser[]) => {
        Users.Clear()
        users.forEach((user) => {
            Users.AddUser(user)
        })
    })

    Event.on('chat:user:set', (users: IUser[]) => {                
        users.forEach((user) => {
            Users.AddUser(user)
        })
    })

    Event.on('chat:user:add', (user: IUser) => {
        Users.AddUser(user)
    })

    Event.on('chat:user:remove', (username: string) => {
        Users.RemoveUserByUsername(username)
    })

    Event.on('chat:user:clear', () => {
        Users.Clear()
    })

    Event.on('chat:message:clear', ()=> {
        Messages.Clear()
    })

    Event.on('chat:message:add', (message: IMessage)=> {
        Messages.Add(message)
    })
}