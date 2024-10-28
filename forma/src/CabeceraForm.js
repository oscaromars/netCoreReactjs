import React, { useState, useEffect } from 'react';
import './CabeceraForm.css';
import useFetchData from './hooks/use-fetch-data.js';
import useFetchDataDetalles from './hooks/use-fetch-data-detalles.js';
import useCreateCabecera from './hooks/use-post-data.js';
import usePutDetalle from './hooks/use-put-data-detalles.js';
import usePostDetalle from './hooks/use-post-data-detalles.js';
import useDeleteDetalle from './hooks/use-del-data-detalles.js';

const CabeceraComponent = () => {
  const { data: initialCabeceraData, loading: loadingCabecera, error: errorCabecera } = useFetchData();
  const [cabeceraData, setCabeceraData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { dataDetalles, loadingDetalles, errorDetalles } = useFetchDataDetalles(selectedId);
  const [nombreTabla, setNombreTabla] = useState('');
  const { createCabecera, loading: loadingCreate, error: errorCreate } = useCreateCabecera();
  const { putDetalle, loading: loadingPut, error: errorPut } = usePutDetalle();
  const { postDetalle, loading: loadingPost, error: errorPost } = usePostDetalle();
  const { deleteDetalle, loading: loadingDelete, error: errorDelete } = useDeleteDetalle();

  const [nuevoCampoDetalle, setNuevoCampoDetalle] = useState('');
  const [nuevoCampoValor, setNuevoCampoValor] = useState('');
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editableField, setEditableField] = useState({});

  useEffect(() => {
    if (initialCabeceraData) {
      setCabeceraData(initialCabeceraData);
    }

    const storedId = localStorage.getItem('selectedCabeceraId');
    if (storedId) {
      setSelectedId(storedId);
    }
  }, [initialCabeceraData]);

  const handleButtonClick = (id) => {
    setSelectedId(id);
    localStorage.setItem('selectedCabeceraId', id); 
  };

  const openEditPopup = (detalle) => {
    setEditableField({
      id: detalle.id,
      campoDetalle: detalle.campoDetalle,
      campoValor: detalle.campoValor
    });
    setEditPopupVisible(true);
  };

  const closeEditPopup = () => {
    setEditPopupVisible(false);
    setEditableField({});
  };

  const handleSaveChanges = async () => {
    try {
      await putDetalle(
        editableField.id,
        selectedId,
        editableField.campoDetalle,
        editableField.campoValor
      );
      closeEditPopup();
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar los detalles:', error);
    }
  };

  const handleDeleteDetalle = async (campoId) => {
    try {
      await deleteDetalle(campoId, selectedId);
      window.location.reload();
    } catch (err) {
      console.error('Error al eliminar el detalle:', err);
    }
  };

  const renderInputField = (campoValor, campoDetalle, campoId) => {
    const inputProps = {
      name: campoDetalle,
      placeholder: `Ingrese ${campoDetalle}`,
      required: true,
      className: 'input-field'
    };

    return (
      <div className="input-group">
        {campoValor === 'text' && <input type="text" {...inputProps} required />}
        {campoValor === 'number' && <input type="number" {...inputProps} required />}
        {campoValor === 'email' && <input type="email" {...inputProps} required />}
        {campoValor === 'password' && <input type="password" {...inputProps} required />}
        {campoValor === 'date' && <input type="date" {...inputProps} required />}
        <button onClick={() => handleDeleteDetalle(campoId)} className="btn-delete">-</button>
        <button onClick={() => openEditPopup({ id: campoId, campoDetalle, campoValor })} className="btn-edit">Editar</button>
      </div>
    );
  };

  const handleAddTableName = async () => {
    if (!nombreTabla) {
      alert('El nombre de la tabla es obligatorio.');
      return;
    }

    try {
      await createCabecera(nombreTabla);
      setNombreTabla('');
      window.location.reload();
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleAddDetalle = async () => {
    if (!nuevoCampoDetalle || !nuevoCampoValor) {
      alert('Ambos campos son obligatorios para agregar un nuevo detalle.');
      return;
    }

    try {
      await postDetalle(selectedId, nuevoCampoDetalle, nuevoCampoValor);
      setNuevoCampoDetalle('');
      setNuevoCampoValor('');
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar detalle:', error);
    }
  };

  return (
    <div className="container">
      {loadingCabecera && <div className="loading">Loading cabecera...</div>}
      {errorCabecera && <div className="error-message">Error en cabecera: {errorCabecera.message}</div>}
      {loadingCreate && <div className="loading">Cargando creación...</div>}
      {errorCreate && <div className="error-message">Error al crear cabecera: {errorCreate.message}</div>}
      {loadingPut && <div className="loading">Actualizando...</div>}
      {errorPut && <div className="error-message">Error al actualizar: {errorPut.message}</div>}
      {loadingPost && <div className="loading">Agregando detalle...</div>}
      {errorPost && <div className="error-message">Error al agregar detalle: {errorPost.message}</div>}
      {loadingDelete && <div className="loading">Eliminando detalle...</div>}
      {errorDelete && <div className="error-message">Error al eliminar detalle: {errorDelete.message}</div>}

      {!loadingCabecera && !errorCabecera && (
        <div>
          <h2>Formularios</h2>
          <div className="cabecera-buttons">
            {Array.isArray(cabeceraData) && cabeceraData.map(item => (
              <button key={item.id} onClick={() => handleButtonClick(item.id)} className="btn-cabecera">
                {item.nombreTabla}
              </button>
            ))}
            <input
              type="text"
              value={nombreTabla}
              onChange={(e) => setNombreTabla(e.target.value)}
              placeholder="Ingrese nombre tabla"
              className="input-table-name"
            />
            <button onClick={handleAddTableName} className="btn-add">+</button>
          </div>

          {selectedId && (
            <div>
              <h3>Campos del Formulario:</h3>
              {loadingDetalles && <div className="loading">Cargando detalles...</div>}
              {errorDetalles && <div className="error-message">Error al cargar detalles: {errorDetalles.message}</div>}
              {dataDetalles && (
                <form onSubmit={(e) => e.preventDefault()} className="detalles-form">
                  {dataDetalles.map((detalle) => (
                    <div key={detalle.id} className="detalle-item">
                      <label>{detalle.campoDetalle}:</label>
                      {renderInputField(detalle.campoValor, detalle.campoDetalle, detalle.id)}
                    </div>
                  ))}
                  <button type="submit" className="btn-submit">Enviar</button>
                </form>
              )}

              <h4>Agregar Nuevo Campo:</h4>
              <input
                type="text"
                value={nuevoCampoDetalle}
                onChange={(e) => setNuevoCampoDetalle(e.target.value)}
                placeholder="Nombre de Campo"
                className="input-new-detail"
              />
              <select value={nuevoCampoValor} onChange={(e) => setNuevoCampoValor(e.target.value)} className="select-detail-type">
                <option value="">Seleccione Tipo</option>
                <option value="text">Texto</option>
                <option value="number">Número</option>
                <option value="email">Email</option>
                <option value="password">Contraseña</option>
                <option value="date">Fecha</option>
              </select>
              <button onClick={handleAddDetalle} className="btn-add-detail">Agregar Campo</button>
            </div>
          )}
        </div>
      )}

      {editPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h3>Editar Detalle</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
              <div className="form-group">
                <label htmlFor="campoDetalle">Nombre:</label>
                <input
                  id="campoDetalle"
                  type="text"
                  value={editableField.campoDetalle || ''}
                  onChange={(e) => setEditableField({ ...editableField, campoDetalle: e.target.value })}
                  className="input-edit"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="campoValor">Tipo:</label>
                <select
                  id="campoValor"
                  value={editableField.campoValor || ''}
                  onChange={(e) => setEditableField({ ...editableField, campoValor: e.target.value })}
                  className="select-edit"
                  required
                >
                  <option value="">Seleccione tipo</option>
                  <option value="text">Texto</option>
                  <option value="number">Número</option>
                  <option value="email">Email</option>
                  <option value="password">Contraseña</option>
                  <option value="date">Fecha</option>
                </select>
              </div>
              <div className="button-group">
                <button type="submit" className="btn-save">Grabar</button>
                <button type="button" onClick={closeEditPopup} className="btn-cancel">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabeceraComponent;
