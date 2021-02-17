package com.example.inventory.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.inventory.model.Item;
import com.example.inventory.service.ItemService;

@RestController
@RequestMapping("api/Items")
@CrossOrigin(origins = "*")
public class ItemController {

	private final ItemService itemService;

	@Autowired
	public ItemController(ItemService itemService) {
		this.itemService = itemService;
	}
	
	@PostMapping
	public Item AddItem(@RequestBody Item item) {
		return itemService.AddItem(item);
	}
	
	@GetMapping
	public List<Item> getItems(){
		return itemService.getItems();
	}
	
	@GetMapping("{id}")
	public Item getItem(@PathVariable(value = "id") Long itemId) {
		return itemService.getItem(itemId);
	}
	
	@DeleteMapping
	public void deleteItem(@RequestBody Long itemId) {
		itemService.deleteItem(itemId);
	}
	
	 @PutMapping("{id}")
	 public void updateItem(@PathVariable(value = "id") Long itemId,
			 				@RequestBody int amount) {
		itemService.updateItem(itemId,amount); 
		
	    }
}

