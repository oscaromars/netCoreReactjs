import { useState } from 'react';

const usePutDetalle = (baseURL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putDetalle = async (id, cabeceraId, campoDetalle, campoValor) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/Detalle/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          cabeceraId,
          campoDetalle,
          campoValor,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText} - ${errorText}`);
      }

      if (response.status === 204) {
        return; 
      }

      const data = await response.json();
      return data; 
    } catch (err) {
      setError(err.message);
      console.error('Error al enviar los datos:', err);
    } finally {
      setLoading(false);
    }
  };

  return { putDetalle, loading, error };
};

export default usePutDetalle;
