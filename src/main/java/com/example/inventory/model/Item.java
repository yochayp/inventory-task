package com.example.inventory.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
public class Item {

	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	
	 private Long id;
	 private String itemName;
	 private int amount;
	 private String inventoryCode;
	 
	 public Item() {
		 
	 }
	 public Item(
			 @JsonProperty("name") String itemName,
			 @JsonProperty("amount") int amount,
			 @JsonProperty("inventoryCode")String inventoryCode
			 ) {
		 this.itemName = itemName;
		 this.amount = amount;
		 this.inventoryCode = inventoryCode;
	 }


	 public String getItemName() {
		 return itemName;
	 }
	public Long getItemId() {
		return id;
	}
	public int getAmount() {
		return amount;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	@Override
	public String toString() {
		return "Item [id=" + id + ", itemName=" + itemName + ", amount=" + amount + ", inventoryCode=" + inventoryCode
				+ "]";
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public void setInventoryCode(String inventoryCode) {
		this.inventoryCode = inventoryCode;
	}
	public String getInventoryCode() {
		return inventoryCode;
	}
	
}

