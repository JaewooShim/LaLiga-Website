package com.laligaStats.search_players.controller;

import com.laligaStats.search_players.entity.NationEntity;
import com.laligaStats.search_players.entity.TeamEntity;
import com.laligaStats.search_players.repository.NationRepository;
import com.laligaStats.search_players.repository.TeamRepository;
import com.laligaStats.search_players.service.TabService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tabs")
public class TabController {

    private final TabService tabService;

    public TabController(TabService tabService) {
        this.tabService = tabService;
    }

    @GetMapping("/teams")
    public List<TeamEntity> getAllTeams() {
        return tabService.getAllTeams();
    }

    @GetMapping("/nations")
    public List<NationEntity> getAllNations() {
        return tabService.getAllNations();
    }
}
