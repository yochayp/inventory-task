package com.example.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inventory.dao.ItemDao;
import com.example.inventory.model.Item;

@Service
public class ItemService {

	private final ItemDao itemDao;

	@Autowired
	public ItemService(ItemDao itemDao) {
		this.itemDao = itemDao;
	}
	
	public Item AddItem(Item item) {
		return itemDao.AddItem(item);
	}
	public Item getItem(Long itemId) {
		return itemDao.getItem(itemId);
	}
	public List<Item> getItems(){
		return itemDao.getItems();
		}
	
	public void deleteItem(Long itemId) {
		itemDao.deleteItem(itemId);
	}
	
	public void updateItem(Long itemId,int amount) {
		itemDao.updateItem(itemId,amount);
	}
}

