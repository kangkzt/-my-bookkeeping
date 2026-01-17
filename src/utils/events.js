export const EventEmitter = {
    events: {},
    dispatch(event, data) {
        if (!this.events[event]) return
        this.events[event].forEach(callback => callback(data))
    },
    subscribe(event, callback) {
        if (!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
        return () => {
            this.events[event] = this.events[event].filter(cb => cb !== callback)
        }
    }
}

export const EVENTS = {
    TRANSACTION_UPDATED: 'TRANSACTION_UPDATED',
    DATA_IMPORTED: 'DATA_IMPORTED'
}
