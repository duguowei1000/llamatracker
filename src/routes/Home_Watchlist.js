import { useEffect, useState } from "react";
import HomeWatchlistTicker from "../components/HomeWatchlistTicker";

export default function Home_Watchlist(props) {
    const [coinDetails, setCoinDetails] = useState({}); // {} for empty object //else will be error

    useEffect(() => {
        const fetchCoinDetails = () => {
            fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
                .then((response) => response.json())
                .then((d) => {
                    setCoinDetails(d)  //*down to one level above the required value

                })
                .catch((error) => {
                    console.error(error)
                })

        }
        fetchCoinDetails()
    }, [])


    const parsedArray = Object.values(props.cart) //coin ids in an array
    const coinIDs = []
    for (let i = 0; i < coinDetails.length; i++) {
        for (let j = 0; j < parsedArray.length; j++) {
            if (coinDetails[i].id === parsedArray[j]) {
                coinIDs.push(coinDetails[i]) //array of coins with their information
            }
        }

    }

    const tickers = coinIDs.map((x, index) => (

        <div
            key={index}>
            <div className="watchlistbox" >
                <HomeWatchlistTicker
                    id={x.id}
                    name={x.name}
                    price={x.current_price}
                    percentchange={x.price_change_percentage_24h}
                    img={x.image}
                    removeTickerClick={props.removeTickerClick}

                />


            </div>
            <hr width="850px" />



        </div>))

    return (

        <>
            <div className="header_home">
                <div className="watchlistheader_home">
                    <table className="watchlistTicker">

                        <td><h1 className="watchlistfirstRow">Coin</h1></td>
                        <td><h1 className="watchlistfirstRow">Price (USD)</h1></td>
                        <td><h1 className="watchlistfirstRow">24hr Change</h1></td>
                        <td><h1 className="watchlistfirstRow">Last 30 days</h1></td>

                    </table>
                </div>
            </div>
            <hr width="850px" />
            {tickers}

        </>

    )


}