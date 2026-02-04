addLayer("m", {
    name: "Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#dc1313",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Multipliers", // Name of prestige currency
    baseResource: "particles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('m', 14)) mult = mult.times(2)
          if (hasUpgrade('q', 12)) mult = mult.times(1.5)
            if (hasUpgrade('q', 13)) mult = mult.times(2)

       if(inChallenge('a', 12)) {mult = mult.times(1)}
         else if (hasMilestone('h', 2)) {mult = mult.times(player.h.points.pow(0.5).plus(1))}
        
         if (hasUpgrade('m', 22)) mult = mult.times(2)
            if (hasUpgrade('m', 24)) mult = mult.times(1.1)
        if (inChallenge("a", 12)) mult = mult.times(0.33333) 
        if (hasUpgrade('v', 11)) mult = mult.times(3)
        if (hasUpgrade('v', 14)) mult = mult.times(upgradeEffect('v', 14))
        if (hasChallenge('a', 12)) mult = mult.times(challengeEffect('a', 12))
        if (getBuyableAmount('v', 11).gte(1))  mult = mult.times(buyableEffect('v', 11).plus(1))
            if (hasUpgrade('hm', 11)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        if(inChallenge('a', 12)) return 0
       else if(hasMilestone('h', 6)) return .01
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for multipliers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
    upgrades: {
    11: {
        title: "Humble beginnings",
        description: "A cosmic... multipliers aren't cosmic. Experience your first particle boost(Roughly .69 more)",
        cost: new Decimal(3),
        
        
    },
    12: {
        title: "Deviance",
        description: "Multipliers have no direct correlation with particles. But maybe a virtual one. Another gain boost",
        cost: new Decimal(6),
        
    },
    13: {
        title: "Hyperance",
        description: "Multipliers now boost particles.",
        cost: new Decimal(11),
            effect() { if(hasUpgrade('m', 25)) return player[this.layer].points.plus(3).log10().pow(.6).plus(1)
             else
        return player[this.layer].points.plus(2).log10().pow(.5).plus(1)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        
    },
     14: {
        title: "Cosmic-y",
        description: "2x Multiplier gain",
        cost: new Decimal(20),
        
    },
    15: {
        title: "Quirks",
        description: "Quarks are now boosted!",
        cost: new Decimal(80),
        
    },
    16: {
        title: "Humility",
        description: "Unlock the Crafting Table and Inventory",
        cost: new Decimal(120),
       effect() {if(hasUpgrade('m', 16)) player.ct.points = 1}
    },
    17: {
        title: "Ferocity",
        description: "1.5x particle gain",
        cost: new Decimal(180),
        
    },
    21: {
        title: "Row 2",
        description: "Double particle gain",
        cost: new Decimal(10000),
        unlocked() {if(hasUpgrade("a", 14)) return true}
        
    },
    22: {
        title: "Row 2.1",
        description: "Double multiplier boost",
        cost: new Decimal(20000),
        unlocked() {if(hasUpgrade("a", 14)) return true}
        
    },
    23: {
        title: "Uptown",
        description: "Double quark boost",
        cost: new Decimal(50000),
        unlocked() {if(hasUpgrade("a", 14)) return true}
        
    },
    24: {
        title: "Downtown",
        description: "1.1 boost to all three aforementioned boosts",
        cost: new Decimal(75000),
        unlocked() {if(hasUpgrade("a", 14)) return true}
        
    },
     25: {
        title: "Efficency",
        description: "Improve Upgrade 13's effect",
        cost: new Decimal(125000),
        unlocked() {if(hasUpgrade("a", 14)) return true}
        
    },
}
})

addLayer("q", {
    name: "Quarks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
       uq: new Decimal(0), // Up Quarks
    dq: new Decimal(0), // Down Quarks
     sq: new Decimal(0), // Strange Quarks
     cq: new Decimal(0), // Charm Quarks
     tq: new Decimal(0), // Top Quarks
     bq: new Decimal(0), // Bottom Quarks

        
    }},
    color: "#c22ca9",
    passiveGeneration() {
        if(hasMilestone('ce', 1)) return 1
        else if(hasUpgrade('c', 11)) return .01
},

    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Quarks", // Name of prestige currency
    baseResource: "particles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
   
    exponent: 0.4, // Prestige currency exponent
    nodeStyle: {
       "border-radius": "100px",
       "width": "80px",
         "height": "120px",
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('m', 15)) mult = mult.times(1.5)

            if(inChallenge('a', 12)) {mult = mult.times(1)}
         else if (hasMilestone('h', 2)) {mult = mult.times(player.h.points.pow(0.5).plus(1))}

        if (hasUpgrade('a', 12)) mult = mult.times(upgradeEffect('a', 12))
        mult = mult.times(player.ct.hq.plus(1))
    if (hasUpgrade('m', 23)) mult = mult.times(2)
        if (hasUpgrade('m', 24)) mult = mult.times(1.1)
        if (hasUpgrade('v', 15)) mult = mult.times(upgradeEffect('v', 15))
        if (hasUpgrade('hm', 12)) mult = mult.times(10)
        return mult
       
    },
    doReset(reset){
        let keep = []
        keep.push("uq")
        keep.push("dq")
        keep.push("sq")
        keep.push("cq")
        keep.push("tq")
        keep.push("bq")
        if (layers[reset].row > this.row) {layerDataReset("q", keep)}
    },

    gainExp() { // Calculate the exponent on main currency from bonuses

        return new Decimal(1)

    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    update(diff) {
         if (hasUpgrade("q", 15)) {
            player.q.uq = player.q.uq.plus(new Decimal(0.001).mul(diff))
        } 
   if(player.q.dq >= 1){
     player.q.uq = player.q.uq.plus(new Decimal(0.001).mul(player.q.dq).mul(diff))}
     if(player.q.sq >= 1){
        player.q.dq = player.q.dq.plus(new Decimal(0.01).mul(player.q.sq).mul(diff))
     }
     if(player.q.cq >= 1){
        player.q.sq = player.q.sq.plus(new Decimal(0.1).mul(player.q.cq).mul(diff))
     }
     if(player.q.tq >= 1){
        player.q.cq = player.q.cq.plus(new Decimal(0.5).mul(player.q.tq).mul(diff))
     }
     if(player.q.bq >= 1){
        player.q.tq = player.q.tq.plus(new Decimal(1).mul(player.q.bq).mul(diff))
     }
      if(player.a.neutrons >= 1){
        player.q.bq = player.q.bq.plus(new Decimal(0.001).mul(player.a.neutrons).mul(diff))
     }
   },
   
    tabFormat: {
    "Upgrades and Prestige": {
        content: [
            ["main-display", function() {return "main-display"},
                {"font-family": "Times New Roman"}
            ],
           "blank",
           ["prestige-button", function() {return "prestige-button"}
              , {"border-radius": "0px"}
           ],
            "blank",
            "blank",
          
            ["display-text", function() {return 'You have ' + format(player.points) + ' particles.'}],
            "blank",
           ["upgrades", function() {return "upgrades", "1"}],],
        
    },
    "Quark types": {
        content: [
        ["infobox", "lore"],
            "blank",
             "blank",
            ["display-text", function() {return 'You have ' + format(player.q.uq) + ' Up Quarks'},
             {"font-size": "25px", "color": "#000000", "border": "4px solid #d400ff", "padding": "18px", "background-image": "linear-gradient(90deg,rgba(255, 0, 251, 1) 0%, rgba(238, 0, 255, 1) 50%, rgba(187, 0, 212, 1) 100%)"}
            ],
            "blank",
             "blank",
             "blank",
            ["display-text", function() {return 'You have ' + format(player.q.dq) + ' Down Quarks'},
             {"font-size": "25px", "color": "#000000", "border": "4px solid #67007c", "padding": "18px", "background-image": "linear-gradient(90deg,rgb(134, 0, 132) 0%, rgb(87, 0, 94) 50%, rgb(95, 0, 107) 100%)"}
            ],
            "blank",
             "blank",
             "blank",
            ["display-text", function() {return '<div class="shake-animation-light">You have ' + format(player.q.sq) + ' Strange Quarks'},
             {"font-size": "25px", "color": "#000000", "border": "4px solid #032500", "padding": "18px", "background-image": "linear-gradient(90deg,rgb(0, 85, 11) 0%, rgb(2, 49, 0) 50%, rgb(0, 48, 2) 100%)"}
            ],
            "blank",
             "blank",
             "blank",
            
            ["display-text", function() {return '<div class="shake-animation-medium">You have ' + format(player.q.cq) + ' Charm Quarks'},
             {"font-size": "25px", "color": "#000000", "border": "4px solid #090081", "padding": "18px", "background-image": "linear-gradient(90deg,rgb(11, 0, 172) 0%, rgb(10, 0, 100) 50%, rgb(5, 0, 48) 100%)"}
            ],
            "blank",
             "blank",
             "blank",
            
            ["display-text", function() {return '<div class="shake-animation-intense">You have ' + format(player.q.tq) + ' Top Quarks'},
             {"font-size": "25px", "color": "#000000", "border": "4px solid #5a5a5a", "padding": "18px", "background-image": "linear-gradient(90deg,rgb(77, 77, 77) 0%, rgb(68, 68, 68) 50%, rgb(43, 43, 43) 100%)"}
            ],
            "blank",
             "blank",
             "blank",
            
            ["display-text", function() {return '<div class="vibrate">You have ' + format(player.q.bq) + ' Bottom Quarks'},
             {"font-size": "25px", "color": "#000000", "border": "4px solid #181818", "padding": "18px", "background-image": "linear-gradient(90deg,rgb(36, 36, 36) 0%, rgb(26, 26, 26) 50%, rgb(19, 19, 19) 100%)"}
            ],
            "blank",
             "blank",
        "buyables"],
        
        
    },
    
},
infoboxes: {
    lore: {
        title: "Quarks explained",
        body() { return `Quarks are currently one of the smallest known subatomic particles. They make up protons and neutrons in pairs of 3.
         According to the U.S. Department of Energy.gov site, there are 6 types of quarks, each with different properties. Up, Down, Strange, Charm, Top, and Bottom.
         Quarks have 3 fundamental properties: Charge, Spin and Color. Charge comes from the law of electromagnetism where quarks are either positive or negative.
         It's important to note charges can be decimals. Spin represents the momentum(angular) and is always 1/2(One half).
         Color(a charge) is similar to standard positive and negative but has three distinct states. Blue, red and yellow(Quarks aren't any of these colors).
         Colors help bind 3 quarks together as each quark needs to be a different color. Protons and neutrons are colorless. Any type of Quark can be any color.
          Up and Down quarks make up most matter in the universe, with Up quarks being positively charged, lightest, and most stable.
         Down quarks are negatively charged, slightly heavier, and less stable. Strange and Charm quarks are more massive and less stable, with Strange being negatively charged and Charm positively charged.
         Top and Bottom quarks are the heaviest and least stable, with Top being positively charged and Bottom negatively charged.
         Thanks to Wikipedia and the Department of Energy for this information. Note: wikipedia isn't always reliable, but I did fact check.` },
        
    },
    
},

     upgrades: {
    11: {
        title: "Another Tree?",
        description: "Earn a particle boost",
        cost: new Decimal(2),
        
    },
    12: {
        title: "6 fold",
        description: "Earn a multiplier boost!",
        cost: new Decimal(6),
        
    },
    13: {
        title: "Self-sustaining",
        description: "Particles boost particles",
        cost: new Decimal(10),
        effect() {
             if(inChallenge("a", 11)) return new Decimal(1)
             else return player.points.add(1).pow(0.20)
        },
        effectDisplay() {
            return format(upgradeEffect(this.layer, this.id))+"x"
        }
        
    },
    14: {
        title: "The Generalist",
        description: "Stability doesn't matter. Double Multipliers",
        cost: new Decimal(18),
           
        
    },
     15: {
        title: "Rebound",
        description: "Quarks now boost particles",
        cost: new Decimal(24),
        effect() {
                  return player[this.layer].points.add(1).pow(0.15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
     16: {
        title: "Generator",
        description: "1.5x boost to particle gain",
        cost: new Decimal(40),
           
        
    },
    17: {
        title: "Quarks unlocked",
        description: "Passively generate up quarks.",
        cost: new Decimal(50),
           
        
    },
    18: {
        title: "Buymax",
        description: "Buy max quark converters",
        cost: new Decimal(500),
           
        
    },
},
buyables: {
    11: {
        cost() { return new Decimal(1) },
        title() { return "Down Quark converter" },
        display() { return "Exchange your Up Quarks for Down Quarks. Each quark boots the gain of the quark below it" },
        canAfford() { return player.q.uq.gte(this.cost(1)) },
        buyMax() {if(hasUpgrade('q', 18)) return true},
        buy() {
              let costPerUnit = this.cost(1)
    let max = new Decimal(1)

    if(this.buyMax()) {
        // calculate how many can be bought
        max = player.q.uq.div(costPerUnit).floor()
        if (max.lt(1)) max = new Decimal(1) // buy at least 1
    }

    player.q.uq = player.q.uq.sub(costPerUnit.mul(max))
    player.q.dq = player.q.dq.add(max)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "costs 1 Up Quark",
        
    },
     12: {
        cost() { return new Decimal(10) },
        title() { return "Strange Quark converter" },
        display() { return "Exchange your Down Quarks for Strange Quarks" },
        canAfford() { return player.q.dq.gte(this.cost(1)) },
        buyMax() {if(hasUpgrade('q', 18)) return true},
        buy() {
            let costPerUnit = this.cost(1)
    let max = new Decimal(1)

    if(this.buyMax()) {
        // calculate how many can be bought
        max = player.q.dq.div(costPerUnit).floor()
        if (max.lt(1)) max = new Decimal(1) // buy at least 1
    }

    player.q.dq = player.q.dq.sub(costPerUnit.mul(max))
    player.q.sq = player.q.sq.add(max)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "Costs 10 Down Quarks",
       
    },
    13: {
        cost() { return new Decimal(100) },
        title() { return "Charm Quark converter" },
        display() { return "Exchange your Strange Quarks for Charm Quarks" },
        canAfford() { return player.q.sq.gte(this.cost(1)) },
        buyMax() {if(hasUpgrade('q', 18)) return true},
        buy() {
             let costPerUnit = this.cost(1)
    let max = new Decimal(1)

    if(this.buyMax()) {
        // calculate how many can be bought
        max = player.q.sq.div(costPerUnit).floor()
        if (max.lt(1)) max = new Decimal(1) // buy at least 1
    }

    player.q.sq = player.q.sq.sub(costPerUnit.mul(max))
    player.q.cq = player.q.cq.add(max)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "Costs 100 Strange Quarks",
    
    },
     21: {
        cost() { return new Decimal(1000) },
        title() { return "Top Quark converter" },
        display() { return "Exchange your Charm Quarks for Top Quarks" },
        canAfford() { return player.q.cq.gte(this.cost(1)) },
        buyMax() {if(hasUpgrade('q', 18)) return true},
        buy() {
           let costPerUnit = this.cost(1)
    let max = new Decimal(1)

    if(this.buyMax()) {
        // calculate how many can be bought
        max = player.q.cq.div(costPerUnit).floor()
        if (max.lt(1)) max = new Decimal(1) // buy at least 1
    }

    player.q.cq = player.q.cq.sub(costPerUnit.mul(max))
    player.q.tq = player.q.tq.add(max)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "Costs 1000 Charm Quarks",
    
    },
    22: {
        cost() { return new Decimal(10000) },
        title() { return "Bottom Quark converter" },
        display() { return "Exchange your Top Quarks for Bottom Quarks" },
        canAfford() { return player.q.tq.gte(this.cost(1)) },
        buyMax() {if(hasUpgrade('q', 18)) return true},
        buy() {
          let costPerUnit = this.cost(1)
    let max = new Decimal(1)

    if(this.buyMax()) {
        // calculate how many can be bought
        max = player.q.tq.div(costPerUnit).floor()
        if (max.lt(1)) max = new Decimal(1) // buy at least 1
    }

    player.q.tq = player.q.tq.sub(costPerUnit.mul(max))
    player.q.bq = player.q.bq.add(max)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "Costs 10,000 Top Quarks",
    
    },
    23: {
        cost() { return new Decimal(100) },
        title() { return "Neutron converter" },
        display() { return "Exchange your Top Quarks for neutrons" },
        canAfford() { return player.q.bq.gte(this.cost(1)) },
        buyMax() {if(hasUpgrade('q', 18)) return true},
        buy() {
           player.q.uq = new Decimal(1)
           player.q.dq = new Decimal(0)
           player.q.sq = new Decimal(0)
           player.q.cq = new Decimal(0)
           player.q.tq = new Decimal(0)
           player.q.bq = new Decimal(0)
           player.a.neutrons = player.a.neutrons.add(1)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "Costs 100 Bottom Quarks, but this resets all quarks",
    
    },
    
},}
)
addLayer("h", {
    name: "Hyper Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (player.m.points.gte(400) || player.h.points >= 1 || player.hm.points >= 1 || player.ce.points >= 1) },
        
		points: new Decimal(0),
        variable: new Decimal(0),
        autoPrestige: false
    }},
    color: "#36d428",
    requires: new Decimal(400), // Can be a function that takes requirement increases into account
    resource: "Hyper Multipliers", // Name of prestige currency
    baseResource: "Multipliers", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
     nodeStyle: {
       "border-radius": "0px",
       
    },
   doReset(reset){
    let keep = []
     keep.push("variable")
      if (reset == "v") player.h.points = new Decimal(0)
         if (layers[reset].row > this.row) {layerDataReset("h", keep)}
   },

    exponent: new Decimal(1), // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    autoPrestige() {
     if(hasUpgrade('v', 12) && player.h.autoPrestige == true) return true
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["m"],
    update() {
        if((player.m.points.gte(400) || player.h.points >= 1 || player.hm.points >= 1 || player.ce.points >= 1)) {
        player.h.variable = new Decimal(1)}
    },
    hotkeys: [
        {key: "h", description: "H: Reset for hyper multipliers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if(player.h.variable == 1) return true
    },
 
milestones: {
    1: {
        requirementDescription: "1 Hyper Multiplier",
        effectDescription: "Hyper... trophy? Enjoy a 4x particle boost",
        done() { return player.h.points.gte(1) },
    },
     2: {
        requirementDescription: "2 Hyper Multipliers",
        effectDescription: "Quarks and Multipliers are boosted based on Hyper Multipliers" ,
       
       
        done() { return player.h.points.gte(2) },
    },
     3: {
        requirementDescription: "3 Hyper Multiplier",
        effectDescription: "Earn the ability to craft Hyper Quarks. Hyper Quarks can stack up quickly. Maximum of 5 allowed",
        done() { return player.h.points.gte(3) },
    },
    4: {
        requirementDescription: "4 Hyper Multiplier",
        effectDescription: "Autobuy row 1 multiplier upgrades",
        done() { return player.h.points.gte(4) },
        effect() {
            if (inChallenge('a', 12)) return null
           else if (hasMilestone('h', 4)) {
                buyUpgrade("m", 11)
            buyUpgrade("m", 12)
            buyUpgrade("m", 13)
            buyUpgrade("m", 14)
            buyUpgrade("m", 15)
            buyUpgrade("m", 16)
            buyUpgrade("m", 17)
        }
    },

},
5: {
        requirementDescription: "Auto-Prestige toggle",
        effectDescription: "Obtain the 2nd Vinyl Multiplier Upgrade",
        done() { if(hasUpgrade('v',12)) return true },
        unlocked() {if(hasUpgrade('v',12)) return true},
        toggles: [["h", "autoPrestige"]]
    },
6: {
        requirementDescription: "6 Hyper Multiplier",
        effectDescription: "Passively generate 1% of multiplier",
        done() { return player.h.points.gte(6) },
        unlocked() {if(hasUpgrade('v',13)) return true}
    },
7: {
        requirementDescription: "8 Hyper Multiplier",
        effectDescription: "Autobuy row 2 multiplier upgrades",
        done() { return player.h.points.gte(8) },
        unlocked() {if(hasUpgrade('v',13)) return true},
         effect() {
             if (inChallenge('a', 12)) return null
           
           else if (hasMilestone('h', 7)) {
                buyUpgrade("m", 21)
            buyUpgrade("m", 22)
            buyUpgrade("m", 23)
            buyUpgrade("m", 24)
            buyUpgrade("m", 25)
            
        }
    },
} } }
)

addLayer("a", {
    name: "Atoms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (player.q.points.gte(50) || player.a.points >= 1 || player.hm.points >= 1)},
		points: new Decimal(0),
        protons: new Decimal(0),
        neutrons: new Decimal(0),
        electrons: new Decimal(0),
        lbaryon: new Decimal(0), 
        variable: new Decimal(0)
    }},
    color: "#470707",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Atoms", // Name of prestige currency
    baseResource: "Quarks", // Name of resource prestige is based on
    baseAmount() {return player.q.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
   
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(reset){
        let keep = []
        keep.push("protons")
        keep.push("neutrons")
        keep.push("electrons")
        keep.push("variable")
         if (layers[reset].row > this.row) {layerDataReset("a", keep)}
    },
    update() {
        if (player.q.points.gte(50) || player.a.points >= 1 || player.hm.points >= 1){
            player.a.variable = new Decimal(1)
        }
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["q"],
    hotkeys: [
        {key: "a", description: "A: Reset for atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (player.a.variable == 1)
    },
  


     upgrades: {
    11: {
        title: "Howdron quaint",
        description: "2x Particle gain",
        cost: new Decimal(1),
        
    },
    12: {
        title: "Atomizer",
        description: "Atoms now boost Quarks",
        cost: new Decimal(3),
        effect(){  if(inChallenge("a", 11)) {return new Decimal(1)}
         else {if (hasUpgrade('a', 12)) return player[this.layer].points.plus(1).pow(0.5)}},
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
     13: {
        title: "Subatomic",
        description: "Particle gain boost",
        cost: new Decimal(5),
        
    },
    14: {
        title: "Gyser",
        description: "Unlock more Multiplier Upgrades",
        cost: new Decimal(7),
        
    },
     15: {
        title: "Atman",
        description: "Autobuy row 1 Quark Upgrades",
        cost: new Decimal(15),
        effect() {
            if(hasUpgrade('a', 15)) {
                buyUpgrade("q", 11)
            buyUpgrade("q", 12)
            buyUpgrade("q", 13)
            buyUpgrade("q", 14)
            buyUpgrade("q", 15)
            buyUpgrade("q", 16)
            buyUpgrade("q", 17)
            buyUpgrade("q", 18)
            }

        }
        
    },
     16: {
        title: "True man",
        description: "Unlock the atomizer challenge. ",
        cost: new Decimal(20),
        
    },
},
 tabFormat: {
    "Upgrades and Prestige": {
        content: [
            ["main-display", function() {return "main-display"},
                {"font-family": "Times New Roman"}
            ],
           "blank",
           ["prestige-button", function() {return "prestige-button"}
              , {"border-radius": "0px"}
           ],
            "blank",
            "blank",
          
            ["display-text", function() {return 'You have ' + format(player.q.points) + ' quarks.'}],
            "blank",
           "upgrades",
           "challenges"
        ],
        
    },
    "Atomic Particles": {
        content: [
        ["infobox", "lore1"],
        "blank",
        ["infobox", "lore2"],
            "blank",
             "blank",
            ["display-text", function() {return 'You have ' + format(player.a.protons) + ' protons'},
             {"font-size": "24px", "color": "#000000", "border": "4px solid #00ff00", "padding": "17px", "background-image": "linear-gradient(90deg,rgb(21, 255, 0) 0%, rgb(0, 172, 14) 50%, rgb(1, 100, 6) 100%)"}
            ],
            "blank",
                "blank",
                "blank",
            ["display-text", function() {return 'You have ' + format(player.a.neutrons) + ' neutrons'},
             {"font-size": "24px", "color": "#000000", "border": "4px solid #353535", "padding": "17px", "background-image": "linear-gradient(90deg,rgb(107, 107, 107) 0%, rgb(126, 126, 126) 50%, rgb(121, 121, 121) 100%)"}
            ],
            "blank",
            "blank",
                "blank",
             ["display-text", function() {return 'You have ' + format(player.a.electrons) + ' electrons'},
             {"font-size": "24px", "color": "#000000", "border": "4px solid #4e0000", "padding": "17px", "background-image": "linear-gradient(90deg,rgb(155, 0, 0) 0%, rgb(156, 0, 0) 50%, rgb(99, 0, 0) 100%)"}
            ],
            "blank",
             "blank",
       ],
        
        
    },
    
},
infoboxes: {
    lore1: {
        title: "Hadrons explained",
        body() { return `Hadrons are particles made up of Quarks. In everday life, we only encounter protons and neutrons, as they are the most stable. Protons and neutrons dominate daily chemistry, with a proton being positive, lighter and more stable, and neutrons being neutral and less stable. If not binded to a proton, a free-flowing neutron would decay in roughly 15 minutes. A proton is made up of 2 up quarks and 1 down quark. A neutron is made up of 2 down quarks and 1 up quark` }, }, 
    lore2: {
        title: "Electrons explained",
        body() { return `Electrons are elementary subatomic particles(They are not made up of anything smaller), with a negative charge. Electrons are responsible for everyday chemistry, as most reactions involve the transfer of electrons. Electrons are very weird, while they do orbit protons and neutrons(the nucleus), because of quantum mechanics, they act as both waves and points, meaning you will not know where an electron is until you measure it, as it will collapse into one state.` }, }, },
challenges: {
    11: {
        name: "The Atomizer",
        challengeDescription: "Self-Sustainability is disabled. Atoms no longer boost Quarks. ",
        goalDescription: "Obtain 1,000,000 Quarks",
        canComplete: function() {return player.q.points.gte(1000000)},
        unlocked() {
            return (hasUpgrade('a', 16))
        },
        completionLimit: 1,
        rewardDisplay() {
            return "Unlock advanced telescopes and radar technology in Cosmic Dust"
        }
    },
     12: {
        name: "The Atominator",
        challengeDescription: "Hyper-Multiplier and Vinyl Multiplier's effects no longer work. ",
        goalDescription: "Obtain 1e9 points",
        canComplete: function() {return player.points.gte(1e9)},
        unlocked() {
            return (getClickableState('c', 53))
        },
        completionLimit: 1,
        rewardDescription: "Atoms now boost multiplier",
        rewardEffect() {
            return player[this.layer].points.plus(1).pow(0.5)
        },
        rewardDisplay() {
            return format(challengeEffect(this.layer,this.id)) + "x"
        }
    },
    
}}, )


addLayer("ct", {
    name: "Crafting Table", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (hasUpgrade("m", 16))},
		points: new Decimal(1),
        hq: new Decimal(0), // Hyper Quarks
        
        variable: new Decimal(0)
    }},
    color: "#311403",
    requires: new Decimal(400), // Can be a function that takes requirement increases into account
    resource: "Crafting Table", // Name of prestige currency
    baseResource: "Multipliers", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
   
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
   update() {
    if (hasUpgrade("m", 16)) {
        player.ct.variable = new Decimal(1)
    }
   },
    hotkeys: [],
    layerShown(){return (hasUpgrade("m", 16)) || player.ct.variable == 1

    },
    
   tabFormat: {
    "Crafting": {
        content: [
            "main-display",
           "blank",
           ["prestige-button", 
            {"border-radius": "0px"}
           ],
            "blank",
            "blank",
          
           ["infobox", "lore"
            
           ],
            "blank",
            ["buyable", "11"],
            "blank",
            "blank",
            "blank",
            "blank",
            ["buyable", "13"],
            "blank",
            "blank",
            "blank",
            "blank",
        ["buyable", "12"],
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
    "upgrades"],
        
    },
    "Inventory": {
        content: [
            "blank",
           ["display-text", function() {if(hasMilestone('h', 3)) return 'You have ' + format(player.ct.hq) + ' Hyper Quarks'},
             {"font-size": "30px", "color": "#000000", "border": "4px solid #788C82", "padding": "20px", "background-image": "linear-gradient(90deg, rgb(0, 255, 21) 0%, rgb(214, 240, 227) 50%, rgb(187, 0, 212) 100%)"}]
            ]
            
            
        
        
        
    },
    
 },
infoboxes: {
    lore: {
        title: "Crafting Table",
        body() { return `The Crafting Table allows you to craft items using resources you've gathered.
         Currently, this feature is under development and will be expanded in future updates.` }, }, },
    
 buyables: {
            11: {
                
        cost(x) { return new Decimal(1).mul(x) },
        title() { return "Hyper Quarks" },
        display() { return "Exchange 3 Hyper Multipliers and 300 Quarks for 1 Hyper Quark" },
        canAfford() {
            if (player.h.points.gte(this.cost(3)) && player.q.points.gte(this.cost(300))) {return true} else {return false}   
         },
         unlocked() {
            if(inChallenge('a', 12)) return false
            else if(hasMilestone('h', 3)) return true
         },
        buy() {
            player.h.points = player.h.points.sub(this.cost(3))
            player.q.points = player.q.points.sub(this.cost(300))
           player.ct.hq = player.ct.hq.add(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
       style() {
            return {backgroundImage: this.canAfford()?"linear-gradient(90deg, rgb(0, 255, 13) 0%, rgb(214, 240, 227) 50%, rgb(187, 0, 212) 100%)":"linear-gradient(90deg, rgb(0, 255, 21) 0%, rgb(214, 240, 227) 50%, rgb(183, 0, 207) 100%)",
            borderRadius: "0px", 
            border: "4px solid #788C82",
            fontSize: "20px",
            padding: "20px",
            width: "400px",
            height: "150px",
            fontColor: "#000000",
            fontFamily: "Times New Roman",
             }
       },
       purchaseLimit: 5,
         
       
        
    },
    12: {
                
        cost(x) { return new Decimal(1).mul(x) },
        title() { return "Helium" },
        display() { return "Exchange 2 protons and 2 neutrons and 2 electrons for a Helium Atom" },
        canAfford() {
            if (player.a.protons.gte(this.cost(2)) && player.a.neutrons.gte(this.cost(2)) && player.a.electrons.gte(this.cost(2))) {return true} else {return false}   
         },
         unlocked() {
            if(hasAchievement('ct', 31)) return true
         },
        buy() {
            player.a.protons = player.a.protons.sub(this.cost(2))
            player.a.neutrons = player.a.neutrons.sub(this.cost(2))
             player.a.electrons = player.a.electrons.sub(this.cost(2))
            player.ct.hq = player.ac.helium.add(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
       style() {
            return {backgroundImage: this.canAfford()?"linear-gradient(90deg, rgba(8, 34, 0, 0.48) 0%, rgb(43, 43, 43) 50%, rgb(48, 0, 0) 100%)":"linear-gradient(90deg, rgba(8, 34, 0, 0.53) 0%, rgb(43, 43, 43) 50%, rgb(48, 0, 0) 100%)",
            borderRadius: "0px", 
            border: "4px solid #797979",
            fontSize: "20px",
            padding: "20px",
            width: "400px",
            height: "150px",
            fontColor: "#000000",
            fontFamily: "Comic Sans",
             }
       },
       
         
       
        
    },
    
},

 


}


)
addLayer("v", {
    name: "Vinyl Multipliers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "VM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (player.m.points.gte(12500) || player.v.points >= 1 || player.hm.points >= 1 || player.ce.points >= 1)},
		points: new Decimal(0),
        variable: new Decimal(0)
    }},
    color: "#eeff00",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Vinyl Multipliers", // Name of prestige currency
    baseResource: "Hyper Multipliers", // Name of resource prestige is based on
    baseAmount() {return player.h.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
    
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
     doReset(reset){
        let keep = []
      
        keep.push("variable")
         if (layers[reset].row > this.row) {layerDataReset("v", keep)}
    },
    update() {
        if (player.m.points.gte(12500) || player.v.points >= 1 || player.hm.points >= 1 || player.ce.points >= 1) {
            player.v.variable = new Decimal(1)
        }
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "v", description: "V: Reset for vinyl multipliers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["h"],
    layerShown(){return (player.v.variable == 1)},
    
    upgrades: {
    11: {
        title: "Vinility",
        description: "5x particle gain, 3x multiplier gain",
        cost: new Decimal(1),
        effect() {
            if(inChallenge('a', 12)) return new Decimal(1) 
                else return new Decimal(5)
        }
        
    },
    12: {
        title: "Hyper Vinyl",
        description: "Auto-Prestige Hyper Multiplier(Toggleable under Hyper Multiplier)",
        cost: new Decimal(2),
        
    },
     13: {
        title: "Milestony",
        description: "Unlock more Hyper Multiplier Milestones",
        cost: new Decimal(3),
        
    },
     13: {
        title: "Milestony",
        description: "Unlock more Hyper Multiplier Milestones",
        cost: new Decimal(3),
        
    },
    15: {
        title: "Plasticity",
        description: "Vinyl Multipliers now boost multipliers",
        cost: new Decimal(5),
        effect() {
            if(inChallenge('a', 12)) return new Decimal(1)
            else return player[this.layer].points.add(1).pow(0.75)
        },
          effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
    },
     16: {
        title: "Obomb",
        description: "Unlock the vinyl buyable",
        cost: new Decimal(10),
        
    }, 
},
buyables: {
    11: {
        cost(x) { return new Decimal(1).mul(2).pow(x) },
        title: "The Multiplier",
        display() { return "Buy a 2x boost to Multipliers.   " +
            "currently:" + format(buyableEffect(this.layer,this.id)) + "x        " +
            "   cost:" + format(this.cost()) + " " + " vinyl multipliers"
         },
        unlocked() {
            return (hasUpgrade('v', 16))
        },
        effect(x) {
            return new Decimal(2).mul(x)
        },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        style: {
            "border-radius": "50px",
            "width": "500px",
            "font-size": "20px"
        }
        
    },
    
}
} )
addLayer("ACH", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
                 // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ffffff",                       // The color for this layer, which affects many elements.
    
    row: "side",                                 // The row this layer is on (0 is the first row).
    
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

     achievements: {
    11: {
        name: "Experienced",
        done() {return player.points.gte(100)},
        tooltip: "obtain 100 particles",
        
    },
    12: {
        name: "Varied",
        done() {return player.m.points.gte(10)},
        tooltip: "obtain 10 multipliers"
        
    },
     13: {
        name: "Secondary engagement",
        done() {return player.q.points.gte(1)},
        tooltip: "obtain 1 quark"
        
    },
     14: {
        name: "Subcurrency grind",
        done() {return player.q.uq.gte(1)},
        tooltip: "obtain 1 up quark"
        
    },
    15: {
        name: "Downtown",
        done() {return player.q.dq.gte(1)},
        tooltip: "obtain 1 down quark"
        
    },
    16: {
        name: "Doctor Strange",
        done() {return player.q.sq.gte(1)},
        tooltip: "obtain 1 strange quark"
        
    },
    17: {
        name: "Too Strange",
        done() {return player.q.sq.gte(666)},
        tooltip: "OKAY this is weird"
        
    },
    21: {
        name: "Prince Charming",
        done() {return player.q.cq.gte(1)},
        tooltip: "Self-evident"
        
    },
    22: {
        name: "Top of the barrel",
        done() {return player.q.tq.gte(1)},
        tooltip: "The barrel lives and breaths"
        
    },
    23: {
        name: "Bottom of the barrel",
        done() {return player.q.bq.gte(1)},
        tooltip: "The barrel sulks and sighs"
        
    },
    24: {
        name: "Hyper",
        done() {return player.h.points.gte(1)},
        tooltip: "The hyper bar was scrapped, don't worry"
        
    },
     25: {
        name: "Womanizer",
        done() {return player.a.points.gte(1)},
        tooltip: "You're such a womanizer"
        
    },
     26: {
        name: "Smooth music",
        done() {return player.v.points.gte(1)},
        tooltip: "How quaint"
        
    },
    27: {
        name: "The Grinder",
        done() {return player.points.gte(1e9)},
        tooltip: "Looser"
        
    },
     31: {
        name: "Periodic",
        done() {return player.a.neutrons.gte(1)},
        tooltip: "Hydrogen a good time",
        
        unlocked() {
            return true
        }
    },
     32: {
        name: "True atomizer",
        done() {return (hasChallenge('a', 11))},
        tooltip: "What an atomizer",
        
    },
    33: {
        name: "Dusty trail",
        done() {return player.c.points.gte(1)},
        tooltip: "I reckon its time for cosmic exploration",
        
    },
    34: {
        name: "Exploration",
        done() {return player.c.t.gte(1)},
        tooltip: "Telescopes away",
        
    },
     35: {
        name: "Radar technology",
        done() {return player.c.adt.gte(1)},
        tooltip: "Advancing society",
        
    },
    36: {
        name: "Deep Space",
        done() {return (getClickableState('c', 35))},
        tooltip: "You shall not traverse",
        
    },
    37: {
        name: "Dr. Heinz Doofenshmirtz",
        done() {return (hasChallenge('a', 12))},
        tooltip: "Behold the world's tiniest violinator",
        
    },
    41: {
        name: "Super-radar technology",
        done() {return (player.c.sat.gte(1))},
        tooltip: "Super-advancing society",
        
    },
     42: {
        name: "HEAVY!!!",
        done() {return (player.hm.points.gte(1))},
        tooltip: "It's so heavy it affects the achievement",
        style: {
            "width": "150px",
            "height": "150px"
        }
        
    },
      43: {
        name: "Mitosis",
        done() {return (player.ce.points.gte(1))},
        tooltip: "Mitochondria",
        
    },
    
    

    
    
    
} 

})
    


 
addLayer("ac", {
    name: "Alchemy Lab", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (hasAchievement('ACH', 31))},
		points: new Decimal(1),
        helium: new Decimal(0),
        variable: new Decimal(0)
    }},
    color: "#d44e00",
    requires: new Decimal(400), // Can be a function that takes requirement increases into account
    resource: "Alchemy Lab", // Name of prestige currency
    baseResource: "Multipliers", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
   
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
   update() {
     if(hasAchievement('ACH', 31))
     {player.ac.variable = new Decimal(1)}
   },
    hotkeys: [],
    layerShown(){return (player.ac.variable == new Decimal(1))

    }, 
    tabFormat: {
    "Displays and explanation": {
        content: [
            "main-display",
            "resource-display"
        ]
            
        
    },
    "Periodic Table": {
        content: [
            "blank",
          
            ]
            
            
        
        
        
    },}
} )

addLayer("c", {
    name: "Cosmic Dust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (player.q.points.gte(500000) || player.c.points >= 1 || player.hm.points >= 1 || player.ce.points >= 1)},
		points: new Decimal(0),
        t: new Decimal(0),
        adt:  new Decimal(0),
        sat: new Decimal(0),
        variable: new Decimal(0)
       
    }},
    doReset(reset){
        let keep = []
        keep.push('t')
        keep.push('adt')
        keep.push('sat')
        keep.push("variable")
         if (layers[reset].row > this.row) {layerDataReset("c", keep)}
    },
    color: "#0004ff",
    requires: new Decimal(1000000), // Can be a function that takes requirement increases into account
    resource: "Cosmic Dust", // Name of prestige currency
    baseResource: "Quarks", // Name of resource prestige is based on
    baseAmount() {return player.q.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
    
        return mult
    },
    update() {
        if(player.q.points.gte(500000) || player.c.points >= 1 || player.hm.points >= 1 || player.ce.points >= 1)
        {player.c.variable = new Decimal(1)}
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
       
    ],
    branches: ["a", "q"],
    layerShown(){return (player.c.variable == 1)},
    
   
    
tabFormat: {
    "Prestige and Upgrades": {
        content: [
            ["main-display", function() {return "main-display"},
                {"font-family": "Times New Roman"}
            ],
           "blank",
           ["prestige-button", function() {return "prestige-button"}
              , {"border-radius": "0px"}
           ],
            "blank",
            "blank",
          
            ["display-text", function() {return 'You have ' + format(player.q.points) + ' quarks.'}],
            "blank",
            "upgrades"
           ],
        
    },
    "Astronomy": {
        content: [
           ["display-text", function() {return 'You have ' + format(player.c.t) + ' telescopes.'},
                {"border-radius":"0px", "font-size": "28px"}
            ],
            "blank",
            ["display-text", function() {if(hasChallenge('a', 11)) return 'You have ' + format(player.c.adt) + ' advanced telescopes.'},
                {"border-radius":"0px", "font-size": "28px"}
            ],
            "blank",
            
            ["display-text", function() {if(getClickableState('c', 55)) return 'You have ' + format(player.c.sat) + ' super advanced telescopes.'},
                {"border-radius":"0px", "font-size": "28px"}
            ],
            "blank",
            ["clickable", "11"],
           "blank",
           "buyables",
            "blank",
            ["infobox","lore"],
            ["column",[["row",[["clickable", "21"],["clickable", "22"],["clickable", "23"],["clickable", "24"],["clickable", "25"]]]]],
            ["column",[["row",[["clickable", "31"],["clickable", "32"],["clickable", "33"],["clickable", "34"],["clickable", "35"]]]]],
            ["column",[["row",[["clickable", "41"],["clickable", "42"],["clickable", "43"],["clickable", "44"],["clickable", "45"]]]]],
            ["column",[["row",[["clickable", "51"],["clickable", "52"],["clickable", "53"],["clickable", "54"],["clickable", "55"]]]]],
           ],
        
    },
   
    
},
clickables: {
    11: {
        display() {return "Click me for telescopes"},
        onClick() {
            if(hasUpgrade('c', 14)) {player.c.t = player.c.t.add(4)}
            else if(hasUpgrade('c', 13)) {player.c.t = player.c.t.add(2)}
            else {
            player.c.t = player.c.t.add(1)}
        },
        canClick() {
            return true
        }
    },
    21: {
        display() {return "Click to discover"},
        onClick() {
            return null
        },
        tooltip: "nothing here",
        unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px"
        }
    },
     23: {
        
        display() {return  "Click me to discover"
        },
        tooltip: "nothing here",
        onClick() {
            return null
        },
        canClick() {
            return true
        },
        unlocked() {return (hasUpgrade('c', 12))},
        style: {
            "border-radius": "0px"
        }
    },
    22: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            
        }
    },
     24: {
        display() { return "click me to discover"
            
        },
       
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "orange",
           
        }
    },
     25: {
        display() { return "click me to discover"
            
        },
        tooltip: "Unlock the Orbital Station(craftable). This is a very late game item. Req: 100 advanced telescopes, 50 Super advanced telescopes, 100 telescopes, 12 cosmic dust and 2000 Strange Quarks",
        onClick() {
             if(player.c.adt >= 100 && player.c.t >= 100 && player.c.points >= 12 && player.q.sq >= 2000) {
            player.c.adt = player.c.adt.sub(100)
            player.c.t = player.c.t.sub(100)
            player.c.points = player.c.points.sub(12)
            player.q.sq = player.q.sq.sub(2000)
        setClickableState('c', 25, 1)}
            else return null
        },
         unlocked() {return (hasUpgrade('c', 12))},
        
        canClick() {
           if(player.c.adt >= 100 && player.c.t >= 100 && player.c.points >= 12 && player.q.sq >= 2000) return true
        },
        style: {
            "border-radius": "100px",
           
        }
    },
     31: {
        display() { return "click me to discover"
            
        },
        tooltip: "2x particle boost. req: 1 cosmic dust, 200 telescopes, 7 advanced telescopes",
        onClick() {
           if(player.c.adt >= 7 && player.c.t >= 200 && player.c.points >= 1 ) {
            player.c.adt = player.c.adt.sub(7)
            player.c.t = player.c.t.sub(200)
            player.c.points = player.c.points.sub(1)
            setClickableState('c', 31, 1)
            }
            else return null
        },
         unlocked() {return (hasUpgrade('c', 12))},
          effect() {
             return new Decimal(2) 
                
         },
        canClick() {
           if(player.c.adt >= 7 && player.c.t >= 200 && player.c.points >= 1 ) return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "maroon"
        }
    },
    32: {
        display() { return "click me to discover"
            
        },
        tooltip: "Orbital Cannon(craftable) req: 150 Advanced telescopes, 75 Super advanced telescopes, 500 telescopes, 10 cosmic dust, 999 top quarks",
        onClick() {
            if(player.c.adt >= 150 && player.c.t >= 500 && player.c.points >= 10 && player.q.tq >= 999) {
            player.c.adt = player.c.adt.sub(150)
            player.c.t = player.c.t.sub(500)
            player.c.points = player.c.points.sub(10)
            player.q.tq = player.q.tq.sub(999)
        setClickableState('c', 32, 1)}
            else return null
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            if(player.c.adt >= 150 && player.c.t >= 500 && player.c.points >= 10 && player.q.tq >= 999) return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }
    },
      33: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }
    },
     34: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }
    },
    35: {
        display() { return "click me"
            
        },
        tooltip: "Achievement-DeepSpace req: 10 Advanced telescopes, 10 telescopes, 10 cosmic dust",
        onClick() {
             if(player.c.adt >= 10 && player.c.t >= 10 && player.c.points >= 10 ) {
            player.c.adt = player.c.adt.sub(10)
            player.c.t = player.c.t.sub(10)
            player.c.points = player.c.points.sub(10)
            setClickableState('c', 35, 1)
           }
            else return null
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
             if(player.c.adt >= 10 && player.c.t >= 10 && player.c.points >= 10 ) return true
        },
        style: {
            "border-radius": "50px",
            "background-color": "blue",
            
        }
    },
     41: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }

},
42: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "purple"
        }

},
43: {
        display() { return "click me to discover"
            
        },
        tooltip: "Cells req: 20 cosmic dust, 500 atoms, 666 telescopes",
        onClick() {
            if(player.a.points >= 500 && player.c.t >= 666 && player.c.points >= 20 ) {
            player.a.points = player.a.points.sub(500)
            player.c.t = player.c.t.sub(666)
            player.c.points = player.c.points.sub(20)
            setClickableState('c', 43, 1)
           }
            else return null
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            if(player.a.points >= 500 && player.c.t >= 666 && player.c.points >= 20 ) return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "indigo"
        }

},
44: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }

},
45: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }

},
51: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }

},
52: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }

},
53: {
        display() { return "click me to discover"
            
        },
        tooltip: "Unlock another atom challenge and another Cosmic Dust upgrade. Req: 400 telescopes, 4 advanced telescopes",
        onClick() {
             if( player.c.t >= 400 && player.c.adt >= 4 ) {
            
            player.c.t = player.c.t.sub(400)
            player.c.adt = player.c.adt.sub(4)
            setClickableState('c', 53, 1)
           }
            else return null
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            if( player.c.t >= 400 && player.c.adt >= 4 ) return true
        },
        style: {
            "border-radius": "37px",
            "background-color": "blue"
        }

},
54: {
        display() { return "click me to discover"
            
        },
        tooltip: "Nothing here",
        onClick() {
            return true
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "blue"
        }

},
55: {
        display() { return "click me to discover"
            
        },
        tooltip: "Super Advanced telescopes req: 1500 telescopes, 15 Advanced telescopes",
        onClick() {
            if( player.c.t >= 1500 && player.c.adt >= 15 ) {
            
            player.c.t = player.c.t.sub(1500)
            player.c.adt = player.c.adt.sub(15)
            setClickableState('c', 55, 1)
           }
            else return null
        },
         unlocked() {return (hasUpgrade('c', 12))},
        canClick() {
            if( player.c.t >= 1500 && player.c.adt >= 15 ) return true
        },
        style: {
            "border-radius": "0px",
            "background-color": "Dark green"
        }

},

 },
upgrades: {
    11: {
        title: "Dusty",
        description: "Passively generate 1% of Quarks",
        cost: new Decimal(3),
        
        
    },
    12: {
        title: "Radar technology",
        description: "Utilized advanced telescopes to perform a search of the universe. Who knows what you may unlock",
        cost: new Decimal(3),
        currencyDisplayName: "advanced telescopes",
        currencyInternalName: "adt",
        currencyLayer: "c",
        unlocked() {
            return (hasChallenge('a', 11))
        }
        
        
    },
    13: {
        title: "Clickable grind",
        description: "Obtain 2 telescopes per click",
        cost: new Decimal(9),
        
        
    },
    14: {
        title: "Clickable grind 2.0",
        description: "Obtain 4 telescopes per click",
        cost: new Decimal(12),
        unlocked() {
            return (getClickableState('c', 53))
        }
        
    },
 },
    buyables: {
         11: {
        cost() { return new Decimal(100) },
        title() { return "Advanced Telescope converter" },
        display() { return "Exchange your telescopes for advanced telescopes" },
        canAfford() { return player.c.t.gte(this.cost(1)) },
        unlocked() {
            return (hasChallenge('a', 11))
        },
        buyMax() {return true},
        buy() {
          let costPerUnit = this.cost(1)
    let max = new Decimal(1)

    if(this.buyMax()) {
        // calculate how many can be bought
        max = player.c.t.div(costPerUnit).floor()
        if (max.lt(1)) max = new Decimal(1) // buy at least 1
    }

    player.c.t = player.c.t.sub(costPerUnit.mul(max))
    player.c.adt = player.c.adt.add(max)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "Costs 100 telescopes",
    
    },
     12: {
        cost() { return new Decimal(20) },
        title() { return "Super Advanced Telescope converter" },
        display() { return "Exchange your advanced telescopes for super advanced telescopes"},
        canAfford() { return player.c.adt.gte(this.cost(1)) },
        unlocked() {
            return (getClickableState('c', 55))
        },
        buyMax() {return true},
        buy() {
          let costPerUnit = this.cost(1)
    let max = new Decimal(1)

    if(this.buyMax()) {
        // calculate how many can be bought
        max = player.c.adt.div(costPerUnit).floor()
        if (max.lt(1)) max = new Decimal(1) // buy at least 1
    }

    player.c.adt = player.c.adt.sub(costPerUnit.mul(max))
    player.c.sat = player.c.sat.add(max)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
        },
        tooltip: "Costs 20 advanced telescopes",
    
    },
    },
    infoboxes: {
    lore: {
        title: "Universe charting",
        body() { return "Clicking each clickable sacrfices x amount of telescopes, advanced telescopes and cosmic dust and any other resource listed. However, some reveal new stats or other goodies. Clicking a previously bought clickable will NOT add any boosts " },
        unlocked() {
            return (hasUpgrade('c', 12))
        }
    },
    
},

    }
)
addLayer("ce", {
    name: "Cells", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (getClickableState('c', 43) || player.ce.points >= 1)},
		points: new Decimal(0),
        variable: new Decimal(0)
       
    }},
    color: "#3b0134",
    requires: new Decimal(4000), // Can be a function that takes requirement increases into account
    resource: "Cells", // Name of prestige currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
     doReset(reset){
        let keep = []
      
        keep.push("variable")
         if (layers[reset].row > this.row) {layerDataReset("ce", keep)}
    },
   
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update() {
        if((getClickableState('c', 43) || player.ce.points >= 1))
        {player.ce.variable = new Decimal(1)}
    },
    doReset(){
        let keep = []
        
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["a"],
    hotkeys: [
        {key: "shift + c", description: "Shift + C: Reset for Cells", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (player.ce.variable == 1)
    },
  


     upgrades: {},
    milestones: {
    1: {
        requirementDescription: "1 Cell",
        effectDescription: "Begin your unrelenting quest to create life. Passively generate 100% of Quarks",
        done() { return player.ce.points.gte(1) }
    }
    
},
 
tabFormat: {
    "Prestige and Upgrades": {
        content: [
            ["main-display", function() {return "main-display"},
                {"font-family": "Times New Roman"}
            ],
           "blank",
           ["prestige-button", function() {return "prestige-button"}
              , {"border-radius": "0px"}
           ],
            "blank",
            "blank",
          
            ["display-text", function() {return 'You have ' + format(player.a.points) + ' atoms.'}],
            "blank",
            "milestones",
            "upgrades"
           ],
        
    },} } )

    addLayer("hm", {
    name: "Heavy Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HVM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {return (player.m.points.gte(1e9) || player.hm.points >= 1)},
		points: new Decimal(0),
        variable: new Decimal(0)
       
    }},
    color: "#252525",
    requires: new Decimal(21), // Can be a function that takes requirement increases into account
    resource: "Heavy Multipliers", // Name of prestige currency
    baseResource: "Hyper Multipliers", // Name of resource prestige is based on
    baseAmount() {return player.h.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
     doReset(reset){
        let keep = []
      
        keep.push("variable")
         if (layers[reset].row > this.row) {layerDataReset("hm", keep)}
    },
   update() {
    if((player.m.points.gte(1e9) || player.hm.points >= 1))
    {player.hm.variable = new Decimal(1)}
   },
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(){
        let keep = []
        
    },
    nodeStyle: {
        "border-radius": "0px",
        "width": "125px",
        "height": "125px"
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ["h","v"],
    hotkeys: [
        {key: "shift + h", description: "Shift + H: Reset for Heavy Multipliers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (player.hm.variable == 1)
    },
  


   
        upgrades: {
    11: {
        title: "10x boost to Multipliers",
        description: "Red Pill",
        cost() {if(hasUpgrade('hm', 12)) return new Decimal(20)
            else return new Decimal(1)
        },
        style: {
            "border-radius": "0px",
            "width": "150px",
            "height": "150px"
        }
        
    },
    12: {
        title: "10x boost to Quarks",
        description: "Violet Pill",
        cost() {
            if(hasUpgrade('hm', 11)) return new Decimal(20)
            else return new Decimal(1)
        },
        style: {
            "border-radius": "0px",
            "width": "150px",
            "height": "150px"
        }
        
    },
    13: {
        title: "10x boost to Quarks",
        description: "Violet Pill",
        cost: new Decimal(1e999999),
        style: {
            "border-radius": "0px",
            "width": "75px",
            "height": "150px",
            "opacity": "0"
        }
        
    },
    
},
     
    milestones: {
    1: {
        requirementDescription: "1 Heavy Multiplier",
        effectDescription: "It's quite heavy in here. 10x particle boost",
        done() { return player.hm.points.gte(1) }
    }
    
},
 
tabFormat: {
    "Prestige and Upgrades": {
        content: [
            ["main-display", function() {return "main-display"},
                {"font-family": "Times New Roman"}
            ],
           "blank",
           ["prestige-button", function() {return "prestige-button"},
              {"border-radius": "0px"}
           ],
            "blank",
            "blank",
          
            ["display-text", function() {return 'You have ' + format(player.h.points) + ' hyper multipliers'}],
            "blank",
            "milestones",
             ["column",[["row",[["upgrade", "11"],["upgrade", "13"],["upgrade", "12"]]]]],
           ],
        
    },} } )
