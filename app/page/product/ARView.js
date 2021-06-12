import React, {useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions, NativeSyntheticEvent } from 'react-native';
import UnityView, { MessageHandler, UnityModule} from '@asmadsen/react-native-unity-view';
import ButtonWithText from '../../component/atom/ButtonWithText'
// lib import
import styled from 'styled-components/native';

const ARView = ({navigation, route}) => {
    useEffect(() => {
        // UnityModule.createUnity();
        UnityModule.pause();
        UnityModule.resume();
        // UnityModule.postMessageToUnityManager("quit");
        setTimeout( () => {
            UnityModule.postMessageToUnityManager(route.params.modelUrl + " " + route.params.modelName);
        }, 1000);
        
        
        return () => {
            console.log("quit");
            UnityModule.postMessageToUnityManager("quit");
        }
        // // UnityModule.postMessageToUnityManager(route.params.productId);
        // UnityModule.postMessage('Canvas/Header/Text', 'onMessage', "" + route.params.productId);
    },[])
    const onMessage = (event) => {
        console.log("hi")
        console.log(event);
        // alert(`Message Receive\n${event.nativeEvent.message}`)
        
    }
    return (
        <Container>
            <UnityWrapper>
                <UnityView
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    onUnityMessage={onMessage}
                    onMessage={onMessage}
                /> 
            </UnityWrapper>
            {/* <ButtonWithText onPress={async () => {
                console.log(await UnityModule.isReady());
                // UnityModule.postMessage('Cube', 'onMessage', 'test');
                UnityModule.postMessageToUnityManager(route.params.modelUrl + " " + route.params.modelName);
                // UnityModule.postMessageToUnityManager({
                //     name: 'onMessage',
                //     data: '',
                //     callBack: (data) => {
                //         console.log(data);
                //         Alert.alert('Tip', JSON.stringify(data))
                //     }
                // });
            }}>Send</ButtonWithText> */}
        </Container>
    )
}
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;
const UnityWrapper= styled.View`
    flex:1;
`
export default ARView;