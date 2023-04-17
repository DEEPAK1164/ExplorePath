import { restaurantList } from "./config";
import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
function filterData(searchText, restaurants) {
  return restaurants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
}

const Body = () => {
  const[allRestaurants, setAllRestaurants]=useState([])
  const [filteredRestaurants, setFilteredRstaurants] = useState([]);
  const [searchText, setSerchText] = useState("");
  
//useEffect is a function to cal this function we have to pass another 
//function inside it called as callback function this will not be called
//immediately but it well get called whenever useEffect need to be called
//react will make sure it gets called at specific time which we are going to know 
//what is that time.
//after every render it will callback function so we don't want to
//fter every render so to avoid it pass dependency
// array array along with it. 
//let i only want to call 
//useEffect when my searchText changes
//this means my useEffect is dependent on searchText
//if it is not dependent on anything it will only get called once
//but question is that it will get called before render or after render??
//ans is useEffect will, get called just after initial render see below example

// useEffect(function(){
//   console.log("useEffect");

// },[]);
// console.log("render");

// useEffect(function(){
//   console.log("call this when dependency is changed if not dependent dont call");
// },[]);


// useEffect(function(){
//   console.log("call this when dependency searchText is changed ");
// },[searchText]);


// useEffect(function(){
//   console.log("call this when dependency restaurant is changed");
// },[restaurants]);

useEffect(()=>{

  getRestaurants();
},[]);

//  async function getRestaurants(){

//   const data=await fetch("https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING")
// const json=await data.json();

// console.log(json);
// //HW Read about optional chaining..
//  setRstaurants(json?.data?.cards[2]?.data?.data?.cards);
//  }
// console.log("render");



 async function getRestaurants(){
  let json;
try{
  const data=await fetch("https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING")
 json=await data.json();
}catch(error)
{
  if (error instanceof SyntaxError) {
    // Unexpected token < in JSON
    console.log('There was a SyntaxError', error);
  } else {
    console.log('There was an error', error);
  }
}
console.log(json);

//HW Read about optional chaining..
 setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
 setFilteredRstaurants(json?.data?.cards[2]?.data?.data?.cards);
 }

console.log("render");
//conditional rendering
//if restaurant is empty=>shimmer UI
//if restraurant has data load actual data UI

//earlyreturn not render component
if(!allRestaurants)
return null;

  return (allRestaurants?.length===0)?<Shimmer/>:(
   
    <>
      <div className="search-container">
     
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
           
            setSerchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            //need to filter the data
            const data = filterData(searchText, allRestaurants);
            //updatethe stae-restaurants
            setFilteredRstaurants(data);
          }}
        >
          Search
        </button>
      </div>

      <div className="restaurant-list">
        {filteredRestaurants.map(function (x) {
          return <RestaurantCard {...x.data} key={x.data.id} />;
        })}
        {/* <RestaurantCard {...restaurantList[0].data}/>
        <RestaurantCard {...restaurantList[1].data}/>
        <RestaurantCard {...restaurantList[2].data}/>
         */}
      </div>
    </>
  );
};
export default Body;
