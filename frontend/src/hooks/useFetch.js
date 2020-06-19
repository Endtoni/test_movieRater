import {useState, useEffect} from 'react';
import {API} from '../api_services';
import {useCookies} from 'react-cookie';

function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(['mrtoken']);

    useEffect( () => {
    async function fetchData() {
        setLoading(true);
        setError();
        const data = await API.getMovies(token['mrtoken']).catch(err => setError(error))
        setData(data);
        setLoading(false);
    }
    fetchData()
    }, []);
    return [data, loading, error]
}

export {useFetch}