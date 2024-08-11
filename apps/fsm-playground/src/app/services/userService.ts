import {load} from '@fingerprintjs/fingerprintjs'

class UserService {
    public async getUser() {
        // just something nice to get the same "user" each time per browser
        const fp = await load()
        const {visitorId} = await fp.get()

        const res = await fetch(`https://randomuser.me/api/?seed=${visitorId}`)
        return res.json()
    }
}

export const userService = new UserService()