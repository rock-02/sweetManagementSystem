package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entities.Sweet;

@Repository
public interface SweetRepository extends JpaRepository<Sweet, Long> {

    @Query("SELECT s FROM Sweet s WHERE s.name = ?1 AND s.category = ?2")
    Sweet findByNameAndCategory(String name, String category);
    

    @Query("SELECT s FROM Sweet s " +
           "WHERE (:name IS NULL OR s.name LIKE %:name%) " +
           "AND (:category IS NULL OR s.category = :category) " +
           "AND (:minPrice IS NULL OR s.price >= :minPrice) " +
           "AND (:maxPrice IS NULL OR s.price <= :maxPrice)")
    List<Sweet> searchSweets(@Param("name") String name,
                             @Param("category") String category,
                             @Param("minPrice") Double minPrice,
                             @Param("maxPrice") Double maxPrice);
}
