import React, {useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import UnityView, { UnityModule } from '@asmadsen/react-native-unity-view';
import ButtonWithText from '../../component/atom/ButtonWithText'
// lib import
import styled from 'styled-components/native';

const ARView = ({navigation, route}) => {
    useEffect(() => {
        UnityModule.pause();
        UnityModule.resume();
        UnityModule.postMessageToUnityManager(route.params.productId);
    })
    return (
        <Container>
            <UnityView
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 20 }}
            /> 
            <ButtonWithText onPress={() => UnityModule.postMessageToUnityManager(route.params.productId)}>Send</ButtonWithText>
        </Container>
    )
}
const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;
export default ARView;