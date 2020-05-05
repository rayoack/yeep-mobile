import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { ButtonContainer, ButtonText } from './styles';

const ButtonWithBackground = ({
  onPress,
  text,
  backgroundColor,
  textColor,
  disabled,
  loading,
  loadingSize,
  loadingColor,
}) => {
  return (
    <ButtonContainer
      onPress={() => onPress()}
      backgroundColor={backgroundColor}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {!loading ?(
        <ButtonText textColor={textColor}>{text}</ButtonText>
      )
      : (
        <ActivityIndicator size={loadingSize} color={loadingColor} />
      )}
    </ButtonContainer>
  );
}

ButtonWithBackground.defaultProps = {
  onPress: () => {},
  text: '',
  backgroundColor: '#8965A3',
  textColor: '#fff',
  disabled: false,
  loading: false,
  loadingSize: 'large',
  loadingColor: '#fff',
}

export default ButtonWithBackground;