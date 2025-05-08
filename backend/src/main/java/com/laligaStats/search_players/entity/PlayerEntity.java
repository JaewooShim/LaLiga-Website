package com.laligaStats.search_players.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "player_data")
@Data
public class PlayerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String player_name;
    String nation;
    String positions;
    Integer age;
    Integer matches_played;
    Double goals;
    Double assists;
    Double penalty_goals;
    Double yellow_card;
    Double red_card;
    Double expected_goals;
    Double expected_assists;
    String team_name;
}
