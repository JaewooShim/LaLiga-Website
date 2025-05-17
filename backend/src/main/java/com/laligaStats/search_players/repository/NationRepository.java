package com.laligaStats.search_players.repository;

import com.laligaStats.search_players.entity.NationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NationRepository extends JpaRepository<NationEntity, Long> {
}
