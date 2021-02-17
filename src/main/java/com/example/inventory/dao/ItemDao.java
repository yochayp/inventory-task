package com.example.inventory.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.inventory.model.Item;
import com.example.inventory.repository.ItemRepository;

@Repository
public class ItemDao {

	@Autowired
	private ItemRepository itemRepository;
	
	public Item AddItem(Item item) {
		return	itemRepository.save(item);
	}
	
	public Item getItem(Long itemId) {
	return 	this.itemRepository.findById(itemId).get();
	}
	
	public List<Item> getItems(){
		List<Item> itemList = new ArrayList<>();
		 for (Item item : itemRepository.findAll()) {
             itemList.add(item);
           
         }
		return itemList;
		}
	
	public void deleteItem(Long itemId) {
		this.itemRepository.deleteById(itemId);
	}
	
	
	public void updateItem(Long itemId,int amount) {
		
		Item itemToUpdate = this.itemRepository.findById(itemId).get();
		itemToUpdate.setAmount(itemToUpdate.getAmount() + amount);
		this.itemRepository.save(itemToUpdate);
	}
}
