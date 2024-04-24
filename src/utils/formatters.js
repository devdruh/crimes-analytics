export const formatHour12 = (time) => {
    return time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
}
