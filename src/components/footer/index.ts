import { Component, RenderOnInit } from '@townland-project/dom'
import { Event } from '../../core/eventer';
import { IMessage, Messages } from '../../core/messages';

@Component({
    id: 'tl-chat-footer',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class FooterComponent implements RenderOnInit {
    RenderOnInit(): void {
        Event.on('chat:input:set', message => {
            (document.getElementById('tl-chat-input') as HTMLInputElement).value = message
        })

        Event.on('chat:input:send', () => {
            this.SendTextMessage()
        })
    }

    SendTextMessage() {
        let input: HTMLInputElement = document.getElementById('tl-chat-input') as HTMLInputElement,
            value = input.value;

        if (value.length == 0) return

        let message: IMessage = {
            content: value
        }

        Messages.Add(message)
        Event.emit('chat:message:send', message)

        input.value = ''
    }
}
