import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2632',
    padding: 20,
  },
  title: {
    fontSize: 28, // Aumentado de 22 a 28
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15, // Aumentado de 10 a 15
  },
  subtitle: {
    fontSize: 16, // Aumentado de 14 a 16
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 25, // Aumentado de 20 a 25
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 20, // Aumentado de 15 a 20
    borderRadius: 10,
    marginBottom: 20, // Aumentado de 15 a 20
    fontSize: 16, // Añadido para aumentar el tamaño del texto dentro del input
  },
  button: {
    backgroundColor: '#FF9AA2',
    paddingVertical: 15, // Aumentado de 12 a 15
    paddingHorizontal: 25, // Aumentado de 20 a 25
    borderRadius: 10,
    marginBottom: 20, // Aumentado de 15 a 20
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, // Aumentado de 16 a 18
  },
  link: {
    color: '#FF9AA2',
    marginTop: 15, // Aumentado de 10 a 15
    fontSize: 16, // Añadido para aumentar el tamaño del texto
  },
  help: {
    color: '#ccc',
    marginTop: 25, // Aumentado de 20 a 25
    fontSize: 16, // Añadido para aumentar el tamaño del texto
  },
  logoImage: {
    width: 220, // Aumentado de 200 a 220
    height: 220, // Aumentado de 200 a 220
    borderRadius: 110, // Aumentado de 100 a 110
    alignSelf: 'center',
    marginTop: 20, // Aumentado de 10 a 20
    marginBottom: 30, // Aumentado de 20 a 30
  },
});