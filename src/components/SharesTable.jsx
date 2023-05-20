import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DragHandle } from './DragHandle';
import {Droppable, Draggable } from "react-beautiful-dnd";


function SharesTable({shares, pg, rpg}){

    return(
    <Table>
        <TableHead>
          <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>latest Price</TableCell>
              <TableCell>Change</TableCell>
              <TableCell>yearLow</TableCell>
              <TableCell>yearHigh</TableCell>
              <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
              {shares.slice(pg * rpg, pg * rpg + rpg).map((item, i) => (
                <Draggable
                  key={item.id}
                  draggableId={"draggable-" + item.id}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging
                          ? "0 0 .4rem #666"
                          : "none",
                      }}
                    >
                      <TableCell>
                          <DragHandle {...provided.dragHandleProps} />
                        <span>{pg*rpg+i+1 + ". "+ item.company}</span>
                      </TableCell>
                      <TableCell>{item.latestPrice}</TableCell>
                      <TableCell>{item.change>=0 ? <span className="green">{item.change}</span> : <span className="red">{item.change}</span> }</TableCell>
                      <TableCell>{item.yearLow}</TableCell>
                      <TableCell>{item.yearHigh}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
      
        </Droppable>    
    </Table>
)
}

export default SharesTable;
