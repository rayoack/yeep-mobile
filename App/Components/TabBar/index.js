import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import {
  Container,
  TabButton,
  TabNavText
} from './styles'

const styles = StyleSheet.create({
  container: { flexDirection: "row", height: 52, elevation: 2 },
  tabButton: { flex: 1, justifyContent: "center", alignItems: "center" }
});

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <Container>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;

        const tintColor = isRouteActive ? activeColor : inactiveTintColor;

        return (
          <TabButton
            key={routeIndex}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            routeActive={isRouteActive}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor })}

            {isRouteActive ? (
              <TabNavText
                routeActive={isRouteActive}
              >
                {getLabelText({ route })}
              </TabNavText>
            ) : null}
            </TabButton>
        );
      })}
    </Container>
  );
};

export default TabBar;