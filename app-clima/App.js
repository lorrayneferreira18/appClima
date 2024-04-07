
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const App = () => {
  const temperaturaAtual = 10
  const localizacao = 'Sua Localização'
  const vento = '10 km/h'
  const umidade = '70%'
  const temperaturaMinima = '20°C'
  const temperaturaMaxima = '30°C'

  // Função para determinar o ícone com base na temperatura
  const renderizarIconeClima = () => {
    if (temperaturaAtual > 20) {
      return <Image source={require('../app-clima/assets/sol.png')} style={styles.iconeClima} />
    } else {
      return <Image source={require('../app-clima/assets/neve.png')} style={styles.iconeClima} />
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Previsão do Tempo</Text>
        {renderizarIconeClima()}
        <Text style={styles.temperatura}>{temperaturaAtual}°C</Text>
        <Text style={styles.localizacao}>{localizacao}</Text>
      </View>
      <View style={styles.informacoesClima}>
        <View style={styles.card}>
          <Text style={styles.infoTitulo}>Vento</Text>
          <Text style={styles.infoTexto}>{vento}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.infoTitulo}>Umidade do Ar</Text>
          <Text style={styles.infoTexto}>{umidade}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.infoTitulo}>Temp. Mínima</Text>
          <Text style={styles.infoTexto}>{temperaturaMinima}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.infoTitulo}>Temp. Máxima</Text>
          <Text style={styles.infoTexto}>{temperaturaMaxima}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  header: {
    alignItems: 'center',
    paddingTop: 50
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6a5acd'
  },
  temperatura: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6a5acd'
  },
  localizacao: {
    fontSize: 18,
    color: '#6a5acd'
  },
  informacoesClima: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6a5acd'
  },
  infoTexto: {
    fontSize: 14,
    color: '#6a5acd'
  },
  iconeClima: {
    width: 100,
    height: 100
  }
})

export default App
