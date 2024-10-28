import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchDataDetalles = (id) => {
    const [dataDetalles, setData] = useState(null); 
    const [loadingDetalles, setLoading] = useState(true);
    const [errorDetalles, setError] = useState(null);

    useEffect(() => {
        const fetchDataDetalles = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/Detalle/${id}`);
                setData(response.data); 
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDataDetalles();
        }
    }, [id]);

    return {
        dataDetalles,
        loadingDetalles,
        errorDetalles,
    };
};

export default useFetchDataDetalles;
