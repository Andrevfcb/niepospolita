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
                
                setItems(responseData.items)
                setAllItems(responseData.items)
                } catch (err) {}
            }
            const fetchCategories = async () => {
                
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/category/`
                  );
                
                setCategories(responseData.category)
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
        let sortItems
        let availableItems
        if(items) {
            availableItems = items.filter(item => item.available === true)
            sortItems = availableItems.sort((a, b) => a.name > b.name ? 1 : -1)
            item_list = sortItems.map(i => {
            return (<ProductCard key={i.id} id={i.id} name={i.name} price={i.price} description={i.description} image={i.image} category={i.category} available={i.available} />)
    })
    } return item_list
    }

    const filterByCategory = (e) => {
        let filteredItems
        if (e.target.innerHTML === "wszystko") {
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
                <h1
                onClick={()=>console.log(deliveryAvailable)
                }
                >Zamów online!</h1>
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
