import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cotizacion = ({resultado}) => {
  if(Object.keys(resultado).length === 0) { return null };

  return (
    <Text>{resultado.PRICE}</Text>
  )
}

export default Cotizacion

const styles = StyleSheet.create({
  resultado: {

  },
  texto: {

  },
  precio: {

  },
  span: {

  },
})
