package com.laligaStats.search_players.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "player_data")
@Data
public class PlayerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String player_name;
    private String nation;
    private String positions;
    private Integer age;
    private Integer matches_played;
    private Double goals;
    private Double assists;
    private Double penalty_goals;
    private Double yellow_card;
    private Double red_card;
    private Double expected_goals;
    private Double expected_assists;
    private String team_name;
}
