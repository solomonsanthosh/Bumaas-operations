import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  RefreshControl
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCoffee,
  faTrash,
  faXmark,
  faRotateLeft,
  faEye,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getOrders } from "../axios";
import { db } from "../firebase";
const image = {
  uri: "https://www.fonewalls.com/wp-content/uploads/2019/10/Gradient-Background-Wallpaper-013-300x585.jpg",
};
const ordersCancelled = ({ route }) => {
  const orderRef = db.collection("orders").where("Status", "==", "Cancelled");
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [searchProject, setSearchProject] = useState([]);
  useEffect(async () => {
    // await getOrders(route.params.status).then((res) => {
    // 	setOrders(res.data);
    // }
    // );
    const data = await orderRef.get();
    const orders = data.docs.map((doc) => doc.data());
    setOrders(orders);
  }, [reload]);
  // const handleSearch = (text) => {
  // 	setSearch(text);
  // 	projects &&
  // 		setSearchProject(
  // 			projects.filter((project) => project.project_name.includes(text))
  // 		);
  // };

  const handleUndo = async (orderid) => {
    await db.collection("orders").doc(orderid).update({
      Status: "Pending",
    });
    setReload(!reload);
  };
  
  const [refreshing, setRefreshing] = useState(false);
	const onRefresh = async ()=> {
		setRefreshing(true);
		const data = await orderRef.get();
		const orders = data.docs.map((doc) => doc.data());
		setOrders(orders);
		setRefreshing(false);
	  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.container}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {orders.map((order) => (
          <>
            <View style={styles.maincard}>
              <View style={styles.miniCard}>
                <Text style={[styles.textquestion, styles.miniCardText]}>
                  Project name:
                </Text>
                <Text style={[styles.textquestion,{
                    color: '#4B7BE5'
                  }]}>{order.Projectname}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleUndo(order.orderid)}
                  style={{
                    // backgroundColor:'#1b5cb7',
                    width: Dimensions.get("window").width / 3 - 30,
                    // backgroundColor: "#ffffff",
                    // margin: 5,
                    padding: 7,
					marginBottom: 10,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#ffaa00",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("orderDetails", {
                      orderid: order.orderid,
                    })
                  }
                  style={{
                    width: Dimensions.get("window").width / 3 - 30,
                    // backgroundColor: "#ffffff",
                    marginBottom: 10,
                    padding: 7,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#ffaa00",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  textquestion: {
    // color: "#fff",
    fontSize: 14,
    marginLeft: 10,
    marginVertical: 5,
    // fontWeight: "bold",
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight,
    zIndex: 1,
    // paddingTop:50
  },
  maincard: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#ffffffca",
    // padding: 5,
    borderRadius: 10,
    borderColor: "#ffaa00",
    borderWidth: 0,
    marginBottom: 15,
  },
  miniCard: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    
    // borderWidth: 1,
    // borderColor: "#609BEB",
    marginLeft: "auto",
    marginRight: "auto",
    elevation: 2,
    padding: 10,
    paddingVertical: 5,
    // alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  // container: {
  // 	flex: 1,
  // 	backgroundColor: '#fff',
  // 	marginTop: StatusBar.currentHeight + 50,
  // 	zIndex: 1
  // 	// paddingVertical: 20,
  // },
  container2: {
    justifyContent: "center",
    alignItems: "center",

    height: 100,
    borderColor: "#609BEB",
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  search: {
    width: "95%",

    alignSelf: "center",
    borderRadius: 50,
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    backgroundColor: "black",
    zIndex: 5,
  },
});
export default ordersCancelled;
