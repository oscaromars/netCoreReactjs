import { useState } from 'react';

const useCreateCabecera = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCabecera = async (nombreTabla) => {
    setLoading(true);
    setError(null);
    
    const newCabecera = {
      NombreTabla: nombreTabla,
      Detalles: [] 
    };

    try {
      const response = await fetch('http://localhost:5000/api/Cabecera', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCabecera),
      });

      if (!response.ok) {
        throw new Error('Error al crear la cabecera');
      }

      const result = await response.json();
      return result; 
    } catch (err) {
      setError(err);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { createCabecera, loading, error };
};

export default useCreateCabecera;
