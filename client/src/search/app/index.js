import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Datatable from '../datatable';
import './styles.css';
export default function Search() {

  const [data, setData] = useState([]); 
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState(['To']);

 useEffect(() => {
    
     Axios.get('http://localhost:5000/flights')
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }, []);


  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }
  const columns = data[0] && Object.keys(data[0]);

  

  return (
    <div>
        <div>
        <Datatable data={search(data)} />
      </div>
      <div>

        
        <input

        style={{
          display:"flex"
        }}
          type='text'
          placeholder='Search'
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {columns &&
          columns.map((column) => (
            <label style={{
              display:"grid",
              float:"right"
            }}>
              <input
                type='checkbox'
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column],
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
    
    </div>
  );
}
