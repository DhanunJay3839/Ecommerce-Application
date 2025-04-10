package com.excelr.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ecomproducts")
public class Products {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int pid;
	private String pname;
	private float price;
	private float discount;
	private String pdescription;
	private String pstock;
	private String pimgurl;
	
	
	public Products() {
		super();
	}
	public Products(int pid, String pname, float price, float discount, String pdescription, String pstock,
			String pimgurl) {
		super();
		this.pid = pid;
		this.pname = pname;
		this.price = price;
		this.discount = discount;
		this.pdescription = pdescription;
		this.pstock = pstock;
		this.pimgurl = pimgurl;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public float getDiscount() {
		return discount;
	}
	public void setDiscount(float discount) {
		this.discount = discount;
	}
	public String getPdescription() {
		return pdescription;
	}
	public void setPdescription(String pdescription) {
		this.pdescription = pdescription;
	}
	public String getPstock() {
		return pstock;
	}
	public void setPstock(String pstock) {
		this.pstock = pstock;
	}
	public String getPimgurl() {
		return pimgurl;
	}
	public void setPimgurl(String pimgurl) {
		this.pimgurl = pimgurl;
	}
	@Override
	public String toString() {
		return "Products [pid=" + pid + ", pname=" + pname + ", price=" + price + ", discount=" + discount
				+ ", pdescription=" + pdescription + ", pstock=" + pstock + ", pimgurl=" + pimgurl + "]";
	}
	
	
	
	

}
