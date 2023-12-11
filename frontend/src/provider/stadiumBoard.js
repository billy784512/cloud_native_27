import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import StadiumCard from "./stadiumCard";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import moment from "moment/moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import pic from "../pic/羽球1.png";
import pic2 from "../pic/羽球3.png";
import fakeStadium from "../testData/fakeStadium";
import Pagination from "@mui/material/Pagination"; 
import axios from 'axios';
import authHeader from "../authService/authHeader";
import FetchData from "../authService/fetchData";
async function SearchCourt(){
  return FetchData.getData("http://localhost:3000/api/courts/admin",10)
  // return await axios.get("http://localhost:3000/api/courts/admin",{headers:authHeader()})
}
export default function StadiumBoard() {
  const [sport, setSport] = useState(10);
  const [location, setLocation] = useState(20);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(0);
  const [courtList, setCourtList] = useState([])
  const [weekday, setWeekday] = useState(moment(date).day());
  const weekdayMapping = [
    "日",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "日",
  ];
  useEffect(() => {
    SearchCourt().then((res)=>
      {
        setCourtList(res)
        let day = moment(date).day()
        if (day === 0) {
          setWeekday(7);
        } else {
          setWeekday(day);
        }}
    )
  },[]);
  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <div>
      <h1>Order Stadium</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="70vw"
        margin="auto"
      >
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast={true}
              value={dayjs(date + 1)}
              shouldDisableDate={(date) => {
                return date.date() > new Date().getDate() + 7;
              }}
              formatDate={(date) => moment(date).format("DD-MM-YYYY")}
              onChange={(newDate) => {
                newDate = moment(
                  new Date(newDate.year(), newDate.month(), newDate.date())
                ).format("YYYY-MM-DD");
                setDate(newDate);
              }}
            />
            </LocalizationProvider>
          </Box>
          <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              timeSteps={{ minutes: 30 }}
              label="時段"
              ampm={false}
              minTime={moment("9:00", "HH:mm")}
              maxTime={moment("21:00", "HH:mm")}
              // views={["hours","minutes"]}
              format="hh:mm"
              // defaultValue={dayjs("0000-00-00T9:00")}
              onChange={(newTime) => {
                console.log(newTime);
                console.log(newTime.get("hour"));
                setTime(newTime.get("hour"));
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">球類</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sport}
              onChange={handleSportChange}
              label="球類"
            >
              <MenuItem value={10}>籃球</MenuItem>
              <MenuItem value={20}>羽球</MenuItem>
              <MenuItem value={30}>排球</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-2">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={location}
              onChange={handleLocationChange}
              label="Location"
            >
              <MenuItem value={10}>大安區</MenuItem>
              <MenuItem value={20}>中正區</MenuItem>
              <MenuItem value={30}>信義區</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <Button variant="contained">Search</Button>
        </Box>
        
      </Box>
      <Box >
      <Grid
            container
          >
    
        <Grid item xs={1.5}>
        </Grid>
        <Grid item xs={4.5}>
        <Typography variant="h4" color="text.secondary">
                球場預約情況
        </Typography>
        </Grid>
        <Grid item xs={6}>
        
        </Grid>
        </Grid>    
        </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
        {
          
          courtList.map((court)=>{
            const weekdayInChinese = weekdayMapping[weekday];

          const availableTime = court.available_time.find(
            (time) => time.weekday === weekday
          );
          const startTime = availableTime
            ? availableTime.start_time.substring(0, 5)
            : "";
          const endTime = availableTime
            ? availableTime.end_time.substring(0, 5)
            : "";
            return (
            <StadiumCard
              id={court.court_id}
              image={pic}
              title={court.name}

              description={[
                court.location,
                "週一至週五",
                "16:00~22:00",
                court.available,
              ]}
            />)
          })
          
        }
        {/* // <StadiumCard
        //   id={1}
        //   image={pic2}
        //   title={"球場名稱1"}
        //   description={[
        //     "106台北市大安區羅斯福路四段1號",
        //     "週一至週五",
        //     "16:00~22:00",
        //     6,
        //   ]}
        // />
        // <StadiumCard
        //   id={2}
        //   image={pic}
        //   title={"球場名稱2"}
        //   description={[
        //     "106台北市大安區羅斯福路四段1號",
        //     "週一至週五",
        //     "16:00~22:00",
        //     7,
        //   ]}
        // />
        // <StadiumCard
        //   id={3}
        //   image={pic2}
        //   title={"球場名稱3"}
        //   description={[
        //     "106台北市大安區羅斯福路四段1號",
        //     "週一至週五",
        //     "16:00~22:00",
        //     8,
        //   ]}
        // /> */}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        {/* 其他內容 */}
        <Pagination count={10} color="primary" /> {/* 添加這一行 */}
      </Box>
    </div>
  );
}
