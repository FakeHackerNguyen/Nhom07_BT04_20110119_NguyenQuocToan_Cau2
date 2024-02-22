import React from 'react';
import {Switch, Text} from 'react-native';
import styled from 'styled-components/native';

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 20px;
`;

const SliderSwitch = ({toggleSwitch, isEnabled, content}) => {
  return (
    <SwitchContainer>
      <Switch
        trackColor={{false: '#767577', true: 'green'}}
        thumbColor="#f4f3f4"
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text
        style={{
          marginRight: 10,
          marginLeft: 10,
          fontSize: 16,
          fontWeight: 600,
          color: '#666',
        }}>
        {content}
      </Text>
    </SwitchContainer>
  );
};

export default SliderSwitch;
