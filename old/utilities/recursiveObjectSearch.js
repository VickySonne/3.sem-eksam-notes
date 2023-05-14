export default function recursiveObjectSearch(object, search) {
    for (const key in object) {
        const value = object[key]

        if (typeof value === "object") {
            if (recursiveObjectSearch(value, search)) {
                return true
            }
        } else {
            if (value !== undefined && value.toString().toLowerCase().includes(search.toLowerCase())) {
                return true
            }
        }
    }

    return false
}