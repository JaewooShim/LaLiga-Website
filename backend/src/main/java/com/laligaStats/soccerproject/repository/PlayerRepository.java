package com.laligaStats.soccerproject.repository;

import com.laligaStats.soccerproject.entity.PlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<PlayerEntity, Long> {
}
