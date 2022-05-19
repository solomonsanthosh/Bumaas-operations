import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShowOrder from "./screens/showOrder";
import OrderDetails from "./screens/orderDetails";
import Tabs from "./screens/tabs";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const NavigationSignUp = () => {
  return (
    <>
      <NavigationContainer
        initialRouteName="TabScreen"
        screenOptions={screenOptions}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="TabScreen"
            component={Tabs}
            options={screenOptions}
          />
         <Stack.Screen
            name="showOrder"
            component={ShowOrder}
            options={screenOptions}
          />
          <Stack.Screen
            name= "orderDetails"
            component={OrderDetails}
            options={screenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationSignUp;

const styles = StyleSheet.create({});
