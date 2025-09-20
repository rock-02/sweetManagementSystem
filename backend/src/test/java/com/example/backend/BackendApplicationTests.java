package com.example.backend;

import com.example.backend.entities.Sweet;
import com.example.backend.repositories.SweetRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class BackendApplicationTests {

	@Autowired
	private SweetRepository sweetRepository;

	@Test
	void contextLoads() {
	}

	@Test
	void testAddAndFindSweet() {
		Sweet sweet = Sweet.builder()
				.name("Rasgulla")
				.category("Bengali")
				.price(100.0)
				.quantityStock(50.0)
				.build();
		Sweet saved = sweetRepository.save(sweet);
		Sweet found = sweetRepository.findById(saved.getId()).orElse(null);
		Assertions.assertNotNull(found);
		Assertions.assertEquals("Rasgulla", found.getName());
	}

	@Test
	void testFindByNameAndCategory() {
		Sweet sweet = Sweet.builder()
				.name("Barfi")
				.category("North")
				.price(80.0)
				.quantityStock(30.0)
				.build();
		sweetRepository.save(sweet);
		Sweet found = sweetRepository.findByNameAndCategory("Barfi", "North");
		Assertions.assertNotNull(found);
		Assertions.assertEquals("Barfi", found.getName());
	}

	@Test
	void testSearchSweets() {
		sweetRepository.save(Sweet.builder().name("Ladoo").category("South").price(60.0).quantityStock(20.0).build());
		sweetRepository.save(Sweet.builder().name("Ladoo").category("North").price(70.0).quantityStock(10.0).build());
		List<Sweet> results = sweetRepository.searchSweets("Ladoo", null, null, null);
		Assertions.assertFalse(results.isEmpty());
		Assertions.assertTrue(results.stream().allMatch(s -> s.getName().contains("Ladoo")));
	}
}
