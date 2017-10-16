module.exports = {
    getSoldier: function(element) {
        return { 
            accuracy: element.accuracy,
            combatScore: element.combatScore,
            deaths: element.deaths,
            kills: element.kills,
            kdRatio: element.kdRatio,
            killsPerMinute: element.killsPerMinute,
            kills_assault: element.kills_assault,
            kills_engineer: element.kills_engineer,
            kills_recon: element.kills_recon,
            kills_support: element.kills_support,
            numRounds: element.numRounds,
            numWins: element.numWins,
            numLosses: element.numLosses,
            rank: element.rank,
            rankScore: element.rankScore,
            scorePerMinute: element.scorePerMinute,
            skill: element.skill,
            totalScore: element.totalScore
        };
    }
}