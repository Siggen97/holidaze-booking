import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

export default function Calendar({ bookedDates }) {
	// Function to check if a date is booked
	const isBooked = (date) => {
		return bookedDates.some(
			(bookedDate) => bookedDate.getTime() === date.getTime()
		);
	};

	return (
		<div>
			{/* Calendar with unavailable dates marked in grey */}
			<DatePicker
				inline
				highlightDates={[
					{
						'react-datepicker__day--highlighted-custom-1': bookedDates, // Mark booked dates in grey
					},
				]}
				dayClassName={(date) =>
					isBooked(date)
						? 'react-datepicker__day--highlighted-custom-1' // Apply grey for booked dates
						: undefined
				}
			/>

			{/* Custom styles for grey (booked) and blue (available) dates */}
			<style>
				{`
          .react-datepicker__day--highlighted-custom-1 {
            background-color: grey;
            color: white;
          }
          .react-datepicker__day {
            color: blue; /* Default available date color */
          }
        `}
			</style>
		</div>
	);
}
