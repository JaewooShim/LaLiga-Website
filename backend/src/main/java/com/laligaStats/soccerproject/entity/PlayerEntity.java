package com.laligaStats.soccerproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "player_data")
public class PlayerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

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

    public PlayerEntity(Double expected_assists, String team_name, Double expected_goals, Double red_card,
                        Double yellow_card, Double goals, Double assists, Double penalty_goals, Integer matches_played,
                        Integer age, String nation, String player_name, String positions) {
        this.expected_assists = expected_assists;
        this.team_name = team_name;
        this.expected_goals = expected_goals;
        this.red_card = red_card;
        this.yellow_card = yellow_card;
        this.goals = goals;
        this.assists = assists;
        this.penalty_goals = penalty_goals;
        this.matches_played = matches_played;
        this.age = age;
        this.nation = nation;
        this.player_name = player_name;
        this.positions = positions;
    }

    public PlayerEntity() {
    }

    public String getPlayer_name() {
        return player_name;
    }

    public void setPlayer_name(String player_name) {
        this.player_name = player_name;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public Double getExpected_assists() {
        return expected_assists;
    }

    public void setExpected_assists(Double expected_assists) {
        this.expected_assists = expected_assists;
    }

    public Double getExpected_goals() {
        return expected_goals;
    }

    public void setExpected_goals(Double expected_goals) {
        this.expected_goals = expected_goals;
    }

    public Double getRed_card() {
        return red_card;
    }

    public void setRed_card(Double red_card) {
        this.red_card = red_card;
    }

    public Double getYellow_card() {
        return yellow_card;
    }

    public void setYellow_card(Double yellow_card) {
        this.yellow_card = yellow_card;
    }

    public Double getPenalty_goals() {
        return penalty_goals;
    }

    public void setPenalty_goals(Double penalty_goals) {
        this.penalty_goals = penalty_goals;
    }

    public Double getAssists() {
        return assists;
    }

    public void setAssists(Double assists) {
        this.assists = assists;
    }

    public Double getGoals() {
        return goals;
    }

    public void setGoals(Double goals) {
        this.goals = goals;
    }

    public Integer getMatches_played() {
        return matches_played;
    }

    public void setMatches_played(Integer matches_played) {
        this.matches_played = matches_played;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPositions() {
        return positions;
    }

    public void setPositions(String positions) {
        this.positions = positions;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }
}
