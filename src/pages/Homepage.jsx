import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { ListContainer, ListItem } from "./styles";
import { DragHandle } from './DragHandle';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../styles/table.css'
import Loading from '../infinity.svg'

function Homepage() {
    


    const [shares, setShares] = useState([]);
    async function fetchData(){
        const companies = ['aapl', 'amzn', 'fb', 'trmk', 'trs', 'nflx', 'udmy', 'udr', 'usio'];
        const sharesList = []
        for(let i = 0; i<companies.length; i++){
            const url = `https://cloud.iexapis.com/stable/stock/${companies[i]}/quote?token=pk_a7f6e686894a4c8caf852df76e9f97b0`;
            await axios.get(url)
            .then(res => {
                const share = {
                    id: i,
                    company: res.data['companyName'],
                    volume: res.data['avgTotalVolume'],
                    change: res.data['change'],
                    changePercent: res.data['changePercent'],
                    currency: res.data['currency'],
                    yearLow: res.data['week52Low'],
                    yearHigh: res.data['week52High']
                }
                sharesList.push(share);
            })
            .catch(err => {
                console.log(err);
            })
        }
        setShares(sharesList);
    }

    useEffect(()=>{
        fetchData();
    }, []);


  return (
    <>
    {shares.length == 0 ? <div><img src={Loading} alt="" srcset="" width={'450px'} /></div> :
    <div>
        <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI>=0) {
            shares.splice(desI, 0, shares.splice(srcI, 1)[0]);
          }
        }}
      >
        <ListContainer>
          <h1>Share List</h1>
        <table>
          <thead>
            <tr>
                <th>Company</th>
                <th>Volume</th>
                <th>Change</th>
                <th>yearLow</th>
                <th>yearHigh</th>
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {shares.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={"draggable-" + item.id}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 .4rem #666"
                            : "none",
                        }}
                      >
                        <td>
                            <DragHandle {...provided.dragHandleProps} />
                          <span>{i+1 + ". "+ item.company}</span>
                        </td>
                        <td>{item.volume}</td>
                        <td>{item.change}</td>
                        <td>{item.yearLow}</td>
                        <td>{item.yearHigh}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
        
          </Droppable>
          </table>
        </ListContainer>
      </DragDropContext>
    </div>
}
    </>
  );
}

export default Homepage;
