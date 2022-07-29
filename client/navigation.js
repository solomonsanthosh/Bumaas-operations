import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShowOrder from "./screens/showOrder";
import OrderDetails from "./screens/orderDetails";
import Tabs from "./screens/tabs";
import LoginScreen from "./LoginScreen";
import orderPending from "./screens/orderPending";
import ordersCompleted from "./screens/ordersCompleted";
import ordersCancelled from "./screens/ordersCancelled";
import tabs from "./screens/tabs";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const ordersPendingStack = () => {
  return (
    <Stack.Navigator initialRouteName="viewPending" screenOptions={screenOptions}>
      <Stack.Screen name="viewPending" component={orderPending}></Stack.Screen>
      <Stack.Screen name="orderDetails" component={OrderDetails}></Stack.Screen>
    </Stack.Navigator>
  );
};
const ordersCompletedStack = () => {
  return (
    <Stack.Navigator initialRouteName="viewCompleted"  screenOptions={screenOptions}>
      <Stack.Screen name="viewCompleted" component={ordersCompleted}></Stack.Screen>
      <Stack.Screen name="orderDetails" component={OrderDetails}></Stack.Screen>
    </Stack.Navigator>
  );
};
const ordersCancelledStack = () => {
  return (
    <Stack.Navigator initialRouteName="viewCancelled" screenOptions={screenOptions}>
      <Stack.Screen name="viewCancelled" component={ordersCancelled}></Stack.Screen>
      <Stack.Screen name="orderDetails" component={OrderDetails}></Stack.Screen>
    </Stack.Navigator>
  );
};
const Drawerr = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: '#F2F2F2'},
        headerStyle: {
          backgroundColor: '#F2F2F2'
       } 
    }}>
      <Drawer.Screen name="Orders Pending" component={ordersPendingStack} />
      <Drawer.Screen name="Orders Completed" component={ordersCompletedStack} />
      <Drawer.Screen name="Orders Cancelled" component={ordersCancelledStack} />
      <Drawer.Screen name="Exporting Bom" component={tabs} />
      {/* <Drawer.Screen name="Operation Credentials" component={Operation} /> */}
    </Drawer.Navigator>
  );
};
const NavigationSignUp = () => {
  return (
    <>
      <NavigationContainer
        // initialRouteName="TabScreen"
        screenOptions={screenOptions}
      >
        <Stack.Navigator>
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={screenOptions}
          />
          {/* <Stack.Screen
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
          /> */}
          <Stack.Screen
            name= "Drawer"
            component={Drawerr}
            options={screenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationSignUp;

const styles = StyleSheet.create({});
