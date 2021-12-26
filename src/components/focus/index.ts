import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import SimpleBar from 'simplebar'
import { Event } from '../../core/eventer'
import { Filter, Users } from '../../core/users'

@Component({
    id: 'tl-chat-focus',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class FocusComponent extends ComponentHelper implements RenderOnInit {

    RenderOnInit(): void {
        this.SetTab('all', false)

        new SimpleBar(this.Element.querySelector('main')!)

        Event.on('chat:focus:tab', to => this.SetTab(to))
    }

    SetTab(to: Filter, init: boolean = true) {        
        let element: HTMLElement = document.querySelector(`tl-chat-focus footer span[tab="${to}"]`)!
        let footer: HTMLElement = document.querySelector('tl-chat-focus footer')!
        let element_rect = element.getBoundingClientRect()
        let footer_rect = footer.getBoundingClientRect()
        footer.style.setProperty('--width', `${element_rect.width}px`)
        // 16 = padding
        footer.style.setProperty('--left', `${element_rect.x - footer_rect.x - 16}px`)

        if (init && to != Users.filter)
            Users.AddUsersByFilter(to)
    }
}
