export interface IMessage {
    content: string,
    timestamp: Date,
    sender: {
        id: number
    },
    receiver: {
        id: number
    }
}
