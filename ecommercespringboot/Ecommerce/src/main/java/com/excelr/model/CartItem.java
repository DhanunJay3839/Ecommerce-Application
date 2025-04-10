package com.excelr.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String pname;
    private String pimgurl;
    private double price;
    private int quantity;

    public CartItem() {}

    public CartItem(String pname, String pimgurl, double price, int quantity) {
        this.pname = pname;
        this.pimgurl = pimgurl;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPname() { return pname; }
    public void setPname(String pname) { this.pname = pname; }

    public String getPimgurl() { return pimgurl; }
    public void setPimgurl(String pimgurl) { this.pimgurl = pimgurl; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
