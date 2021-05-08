import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ROUTES } from "../../routes/config-routes";
import { RNCamera } from 'react-native-camera';
import parse from 'url-parse';
import { useDispatch } from "react-redux";
import { otpActionsCreator } from "../../store/actions/otp.action";

const QrScan = ({navigation}) => {
    const [focus, setFocus] = useState(true);
    const dispatch = useDispatch()
    const gotoScan = () => {
        navigation.navigate(ROUTES.QR_SCAN);
    };
    const barCodeRead = ({ data }) => {  
      if(!focus) return;
      const { protocol, host, pathname, query } = parse(data, true);
      console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------------------------------------------------`);
      console.log(`🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 14 ~ barCodeRead ~  protocol, host, pathname, query `,  protocol, host, pathname, query );
      console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------------------------------------------------`);
      const { secret } = query;
      console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------`);
      console.log(`🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 18 ~ barCodeRead ~ secret`, secret);
      console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------`);
      setFocus(false)
      if (protocol === 'otpauth:' && host === 'totp' && secret) {
        const name = pathname.replace(/^\//, '');
        navigation.goBack();
        dispatch(otpActionsCreator.createOtp({ name, secret }))
      } 
    };
    
    return <View style={styles.container}>
    <RNCamera
      style={styles.camera}
      onBarCodeRead={barCodeRead}
      captureAudio={false}
      autoFocus={focus ? RNCamera.Constants.AutoFocus.on : RNCamera.Constants.AutoFocus.off}
    >
      <View style={styles.rectWrap}>
        <View style={styles.rect}>
          <View style={[styles.corner, styles.lt]} />
          <View style={[styles.corner, styles.rt]} />
          <View style={[styles.corner, styles.lb]} />
          <View style={[styles.corner, styles.rb]} />
        </View>
      </View>
    </RNCamera>
  </View>
};

export default QrScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rectWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rect: {
    height: 250,
    width: 250,
    borderWidth: 0.5,
    borderColor: '#2db7f5',
    backgroundColor: 'transparent'
  },
  corner: {
    width: 20,
    height: 20,
    position: 'absolute',
    borderColor: '#2db7f5',
    backgroundColor: 'transparent'
  },
  lt: {
    left: 0,
    top: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3
  },
  rt: {
    right: 0,
    top: 0,
    borderRightWidth: 3,
    borderTopWidth: 3
  },
  lb: {
    left: 0,
    bottom: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3
  },
  rb: {
    right: 0,
    bottom: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3
  }
});
