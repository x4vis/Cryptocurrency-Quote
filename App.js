import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = () => {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (consultarAPI) {
      const consulta = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
        const result = await axios.get(url);
        setCargando(true);
        
        //Ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          setResultado(result.data.DISPLAY[cripto][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 2000);
      }
      consulta();
    }

  }, [consultarAPI])

  const componente = cargando ? <ActivityIndicator size='large' color='#5E49E2'/> : <Cotizacion resultado={resultado}/>;

  return (
    <ScrollView>
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

      <View style={{ marginTop: 40 }}>
        { componente }
      </View>
    </ScrollView>
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
