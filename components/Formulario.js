import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({moneda, setMoneda, cripto, setCripto, setConsultarAPI}) => {

  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const result = await axios.get(url);
      setCriptomonedas(result.data.Data);
    }

    consultarAPI();
  }, []);

  const cotizarPrecio = () => {
    if (moneda === '' || cripto === '') {
      Alert.alert(
        'Error',
        'Ambos campos son obligatorios',
        [
          { text: 'OK' }
        ]
      )
      return;
    }

    setConsultarAPI(true);
  }

  return (
    <View>
      <Text style={styles.label}>Moneda: </Text>
      <Picker onValueChange={setMoneda}
              selectedValue={moneda}
              itemStyle={{ height: 120 }} >
        <Picker.Item label="- Seleccione -" value='' />
        <Picker.Item label="Dolar de Estados Unidos" value='USD' />
        <Picker.Item label="Peso Mexicano" value='MXN' />
        <Picker.Item label="Euro" value='EUR' />
        <Picker.Item label="Libra Esterlina" value='GBP' />
      </Picker>

      <Text style={styles.label}>Criptomoneda: </Text>
      <Picker onValueChange={setCripto}
              selectedValue={cripto}
              itemStyle={{ height: 120 }} >
        <Picker.Item label="- Seleccione -" value='' />
        {
          criptomonedas.map(({CoinInfo: cripto}) => (
            <Picker.Item key={cripto.Id}
                         label={cripto.FullName}
                         value={cripto.Name} />
          ))
        }
      </Picker>

      <TouchableHighlight style={styles.btnCotizar}
                          onPress={cotizarPrecio}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#FFF',
    fontFamily: 'Lato-Black',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  }
})

export default Formulario

