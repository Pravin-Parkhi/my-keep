export const getUuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const executeMagicalSearch = (noteList, query) => {
    return noteList.filter(note => {
        return (note.title.includes(query) || note.description.includes(query))
    })
}