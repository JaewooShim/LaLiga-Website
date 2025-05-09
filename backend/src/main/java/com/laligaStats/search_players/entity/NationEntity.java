package com.laligaStats.search_players.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "nations")
@Data
public class NationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nation;
}
