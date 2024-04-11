import toast from "react-hot-toast"

const getToastNotification = () => {

    const noAvailableData = toast.success('No available data.', {
        id: 'no-available-data',
        position: "bottom-right"
    });

    return { noAvailableData }
}

export default getToastNotification