class CMessages {
    public Add(message: IMessage): void {
        this._AddElement(message)
    }

    private async _AddElement(message: IMessage): Promise<void> {
        let element = document.createElement('div')
        element.className = 'message'

        element.innerHTML = `<div class="container"><div class="text">${message.content}</div></div>`

        let messages = document.getElementById('tl-chat-messages')
        messages?.insertBefore(element, document.getElementById('tl-chat-messages-bottom')!)
        this._ScrollToBottom()
    }

    private _ScrollToBottom(): void {
        let element = document.getElementById('tl-chat-messages-bottom')!
        element.scrollIntoView({ 'behavior': 'smooth' })
    }

    public Clear(): void { }
}

export interface IMessage {
    content: string
}

export let Messages: CMessages = new CMessages()