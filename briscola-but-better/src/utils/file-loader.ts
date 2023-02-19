export default async function LoadFile(path : string) : Promise<Response> {
    return fetch(path, { method: 'GET' })
} 