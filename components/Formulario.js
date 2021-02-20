import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = () => {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [criptomonedas, setCriptomonedas] = useState('');

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${moneda}`;
      const result = await axios.get(url);
      setCriptomonedas(result.data.Data);
    }

    consultarAPI();
  }, [moneda]);

  return (
    <View>
      <Text style={styles.label}>Moneda: </Text>
      <Picker onValueChange={setMoneda}
              selectedValue={moneda}>
        <Picker.Item label="- Seleccione -" value='' />
        <Picker.Item label="Dolar de Estados Unidos" value='USD' />
        <Picker.Item label="Peso Mexicano" value='MXN' />
        <Picker.Item label="Euro" value='EUR' />
        <Picker.Item label="Libra Esterlina" value='GBP' />
      </Picker>

      <Text style={styles.label}>Criptomoneda: </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  }
})

export default Formulario

