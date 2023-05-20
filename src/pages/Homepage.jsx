import axios from 'axios';
import { useEffect, useState } from 'react';
import { DragDropContext} from "react-beautiful-dnd";
import { TablePagination } from '@mui/material';
import SharesTable from '../components/SharesTable';
import Loading from '../components/Loading';
import '../styles/table.css'


function Homepage() {
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);
    const [shares, setShares] = useState([]);

    function handleChangePage(event, newpage) {
      setpg(newpage);
    }
    function handleChangeRowsPerPage(event) {
      setrpg(parseInt(event.target.value, 10));
      setpg(0);
    }
    
    async function fetchData(){
        const companies = ['aapl', 'aca', 'ACM', 'ACNB', 'ADT', 'ADTX', 'AAON', 'AFL', "AGEN", "AGFY", "AEI", 'AES', 'amzn', 'fb', 'trmk', 'trs', 'nflx', 'udmy', 'udr', 'usio'];
        const sharesList = []
        for(let i = 0; i<companies.length; i++){
            const url = `https://cloud.iexapis.com/stable/stock/${companies[i]}/quote?token=pk_a7f6e686894a4c8caf852df76e9f97b0`;
            await axios.get(url)
            .then(res => {
                const share = {
                    id: i,
                    company: res.data['companyName'],
                    latestPrice: res.data['latestPrice'],
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
    {shares.length === 0 ? <Loading/> :
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
        <div className='sharesContainer'>
          <h1>Share List</h1>
        <SharesTable
          shares={shares}
          pg={pg}
          rpg={rpg}
        />
          <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10]}
                count={shares.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
      </DragDropContext>
    </div>
}
    </>
  );
}

export default Homepage;
