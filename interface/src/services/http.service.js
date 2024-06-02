const HTTPService = {
    post: async (url, data) => {
        const response = await fetch(
            url, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            }
        )
        .then(async (res) => res.json())
        .catch((error) => {
            console.error(`Http service error: ${error}`);
        });
        
        return response;
    }
}

export default HTTPService;