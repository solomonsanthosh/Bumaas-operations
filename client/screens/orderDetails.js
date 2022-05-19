import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { getOrderDetails } from "../axios";

const orderDetails = ({ route }) => {
  const { project_name } = route.params;
  const [order, setOrder] = useState([]);
  useEffect(async() => {
    await getOrderDetails(project_name).then((res) => {
      console.log(res);
      setOrder(res.data);
    })
  }, []);
  return (
    // <TouchableOpacity>

        <>
        {
          order.map((order) => (
            <>
            <View style={styles.viewtable}>
            <Text style={styles.text_question}>Order No</Text>
            <Text style={styles.text_answer}>2345sdfgsdf</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Project Name </Text>
            <Text style={styles.text_answer}>a</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>Customer part no</Text>
            <Text style={styles.text_answer}>a</Text>
          </View>
          <View style={styles.viewtable}>
            <Text style={styles.text_question}>BEST Part no </Text>
            <Text style={styles.text_answer}>a</Text>
          </View>
          <View style={styles.viewtable}>
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
          </View>
          </>
          ))
        }
          
      </>
     
    // </TouchableOpacity>
  );
};

export default orderDetails;

const styles = StyleSheet.create({
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
    padding: 5
  },
});
