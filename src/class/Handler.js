import { Logger } from "../functions.js"

export default class {
    constructor(module, path) {
        this.module = module
        this.path = path
        this.name = this.module.structure.name
        this.autorun = this.module.structure.autorun
        this.type = this.module.structure.type
        this.running = false
    }

    run = async (...args) => {
        try {
            if (this.running === false || this.type === 1) {
                this.running = true
                Logger.debug(this.name + " handler running")
                return await this.module.run(...args)
            } else if (this.running === true) {
                Logger.error(this.name + " handler already running")
            }
        } catch (e) {
            this.running = false
            Logger.error("Cannot run " + this.name + " handler")
            console.error(e)
        }
    }

    stop = async (...args) => {
        try {
            if (this.running === true) {
                this.running = false
                Logger.debug(this.name + " handler stopping")
                return await this.module.stop(...args)
            } else if (this.running === false) {
                Logger.error(this.name + " handler already stopped")
            }
        } catch (e) {
            this.running = true
            Logger.error("Cannot stop " + this.name + " handler")
            console.error(e)
        }

        
    }
}