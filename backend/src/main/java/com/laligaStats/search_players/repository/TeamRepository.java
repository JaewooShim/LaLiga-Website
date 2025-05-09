package com.laligaStats.search_players.repository;

import com.laligaStats.search_players.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {
}
