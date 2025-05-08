package com.laligaStats.searchPlayers.repository;

import com.laligaStats.searchPlayers.entity.PlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<PlayerEntity, Long> {
}
