package com.excelr.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ecommerce {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int uid;
	private String uname;
	private String uemail;
	private String upass;
	public Ecommerce() {
		super();
	}
	public Ecommerce(int uid, String uname, String uemail, String upass) {
		super();
		this.uid = uid;
		this.uname = uname;
		this.uemail = uemail;
		this.upass = upass;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUemail() {
		return uemail;
	}
	public void setUemail(String uemail) {
		this.uemail = uemail;
	}
	public String getUpass() {
		return upass;
	}
	public void setUpass(String upass) {
		this.upass = upass;
	}
	@Override
	public String toString() {
		return "Ecommerce [uid=" + uid + ", uname=" + uname + ", uemail=" + uemail + ", upass=" + upass + "]";
	}
	
	
	
	

}
