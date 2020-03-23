import React from 'react';
import {useState, useEffect} from 'react';
import api from '../services/api'
import './VideoPage.css'





export default function VideoPage(){
  const [names, setNames] = useState([])
  const [isBusy, setBusy] = useState(true)

  function testApi(){

    api.get("names")
    .then(function(response){
      let names = []
      response.data.map(item => {
        names.push(item.filename)
      })
      // console.log(names)

      setNames(names)
      setBusy(false)
    });  
      
  }

  function returnName(item){
    var array = item.split('-');
    var middleArray = array[1].toString()
    var finalArray = middleArray.split('.')
    return finalArray[0]
  }

  useEffect(() => {
    testApi()
  },[])
  return(
    <div className="videoPage">
      {/* <div className="leftBorder"></div> */}
      <div className="videos">
        {names.length === 0  ? <div className="noVideos"><p>Upload a Video First</p></div> :

        isBusy ? <p>Loading</p> : 
          names.map(item => {
            return(
              <div className="margin" key={item}>
                <h3>{returnName(item)}</h3>
                <video   id="videoPlayer" controls>
                  <source src={`http://localhost:8080/video/${item}`} type="video/mp4"/>
                </video>
              </div>
            )
          })

        }
      </div>
    </div>
  )
}