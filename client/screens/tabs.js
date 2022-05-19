import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';



const tabs = ({navigation}) => {

	

	return (
		<View style={styles.container}>
			

			<TouchableOpacity
				style={styles.options}
				onPress={() => navigation.push('showOrder',{status:'pending'})}
			>
				<Text
					style={{
						color: '#609BEB',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					ORDERS PENDING 	

				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.options}
				onPress={() => navigation.push('showOrder',{status:'completed'})}
			>
				<Text
					style={{
						color: '#609BEB',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					ORDERS COMPLETED 	

				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.options}
				onPress={() => navigation.push('showOrder',{status:'cancelled'})}
			>
				<Text
					style={{
						color: '#609BEB',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					CANCELLED ORDERS	

				</Text>
			</TouchableOpacity>
            <TouchableOpacity
				style={styles.options}
				// onPress={() =>
				// 	navigation.push('ShowProjects', {
				// 		customer_id: route.params.customer_id
				// 	})
				// }
			>
				<Text
					style={{
						color: '#609BEB',
						fontSize: 16,
						fontWeight: 'bold'
					}}
				>
					EXPORTING BOM	


				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default tabs;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		color: 'white'
	},
	btn: {
		color: 'white'
	},
	options: {
		width: 320,
		height: 140,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#609BEB',
		shadowColor: '#609BEB',
		// shadowOffset: {width: 50, height: 40},
		// shadowOpacity: 1,
		// shadowRadius: 3,
		elevation: 5,
		borderRadius: 10,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		marginVertical: 10
	}
});
