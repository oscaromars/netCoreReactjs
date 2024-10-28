import { useState } from 'react';

const useDeleteDetalle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDetalle = async (id, cabeceraId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/Detalle/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cabeceraId }), 
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      if (response.status === 204) {
        return {}; 
      }

      const data = await response.json(); 
      return data; 
    } catch (err) {
      setError(err);
      console.error('Error al enviar la solicitud DELETE:', err);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { deleteDetalle, loading, error };
};

export default useDeleteDetalle;
