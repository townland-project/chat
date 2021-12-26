import { Module, RenderModule } from '@townland-project/dom'
import { Eventer } from '@townland-project/eventer'

import { SetEventer } from './core/eventer'
import { MainComponent } from './components/main'
import { FocusComponent } from './components/focus'
import { FooterComponent } from './components/footer'
import { HeaderComponent } from './components/header'
import { MessagesComponent } from './components/messages'

@Module({
    Component: [
        FocusComponent,
        FooterComponent,
        HeaderComponent,
        MessagesComponent
    ],
    Bootstrap: MainComponent
})
export class ChatModule { }

export function GenerateChat(eventer: Eventer): Promise<HTMLElement | undefined> {
    SetEventer(eventer)
    return RenderModule(ChatModule)
}