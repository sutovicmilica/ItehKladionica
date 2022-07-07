import axios from "axios";
import { Request, Response } from "express";



export function getWeather(request: Request, response: Response) {
  axios.get('http://www.7timer.info/bin/api.pl?lon=20.47246239&lat=44.772349&product=civillight&output=json', {
    withCredentials: false
  })
    .then(res => {
      response.json(res.data.dataseries[0]);
    })
}