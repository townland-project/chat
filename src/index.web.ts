import "../node_modules/simplebar/dist/simplebar.min.css";

import { Eventer } from "@townland-project/eventer"
import { GenerateChat } from "."
import { Event } from "./core/eventer";
import { IMessage } from "./core/messages";

GenerateChat(new Eventer())
    .then(element => {
        document.getElementById('root')?.appendChild(element!)

        return Promise.resolve()
    })
    .then(() => {
        FakeData()
    })

function FakeData() {
    setTimeout(() => {
        Event.emit('chat:toggle')

        setTimeout(() => {
            Event.emit('chat:focus:toggle')

            setTimeout(() => {
                Event.emit('chat:focus:tab', 'both')
            }, 800);
        }, 800);

        setTimeout(() => {
            Event.emit('chat:focus:toggle')
            Event.emit('chat:title', 'In the Tardis')

            setTimeout(() => {
                let message: IMessage = {
                    content: 'Hi, am i a Dalek ?'
                }
                Event.emit('chat:message:add', message)
            }, 300);

            setTimeout(() => {
                let message = 'Yes, you are a Dalek.'.split('')

                message.forEach((_, i) => {
                    setTimeout(() => {
                        Event.emit('chat:input:set', message.slice(0, i).join(''))
                    }, 100 * i);
                })

                setTimeout(() => {
                    Event.emit('chat:input:send')

                    Event.on('chat:message:send', () => {

                        setTimeout(() => {
                            Event.emit('chat:message:add', {
                                content: "NOOOOOOO !"
                            })

                            setTimeout(() => {
                                let count = 10
                                let interval = setInterval(() => {
                                    Event.emit('chat:message:add', {
                                        content: "Extermination"
                                    })
                                }, 800);

                                setTimeout(() => {
                                    clearInterval(interval)
                                    Event.emit('chat:toggle')
                                    setTimeout(() => {
                                        document.body.removeChild(document.getElementById('root')!)
                                        setTimeout(() => {
                                            document.body.style.backgroundColor = '#000'
                                        }, 500);
                                    }, 1000);
                                }, 800 * count);
                            }, 1000);
                        }, 1000);

                    })
                }, 300 + (100 * message.length));
            }, 3000);
        }, 3000);
    }, 1000);

}