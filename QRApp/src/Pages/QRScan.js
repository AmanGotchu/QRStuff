 import React, { Component } from 'react';

 import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
 } from 'react-native';
 import { Overlay } from 'react-native-elements';

import QRCodeScanner from 'react-native-qrcode-scanner';

type Props = {};
class QRScan extends Component<Props> {

  state = { Text: 'Sample', Counter: 0, confirm: false }

  onSuccess(e) {
    const jsonObj = JSON.parse(e.data);
    this.setState({ Text: jsonObj.email, Counter: this.state.Counter + 1, confirm: true }, () => {
    });
  }

  render() {
    const topText = this.state.Text;
    const counter = this.state.Counter;
    return (
      <View>
        <QRCodeScanner
          ref={(node) => { this.scanner = node; }}
          onRead={this.onSuccess.bind(this)}
          reactivate
          reactivateTimeout={3000}
          topContent={
            <Text style={styles.centerText}>
              Link: {topText}{'\n'}
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>QR Count: {counter}</Text>
            </TouchableOpacity>
          }
          cameraType={'back'}
        />

        <Overlay
          isVisible={this.state.confirm}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          onBackdropPress={() => this.setState({ confirm: false })}
        >
          <Text>
            {this.state.Text}
          </Text>
        </Overlay>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRScan;
