export function changeSingleStateValue(setter, name, value) {
    setter(prev => {
        return {
            ...prev,
            [name]: value
        }
    })
}