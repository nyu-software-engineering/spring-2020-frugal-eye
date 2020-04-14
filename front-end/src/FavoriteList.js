import React, {useState, useEffect} from 'react';
import './RecipeList.css'
import Popup from './components/Popup';
import './register.css';
import NavBar from "./NavBar.js"
import axios from 'axios'

const FavoriteList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/favoritelist').then(function(response) {
            console.log(response.data);
            setData(response.data);
    });
  }, []);
  return (

    //retrieve search params from props
    //.find({ingredients = props.ingredients}, ingredients)
    //for {ingredient} in {ingredients}

    //where props.action is sending to specific recipe page with param = recipe selected

  	<div className = "flex-container">
    <NavBar/>
        <br></br>
      {Object.keys(data).map((key, index) => {
        if(data[key].favorite){
          return(
            <p className = 'recipe' onClick={event => window.location.href="/recipe/"+key}>
            {data[key].name}
            <img src = {require("" + data[key].image)} alt = 'image'/>
            </p>
          )
        }else return "";
      })}

    </div>
  )
}

export default FavoriteList;

// import React, {useState} from 'react';
// import './RecipeList.css'
// import Popup from './components/Popup';
// import './register.css';
// import axios from 'axios'

// const FavoriteList = (props) => {

//   const [matchPopup, setMatchPopup] = useState(true);

//   const getData = async () => {
//     let res = await axios.get('http://localhost:3000/favoritelist');
//     const data = res.data;
//     console.log(data)

//     return (

//       //retrieve search params from props
//       //.find({ingredients = props.ingredients}, ingredients)
//       //for {ingredient} in {ingredients}

//       //where props.action is sending to specific recipe page with param = recipe selected

//       <div className = "flex-container">
//       <button className="back-button" onClick={event => window.location.href='/home'}>Back to home</button>
//           <br></br>
//         {Object.keys(data).map((key, index) => {
//           if(data[key].favorite){
//             return(
//               <p className = 'recipe' onClick={null}>
//               {data[key].name}
//               <img src = {require("" + data[key].image)} alt = 'image'/>
//               </p>
//             )
//           }else return "";
//         })}

//       </div>
//     )
//   }
// }

// export default FavoriteList;