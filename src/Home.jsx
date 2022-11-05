import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Home() {

  //Store Data
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  //API mounting call
  useEffect(() => {
    call()
  }, []);

  //BOx styles
  const styles = {
    display: 'inline',
    width: '30%',
    height: 50,
    float: 'left',
    padding: 5,
    border: '0.5px solid black',
    marginBottom: 10,
    marginRight: 10
  }

  //API Call
  let call = async () => {
    let response = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
    try {
      setAllData(response.data);
      setFilteredData(response.data)
    } catch (error) {
      console.log(`Something Wrong ${error}`);
    }
  }

  //Handle to value
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.title.search(value) !== -1;
    });
    setFilteredData(result);
  }

  
  return (
    <div className="App">
      <div style={{ margin: '0 auto', marginTop: '10%' }}>
        <label>Search:</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
      </div>
      <div style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            <div key={value.id}>
              <div style={styles}>
                {value.title}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home