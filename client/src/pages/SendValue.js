import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function SendValue() {
  const [username, setUsername] = useState('');
  const [bidValue, setBidValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const history = useHistory();
  const navigateToMinValue = () => {
    history.push("/valor-minimo");
  }
  const postValue = data => {
    axios.post('/api/post-bid', data).then(response => {
      setStatusMessage(response.data.message)
    }).catch(error => {
      console.log(error);
    });
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h2>Enviar Valor</h2>
      <p>{statusMessage}</p>
      <div style={{marginBottom: 20}}>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder="Nome" />
        <input type='number' step='0.1' min='0' value={bidValue} onChange={e => setBidValue(parseFloat(e.target.value))} placeholder="Valor do lance" />
        <button onClick={() => postValue({ name: username, value: bidValue })} type='submit' disabled={!(username && bidValue)}>Enviar lance</button>
      </div>
      <button type="button" onClick={navigateToMinValue}>Ver Valor Mínimo</button>
    </div>
  );
}

export default SendValue;
