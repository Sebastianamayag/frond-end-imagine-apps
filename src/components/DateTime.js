import React from 'react'
import DatePicker from 'react-native-date-picker';
export const DateTime = ({modalOpen,date,setModalOpen,setDate}) => {
    return (
        <DatePicker
            modal
            open={modalOpen}
            date={date}
            onConfirm={(date) => {
                setModalOpen(false)
                setDate(date)
            }}
            onCancel={() => {
                setModalOpen(false)
            }}
        />
    )
}
