package com.example.annualproject.influxApi.service.influx;

import com.example.annualproject.influxApi.service.points.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.example.annualproject.influxApi.service.points.InfluxField.*;

@CrossOrigin
@Controller
@RequestMapping("/data")
@RestController
public class InfluxController {

    private final InfluxDBReader influxDBReader;

    @Autowired
    public InfluxController(InfluxDBReader influxDBReader) {
        this.influxDBReader=influxDBReader;
    }


    @GetMapping(value = "/getECG1PastMilli")
    public List<Point> getPointsBetweenTimeMilli(@RequestParam String id, @RequestParam long beginning, @RequestParam long ending ) throws Exception {
        List<Point> points=influxDBReader.readPointBeetweenTime(id,beginning,ending, ECG);

        return points;

    }


    @GetMapping(value = "/getRespiPastMilli")
    public List<Point> getRespiPointsBetweenTime(@RequestParam String id, @RequestParam long beginning, @RequestParam long ending) throws Exception {
        List<Point> points=influxDBReader.readPointBeetweenTime(id,beginning,ending, RESPI);

        return points;
    }
    @GetMapping(value = "/getSpo2PastMilli")
    public List<Point> getSpo2BetweenTimeMilli(@RequestParam String id, @RequestParam long beginning, @RequestParam long ending ) throws Exception {
        List<Point> points=influxDBReader.readPointBeetweenTime(id,beginning,ending, SPO2);

        return points;


    }
    @GetMapping(value = "/getAcceleroPastMilli")
    public List<Point> getAcceleroPointsBetweenTime(@RequestParam String id, @RequestParam long beginning, @RequestParam long ending) throws Exception {
        List<Point> points=influxDBReader.readPointBeetweenTime(id,beginning,ending, ACCELERO);

        return points;

    }
    @GetMapping(value = "/getTempPastMilli")
    public List<Point> getTempPointsBetweenTime(@RequestParam String id, @RequestParam long beginning, @RequestParam long ending) throws Exception {
        List<Point> points=influxDBReader.readPointBeetweenTime(id,beginning,ending, TEMP);

        return points;

    }
    @GetMapping(value = "/getMagnetoPastMilli")
    public List<Point> getMagnetoPointsBetweenTime(@RequestParam String id, @RequestParam long beginning, @RequestParam long ending) throws Exception {
        List<Point> points=influxDBReader.readPointBeetweenTime(id,beginning,ending, MAGNETO);

        return points;

    }
    @GetMapping(value = "/getGyroPastMilli")
    public List<Point> getGyroPointsBetweenTime(@RequestParam String id, @RequestParam long beginning, @RequestParam long ending) throws Exception {
        List<Point> points=influxDBReader.readPointBeetweenTime(id,beginning,ending, GYRO);

        return points;

    }



}