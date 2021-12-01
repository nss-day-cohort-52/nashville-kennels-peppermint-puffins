//Exporting "fetchIt" function with default response parameters
export const    fetchIt = (url, method = "GET", body = null) => {
//Default values for fetch options    
    let options = {
        "method": method,
        "headers": {}
    }
//Switch method from default "GET" to indicated case method
    switch (method) {
        case "POST":
        case "PUT":
            options.headers = {
                "Content-Type": "application/json"
            }
            break;
        default:
            break;
    }
//If the body parameter is "not" null, body will accept passed in body values
    if (body !== null) {
        options.body = body
    }
/*Return is a fetch of URL with options to the API
translates response into json*/    
    return fetch(url, options).then(r => r.json())
}
//Basic request function. Initializes URL with default options and headers.
export const request = {
    init(url) {
        this.options = {}
        this.options.headers = {}
        this.url = url
    },

    get(url) {
        this.init(url)
        this.options.method = "GET"
        return this.send()
    },

    post(url) {
        this.init(url)
        this.options.method = "POST"
        this.options.headers["Content-Type"] = "application/json"
        this.options.headers["Accept"] = "application/json"
        return this
    },

    put(url) {
        this.init(url)
        this.options.method = "PUT"
        this.options.headers = {
            "Content-Type": "application/json"
        }
        return this
    },

    delete(url) {
        this.init(url)
        this.options.method = "DELETE"
        return this.send()
    },

    withBody(body) {
        if (this.options.method === "POST" || this.options.method === "PUT") {
            this.options.body = JSON.stringify(body)
        }
        return this
    },
/*Default function to recall information back from API. 
Even if entry deleted, updated information needs to be parsed and deleted.*/ 
    async send() {
        const req = await fetch(this.url, this.options)
        const parsed = await req.json()
        return parsed
    }
}