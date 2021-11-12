import React, {useState, useEffect} from 'react';
import "./Store.css";
import ProductCard from './ProductCard';
import Card from '../UIElements/Card'

import LoadingSpinner from "../UIElements/LoadingSpinner"
import { useHttpClient } from '../hooks/http-hook';
import { useDate } from '../hooks/date-hook';


const Store = () => {

    const [items, setItems] = useState();
    const [allItems, setAllItems] = useState();
    const [categories, setCategories] = useState([]);
    const [minOrderValue, setMinOrderValue] = useState();
    const [deliveryHours, setDeliveryHours] = useState(false);
    const [deliveryPrice, setDeliveryPrice] = useState(false);
    const [minBonusDeliveryPrice, setMinBonusDeliveryPrice] = useState(false);
    const [deliveryAvailable, setDeliveryAvailable] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { today, dayId } = useDate();

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchItems = async () => {
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/items/`
                  );
                const filteredItems = responseData.items.filter(i => !(i.category === "INNE"))
                const sortItemsByName = filteredItems.sort((a, b) => a.name > b.name ? 1 : -1)
                const sortItemsByCategory = sortItemsByName.sort((a, b) => {
                    let aCatValue
                    let bCatValue
                    if (a.category === "PRZYSTAWKI") {
                        aCatValue = 0
                    } else if (a.category === "ZUPY") {
                        aCatValue = 1
                    } else if (a.category === "SAŁATY") {
                        aCatValue = 2
                    } else if (a.category === "DANIA GŁÓWNE") {
                        aCatValue = 3
                    } else if (a.category === "BURGERY I KANAPKI") {
                        aCatValue = 4
                    } else if (a.category === "DODATKI") {
                        aCatValue = 5
                    } else if (a.category === "DANIA DLA DZIECI") {
                        aCatValue = 6
                    } else if (a.category === "DESERY") {
                        aCatValue = 7
                    } else aCatValue = 10

                    if (b.category === "PRZYSTAWKI") {
                        bCatValue = 0
                    } else if (b.category === "ZUPY") {
                        bCatValue = 1
                    } else if (b.category === "SAŁATY") {
                        bCatValue = 2
                    } else if (b.category === "DANIA GŁÓWNE") {
                        bCatValue = 3
                    } else if (b.category === "BURGERY I KANAPKI") {
                        bCatValue = 4
                    } else if (b.category === "DODATKI") {
                        bCatValue = 5
                    } else if (b.category === "DANIA DLA DZIECI") {
                        bCatValue = 6
                    } else if (b.category === "DESERY") {
                        bCatValue = 7
                    } else bCatValue = 10
                    if ( aCatValue < bCatValue ){
                    return -1;
                    }
                    if ( aCatValue > bCatValue ){
                    return 1;
                    }
                  return 0;})
                setItems(sortItemsByCategory)
                setAllItems(sortItemsByCategory)
                } catch (err) {}
            }
            const fetchCategories = async () => {
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/category/`
                  );
                const storeCategories = responseData.category.filter(cat => !(cat.name === "INNE"))
                setCategories(storeCategories)
                } catch (err) {}
            } 
            const getMinOrderValue = async () => {
                
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/value/${process.env.REACT_APP_MIN_VALUE_ID}`
                  );
                
                setMinOrderValue(responseData.value)
                } catch (err) {}
            } 
            const getDeliveryHours = async () => {
                
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/time/`
                  );
                
                  setDeliveryHours(responseData.time)
                  const currentDay = responseData.time.find(time => time._id === dayId)
                  const currentDayAvailibility = currentDay.available
                  setDeliveryAvailable(currentDayAvailibility)
                } catch (err) {}
            } 
            const fetchDeliveryPrice = async () => {
                try {
                  const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/delivery/${process.env.REACT_APP_DELIVERY_PRICE_ID}`
                  );
                  setDeliveryPrice(responseData.delivery_price);
                
            } catch (err) {}
              
        };
        const getBonusDeliveryPrice = async () => {
                
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/bonus-delivery/${process.env.REACT_APP_BONUS_DELIVERY_PRICE_ID}`
                  );
                  setMinBonusDeliveryPrice(responseData.bonus_delivery_price.value);
            } catch (err) {}
        }
            getBonusDeliveryPrice()
            fetchDeliveryPrice();
            fetchItems()
            fetchCategories()
            getMinOrderValue()
            getDeliveryHours()
    }, [sendRequest, dayId])

    const itemList = () => {
        let item_list
        let availableItems
        if(items) {
            availableItems = items.filter(item => item.available === true)
            item_list = availableItems.map(i => {
            return (<ProductCard key={i.id} id={i.id} name={i.name} price={i.price} description={i.description} image={i.image} category={i.category} available={i.available} />)
    })
    } return item_list
    }

    const filterByCategory = (e) => {
        let filteredItems
        if (e.target.innerHTML === "WSZYSTKO") {
            filteredItems = allItems
        } else {
            const categoryValue = e.target.innerHTML.toLowerCase()
            filteredItems = allItems.filter(i => 
                i.category.toLowerCase().includes(categoryValue))
        }
        setItems(filteredItems)
    }

    const showDeliveryHours = () => {
        let message
        let currentDay
        if (deliveryHours && today && dayId) {
            currentDay = deliveryHours.find(time => time._id === dayId)
            const startHour = currentDay.time.start.hour
            const startMinute = currentDay.time.start.minute
            const endHour = currentDay.time.end.hour
            const endMinute = currentDay.time.end.minute
            message = `${startHour < 10 ? '0' + startHour : startHour}:${startMinute < 10 ? '0' + startMinute : startMinute} - ${endHour < 10 ? '0' + endHour : endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`
            }
        return message;
    }

    const categoryList = categories.map(cat => <li key={cat.id} onClick={filterByCategory}>{cat.name}</li>)

    return (
        <div className="store"
        >
            <div className="store-info">
                <h1>Zamów online!</h1>
                <p>
                    {today && today} - 
                    {!deliveryAvailable && <b style={{color: 'red'}}>W dzisiejszym dniu nie dowozimy!</b>}
                    {deliveryAvailable && <span> W dzisiejszym dniu dowozimy w godzinach <b>{deliveryHours && today && dayId && showDeliveryHours()}</b></span>}
                </p>
                <p>Minimalna kwota zamówienia: <b>{minOrderValue && minOrderValue.value} zł</b></p>
                <p>Koszt dostawy: <b>{deliveryPrice && deliveryPrice.value} zł</b>. W przypadku dowozu poza Lublin koszt obliczany wg odległości.</p>
                {minBonusDeliveryPrice && <p>Zamówienie powyżej <b>{minBonusDeliveryPrice} zł</b> <b style={{color: "lightgreen"}}>dostawa gratis!</b></p>}
                
            </div>
            <Card>
            <div className="categories">
                <h2>Wybierz kategorię</h2>
                <ul style={{color: "white"}}>
                    <li onClick={filterByCategory}>WSZYSTKO</li>
                {categories.length > 0 && categoryList}
                </ul>
            </div>
            </Card>
            <div className="store-items">
            {isLoading && <LoadingSpinner asOverlay />}
                {items && itemList()}
            </div>
            
        </div>
    )
}

export default Store
