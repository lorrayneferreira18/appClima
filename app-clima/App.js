
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import * as Location from 'expo-location'
import getCurrentWeather from '../app-clima/api/index'

const App = () => {
  const axios = require('axios')
  const [currentTemperature, setCurrentTemperature] = useState('31')

  const [locationCoords, setLocationCoords] = useState(null)

  const [locationName, setLocationName] = useState('Brasil, Ribeirão das Neves')

  const [temperatureMin, setTemperatureMin] = useState('21')
  const [temperatureMax, setTemperatureMax] = useState('32')
  const [wind, setWind] = useState('7')
  const [humidity, setHumidity] = useState('68')

  // Função para determinar o ícone com base na temperatura
  const renderizarIconeClima = () => {
    if (currentTemperature > 20) {
      return <Image source={require('../app-clima/assets/sol.png')} style={styles.iconeClima} />
    } else {
      return <Image source={require('../app-clima/assets/neve.png')} style={styles.iconeClima} />
    }
  }
  const WeatherInfoCard = ({ title, value }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    )
  }
  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
    } else {
      const location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
    }
  }

  async function setCurrentWeather() {
    await getLocation()
    const data = await getCurrentWeather(locationCoords)

    // Vem da api nessa ordem [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]

    setCurrentTemperature(convertKelvinToC(data[0]))
    setTemperatureMin(convertKelvinToC(data[1]))
    setTemperatureMax(convertKelvinToC(data[2]))
    setLocationName(data[3])
    setWind(data[4])
    setHumidity(data[5])
  }
  function convertKelvinToC(kelvin) {
    return parseInt(kelvin - 273)
  }
  useEffect(() => {
    setCurrentWeather()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Previsão do Tempo</Text>
        {renderizarIconeClima()}
        <Text style={styles.temperatura}>{currentTemperature}°C</Text>
        <Text style={styles.localizacao}>{locationName}</Text>
      </View>
      <View style={styles.containerCars}>
        <WeatherInfoCard title='Vento' value={wind} />
        <WeatherInfoCard title='Umidade' value={humidity} />
        <WeatherInfoCard title='Mínima' value={temperatureMin} />
        <WeatherInfoCard title='Máxima' value={temperatureMax} />
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
  },
  containerCars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: '#6a5acd'
  },
  value: {
    fontSize: 12
  }
})

export default App
