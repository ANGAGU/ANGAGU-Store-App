import React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import UnityView, { UnityModule } from '@asmadsen/react-native-unity-view';

// lib import
import styled from 'styled-components/native';
import { useEffect } from 'react/cjs/react.development';

const ARView = () => {
    useEffect(() => {
        UnityModule.pause();
        UnityModule.resume();
        UnityModule.addMessageListener( (message) => {
            if (message == "loading-end")
                UnityModule.postMessage("", "method", "")
        })
        
    })
    return (
        <Container>
            <UnityView
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
                onMessage={this.onMessage.bind(this)}
            /> 
        </Container>
    )
}
const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;
export default ARView;