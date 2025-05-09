package com.laligaStats.search_players.service;

import com.laligaStats.search_players.entity.NationEntity;
import com.laligaStats.search_players.entity.TeamEntity;
import com.laligaStats.search_players.repository.NationRepository;
import com.laligaStats.search_players.repository.PlayerRepository;
import com.laligaStats.search_players.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TabService {
    private final TeamRepository teamRepository;

    private final NationRepository nationRepository;


    public TabService(TeamRepository teamRepository, NationRepository nationRepository) {
        this.teamRepository = teamRepository;
        this.nationRepository = nationRepository;
    }

    public List<NationEntity> getAllNations() {
        return nationRepository.findAll().stream().toList();
    }

    public List<TeamEntity> getAllTeams() {
        return teamRepository.findAll().stream().toList();
    }
}
