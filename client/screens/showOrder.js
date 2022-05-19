import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Platform,
	StatusBar,
	TouchableOpacity
} from 'react-native';

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getOrders } from '../axios';

const showOrder = ({ route }) => {
	const navigation = useNavigation();
	const [orders, setOrders] = useState([]);
	const [search, setSearch] = useState('');

	const [searchProject, setSearchProject] = useState([]);
	useEffect(async () => {
		await getOrders(route.params.status).then((res) => {
			setOrders(res.data);
		}
		);
	}, []);
	// const handleSearch = (text) => {
	// 	setSearch(text);
	// 	projects &&
	// 		setSearchProject(
	// 			projects.filter((project) => project.project_name.includes(text))
	// 		);
	// };
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fff',
				paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
			}}
		>
			
			<ScrollView style={styles.container}>
				
				
				{orders.map((order) => (
					<>
					<TouchableOpacity
					onPress={() => navigation.push('orderDetails',{project_name:order.project_name})}	
					>
						<View style={styles.container2}>
							<Text style={styles.title}>{order.project_name}</Text>
						</View>
					</TouchableOpacity>
				   
				</>
				))}
						
					
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginTop: StatusBar.currentHeight + 50,
		zIndex: 1
		// paddingVertical: 20,
	},
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