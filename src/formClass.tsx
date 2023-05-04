import { useState } from 'react'

export class createFormHook {
    private _state: any[];
    name: string;
    element: any

    constructor(name: string) {
        this._state = useState('')
        this.name = name
    }

    get error() {
        return this._state[0]
    }

    set error(newValue: string) {
        this._state[0] = this._state[1](() => newValue)
    }
}


