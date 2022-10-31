export default class {
    static async get(url, params = {}) {
        const paramsStr = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
        const search = url.include('?') ? paramsStr : `?${paramsStr}`
        const nUrl = `${url}${search}`
        const result = await fetch(nUrl)
        return result
    }

    static async post(url, data = {}) {
        try {
            const result = await fetch(url, {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            return await result.json()
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
