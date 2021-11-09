import React, { useState, useEffect } from 'react';
import "./SpecialReservation.css"
import { useHttpClient } from '../hooks/http-hook';
import SpecialProductCard from './SpecialProductCard';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDate } from '../hooks/date-hook';
import Input from '../FormElements/Input';
import { VALIDATOR_REQUIRE } from '../util/validators';
import { useForm } from '../hooks/form-hook';

const SpecialReservation = () => {

    const [reservation, setReservation] = useState([]);
    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState('');
    const [startDate, setStartDate] = useState(new Date());


    const [isClickedProduct, setIsClickedProduct] = useState(false);
    const [showReservation, setShowReservation] = useState(false);
    const [specialItemCheckedId, setSpecialItemCheckedId] = useState(false);
    const [timepickerValue, setTimepickerValue] = useState('nie określono');
    const [minTime, setMinTime] = useState();
    const [maxTime, setMaxTime] = useState();
    const [items, setItems] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { today, dayId, currentHour, currentMinute } = useDate();

    const [formState, inputHandler] = useForm(
        {
            hour: {
              value: '',
              isValid: false
          },
          guests: {
            value: '',
            isValid: false
        }
        },
        false
    );

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchItems = async () => {
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/items/`
                  );
                
                  const filteredItems = responseData.items.filter(item => item.special === true)
                setItems(filteredItems)
                } catch (err) {}
            }
            const fetchSpecialReservation = async () => {
                try {
                  const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/reservation`
                  );
                  setAvailable(responseData.reservations[0].available.value)
                  setMessage(responseData.reservations[0].available.message)
                  setReservation(responseData.reservations[0].days);
            } catch (err) {}     
        };
        fetchSpecialReservation();
            fetchItems()
        }, [sendRequest] )

    // useEffect(() => {
    //         let minOrderTime
    //         let maxOrderTime
    //         if(deliveryHours && today && dayId && currentHour && currentMinute) {
    //             const currentDay = deliveryHours.find(time => time._id === dayId)
    //             const startHour = currentDay.time.start.hour
    //             let startMinute = currentDay.time.start.minute
    //             const endHour = currentDay.time.end.hour
    //             let endMinute = currentDay.time.end.minute
    
    //             if (currentDay.time.start.minute < 10) {
    //                 startMinute = currentDay.time.start.minute + '0'
    //             } else {
    //                 startMinute = currentDay.time.start.minute
    //             }
    
    //             if (currentDay.time.end.minute < 10) {
    //                 endMinute = currentDay.time.end.minute + '0'
    //             } else {
    //                 endMinute = currentDay.time.end.minute
    //             }
                
    //             maxOrderTime = (endHour + ':' + endMinute).toString()
                
                
    //             if(currentHour > startHour) {
    //                 if(currentMinute > 45) {
    //                     minOrderTime = (currentHour + 2 + ':00').toString()
    //                 } else if (currentMinute > 30) {
    //                     minOrderTime = (currentHour + 1 + ':45').toString()
    //                 } else if (currentMinute > 15) {
    //                     minOrderTime = (currentHour + 1 + ':30').toString()
    //                 } else {
    //                     minOrderTime = (currentHour + 1 + ':15').toString()
    //                 }
                    
    //             } else if (currentHour === startHour && currentMinute > startMinute) {
    //                 if(currentMinute > 45) {
    //                     minOrderTime = (currentHour + 2 + ':00').toString()
    //                 } else if (currentMinute > 30) {
    //                     minOrderTime = (currentHour + 1 + ':45').toString()
    //                 } else if (currentMinute > 15) {
    //                     minOrderTime = (currentHour + 1 + ':30').toString()
    //                 } else {
    //                     minOrderTime = (currentHour + 1 + ':15').toString()
    //                 }
    //             } else minOrderTime = (startHour + 1 + ':' + startMinute).toString()
    
    //             if(currentHour >= endHour || (currentHour === (endHour - 1) && (currentMinute > endMinute )) ) {
    //                 setIsToLateToOrder(true)
    //             }
    //         }
    //             if(minOrderTime && maxOrderTime) {
    //                 setMinTime(new Date(`8/3/2017 ${minOrderTime}`))
    //                 setMaxTime(new Date(`8/3/2017 ${maxOrderTime}`))
    //             }
    //     }, [deliveryHours, today, dayId, currentHour, currentMinute])

        const changeClickedProductId = (e) => {
            e.preventDefault();
            // console.log(e.target.);
            // console.log(e.target.className);
            // e.target.className -= " button--active"
            console.log(e.target.id);
            if (specialItemCheckedId === e.target.id) {
                return setSpecialItemCheckedId(false)
            } else return setSpecialItemCheckedId(e.target.id)
            // setSpecialItemCheckedId(e.target.id)
        }

        const handleTimeValue = (e) => {
            let hours
            let minutes
            if (e.target.value) {
                hours = e.target.value.getHours()
                minutes = e.target.value.getMinutes()
                if (minutes < 10) {
                    minutes = '0' + e.target.value.getMinutes()
                }
                setTimepickerValue(hours + ':' + minutes)
            } else {setTimepickerValue('nie określono')}
          }

        const itemList = () => {
            let item_list
            let sortItems
            if(items.length > 0) {
                sortItems = items.sort((a, b) => a.name > b.name ? 1 : -1)
                item_list = sortItems.map(i => {
                return (<SpecialProductCard key={i.id} id={i.id} name={i.name} price={i.price} description={i.description} image={i.image} changeClickedProductId={changeClickedProductId} specialItemCheckedId={specialItemCheckedId} />)
                })
            } return item_list
        }

        const setDaysOptions = reservation.map(i => <option value={i._id}>{i.name}</option>)

    return (
        <div className="special">
            {items.length > 0 && 
            <div className="special-items">
            <h1
            onClick={() => {console.log(new Date(), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10))}}
            // onClick={() => {console.log(new Date().setDate(new Date().getDate() + 10))}}
            >Wybierz produkt i zarezerwuj stolik</h1>
            {itemList()}
            </div>
            }
            {specialItemCheckedId && <div className="special-reservation">
            {/* <label style={{fontWeight: 'bold', marginBottom: '0.5rem', minHeight: '28px'}}>Wybierz godzinę:</label> */}
            <Input 
                id="name"
                element="select"
                name="select"
                label="Wybierz godzinę:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Proszę wybrać godzinę."
                onInput={inputHandler}
                options={setDaysOptions}
            />
            <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
            dateFormat='dd/MM/yyyy' 
            minDate={new Date()}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10)}
            // maxDate={new Date().setDate(new Date().getDate() + 10)}
            />
            </div>}
        </div>
    )
}

export default SpecialReservation
