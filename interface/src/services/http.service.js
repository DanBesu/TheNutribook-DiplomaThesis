import { toast } from 'react-toastify';

const HTTPService = {
    post: async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                toast.error(responseBody.message || 'Server error, please try again.');
                console.error(responseBody.message || 'HTTP error');
                return { status: 'error', message: responseBody.message || 'HTTP error' };
            }

            toast.success('Success');
            return responseBody;
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(`Http service error: ${error.message}`);
            return { status: 'error', message: error.message };
        }
    },
    get: async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const responseBody = await response.json();

            if (!response.ok) {
                toast.error(responseBody.message || 'Server error, please try again.');
                console.error(responseBody.message || 'HTTP error');
                return { status: 'error', message: responseBody.message || 'HTTP error' };
            }

            return responseBody;
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(`Http service error: ${error.message}`);
            return { status: 'error', message: error.message };
        }
    },
    delete: async (url) => {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            const responseBody = await response.json();

            if (!response.ok) {
                toast.error(responseBody.message || 'Server error, please try again.');
                console.error(responseBody.message || 'HTTP error');
                return { status: 'error', message: responseBody.message || 'HTTP error' };
            }

            toast.success('Success');
            return responseBody;
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(`Http service error: ${error.message}`);
            return { status: 'error', message: error.message };
        }
    },
    put: async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                toast.error(responseBody.message || 'Server error, please try again.');
                console.error(responseBody.message || 'HTTP error');
                return { status: 'error', message: responseBody.message || 'HTTP error' };
            }

            toast.success('Success');
            return responseBody;
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(`Http service error: ${error.message}`);
            return { status: 'error', message: error.message };
        }
    }
};

export default HTTPService;
