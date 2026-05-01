const BASE_URL = "https://dogapi.dog/api/v2"

export async function getBreeds() {
    const res = await fetch(`${BASE_URL}/breeds`)
    if (!res.ok) throw new Error("Failed to fetch breeds")
    return res.json()
}

export async function getBreed(id) {
    const res = await fetch(`${BASE_URL}/breeds/${id}`)
    if (!res.ok) throw new Error("Failed to fetch breed")
    return res.json()
}

export async function getFacts() {
    const res = await fetch(`${BASE_URL}/facts`)
    if (!res.ok) throw new Error("Failed to fetch facts")
    return res.json()
}

export async function getGroups() {
    const res = await fetch(`${BASE_URL}/groups`)
    if (!res.ok) throw new Error("Failed to fetch groups")
    return res.json()
}