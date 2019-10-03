import { 
  StyleSheet, 
  Platform,
  StatusBar 
} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  textEmail: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  textEmailBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 10,
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollBottom: {
    marginBottom: 20,
  }
});

export default Styles;