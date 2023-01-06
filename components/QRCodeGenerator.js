import React from 'react';
import QRCode from 'react-native-qrcode-svg'
import { View } from 'react-native'


export default function QRCodeGenerator({ ticketInfo, size }) {

  return (
    <QRCode
      value={ticketInfo}
      size={size}
      color="#000"
      backgroundColor="#fff"
    />
  );
}