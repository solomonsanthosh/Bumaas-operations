import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  ToastAndroid,
  Linking,
  Picker,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../axios";
import { db } from "../firebase";
const image = {
  uri: "https://www.fonewalls.com/wp-content/uploads/2019/10/Gradient-Background-Wallpaper-013-300x585.jpg",
};
const orderDetails = ({ route }) => {
  const { orderid, status } = route.params;

  const orderRef = db.collection("orders").where("orderid", "==", orderid);
  const [projects, setProjects] = useState([]);
  const [serviceLevel, setServiceLevel] = useState();
  const [order, setOrder] = useState([]);
  const [parts, setParts] = useState([]);
  const [show, setShow] = useState(false);
  const [conditionCheck, setConditionCheck] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [json, setJson] = useState();
  const [salesOrderNo, setSalesOrderNo] = useState("");
  const [shippingDetails, setShippingDetails] = useState("");
  const [GRNDetails, setGRNDetails] = useState("");
  const [shippingQuantity, setShippingQuantity] = useState();
  const [action, setAction] = useState("Action yet to take");
  useEffect(async () => {
    // await getOrderDetails(project_name).then((res) => {
    //   console.log(res);
    //   setOrder(res.data);
    // })
    // if (projects.length>0) {
    //   console.log('hii dude');
    //   // setJson(JSON.parse(projects.BestPartNumber));
    //   console.log(projects, "jsons");
    // } else {
    // console.log(shippingDetails.length);

    // setDropdown("yellow");

    const data = await orderRef.get();
    const order = data.docs.map((doc) => doc.data());
    setOrder(order);
    if (order[0].SalesOrderNo) {
      setSalesOrderNo(order[0].SalesOrderNo);
      setDropdown("yellow");
      setAction("In progress");
    }
    if (order[0].ShippingDetails) {
      setShippingDetails(order[0].ShippingDetails);
      setDropdown("blue");
      setAction("Shipped");
    }
    if (order[0].GRNDetails) {
      setGRNDetails(order[0].GRNDetails);
      setDropdown("blue");
      setAction("Accepted");
    }

    if (order[0].ShippingQuantity) {
      var strng = order[0].ShippingQuantity.toLocaleString();
      setShippingQuantity(strng);
      // setShippingQuantity(order[0].ShippingQuantity.toLocaleString());
    }
    if (order[0].service_level) {
      setServiceLevel(order[0].service_level);
    }
  }, []);
  const statusCode = [
    {
      label: "Action yet to take",
      value: "yellow",
    },
    {
      label: "Progress",
      value: "yellow",
    },
    {
      label: "Shipped",
      value: "blue",
    },
    {
      label: "Accepted",
      value: "blue",
    },
    {
      label: "Rejected",
      value: "red",
    },
  ];
  // const checkStatus = (text) => {
  //   if(text == 'SalesOrder') {
  //     setAction('In progess')
  //   } else if (text == 'Shipped') {
  //     setAction('Shipped')
  //   } else if (text == 'GRN') {
  //     setAction('Accepted')
  //   } else {
  //     setAction('Action yet to take')
  //   }

  // }
  const checkship = (text) => {
    console.log(dropdown, "color");
    console.log(text, "sd");
    if (
      text.length == 0 &&
      GRNDetails.length == 0 &&
      salesOrderNo.length == 0
    ) {
      setDropdown("yellow");
      setAction("Action yet to take");
    } else if (GRNDetails.length != 0) {
      setDropdown("blue");
      setAction("Accepted");
    } else if (text.length == 0) {
      setDropdown("yellow");
      setAction('In progress')
    } else {
      setDropdown("blue");
      setAction("Shipped");
    }
  };
  const checkgrn = (text) => {
    if (
      text.length == 0 &&
      shippingDetails.length == 0 &&
      salesOrderNo.length == 0
    ) {
      setDropdown("yellow");
      setAction("Action yet to take");
    } else if (text.length == 0 && shippingDetails.length != 0) {
      setDropdown("blue");
      setAction("Shipped");
    } else if (text.length > 0) {
      setDropdown("blue");
      setAction("Accepted");
    } else {
      setDropdown("yellow");
      setAction('In progress')
    }
  };
  const checkSales = (text) => {
    if (
      text.length == 0 &&
      shippingDetails.length == 0 &&
      GRNDetails.length == 0
    ) {
      setDropdown("yellow");
      setAction("Action yet to take");
    } else if (text.length > 0) {
      setAction("In progress");
      setDropdown("yellow");
    }
  };
  const handleShow = async (name) => {
    // setShow(false)
    const inventoryRef = db
      .collection("inventory")
      .where("BestPartNumber", "==", name);
    const data = await inventoryRef.get();

    setParts(data.docs.map((doc) => ({ ...doc.data() })));

    setShow(true);
  };
  const handleSubmit = async () => {
    if(salesOrderNo.length == 0 && GRNDetails.length == 0 && shippingDetails.length == 0 && serviceLevel.length == 0) {
      ToastAndroid.show("Kindly fill all the details. Please try again", ToastAndroid.SHORT)
    } else {
    await db.collection("orders").doc(orderid).update({
      SalesOrderNo: salesOrderNo,
      service_level: serviceLevel,
      GRNDetails: GRNDetails,
      orderStatus: dropdown,
      actionCode: action,
      ShippingQuantity: shippingDetails,
    });
    ToastAndroid.show("Submitted successfully", ToastAndroid.SHORT)
  }
  };
  return (
    // <TouchableOpacity>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <ScrollView>
        {order &&
          order.map((order) => (
            <>
              <View style={styles.maincard}>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Order No
                  </Text>
                  <Text style={styles.miniCardText}>{order.orderid}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    BestPartNumber
                  </Text>
                  <Text style={styles.miniCardText}>
                    {order.BestPartNumber}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Description
                  </Text>
                  <Text style={styles.miniCardText}>{order.Description}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Type
                  </Text>

                  <Text style={styles.text_answer}>{order.Type}</Text>
                </View>

                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Product Group
                  </Text>
                  <Text style={styles.miniCardText}>{order.Productgrp}</Text>
                </View>

                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Weight per piece
                  </Text>
                  <Text style={styles.miniCardText}>
                    {order.Weightperpieceingrams}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Standard Box Quantity
                  </Text>
                  <Text style={styles.miniCardText}>
                    {order.StdBoxquantity}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Safety Stock
                  </Text>
                  <Text style={styles.miniCardText}>{order.SafetyStock}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    ROL
                  </Text>
                  <Text style={styles.miniCardText}>{order.ROL}</Text>
                </View>
                {/* <View style={styles.miniCard}> */}
                {/* {indexStatus != null &&  indexStatus != -1 && <Text style={[styles.miniCardText,{
                width: '40%'
              }]}>{status[indexStatus].label}</Text>} */}
                {/* <View style={{
                          height: 30,
                          width: 40,
                          borderRadius: 50,
                          backgroundColor: forecast[0].OrderStatus,
                        }}></View> */}
                {/* </View> */}
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Standard Lead Time
                  </Text>
                  <Text style={styles.miniCardText}>
                    {order.StandardLeadTime}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    HSN code
                  </Text>
                  <Text style={styles.miniCardText}>{order.HSN_code}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Local/Imported
                  </Text>
                  <Text style={styles.miniCardText}>
                    {order.LOCAL_imported}
                  </Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Drawing
                  </Text>
                  <TouchableOpacity
                                style={{width:'70%'}}
                              onPress={async () => {
                                await Linking.openURL(order.Drawing);
                                // this.shareFile(item.Drawing)
                              }}
                            >
                              <Text style={[styles.miniCardText,{
                                  color:'#00a8ff'
                              }]}>Download File</Text>
                            </TouchableOpacity>
                </View>

                <View
                  style={[
                    styles.miniCard,
                    {
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Sales Order No
                  </Text>
                  <TextInput
                    style={[
                      styles.miniCardText,
                      {
                        backgroundColor: "#f6f6f6",
                        marginVertical: 2,
                        height: 40,
                        width: "55%",
                        borderRadius: 10,
                        paddingLeft: 5,
                      },
                    ]}
                    editable={status == "Pending" ? true : false}
                    onChangeText={(text) => {
                      setSalesOrderNo(text);
                      // checkStatus('SalesOrder')
                      checkSales(text);
                    }}
                    value={salesOrderNo}
                  />
                </View>
                <View
                  style={[
                    styles.miniCard,
                    {
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Shipping Details
                  </Text>
                  <TextInput
                    style={[
                      styles.miniCardText,
                      {
                        backgroundColor: "#f6f6f6",
                        marginVertical: 2,
                        height: 40,
                        width: "55%",
                        borderRadius: 10,
                        paddingLeft: 5,
                      },
                    ]}
                    editable={status == "Pending" ? true : false}
                    onChangeText={(text) => {
                      setShippingDetails(text);
                      checkship(text);
                      // checkStatus('Shipped')
                    }}
                    value={shippingDetails}
                  />
                </View>
                <View
                  style={[
                    styles.miniCard,
                    {
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    GRN Details
                  </Text>
                  <TextInput
                    style={[
                      styles.miniCardText,
                      {
                        backgroundColor: "#f6f6f6",
                        marginVertical: 2,
                        height: 40,
                        width: "55%",
                        borderRadius: 10,
                        paddingLeft: 5,
                      },
                    ]}
                    editable={status == "Pending" ? true : false}
                    onChangeText={(text) => {
                      setGRNDetails(text);
                      checkgrn(text);
                      // checkStatus('GRN')
                    }}
                    value={GRNDetails}
                  />
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Service Level Accepted Days
                  </Text>
                  <TextInput
                    style={[
                      styles.miniCardText,
                      {
                        backgroundColor: "#f6f6f6",
                        marginVertical: 2,
                        height: 40,
                        width: "55%",
                        borderRadius: 10,
                        paddingLeft: 5,
                      },
                    ]}
                    editable={status == "Pending" ? true : false}
                    onChangeText={(text) => setServiceLevel(text)}
                    value={serviceLevel}
                  />
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Order status
                  </Text>
                  <View
                    style={{
                      height: 30,
                      width: 40,
                      borderRadius: 50,
                      backgroundColor: dropdown,
                    }}
                  ></View>
                </View>
                <View style={styles.miniCard}>
                  <Text style={[styles.miniCardText, styles.textquestion]}>
                    Action code
                  </Text>
                  <Text style={[styles.miniCardText]}>{action}</Text>

                  
                </View>
                {status == "Pending" && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={{ color: "white" }}>Submit</Text>
                  </TouchableOpacity>
                )}
                {/* <View style={styles.viewtable}>
            <Text style={styles.text_question}>Description </Text>
            <Text style={styles.text_answer}>
            {project.description}
            </Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Product Group</Text>
            <Text style={styles.text_answer}>a</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Weight /Pc</Text>
            <Text style={styles.text_answer}>a</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>
              Actual stock at project site
            </Text>
            <Text style={styles.text_answer}>456345</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Safety stock</Text>
            <Text style={styles.text_answer}>a</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Re Order Level</Text>
            <Text style={styles.text_answer}>a</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Shipping qty</Text>
            <Text style={styles.text_answer}>afgsdfgadf</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Status COLOR</Text>
            <Text style={styles.text_answer}>agfsdfgsghdfh</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>AFTER REFILLING</Text>
            <Text style={styles.text_answer}>356345</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>
              ON TIME PERFORMANCE IN PERCENTAGE 0% OR 100% THIS WILL BE ENTER BY
              CUSTOMER
            </Text>
            <Text style={styles.text_answer}>56345dfdfg</Text>
          </View> */}
              </View>
            </>
          ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default orderDetails;

const styles = StyleSheet.create({
  picker: {
    width: "50%",
    height: 30,
    // marginTop: 10,
  },
  button: {
    width: "50%",
    height: 50,
    color: "black",
    borderColor: "white",
    borderWidth: 3,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 30,
  },
  maincard: {
    width: "94%",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#ffffff93",
    padding: 10,
    borderRadius: 10,
    // borderColor: "black",
    // borderWidth: 1,
    marginTop: 30,
    marginBottom: 20,
    marginRight: "auto",
    marginLeft: "auto",
  },
  miniCard: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: "#609BEB",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    paddingVertical: 12,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
  miniCardText: {
    marginVertical: 5,
    marginLeft: 10,
    //  paddingRight: 1,
    width: "65%",
    fontSize: 14,
  },
  text: {
    // color: "#fff",
    fontSize: 16,

    // fontWeight: "bold",
  },
  textquestion: {
    // color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    color: "#609BEB",
    width: "35%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 30,
    alignContent: "center",
    justifyContent: "space-between",
    // height: 80,
  },
  viewtable: {
    // flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    margin: 10,
    borderRadius: 10,
    // width: "90%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 5,
  },
  text_question: {
    fontSize: 15,
    fontWeight: "bold",
    // width: "50%",
    padding: 5,
  },
  text_answer: {
    fontSize: 15,
    // width: "50%",
    padding: 5,
  },
});
