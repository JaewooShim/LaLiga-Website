package com.laligaStats.search_players.repository;

import com.laligaStats.search_players.entity.PlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayerRepository extends JpaRepository<PlayerEntity, Long> {
    @Query(value = "SELECT * FROM player_data WHERE player_name ILIKE CONCAT('%', :prefix, '%') " +
            "ORDER BY CASE WHEN player_name ILIKE CONCAT(:prefix, '%') THEN 0 ELSE 1 END, player_name " +
            "LIMIT 15", nativeQuery = true)
    List<PlayerEntity> findByPrefix(@Param("prefix") String prefix);

    @Query(value = "SELECT * FROM player_data WHERE positions @> CAST(:posArray AS text[])", nativeQuery = true)
    List<PlayerEntity> findByPos(@Param("posArray") String[] posArray);
}
