import WatchListChart from "./WatchlistChart"


function HomeWatchlistTicker(props){

        function colorChange (){
            if(props.percentchange < 0){
            return '#f77d6d'    //red
        }else return '#1db512' //green
        }

        function tickerColor (){
            if(props.percentchange < 0){
            return 'red'    //red
        }else return 'green' //green
        }
    
    return(
    
        
        <table className="watchlistTicker">

        <td><img className="inline_block" src={props.img} height="50px" ></img></td> 
        <td className="inline_block" className="name_size" width="100px"><b>{props.name}</b></td>

        <td className="inline_block" width="100px">${props.price.toFixed(3)}</td>
        <td className="inline_block" style={{color: tickerColor()}} width="100px">{props.percentchange.toFixed(2)}%</td>
        <td className="inline_block" >
            <WatchListChart 
            id={props.id} 
            name={props.name} 
            percentchange={props.percentchange}
            colorChange={colorChange()}
            /></td>
       
       <button onClick={()=> props.removeTickerClick(props.name)} className="button-45" role="button" style={{fontSize : 12}}> Delete </button>

        </table>
       
    )
}

export default HomeWatchlistTicker