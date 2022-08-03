import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
import React, { useEffect, useState } from "react";

import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
const image = {
  uri: "https://www.fonewalls.com/wp-content/uploads/2019/10/Gradient-Background-Wallpaper-013-300x585.jpg",
};
import { db } from "../firebase";
const tabs = ({ navigation }) => {
	const [active, setActive] = useState(false);
  var customername = [];
  var project = [];
  
  var excel = [];

  useEffect(async () => {
   
	if(customerWise.length>0){
      console.log(customerWise,'customerData');
      
	} else {
		const customerRef = db.collection("Forecast");
		const data1 = await customerRef.get();
		setCustomerWise(data1.docs.map((doc) => doc.data()));
		setActive(true);
		
	}
    
  }, [customerWise,active]);
  const [customerName, setCustomerName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [customerWise, setCustomerWise] = useState([]);
  const [partWise, setPartWise] = useState([]);

  const handleExcel1 = async () => {
	await Promise.all(customerWise.map(async (item) => {
        const nameRef = await db
          .collection("customers")
          .where("id", "==", item.customerid);

        const projectRef = await db
          .collection("projects")
          .where("Projectname", "==", item.Projectname);
        const data2 = await nameRef.get();
        const data3 = await projectRef.get();

		console.log( data2.docs[0].data().CustomerName,'cusname');
		console.log( data3.docs[0].data().BestPartNumber,'part');

        var inv = JSON.parse(data3.docs[0].data().BestPartNumber);
		// console.log(inv,'a');
        var invgrp = [];
        await Promise.all(inv.map(async (element) => {
          const invRef = await db
            .collection("inventory")
            .where("BestPartNumber", "==", element);
          const data4 = await invRef.get();
		  var invobj = {
			BestPartNumber: data4.docs[0].data().BestPartNumber,
            Description: data4.docs[0].data().Description,
            Productgrp: data4.docs[0].data().Productgrp,
            Weight: data4.docs[0].data().Weightperpieceingrams,
            StandardBoxQty: data4.docs[0].data().StdBoxquantity,
            normsperproject: data4.docs[0].data().normsperproject,
		  }
		  console.log(invobj,'invobj');
          invgrp.push(invobj);
		  console.log(invgrp,'invobj2rr');
        }))
		console.log(invgrp,'invgrp');
        // console.log(project, customername);
        excel.push({
          CustomerName: data2.docs[0].data().CustomerName,
          Forcastno: `${item.Forecastid}/${item.TimeStamp}`,
          Projectname: data3.docs[0].data().Projectname,
          CustomerPartNo: data3.docs[0].data().CustomerPartNumber,
          BestPartNo: data3.docs[0].data().BestPartNumber,
          BestPartNoDetails: JSON.stringify(invgrp),
          
          ForecastedQtyForThisMonth: item.Qtm[0],
          ActualProduction: item.actual_production,
          ForecastVariation:
            1 - (item.Qtm[0] - item.actual_production) / item.Qtm[0],
          DemandTriiggereddatetime: "-",
          RefillingDateTime: "-",
          Servicelevelaccepteddays: 10,
          OnTimeDelivery: "-",
        });
		
      }))
	  console.log(excel,'excel');
    setModalVisible(!modalVisible);
    var ws = XLSX.utils.json_to_sheet(excel);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CustomerWise");
    const wbout = XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });
    const uri = FileSystem.cacheDirectory + "CustomerWise.xlsx";
    console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(uri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "MyWater data",
      UTI: "com.microsoft.excel.xlsx",
    });
  };
  const handleExcel2 = async () => {
    await Promise.all(customerWise.map(async (item) => {
         
          const projectRef = db
            .collection("projects")
            .where("Projectname", "==", item.Projectname);
   
          const data3 = await projectRef.get();
  
      console.log( data3.docs[0].data().BestPartNumber,'part');
  
          var inv = JSON.parse(data3.docs[0].data().BestPartNumber);
      // console.log(inv,'a');
          var invgrp = [];
          await Promise.all(inv.map(async (element) => {
            const invRef = db
              .collection("inventory")
              .where("BestPartNumber", "==", element);
            const data4 = await invRef.get();
        // var invobj = {
        // BestPartNumber: data4.docs[0].data().BestPartNumber,
        //       Description: data4.docs[0].data().Description,
        //       Productgrp: data4.docs[0].data().Productgrp,
        //       Weight: data4.docs[0].data().Weightperpieceingrams,
        //       StandardBoxQty: data4.docs[0].data().StdBoxquantity,
        // }
        excel.push({
          BestPartNo: data4.docs[0].data().BestPartNumber,
          Description:data4.docs[0].data().Description,
          Productgrp: data4.docs[0].data().Productgrp,
          Weight:data4.docs[0].data().Weightperpieceingrams,
          StdBoxQuantity: data4.docs[0].data().StdBoxquantity,
          SafetyStock: data4.docs[0].data().SafetyStock,
          ROL: data4.docs[0].data().ROL,
          TotalClosingQty:'-',
          ForecastQuantityForThisMonth:item.Qtm[0],
          ActualProduction:item.actual_production, 

          ForecastVariation:
            1 - (item.Qtm[0] - item.actual_production) / item.Qtm[0],
          DemandTriiggereddatetime: "-",
          RefillingDateTime: "-",
          Servicelevelaccepteddays: 10,
          OnTimeDelivery: "-",
        });
          }))
      
          // console.log(project, customername);
         
      
        }))
      console.log(excel,'excel');
      setModalVisible(!modalVisible);
      var ws = XLSX.utils.json_to_sheet(excel);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "BestPartWise");
      const wbout = XLSX.write(wb, {
        type: "base64",
        bookType: "xlsx",
      });
      const uri = FileSystem.cacheDirectory + "BestPartWise.xlsx";
      console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      await Sharing.shareAsync(uri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "MyWater data",
        UTI: "com.microsoft.excel.xlsx",
      });
    };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      {/* <TouchableOpacity
        style={styles.options}
        onPress={() => navigation.push("showOrder", { status: "Pending" })}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          ORDERS PENDING
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.options}
        onPress={() => navigation.push("showOrder", { status: "Completed" })}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          ORDERS COMPLETED
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.options}
        onPress={() => navigation.push("showOrder", { status: "Cancelled" })}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          CANCELLED ORDERS
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.options}
        // onPress={() =>
        // 	navigation.push('ShowProjects', {
        // 		customer_id: route.params.customer_id
        // 	})
        // }
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          EXPORTING BOM
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleExcel1}
            style={{
              backgroundColor: "#ffaa00",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              CUSTOMER VISE BOM EXPORTING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={handleExcel2}
            style={{
              backgroundColor: "#ffaa00",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              BEST PART VISE BOM EXPORTING
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default tabs;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    color: "white",
  },
  btn: {
    color: "white",
  },
  options: {
    width: 320,
    height: 80,
    backgroundColor: "rgba(0,0,0,.2)",
    borderWidth: 1.5,
    borderColor: "#ffaa00",
    // shadowColor: '#609BEB',
    // elevation: 5,
    borderRadius: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
  },
});
