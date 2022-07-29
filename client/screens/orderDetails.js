import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Picker
} from "react-native";
import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../axios";
import { db } from "../firebase";
const image = {
  uri: "https://www.fonewalls.com/wp-content/uploads/2019/10/Gradient-Background-Wallpaper-013-300x585.jpg",
};
const orderDetails = ({ route }) => {
  const { orderid } = route.params;
  console.log(route.params.orderid, "lll");
  const orderRef = db.collection("orders").where("orderid", "==", orderid);
  const [projects, setProjects] = useState([]);
  const [order, setOrder] = useState([]);
  const [parts, setParts] = useState([]);
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState('white');
  const [json, setJson] = useState();
  const [salesOrderNo, setSalesOrderNo] = useState("-");
  const [shippingDetails, setShippingDetails] = useState('-');
  const [GRNDetails, setGRNDetails] = useState('-');
  const [shippingQuantity,setShippingQuantity] = useState()
  const [days,setDays] = useState()
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
      console.log(order, "orderid");
        const data = await orderRef.get();
        const order = data.docs.map((doc) => doc.data());
        setOrder(order);
        if(order[0].SalesOrderNo){
          console.log(order,'kk');
          setSalesOrderNo(order[0].SalesOrderNo);
        }
        if(order[0].ShippingDetails){

        setShippingDetails(order[0].ShippingDetails);
        }
        if(order[0].GRNDetails){
        setGRNDetails(order[0].GRNDetails);
        }
        if(order[0].ShippingQuantity){
          console.log(order[0].ShippingQuantity,'ioi');
          var strng = order[0].ShippingQuantity.toLocaleString()
          setShippingQuantity(strng)
          // setShippingQuantity(order[0].ShippingQuantity.toLocaleString());
          }
          if(order[0].AcceptedDays){
            setDays(order[0].AcceptedDays);
            }

          if(order[0].OrderStatus) {
            setDropdown(order[0].OrderStatus)
          }
        const projectRef = db
          .collection("projects")
          .where("Projectname", "==", order[0].Projectname);
        const project = await projectRef.get();
        setProjects(project.docs[0].data());
        console.log(project.docs[0].data(), "ssa");
        if(project) {
          setJson(JSON.parse(project.docs[0].data().BestPartNumber));
          
          console.log(JSON.parse(project.docs[0].data().BestPartNumber),'json');
        }
      
    }
  , []);
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
    await db.collection("orders").doc(orderid).update({
      SalesOrderNo : salesOrderNo,
      ShippingDetails : shippingDetails,
      GRNDetails : GRNDetails,
      OrderStatus:dropdown,
      ShippingQuantity:shippingQuantity,
      AcceptedDays:days
    });
  }
  return (
    // <TouchableOpacity>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <ScrollView>
      {
        projects && console.log(projects, "project")
      }
      {order &&
        projects &&
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
                  Project Name
                </Text>
                <Text style={styles.miniCardText}>{order.Projectname}</Text>
              </View>
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Customer part no
                </Text>
                <Text style={styles.miniCardText}>
                  {projects.CustomerPartNumber}
                </Text>
              </View>
              <View style={[styles.miniCard, { flexDirection: "column" }]}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  BEST Part no
                </Text>
                {json &&
                  json.length > 0 &&
                  json.map((element) => {
                    // handleShow(element)
                    console.log(json,'ss');
                    return (
                      <>
                        <View>
                          <Text style={{ fontSize: 13 }}>{element}</Text>
                          <TouchableOpacity onPress={() => handleShow(element)}>
                            <Text
                              style={{
                                padding: 5,
                                paddingLeft: 15,
                                borderColor: "green",
                                borderRadius: 50,
                                borderWidth: 2,
                                color: "green",
                                marginVertical: 10,
                                fontSize: 12,
                              }}
                            >
                              {`View Details of ${element}`}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    );
                  })}
                {parts.length>0 && (
                  <View
                    style={{
                      width: "100%",
                      borderColor: "green",
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <View style={styles.miniCard}>
                      <Text style={[styles.miniCardText, styles.textquestion]}>
                        Best Part No
                      </Text>
                      <Text style={styles.miniCardText}>
                        {parts[0].BestPartNumber}
                      </Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={[styles.miniCardText, styles.textquestion]}>
                        Description
                      </Text>
                      <Text style={styles.miniCardText}>
                        {parts[0].Description}
                      </Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={[styles.miniCardText, styles.textquestion]}>
                        Type
                      </Text>
                      <Text style={styles.miniCardText}>{parts[0].Type}</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={[styles.miniCardText, styles.textquestion]}>
                        Product group
                      </Text>
                      <Text style={styles.miniCardText}>
                        {parts[0].Productgrp}
                      </Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={[styles.miniCardText, styles.textquestion]}>
                        Weight
                      </Text>
                      <Text style={styles.miniCardText}>
                        {parts[0].Weightperpieceingrams}
                      </Text>
                    </View>
                  </View>
                )}
                {/* <Text style={styles.text_answer}>{project.}</Text> */}
              </View>
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Actual stock at project site
                </Text>
                <Text style={styles.miniCardText}>-</Text>
              </View>
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Safety Stock
                </Text>
                <Text style={styles.miniCardText}>{projects.Safetystock}</Text>
              </View>
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  ROL
                </Text>
                <Text style={styles.miniCardText}>{projects.ROLFactor}</Text>
              </View>
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Shipping Quantity
                </Text>
                <TextInput
                  style={[styles.miniCardText,{
                    backgroundColor: '#f6f6f6',
                    marginVertical:2,
                    height: 40,
                    width: "55%",
                    borderRadius: 10,
                    paddingLeft:5

                  }]}
                  onChangeText={(text) => setShippingQuantity(text)}
                  value={shippingQuantity}
                />
              </View>
              
              <View style={[styles.miniCard,{
                paddingVertical:5
              }]}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                Sales Order No

                </Text>
                <TextInput
                  style={[styles.miniCardText,{
                    backgroundColor: '#f6f6f6',
                    marginVertical:2,
                    height: 40,
                    width: "55%",
                    borderRadius: 10,
                    paddingLeft:5

                  }]}
                  onChangeText={(text) => setSalesOrderNo(text)}
                  value={salesOrderNo}
                />
                
              </View>
              <View style={[styles.miniCard,{
                paddingVertical:5
              }]}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                Shipping Details
                </Text>
                <TextInput
                  style={[styles.miniCardText,{
                    backgroundColor: '#f6f6f6',
                    marginVertical:2,
                    height: 40,
                    width: "55%",
                    borderRadius: 10,
                    paddingLeft:5

                  }]}
                  onChangeText={(text) => setShippingDetails(text)}
                  value={shippingDetails}
                />
                
              </View>
              <View style={[styles.miniCard,{
                paddingVertical:5
              }]}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                GRN Details

                </Text>
                <TextInput
                  style={[styles.miniCardText,{
                    backgroundColor: '#f6f6f6',
                    marginVertical:2,
                    height: 40,
                    width: "55%",
                    borderRadius: 10,
                    paddingLeft:5

                  }]}
                  onChangeText={(text) => setGRNDetails(text)}
                  value={GRNDetails}
                />
                
              </View>
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  Service Level Accepted Days
                </Text>
                <TextInput
                  style={[styles.miniCardText,{
                    backgroundColor: '#f6f6f6',
                    marginVertical:2,
                    height: 40,
                    width: "55%",
                    borderRadius: 10,
                    paddingLeft:5

                  }]}
                  onChangeText={(text) => setDays(text)}
                  value={days}
                />
              </View>
              <View style={styles.miniCard}>
                <Text style={[styles.miniCardText, styles.textquestion]}>
                  ORDER STATUS
                </Text>
                
                <Picker
                          style={styles.picker}
                          selectedValue={dropdown}
                          onValueChange={(itemValue, itemIndex) => {
                            setDropdown(itemValue);
                           
                          }}
                        > 
                        <Picker.Item
                            style={styles.picker_item}
                            label="Action yet to take"
                            value="white"
                          />
                          <Picker.Item
                            style={styles.picker_item}
                            label="Progress"
                            value="yellow"
                          />
                          <Picker.Item
                            style={styles.picker_item}
                            label="Completed"
                            value="blue"
                          />
                          <Picker.Item
                            style={styles.picker_item}
                            label="Rejected"
                            value="red"
                          />
                        </Picker>
                        <View style={{
                          height: 30,
                          width: 40,
                          borderRadius: 50,
                          backgroundColor: dropdown,
                        }}></View>
              </View>
              <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          handleSubmit();
                          
                        }}
                      >
                        <Text style={{ color: "white" }}>Submit</Text>
                      </TouchableOpacity>
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
