import { useEffect, useState} from 'react';
import axios from 'axios';
const useFetchData = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: response } = await axios.get('http://localhost:5000/api/Cabecera');
          setData(response);
        } catch (error) {
          console.error(error)
        }
        setLoading(false);
      };
  
      fetchData();
    }, []);
  
    return {
      data,
      loading,
    };
  };
  
  export default useFetchData;