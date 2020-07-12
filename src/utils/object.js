// Makes deep copy of object and an array
// Works only for JSON serializable content
export function deepCopy (data) {
    if (data) {
      return JSON.parse(JSON.stringify(data))
    }
}