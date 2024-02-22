import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled.TouchableOpacity`
  width: 385px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  border-radius: 34px;
  background-color: ${props => props.backgroundColor || '#fff'};
`;

function Button({children, colorText, backgroundColor, margin, onHandlePress}) {
  return (
    <View
      style={
        margin && {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[3],
        }
      }>
      <StyledButton backgroundColor={backgroundColor} onPress={onHandlePress}>
        <Text
          style={{
            textAlign: 'center',
            color: colorText,
            fontSize: 22,
            fontWeight: 800,
          }}>
          {children}
        </Text>
      </StyledButton>
    </View>
  );
}

export default Button;
