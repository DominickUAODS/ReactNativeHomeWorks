import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "../styles/styles";

export default function DateAndPassengersComp(): React.ReactElement {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (event: any, selectedDate?: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
		}
		setShow(false);
	};

	return (
		<View style={styles.row}>
			<TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
				<Text>
					📅 {date.toLocaleDateString('uk-UA')}
				</Text>
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					value={date}
					mode="date"
					display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
					minimumDate={new Date()}
					onChange={onChange}
				/>
			)}
			<TouchableOpacity style={styles.button}><Text>👤 1 взрослый</Text></TouchableOpacity>
		</View>


	);
};