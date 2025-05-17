package com.laligaStats.search_players.service;

import com.laligaStats.search_players.entity.NationEntity;
import com.laligaStats.search_players.entity.TeamEntity;
import com.laligaStats.search_players.repository.NationRepository;
import com.laligaStats.search_players.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TabService {
    private final NationRepository nationRepository;
    private final TeamRepository teamRepository;


    public TabService(NationRepository nationRepository, TeamRepository teamRepository) {
        this.nationRepository = nationRepository;
        this.teamRepository = teamRepository;
    }

    public List<NationEntity> getAllNations() {
        return nationRepository.findAll().stream().toList();
    }

    public List<TeamEntity> getAllTeams() {
        return teamRepository.findAll().stream().toList();
    }
}
