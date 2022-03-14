import { useEffect, useState } from "react";
import CoinSelection from "../components/CoinSelection";
import { useNavigate } from "react-router-dom";
import Home_Watchlist from "./Home_Watchlist";
import Search from "../components/Search";


export default function CoinsHome() {

    const [list, setList] = useState([]);
    const [CoinSelected, setCoinSelected] = useState({})
    const [watchlistCart, setWatchlistCart] = useState({})
    const [watchlistDetails, setWatchlistDetails] = useState([])
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const myStorage = window.localStorage;
    const [Value, setValue] = useState([])
    const [fullList, setFulllist] = useState([]) 


    const fetchDetails = () => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then((r) => r.json())
        .then((d) => {
            setFulllist(d);
            const reducedArray = d.splice(0,30)
            // const reducedArray = d.filter(element => { return element["name"].includes(Value) 
            // });
            setList(reducedArray)
            // console.log(list)

        })
        .catch(error => { console.log(error.message) })
    }

    useEffect(() => {
        fetchDetails()

    }
        , [])

    const search = (searchValue) => {
        setValue(searchValue)
        console.log(searchValue)
        console.log(fullList)
        console.log(Value.toLowerCase())
        const searchArray = fullList.filter(element => { 
            const lowercase = element.name.toLowerCase()
            return lowercase.includes(Value.toLowerCase()) 
                });
        console.log(searchArray)
        setList(searchArray)
        
    }

    const handleCoinClick = (x) => {
        console.log(x)
        setCoinSelected(x.coin.name)
        console.log(CoinSelected)
        navigate(`/CoinsHome/${x.coin.id}`);

    }

    const handleAddCoin = (item) => {
        handleToggle() //add list to local storage
        setWatchlistCart(
            {
                ...watchlistCart, [item.coin.name]: item.coin.id
            }
        )
        setWatchlistDetails(
            [
                ...watchlistDetails, item
            ]
        )
    }

    const handleRemoveCoin = (item) => {

        const clonedlistcart = { ...watchlistCart }
        delete clonedlistcart[item]
        console.log(item)

        setWatchlistCart(clonedlistcart)
        handleToggle() //add list to local storage

    }
    console.log(watchlistCart)

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const addToListStorage = () => {
        // console.log(watchlistCart) //object
        myStorage.setItem('watchlistCart', JSON.stringify(watchlistCart));
        console.log(myStorage) //string

    }



    const Tickers = list.map((coin, index) => {
        return (
            <CoinSelection
                key={index}
                coin={coin}
                handleCoinClick={handleCoinClick}
                handleAddCoin={handleAddCoin} />
        )
    })
    return (
        <div>
            
            <h1>Top 30 Coins</h1>
            <Search search={search}/>
            {Tickers}
            <div>
                <button className="savetowatchlist buttonClass" onClick={addToListStorage}>Save to WatchList</button>
            </div>
            <Home_Watchlist cart={watchlistCart} removeTickerClick={handleRemoveCoin} />

            <button className="savetowatchlist buttonClass" onClick={addToListStorage}>Save to WatchList</button>



            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
        </div>


    )
}
