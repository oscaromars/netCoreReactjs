import { useState } from 'react';

const usePostDetalle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postDetalle = async (cabeceraId, campoDetalle, campoValor) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/Detalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cabeceraId, campoDetalle, campoValor }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); 
        throw new Error(`Error en la solicitud: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();
      return { data, error: null }; 
    } catch (err) {
      setError(err.message || 'Error desconocido');
      console.error('Error al enviar los datos:', err);
      return { data: null, error: err.message }; 
    } finally {
      setLoading(false);
    }
  };

  return { postDetalle, loading, error };
};

export default usePostDetalle;
