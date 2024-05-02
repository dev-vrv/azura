const url = 'http://127.0.0.1:8000/'

function site(endPoint: string): string {
    return url + endPoint
}

export { site, url }