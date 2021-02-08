import React from 'react';
import { Text,
   TouchableOpacity,
   Image,
   StyleSheet,} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Header} from 'react-native-elements'
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        buttonState: 'normal',
        scannedData:''
      }
    }

    getCameraPermissions = async () =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: 'clicked',
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state

        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });  
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <SafeAreaProvider  style={styles.container}>
            <Header centerComponent={{text:'Bar code scanner',style:{fontSize:20,color:'white',fontWeight:'bold'}}} backgroundColor="#7CB3C2"/>
          
            <Image
              source={require('../assets/barcodeScanner.jpg')}
              style={{width:200,height:200,marginBottom:50,marginTop:300,alignSelf:'center'}}
            />
            
            <TouchableOpacity
              style={styles.scanButton}
              onPress={()=>this.getCameraPermissions()}>
              <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>

            <Text style={{fontSize:40,color:'#2E204E',fontWeight:'600',textAlign:'center',marginTop:20}}>{this.state.scannedData}</Text>
          </SafeAreaProvider>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10,
      color:'white'
    },
    scanButton:{
      backgroundColor: '#9A7BC1',
      width: 200,
      borderWidth: 1.5,
      borderLeftWidth: 0,
      paddingBottom:10,
      alignSelf:'center'
    },
  });