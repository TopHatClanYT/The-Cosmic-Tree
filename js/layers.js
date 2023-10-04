addLayer("m", {
    name: "Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Multiplier ", // Name of prestige currency
    baseResource:"Fragments", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    
    
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('t', 1)) mult = mult.times(3)
        if (hasMilestone('e', 0)) mult = mult.times(1.5)
        if (hasUpgrade('m', 24)) mult = mult.times(2)
        if (hasUpgrade('m', 41)) mult = mult.times(1.25)
        if (hasUpgrade('m', 42)) mult = mult.times(1.4)
        if (hasUpgrade('cd', 11)) mult = mult.times(1.3)
        if (hasUpgrade('cd', 12)) mult = mult.times(1.5)
        if (hasUpgrade('cd', 13)) mult = mult.times(1.25)
        if (hasUpgrade('cd', 14)) mult = mult.times(upgradeEffect('cd', 14))
        if (hasAchievement('cd', 12)) mult = mult.times(2)
        if (hasUpgrade('s', 11)) mult = mult.times(1.3)
        if (hasUpgrade('s', 12)) mult = mult.times(1.2)
        if (hasUpgrade('s', 13)) mult = mult.times(1.2)
        if (inChallenge('c', 11)) mult = new Decimal(1)
        if (hasAchievement('cd', 14)) mult = mult.times(1.4)
        if (player.vm.points.gte(1)) mult = mult.times(3)
        return mult
    },
   
    softcap: new Decimal(10000),
    softcapPower: new Decimal(0.05),
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Multiplier ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    nodeStyle() {
        
    },
    passiveGeneration() {if (hasMilestone("hm", 0)) return 0.05; else return 0},
    autoUpgrade() {if (hasMilestone('e', 3)) return true; else return false},
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Cheers to new beginnings",
            description: "You earn 1.5x more fragments",
            cost: new Decimal(2),
        },
        12: {
            title: "Franchise",
            description: "One step closer to tiers, get a 2x boost on fragments",
            cost: new Decimal(5),
        },
        13: {
            title: "refined Palete",
            description: "fragments aren't fast enough eh? well here give me 12 multiplier points and you get a boost of 2!",
            cost: new Decimal(12),
        },
        14: {
            title: "Scale factor",
            description: "Fragments are now boosted based on how many multiplier points you own",
            cost: new Decimal(20),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
       21: {
        title: "Tiered gain",
        description: "Fragments are now boosed by a log of 2",
        cost: new Decimal(250),
        effect() {
            return player[this.layer].points.add(1).log(2)
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked() {if (hasMilestone('t', 1)) return true; else return false},
        },
        22: {
            title: "Duplacative matters",
            description: "Gives a 1.5x fragments boost",
            cost: new Decimal(400),
            unlocked() {if (hasMilestone('t', 1)) return true; else return false},
        },
        23: {
            title: "Multiplicative Equilibrium",
            description: "Grants a 1.25x fragement gain boost",
            cost: new Decimal(1000),
            unlocked() {if (hasMilestone('e', 1)) return true; else return false},
        },
        24: {
            title: "Molecular Grants",
            description: "Grants a 2x Multiplier gain boost",
            cost: new Decimal(4500),
            unlocked() {if (hasMilestone('e', 1)) return true; else return false},
        },
        31: {
            title: "Radicals",
            description: "Gain a 1.25x boost to fragment gain",
            cost: new Decimal(8100),
            unlocked() {if (hasMilestone('e', 2)) return true; else return false},
        },
        32: {
            title: "Ryhtymn",
            description: "Gain a 1.5x boost to fragment gain",
            cost: new Decimal(14000),
            unlocked() {if (hasMilestone('e', 2)) return true; else return false},
        },
        33: {
            title: "Heat",
            description: "Gain a 1.25x boost to fragment gain",
            cost: new Decimal(27500),
            unlocked() {if (hasMilestone('e', 3)) return true; else return false},
        },
        34: {
            title: "Atoms",
            description: "gain a 1.1x star gain boost and a 1.4 fragment gain boost",
            cost: new Decimal(50000),
            unlocked() {if (hasMilestone('e', 3)) return true; else return false},
        },
        41: {
            title: "Supercharged Multiplier",
            description: "Gain a 1.5x fragment gain boost and a 1.2x star gain boost and a 1.25x multiplier gain boost",
            cost: new Decimal(375000),
            unlocked() {if (hasMilestone('hm', 1)) return true; else return false},
        },
        42: {
            title: "Hyperactivity",
            description: "Gain a 1.2x Hyper Multiplier boost, a 1.2x colider boost, and a 1.4x multiplier boost and fragment boost",
            cost: new Decimal(1200000),
            unlocked() {if (hasMilestone('hm', 1)) return true; else return false},
        },
    },
        milestones: {
            0: {
                requirementDescription: "1000 multiplier",
                effectDescription: "Unlocks the Energy bar",
                done() { return player.m.points.gte(1000) },
                unlocked() {return (hasMilestone('t', 1))}
            }
            
        }
       
    

    
}),


addLayer("t", {
    name: "Tiers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    tooltip: "Tiers will not increase anything or buy any upgrades, instead they act as a buffer layer and the way you progress in the game",
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#0f00f0",
    requires: new Decimal(40), // Can be a function that takes requirement increases into account
    resource: "Tier", // Name of prestige currency
    baseResource:"Multiplier ", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

    doReset(resettingLayer) {
        if(layers[resettingLayer].row === 2) return;
        
        let keep = [milestones];

        layerDataReset(this.layer, keep)

        return (player.e.points.gte(1) && player.c.points.gte(1) && player.cd.points.gte(1))
    },

    hotkeys: [
        {key: "t", description: "T: Reset for Tiers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    branches: ["m"],

    milestones: {
        1: {
            requirementDescription: "Tier 1",
            effectDescription: "Unlock the tier 1 upgrades, adding 3 new nodes, 4 new uprgades in multiplier and much more, as well as a 3x boost to multiplier, ",
            done() { return player.m.points.gte(100)
                
             }
        },
        2: {
            requirementDescription: "Tier 2",
            effectDescription: "Unlock Ions and upgrades for most nodes ",
            done() { return player.vm.points.gte(2)
                
             },
             unlocked() {return (hasMilestone('t', 1))},
        }
    
    }
}),

addLayer("e", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#14a7f6",
    requires: new Decimal(250),
    resource: "Energy particles", // Name of prestige currency
    baseResource:"Multiplier ", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.45, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    hotkeys: [
        {key: "e", description: "E: Reset for Energy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasMilestone('t', 1))},

    branches: ["t", "m"],
    doReset(resettingLayer) {
        if (resettingLayer === "m") return; // Don't reset if the layer above (Multiplier) is resetting
    
        let keep = [];
    
        // Check if the player has milestones related to the "Energy" layer and add them to the keep array
        if (hasMilestone('e', 0) || hasMilestone('e', 1) || hasMilestone('e', 2) || hasMilestone('e', 3) || hasMilestone('e', 4)) {
            keep.push('milestones'); // Keep the milestones data
        }
    
        layerDataReset(this.layer, keep);
    },
    
    
    

    milestones: {
        0: {
            requirementDescription: "1 Energy Particle",
            effectDescription: " 1.5 times multiplier boost",
            done() { if (inChallenge('c', 12))return player.e.points.gte(100); else return (player.e.points.gte(1)) },
            unlocked() {if (inChallenge('c', 12)) return false; else return true},
        },
        1: {
            requirementDescription: "5 Energy Particles",
            effectDescription: "Unlock 2 new upgrades in Multiplier",
            done() { if (inChallenge('c', 12))return player.e.points.gte(100); else return player.e.points.gte(5) },
            unlocked() {if (inChallenge('c', 12)) return false; else return true},
            
        },
        2: {
            requirementDescription: "15 Energy Particles",
            effectDescription: "Unlock 2 more upgrades in Multiplier",
            done() {if (inChallenge('c', 12))return player.e.points.gte(100); else return player.e.points.gte(15) },
            unlocked() {if (inChallenge('c', 12)) return false; else return true},
            
        },
        3: {
            requirementDescription: "45 energy particles",
            effectDescription: "Unlock 2 more upgrades in Multiplier and 3 in Star as well as auto buying upgrades in Multiplier",
            done() {if (inChallenge('c', 12))return player.e.points.gte(100); else return player.e.points.gte(45) },
            unlocked() {if (inChallenge('c', 12)) return false; else return (hasAchievement('cd', 13)) },
            
        },
        4: {
            requirementDescription: "250 energy particles",
            effectDescription: "Finishes the energy bar and gives a 2x boost to star and Hyper Multiplier",
            done() {if (inChallenge('c', 12))return player.e.points.gte(100); else return player.e.points.gte(250) },
            
            unlocked() {if (inChallenge('c', 12)) return false; else return (hasAchievement('cd', 13)) },

            
        }
    },
    bars: {
        EBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { if (player.e.points.gte(250)) return 1; else if (player.e.points.gte(100)) return 0.5; else if (player.e.points.gte(30)) return 0.3;else if (player.e.points.gte(30))return 0.2;if (hasMilestone('m', 0)) return 0.1; else return 0},
            display() {return "Finish this to unlock Electricity"},
            unlocked() {return (hasMilestone('m', 0))},
            
        },
        
    },
    tabFormat: [ 
        "main-display", 
        ["prestige-button",
          function() { return 'Gain' + format(player.e.points) + ' an energy particle' },
        {"color": "black", "font-size": "14px", "font-family": "Comic Sans MS"}],
        "blank",
        "blank",
        "milestones",
        "blank",
        "blank",
        "upgrades",
        "blank",
        "blank",
        ["bar",
    function() {return "EBar"} ]
      ], 
})

addLayer("c", {
    name: "Colider", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#f40293",
    requires: new Decimal(20000),// Can be a function that takes requirement increases into account
    resource: "Coliders", // Name of prestige currency
    baseResource:"Multiplier ", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('m', 42)) mult = mult.times(1.2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    hotkeys: [
        {key: "c", description: "C: Reset for colider", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasMilestone('t', 1))},

    branches: ["t"],
    doReset(resettingLayer) {
        if (resettingLayer === "m") return; // Don't reset if the layer above (Multiplier) is resetting
    
        let keep = [];
    
        // Check if the player has the "Vinyl Multiplier" challenge active and add it to the keep array
        if (hasChallenge('c', 12)) {
            keep.push('challenges'); // Keep the challenges data
        }
    
        layerDataReset(this.layer, keep);
    },
    


    challenges: {
        11: {
            name: "Hyper Multiplier",
            challengeDescription: "In this challenge, You must get to 1000 multiplier without any upgrades! ",
            goalDescription: "Get 1000 Multiplier",
            rewardDescription: "you unlock Hyper Multiplier",
            canComplete() {
                return (player.m.points.gte(1000))
            },
            completionLimit: 1,
            
            
        },
        12: {
            name: "Vinyl Multiplier",
            challengeDescription: "In this challenge, You must get 30 Star ",
            goalDescription: "Get 30 Star",
            rewardDescription: "you unlock Vinyl Multiplier, and you can buy 5 max hyper Multiplier at once",
            
            canComplete() {
                
                return (player.s.points.gte(30))
            },
            unlocked() {
                return (player.c.points.gte(3))
            },
            startChallenge() {
               
            },
            exitChallenge() {
                
                
            },
            completionLimit: 1,
            
            
        },
        
    }
    
    
})
addLayer("cd", {
    name: "Cosmic Dust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        
		points: new Decimal(0),
        
    }},
    color: "#025ea1",
    requires: new Decimal(20000),
    resource: "Cosmic Dust", // Name of prestige currency
    baseResource:"Multiplier ", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.45, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    hotkeys: [
        {key: "Shift + c", description: "Shift + c: Reset for Cosmic dust", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if(hasMilestone('t', 1)) return true;},

    branches: ["t", "m", "c"],
    componentStyles: {
        "bar"() { return {'height': '150px'} },
        "upgrades"() { return {'color': '#0b5842'} },
        "clickables"() {return {'color': '#9fb879'}}
    },

   
    tabFormat: {
        "Main Tab": {
            content: [ "main-display",
            ["prestige-button",
              function() {return 'Gain' + format(player.cd.points) + ' Cosmic Dust' },
            {"color": "black", "font-size": "14px", "font-family": "Comic Sans MS"}],
            "blank",
            "milestones",
            "blank",
            "blank",
            "upgrades",
            "blank",
            "blank",
            ["infobox",
        function() {return "lore"}],
        "blank",
            "blank",
            "clickables",
        ]
        },
        
        
        "Astronomical Discoveries": {
            
            content: ["main-display",
                
                    
                  ["infobox",
        function() {return "Galileo"}],
                  "blank",
                  "blank",
                  "achievements",
                
                
                  ]
        },
        
    },
    upgrades: {
        11: {
            title: "The Cosmos",
            description: "Multiplier gain is increased by 1.3",
            cost: new Decimal(2),
            unlocked() {if (inChallenge('c', 12)) return false; else return true},
                    },
        12: {
            title: "Ever-Expanding",
            description: "Multiplier gain is increased by 1.5",
            cost: new Decimal(5),
            unlocked() {if (inChallenge('c', 12)) return false; else return true},
        },
        13: {
            title: "Planetary Object",
            description: "Fragment gain is boosted by 1.25 and multiplier gain is multiplied by 1.25",
            cost: new Decimal(12),
            unlocked() {if (inChallenge('c', 12)) return false; else return true},
        },
        14: {
            title: "Scaling the factor",
            description: "Multiplier is now boosted based on how much cosmic dust you own",
            cost: new Decimal(20),
            unlocked() {if (inChallenge('c', 12)) return false; else return true},
            effect() {
                return player[this.layer].points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, },
    

   
    layerShown(){if(hasMilestone('t', 1)) return true;},
    infoboxes: {
        lore: {
            title: "The Clickable",
            body() { return "The Clickable is used to make astronomical discoveries, Astronimcal discoveries appear in the sub-tab and consist of new nodes, boosts, and much more such as fun facts about space!" },
            
        },
        Galileo: {
            title: "Famous Galileo Quote",
            body() { return "But now we have not just one planet rotating about another while both run through a great orbit around the Sun; our own eyes show us four stars which wander around Jupiter as does the Moon around the Earth, while all together trace out a grand revolution about the Sun in the space of twelve years." 
            },
            
            
        },
        
    },
    clickables: {
        11: {
            display() {return "Click Me!"},
            effect() {  const baseEffect = 1;

                // Get the number of times this clickable has been clicked
                const clickCount = player.cd.clickables[11] || 0;
    
                // Calculate the total effect based on the click count and base effect
                const totalEffect = baseEffect * clickCount;
                 
                return totalEffect; },
            canClick() {return (player.cd.points.gte(1))},
            onClick() {
            
                player.cd.clickables[11] = (player.cd.clickables[11] || 0) + 1;

                // You can also add additional logic here if needed
    
                // Return true to indicate that the clickable was clicked
                return true;},
            tooltip: "Discover Celestial Bodies",
            
        }
        
    },
    achievements: {
        11: {
            name: "Comet Encke",
            done() {
                // Define the condition for unlocking this achievement
                const clicksRequired = 15;
    
                // Get the number of times the clickable has been clicked
                const clickCount = player.cd.clickables[11] || 0;
    
                // Check if the click count is greater than or equal to the required number of clicks
                return clickCount >= clicksRequired;
            },
            unlocked() { const clicksRequired = 15;
    
                // Get the number of times the clickable has been clicked
                const clickCount = player.cd.clickables[11] || 0;
    
                // Check if the click count is greater than or equal to the required number of clicks
                return clickCount >= clicksRequired;},
                doneTooltip: "Comet Encke, or Encke's Comet, is a periodic comet that completes an orbit of the Sun once every 3.3 years. Encke was first recorded by Pierre Méchain on 17 January 1786, but it was not recognized as a periodic comet until 1819 when its orbit was computed by Johann Franz Encke. gives a 1.3x boost to fragment gain"
        },
        12: {
            name: "Halley's Comet",
            done() {
                // Define the condition for unlocking this achievement
                const clicksRequired = 45;
    
                // Get the number of times the clickable has been clicked
                const clickCount = player.cd.clickables[11] || 0;
    
                // Check if the click count is greater than or equal to the required number of clicks
                return clickCount >= clicksRequired;
            },
            unlocked() { const clicksRequired = 45;
    
                // Get the number of times the clickable has been clicked
                const clickCount = player.cd.clickables[11] || 0;
    
                // Check if the click count is greater than or equal to the required number of clicks
                return clickCount >= clicksRequired;}, 
                doneTooltip: "Halley's Comet, Comet Halley, or sometimes simply Halley, officially designated 1P/Halley, is a short-period comet visible from Earth every 75 to 79 years. Gives a 2x gain to multiplier"
            },
            13: {
                name: "Star's",
                done() {
                    // Define the condition for unlocking this achievement
                    const clicksRequired = 125;
        
                    // Get the number of times the clickable has been clicked
                    const clickCount = player.cd.clickables[11] || 0;
        
                    // Check if the click count is greater than or equal to the required number of clicks
                    return clickCount >= clicksRequired;
                },
                unlocked() { const clicksRequired = 100;
        
                    // Get the number of times the clickable has been clicked
                    const clickCount = player.cd.clickables[11] || 0;
        
                    // Check if the click count is greater than or equal to the required number of clicks
                    return clickCount >= clicksRequired;}, 
                doneTooltip: "You've unlocked a new node, Stars"},
                14: {
                    name: "4 vesta",
                    done() {
                        // Define the condition for unlocking this achievement
                        const clicksRequired = 200;
            
                        // Get the number of times the clickable has been clicked
                        const clickCount = player.cd.clickables[11] || 0;
            
                        // Check if the click count is greater than or equal to the required number of clicks
                        return clickCount >= clicksRequired;
                    },
                    unlocked() { const clicksRequired = 150;
            
                        // Get the number of times the clickable has been clicked
                        const clickCount = player.cd.clickables[11] || 0;
            
                        // Check if the click count is greater than or equal to the required number of clicks
                        return clickCount >= clicksRequired;}, 
                    doneTooltip: "Vesta is one of the largest objects in the asteroid belt, with a mean diameter of 525 kilometres. It was discovered by the German astronomer Heinrich Wilhelm Matthias Olbers on 29 March 1807 and is named after Vesta, the virgin goddess of home and hearth from Roman mythology. This gives a 1.4x multiplier boost and a 1.3x hyper multiplier boost"},
            },
            doReset(resettingLayer) {
                if (resettingLayer === "m") return; // Don't reset if the layer above (Multiplier) is resetting
            
                let keep = [];
            
                // Check if the player has the "Cosmic Dust" layer achievements unlocked and add them to the keep array
                if (hasAchievement('cd', 11) || hasAchievement('cd', 12) || hasAchievement('cd', 13) || hasAchievement('cd', 14)) {
                    keep.push('achievements'); // Keep the achievements data
                }
            
                layerDataReset(this.layer, keep);
            },
            
        
    },
    
        

    

    
)

addLayer("s", {
    name: "Stars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        
		points: new Decimal(0),
        
    }},
    color: "#FFA500",
    requires: new Decimal(2000),
    resource: "Star", // Name of prestige currency
    baseResource:"Multiplier ", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('m', 34)) mult = mult.times(1.1)
        if(hasUpgrade('m', 41)) mult = mult.times(1.2)
        if(hasMilestone('e', 4)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

    displayRow: 3,
    doReset(resettingLayer) {
        if(layers[resettingLayer].row === 2) return;
        
        let keep = [milestones];

        layerDataReset(this.layer, keep)

        return (player.e.points.gte(1) && player.c.points.gte(1) && player.cd.points.gte(1))
    },

    branches: ["cd", "t"],
    layerShown(){if(hasAchievement('cd', 13)) return true;},
    upgrades: {
        11: {
            title: "Hot ball of gass",
            description: "You earn 1.3x more multiplier",
            cost: new Decimal(15),
            
            unlocked() {if (inChallenge('c', 12)) return false; else return (hasMilestone('e', 3))},
        }, 
        12: {
            title: "Gravity",
            description: "You earn 1.2x more multiplier",
            cost: new Decimal(36),
            unlocked() {if (inChallenge('c', 12)) return false; else return (hasMilestone('e', 3))},
        },
        13: {
            title: "Steaming Pile of coronal mass ejection",
            description: "You earn 1.2x more cosmic dust",
            cost: new Decimal(47),
            unlocked() {if (inChallenge('c', 12)) return false; else return (hasMilestone('e', 3))},
        },},
         },
 )
addLayer("hm", {
    name: "Hyper Multplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        
		points: new Decimal(0),
        tempPoints: new Decimal(0)
    }},
    color: "#39FF14",
    requires: new Decimal(30000),
    resource: "Hyper Multiplier", // Name of prestige currency
    baseResource:"Multiplier ", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    layerReset() {
        // Restore the Hyper Multiplier points from the temporary variable
        if (player[this.layer].activeChallenge === "12") {
            player.hm.points = player.hm.tempPoints;
            
        }
    },
    
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('m', 34)) mult = mult.times(1.1)
        if(hasUpgrade('m', 42)) mult = mult.times(1.2)
        if(hasMilestone('e', 4)) mult = mult.times(2)
        if (hasAchievement('cd', 14)) mult = mult.times(1.3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    displayRow: 2,

    branches: ["m", "e"],
    canBuyMax() {if(hasChallenge('c', 12)) return true; else return false},
    layerShown(){if(hasChallenge('c', 11)) return true;}, 
    buyables: {
        11: {
            title: "Heavy Multiplier",
            cost() { return new Decimal(1).mul(2) },
            display() { return "Requires 1 hyper multiplier" },
            canAfford() { return player[this.layer].points.gte(this.cost(1)) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(2))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
            tooltip: "the first part in unlocking Mega Multiplier",
            
        },
        12: {
            title: "Nuclear Refinement",
            cost() { return new Decimal(1).mul(2.5) },
            display() { return "Requires 3 hyper multiplier" },
            canAfford() { return player[this.layer].points.gte(this.cost(3)) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(2.5))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            
            purchaseLimit: 12,
            tooltip: "Buy this out as well as the energy bar to unlock Nuclear Power and Nuclear Multiplier",
            
        },
        21: {
            title: "Mega Multiplier",
            cost() { return new Decimal(2).mul(2.5) },
            display() { return "Requires 5 hyper multiplier" },
            canAfford() { return player[this.layer].points.gte(this.cost(5)) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(2.5))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {if(getBuyableAmount("hm", 11).gte(10)) return true; else return false},
            purchaseLimit: 14,
            tooltip: "The second part in unlocking Mega Multiplier",
            
        },
       
    },
    milestones: {
        0: {
            requirementDescription: "5 Hyper Multiplier",
            effectDescription: "Passively Generate Multiplier",
            done() { return player.hm.points.gte(5) },
            
        }, 
        1: {
            requirementDescription: "15 Hyper Multiplier",
            effectDescription: "Unlock 2 more upgrades in Multiplier",
            done() { return player.hm.points.gte(15) },
            
        }, 
    },
    
   
    
        
    } )

    addLayer("vm", {
        name: "Vinyl Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "VM", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
            
            points: new Decimal(0),
            
        }},
        color: "#FF5733",
        requires: new Decimal(2),
        resource: "Vinyl Multiplier", // Name of prestige currency
        baseResource:"Hyper Multiplier ", // Name of resource prestige is based on
        baseAmount() {return player.hm.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 3, // Row the layer is in on the tree (0 is the first row)
    
        displayRow: 3,
    
        branches: ["hm", "c", "cd"],
        
        layerShown(){if(hasChallenge('c', 12)) return true;}, } )

        addLayer("i", {
            name: "Ion", // This is optional, only used in a few places, If absent it just uses the layer id.
            symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
            position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
            startData() { return {
                unlocked: false,
                
                points: new Decimal(0),
                
            }},
            color: "#2f060c",
            requires: new Decimal(40) && new Decimal(20),
            resource: "Ion(s)", // Name of prestige currency
            baseResource: "Star",
            baseResource: "Cosmic Dust", // Name of resource prestige is based on
            baseAmount() {return (player.s.points && player.cd.points)}, // Get the current amount of baseResource
            type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
            exponent: 0.7, // Prestige currency exponent
            gainMult() { // Calculate the multiplier for main currency from bonuses
                mult = new Decimal(1)
                
                return mult
            },
            gainExp() { // Calculate the exponent on main currency from bonuses
                return new Decimal(1)
            },
            row: 3, // Row the layer is in on the tree (0 is the first row)
        
            displayRow: 3,
        
            branches: ["vm", "s", "cd"],
            
            layerShown(){if(hasMilestone('t', 2)) return true},
            tabFormat: [
                "main-display",
                ["prestige-button"],
                "blank",
                ["display-text",
                    function() { return 'I have ' + format(player.cd.points) + ' Cosmic Dust' },
                    { "color": "blue", "font-size": "16px", "font-family": "Comic Sans MS" }],
                    ["display-text",
                    function() { return 'I have ' + format(player.s.points) + ' Star(s)' },
                    { "color": "yellow", "font-size": "16px", "font-family": "Comic Sans MS" }],
                "blank",
                ["toggle", ["c", "beep"]],
                "milestones",
                "blank",
                "blank",
                "upgrades"
            ], } )