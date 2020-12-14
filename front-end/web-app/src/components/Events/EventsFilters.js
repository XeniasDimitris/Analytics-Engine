
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Title from '../Title';
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';


export default function Filters(props) {

  //-------------------------------
  //All about dates selection
  //-------------------------------
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const handleDateStartChange = (date) => {
    setSelectedStartDate(date);
  };  
  
  const handleDateEndChange = (date) => {
    setSelectedEndDate(date)
  };

  //-------------------------------
  //All about Button click
  //-------------------------------
  const handleClick = (e) =>{
    props.handleSetFilters({start:selectedStartDate, end:selectedEndDate})
  }

  return (
    <React.Fragment>
    <Title >1) Select a Date Window </Title>
    
    <div>        
    {/* ----------------------------------------- */}
    {/* Date Pickers */}
    {/* ----------------------------------------- */}
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{margin:'10px 20px 0px', display:'inline-flex'}}
          clearable
          disableFuture
          placeholder="dd/MM/YYYY"
          format="dd/MM/yyyy"
          margin="normal"
          id="start-date-picker-dialog"
          label="Select Start"
          value={selectedStartDate}
          onChange={handleDateStartChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          style={{margin:'10px 20px 0px', display:'inline-flex'}}
          clearable
          disableFuture
          margin="normal"
          placeholder="dd/MM/YYYY"
          id="end-date-picker-dialog"
          label="Select End"
          value={selectedEndDate}
          format="dd/MM/yyyy"
          onChange={handleDateEndChange}
          minDate = {selectedStartDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>

  {/* ----------------------------------------- */}
  {/* Submission button */}
  {/* ----------------------------------------- */}
   <Button 
             style={{margin:'25px 20px 0px', display:'inline-flex'}}
            color='secondary'
            variant='contained'
            disabled={props.disabledFilterButton}
            onClick={handleClick}>
              <Typography>See Results</Typography>
   </Button>

  </div>
  </React.Fragment>
  );
}