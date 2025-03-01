package com.example.globetrotter.Repository;

import com.example.globetrotter.Entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface DestinationRepository extends JpaRepository<Destination, Long> {

    @Query(value = "SELECT * FROM destination ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Destination getRandomDestination();


}
