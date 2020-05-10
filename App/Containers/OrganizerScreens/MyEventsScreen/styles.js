import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundGray};
`;

export const TabBar = styled.ScrollView`
  background-color: ${Colors.backgroundGray};
  max-height: 70px;
`

export const Tab = styled.TouchableOpacity`
  padding: 11px 0 4px;
  margin: 20px 0;
  height: 50px;
  width: 140px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.backgroundGray};
  border-bottom-width: 4px;
  border-bottom-color: ${props => props.isFocused ? `${Colors.primary}` : `${Colors.backgroundGray}`};
`

export const TabText = styled.Text`
  font-size: 20px;
  font-family: ${props => props.isFocused ? 'Nunito Bold' : 'Nunito Regular'};
  color: ${props => props.isFocused ? `${Colors.labelBlack}` : `${Colors.mediumGray}`};
`

export const CreateEventButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 99;
  bottom: 0;
  right: 0;
  margin-bottom: 20px;
  margin-right: 10px;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lightPink};
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
`