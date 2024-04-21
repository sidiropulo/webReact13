interface Store {
    backReturnName: string[] | null
    backReturnCount: string[] | null
    setBackReturnName: (value: string[]) => void
    setBackReturnCount: (value: string[]) => void
}

export const store: Store = {
    backReturnName: null,
    backReturnCount: null,

    setBackReturnName(value: string[]) {
        this.backReturnName = value
    },

    setBackReturnCount(value: string[]) {
        this.backReturnCount = value
    }
}