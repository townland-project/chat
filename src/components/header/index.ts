import { Bind, Component, RenderOnInit } from '@townland-project/dom'
import { Event } from "../../core/eventer";


@Component({
    id: 'tl-chat-header',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class HeaderComponent implements RenderOnInit {
    @Bind('title') title: string = 'Loading room name ...'

    RenderOnInit(): void {
        Event.on('chat:title', (title: string) => this.title = title)
        Event.on('chat:toggle', () => this.ToggleChat())
        Event.on('chat:focus:toggle', () => this.ToggleFocusUsers())
    }

    ToggleChat() {
        document.querySelector('tl-chat')?.toggleAttribute('opened')
        let opened = document.querySelector('tl-chat')?.hasAttribute('opened')
        if (!opened) document.querySelector('tl-chat-focus')?.classList.remove('show')
        Event.emit('chat:toggled', opened)
    }

    ToggleFocusUsers() {
        document.querySelector('tl-chat-focus')?.classList.toggle('show')
        if (!document.querySelector('tl-chat')?.hasAttribute('opened')) document.querySelector('tl-chat')?.setAttribute('opened', '')
    }
}
