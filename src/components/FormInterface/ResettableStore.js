import { action, toJS } from 'mobx'

export default class ResettableStore {
    _superInitialState = null

    @action.bound
    setInitialState() {
        this._superInitialState = toJS(this)
        this._superAsConstructed = this
    }

    @action.bound
    reset() {
        if (!this._superInitialState) {
            console.warn('reset() does not work unless you call this.setInitialState() at the end of the constructor.')
        }

        const initialState = { ...this._superInitialState }
        const asConstructed = { ...this._superAsConstructed }
        for (const key in initialState) {
            if (!initialState.hasOwnProperty(key)) continue
            if (asConstructed[key] === null) throw "You cannot use null as a default value for resettable stores. Key:" + key
            if (key === '_superInitialState') continue
            if (asConstructed[key].hasOwnProperty('_hasMap')) {
                this[key] = new Map()
            } else {
                this[key] = initialState[key]
            }
        }
    }
}
