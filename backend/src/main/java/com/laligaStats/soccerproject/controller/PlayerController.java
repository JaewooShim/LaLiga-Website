package com.laligaStats.soccerproject.controller;

import com.laligaStats.soccerproject.entity.PlayerEntity;
import com.laligaStats.soccerproject.service.PlayerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class PlayerController {

    private final PlayerService playerService;


    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/nation")
    public List<PlayerEntity> getPlayersbyNation(@RequestParam String nation) {
        return playerService.getbyNation(nation);
    }

    @GetMapping("/pos")
    public List<PlayerEntity> getPlayersebyPos(@RequestParam String pos) {
        log.debug(pos);
        return playerService.getbyPos(pos);
    }

    @GetMapping("/team")
    public List<PlayerEntity> getPlayersbyTeam(@RequestParam String team) {
        return playerService.getbyTeam(team);
    }

    @GetMapping("/name")
    public List<PlayerEntity> getPlayersebyName(@RequestParam String name) {
        return playerService.getbyName(name);
    }
}
