package com.example.annualproject.influxApi.service.points;

import com.example.annualproject.security.Decrypter;
import org.influxdb.annotation.Column;
import org.influxdb.annotation.Measurement;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;

@Measurement(name = "allPoints")
public class AcceleroPoint implements Point{

    @Column(name = "ID")
    private String idUser;
    @Column(name = "acceleroX")
    private double acceleroX;
    @Column(name = "acceleroY")
    private double acceleroY;
    @Column(name = "acceleroZ")
    private double acceleroZ;
    @Column(name = "time")
    private Instant time;


    private long longtime;


    public void setLongtime(Instant longtime) {
        this.longtime = longtime.toEpochMilli();
    }

    public void setLongtime(long longtime) {
        this.longtime = longtime;
    }

    public long getLongtime() {
        return longtime;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public double getAcceleroX() {
        return acceleroX;
    }

    public void setAcceleroX(double acceleroX) {
        this.acceleroX = acceleroX;
    }

    public double getAcceleroY() {
        return acceleroY;
    }

    public void setAcceleroY(double acceleroY) {
        this.acceleroY = acceleroY;
    }

    public double getAcceleroZ() {
        return acceleroZ;
    }

    public void setAcceleroZ(double acceleroZ) {
        this.acceleroZ = acceleroZ;
    }
    @Override
    public boolean equals(Object obj) {
        AcceleroPoint acceleroPoint = (AcceleroPoint) obj;
        if(acceleroPoint.acceleroX!=this.acceleroX){
            return false;
        }
        if(acceleroPoint.acceleroY!=this.acceleroY){
            return false;
        }
        if(acceleroPoint.acceleroZ!=this.acceleroZ){
            return false;
        }
        return true;
    }
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash +  Double.valueOf(this.acceleroZ).hashCode()+Double.valueOf(this.acceleroZ).hashCode()*20+Double.valueOf(this.acceleroY).hashCode()*300;
        return hash;
    }



}
