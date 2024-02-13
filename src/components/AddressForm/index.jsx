import { useState } from 'react';
import axios from 'axios';

const AddressForm = () => {
  const [address, setAddress] = useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  const cepMask = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substr(0, 9); // Limita o tamanho máximo do valor em 9 caracteres
  };

  const handleCepChange = (e) => {
    const maskedCep = cepMask(e.target.value);
    setAddress((prevAddress) => ({ ...prevAddress, cep: maskedCep }));

    if (maskedCep.length === 9) {
      fetchAddress(maskedCep);
    }
  };

  const fetchAddress = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { data } = response;
  
        setAddress({
            // cep: data.cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
        });
    } catch (error) {
      console.log('Erro ao buscar o endereço:', error);
    }
  };

  return (
    <>
      <input 
        type="text" 
        value={address.cep} 
        onChange={handleCepChange} 
        placeholder="CEP"
        className="form-control" />

      {/* <p>Logradouro: {address.logradouro}</p>
      <p>Complemento: {address.complemento}</p>
      <p>Bairro: {address.bairro}</p>
      <p>Localidade: {address.localidade}</p>
      <p>UF: {address.uf}</p> */}
    </>
  );
};

export default AddressForm;
