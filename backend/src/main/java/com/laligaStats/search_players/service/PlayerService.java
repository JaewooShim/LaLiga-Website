package com.laligaStats.search_players.service;

import com.laligaStats.search_players.entity.PlayerEntity;
import com.laligaStats.search_players.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerEntity> getbyNation(String nation) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getNation() != null &&
                        player.getNation().toLowerCase().contains(nation.toLowerCase())).toList();
    }

    public List<PlayerEntity> searchByName(String name) {
        return playerRepository.findByPrefix(name.toLowerCase());
    }

    public List<PlayerEntity> getbyTeam(String team) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam_name().equals(team)).toList();
    }

    // some players may have multiple positions
    public List<PlayerEntity> getbyPos(List<String> positions) {
        String[] posArray = positions.toArray(new String[0]);
        return playerRepository.findByPos(posArray);

    }
}
