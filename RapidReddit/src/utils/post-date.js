export function getDisplayDate(timestamp) {
    const nowTime = new Date().getTime()
    const difference = nowTime - timestamp
    // See if days
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    if (days) return `${days}d`
    const hours = Math.floor(difference / (1000 * 60 * 60))
    if (hours) return `${hours}h`
    const minutes = Math.floor(difference / (1000 * 60))
    return `${minutes}m`
}
