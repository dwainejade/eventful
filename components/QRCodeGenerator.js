import React, { useEffect, useState } from 'react';
import * as Crypto from 'expo-crypto';
import QRCode from 'react-native-qrcode-svg'
import { ActivityIndicator } from 'react-native'


export default function QRCodeGenerator({ ticketInfo }) {
  const [code, setCode] = useState(null)

  useEffect(() => {
    (async () => {
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        ticketInfo
      );
      setCode(digest)
    })();
  }, []);

  return (
    <>
      {code ?
        <QRCode
          value={code}
          size={100}
          color="#000"
          backgroundColor="#fff"
        />
        :
        <ActivityIndicator />
      }
    </>
  );
}