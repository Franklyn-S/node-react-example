import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function MinValue() {
  const [minBid, setMinBid] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const navigateToSendBid = () => {
    history.push("/enviar-lance");
  }
  const getMinValue = async () => {
    setLoading(true);
    const response = await axios.get('/api/min-bid');
    setLoading(false);
    if (response.status !== 200) throw Error(response.statusText);
      return response.data;
  }
  let minValue = <p>Carregando...</p>;
  useEffect(() => {
    async function fetchMinValue() {
      const response = await getMinValue();        
      setMinBid(response);
    }
    fetchMinValue();
  }, [setMinBid])
  if (!loading) {
    if (minBid?.value) {
      minValue = <p>O valor mínimo é {minBid.value}</p>
    } else {
      minValue = <p>Valor mínimo não disponível.</p>
    }
  }
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h2>Valor Mínimo</h2>
      {minValue}
      <button type="button" onClick={navigateToSendBid}>Voltar para enviar lance</button>
    </div>
  );
}

export default MinValue;
