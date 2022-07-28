const dropHMS = (date:Date) => {
    date.setSeconds(0,0)
    date.setMinutes(0)
    date.setHours(0)
    return date
}

const setYesterday = () => {
    const date = dropHMS(new Date())
    date.setDate(date.getDate() - 1)
    return date
}

export const formatDate = (date:string) => {
    const parsedDate = new Date(date)

    const time = parsedDate.toLocaleTimeString().slice(0,-3)
    const today = dropHMS(new Date())
    const yesterday = setYesterday()


    if(today.getTime() === dropHMS(parsedDate).getTime()){
        return `Сегодня, ${time} i-GMT+3`
    }

    if(yesterday.getTime() === dropHMS(parsedDate).getTime()){
        return `Вчера, ${time} i-GMT+3`
    }

    return `${new Date(date).toLocaleString().slice(0,-3)} i-GMT+3`
}