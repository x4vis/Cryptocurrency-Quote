import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';
import axios from 'axios';

const App = () => {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);

  useEffect(() => {
    const consulta = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR`;
      const respuesta = await axios.get(url);
      console.log('respuesta :>> ', respuesta);
    }
  }, [consultarAPI])

  return (
    <>
      <Header />

      <Image style={styles.imagen} 
             source={require('./assets/img/cryptomonedas.png')} />
      
      <View style={styles.contenido}>
        <Formulario moneda={moneda}
                    setMoneda={setMoneda}
                    cripto={cripto}
                    setCripto={setCripto}
                    setConsultarAPI={setConsultarAPI} />
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
