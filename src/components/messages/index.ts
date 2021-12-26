import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import SimpleBar from 'simplebar'

@Component({
    id: 'tl-chat-messages',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class MessagesComponent extends ComponentHelper implements RenderOnInit {
    RenderOnInit(): void {
        new SimpleBar(this.Element)
    }
}
