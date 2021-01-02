const getData = async (url, setFunction) => {
    try {
        
        const response = await fetch(url , {
            headers: {token: localStorage.token}
        })

        const jsonData = await response.json();

        setFunction(jsonData)


    } catch (error) {
        console.error(error.message)
    }
}

module.exports = getData