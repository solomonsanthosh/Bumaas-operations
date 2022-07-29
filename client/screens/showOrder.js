import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Platform,
	StatusBar,
	TouchableOpacity,
	ImageBackground
} from 'react-native';

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getOrders } from '../axios';
import { db } from '../firebase';
const image = {
	uri: "https://www.fonewalls.com/wp-content/uploads/2019/10/Gradient-Background-Wallpaper-013-300x585.jpg",
  };
const showOrder = ({ route }) => {
	const orderRef = db.collection('orders').where('Status', '==', route.params.status);
	const navigation = useNavigation();
	const [orders, setOrders] = useState([]);
	const [search, setSearch] = useState('');
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
	const handleCancel = async (orderid) => {
		await db.collection('orders').doc(orderid).update({
			Status: 'Cancelled'
		});
		setReload(!reload);
	}
	const handleUndo = async (orderid) => {
		await db.collection('orders').doc(orderid).update({
			Status: 'Pending'
		});
		setReload(!reload);
	}

	const handleConfirm = async (orderid) => {
		await db.collection('orders').doc(orderid).update({
			Status: 'Completed'
		});
		setReload(!reload);
	}
	return (
		<ImageBackground source={image} resizeMode='cover' style={styles.image}>
			
			<ScrollView style={styles.container}>
				
				
				{orders.map((order) => (
					<>
					<View
					style={styles.maincard}
					
					>
						<Text style={[styles.textquestion,{color:'#1b5cb7'}]}>Project name:</Text>
						<Text style={styles.textquestion}>{order.Projectname}</Text>
						{route.params.status == "Pending" && <View style={{
							flexDirection:'row',
							justifyContent:'space-around',
							marginTop:10
						}}>
							<TouchableOpacity onPress={()=>handleCancel(order.orderid)} style={{
								backgroundColor:'#F24C4C',
								// borderWidth:2,
								// borderColor:'#FF5D5D',
								// padding:2,
								borderRadius:30,
								width:"30%",
								
								alignItems:'center',
								justifyContent:'center'
							}}><Text style={{color: 'white'}}>Cancel</Text></TouchableOpacity>
							<TouchableOpacity onPress={()=>handleConfirm(order.orderid)} style={{
								// backgroundColor:'#1b5cb7',
								backgroundColor:'#3BACB6',
								padding: 8,
								borderRadius:30,
								width:"30%",
								alignItems:'center',
								justifyContent:'center'
							}}><Text style={{color: 'white'}}>Complete</Text></TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.push('orderDetails',{orderid:order.orderid})}	 style={{
							backgroundColor:'#55D8C1',
							// padding:10,
							borderRadius:30,
							width:"30%",
							alignItems:'center',
							justifyContent:'center'
						}}><Text>View</Text></TouchableOpacity>
						</View>}
						{
							route.params.status == "Cancelled" &&<View style={{
								flexDirection:'row',
								justifyContent:'space-around',
								marginTop:10
							}}>
								<TouchableOpacity onPress={()=>handleUndo(order.orderid)} style={{
									
									backgroundColor:'#F24C4C',
									// borderWidth:2,
									// borderColor:'#FF5D5D',
									// padding:2,
									borderRadius:30,
									width:"30%",
									
									alignItems:'center',
									justifyContent:'center'
								}}><Text style={{color:'white'}}>Undo</Text></TouchableOpacity>
								<TouchableOpacity onPress={() => navigation.push('orderDetails',{orderid:order.orderid})}	 style={{
							backgroundColor:'#55D8C1',
							padding:8,
							borderRadius:30,
							width:"30%",
							alignItems:'center',
							justifyContent:'center'
						}}><Text>View</Text></TouchableOpacity>
								
							</View>
						}
						{
							route.params.status == 'Completed' && <View style={{
								flexDirection:'row',
								justifyContent:'space-around',
								marginTop:10
							}}>
							
								<TouchableOpacity onPress={() => navigation.push('orderDetails',{orderid:order.orderid})}	 style={{
							backgroundColor:'#55D8C1',
							padding:8,
							borderRadius:30,
							width:"30%",
							alignItems:'center',
							justifyContent:'center'
						}}><Text>View</Text></TouchableOpacity></View>
						}
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
		fontSize: 15,
		marginLeft: 10,
		marginVertical: 5,
		fontWeight: "bold",
	  },
	  container: {
		flex: 1,
		// backgroundColor: '#fff',
		marginTop: StatusBar.currentHeight + 50,
		zIndex: 1,
		// paddingTop:50
	  },
	  maincard: {
		width: "90%",
		// justifyContent: "center",
		// alignItems: "center",
		// backgroundColor: "#ffffff93",

		marginLeft:'auto',
		marginRight:'auto',
		padding: 8,
		borderRadius: 10,
		marginBottom: 10,
	  },
	image: {
		flex: 1,
		justifyContent: "center"
	  },
	// container: {
	// 	flex: 1,
	// 	backgroundColor: '#fff',
	// 	marginTop: StatusBar.currentHeight + 50,
	// 	zIndex: 1
	// 	// paddingVertical: 20,
	// },
	container2: {
		justifyContent: 'center',
		alignItems: 'center',

		height: 100,
		borderColor: '#609BEB',
		borderRadius: 10,
		borderWidth: 1,
		margin: 10,
		zIndex: 1
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	search: {
		width: '95%',

		alignSelf: 'center',
		borderRadius: 50,
		position: 'absolute',
		top: StatusBar.currentHeight + 10,
		backgroundColor: 'black',
		zIndex: 5
	}
});
export default showOrder;