import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import {Text, View} from '../components/Themed';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {BarCodeScanningResult} from "expo-camera/build/Camera.types";

export default function BarCodeScanScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState<string>(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState<boolean>(false);


    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (scanningResult: BarCodeScanningResult) => {
        const {type, data, cornerPoints} = scanningResult;
        console.log(cornerPoints);
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{flex: 1}}>
            <Camera style={{flex: 1}} type={type}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{fontSize: 18, margin: 5, color: 'white'}}> Flip </Text>
                    </TouchableOpacity>
                </View>
                {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
