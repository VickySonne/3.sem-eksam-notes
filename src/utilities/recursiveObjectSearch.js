export default function recursiveObjectSearch(object, search) {
    for (const key in object) {
        const value = object[key]

        // recursive betyder at den kalder sig selv
        if (typeof value === "object") {

            // Denne del køre hele denne funktion(alt i filen) igennem igen
            if (recursiveObjectSearch(value, search)) {
                return true
            }

            // Hvis værdien ikke er undefined og værdien (lavet om til string i lower case) indeholder det der søges på, returnere den true.
            // && betyder og
        } else {
            if (value !== undefined && value.toString().toLowerCase().includes(search.toLowerCase())) {
                return true
            }
        }
    }

    return false
}