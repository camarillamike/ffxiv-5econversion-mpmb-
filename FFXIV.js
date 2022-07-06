/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This is the syntax for adding a new class to the sheet
				Note that you will need the syntax for adding a subclass as well if you want the class to have any choices for subclasses
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "FFXIV - 5e Conversion.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used

//Sage
ClassList["sage"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*sage).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "my" and "class" in it, disregarding capitalization). If this looks too complicated, just write: /sage/i

	name : "Sage", //required; the name to use for the class

	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	primaryAbility : "\n \u2022 Sage: Intelligence;", //required; the text to display when citing the primary ability of the class

	prereqs : "\n \u2022 Sage: Intelligence 13;", //required; the text to display when citing the prerequisite for the class when multiclassing

	die : 6, //required; the type of hit die the class has (i.e. 10 means d10)

	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], //required; the amount of ability score improvements (or feats) at each level. Note that there are 20 entries, one for each level. This example uses the Fighter's progression

	saves : ["Int", "Wis"], //required; the two save proficiencies.

	skills : ["\n\n" + toUni("Sage") + ": Choose two from Choose two from Arcana, History, Insight, Investigation, Medicine, Religion.", "\n\n" + toUni("Sage") + ": Choose one from Arcana, History, Insight, Investigation, Medicine, Religion."], //required; the text to display for skill proficiencies. Note the \n\n at the start, they are important! The first entry is for when the class is the primary class, the second entry is for when the class is taken later as part of a multiclass

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : { // optional; this is an object with arrays with the tool proficiencies gained. Each entry in an array can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated
		primary : [["Tools", 1]], // optional; the tool proficiencies gained if the class is the primary class (i.e. taken at 1st level)
	},

	armor : [ //required; the 4 entries are for: ["light", "medium", "heavy", "shields"]
		[false, false, false, false], //required; the armor proficiencies if this is the first or only class
		[false, false, false, false] //required; the armor proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	weapons : [ //required; the 3 entries are for: ["simple", "martial", "other"]
		[false, false, ["daggers", "darts", "slings", "quarterstaffs", "light crossbows"]], //required; the weapon proficiencies if this is the first or only class
		[false, false, ["daggers", "darts", "slings", "quarterstaffs", "light crossbows"]] //required; the weapon proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	equipment : "Sage starting equipment:\n \u2022 Quarterstaff -or- Dagger;\n \u2022 a spellcasting focus;\n \u2022 an explorer's pack -or- a Scholar's pack;\n \u2022 Noulith.", //required; the text to display when citing the starting equipment

	subclasses : ["Sage Specialization", ["savant", "erudite", "philosopher"]], //required; the names of the subclasses. The first entry is the overall name that is given to the subclasses, the second entry is a list of the subclass, using the exact names of the entry of the subclasses in the ClassSubList. //Note that if one of the entries in the array of subclasses doesn't exist in the ClassSubList, the sheet will throw an error as soon as you make a character with levels in this class
	//IMPORTANT: for any subclass you add using the AddSubClass() function, don't list them here! The AddSubClass() function makes its own entry in this array! If you have entries here that don't exist (because you didn't add any ClassSubList entry, or added it using the AddSubClass() function, then the sheet will throw strange errors)!

		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //required; the amount of attacks at each level. Note that there are 20 entries, one for each level.

	abilitySave : 4, //optional, but required for a spellcaster; the ability score to use for the Ability Saving Throws. Remove this line if your class has no Ability that requires Saving Throws. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)

	spellcastingFactor : 1, //required for a spellcaster; the speed with which spell progression works type 1 for full spellcasting (Cleric), 2 for half spellcasting (Paladin), and 3 for one-third spellcasting (Arcane Trickster). This can be any positive number other than 0. Remove this line if your class has no spellcasting. If your character uses the Warlock way of spellcasting, write "warlock1" here. The 1 indicates the spell progression factor. You can change it to a 2 or 3 to have half or one-third spell progression (or to any other factor you like).
		// You can also have this refer to a Spell Slot progression you define yourself, as a separate variable (see "Homebrew Syntax - SpellTable.js"). In order to do this the name of that variable and the spellcastingFactor must match. Using the name "purplemancer" for example would mean that here you put [spellcastingFactor : "purplemancer1"] (the 1 is the factor, this can be any positive number other than 0) while for the variable containing the table you use "purplemancerSpellTable". Note that the name is all lower case!

	spellcastingKnown : { //Optional; Denotes the amount and type of spells the class has access to

		cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], //Optional; This can either be one number, an array of 20 numbers, or be omitted for a class that doesn't have access to cantrips. The numbers reflect the amount of cantrips known

		spells : "list",//Optional; This can either be one number, an array of 20 numbers, or be omitted for a class that doesn't have access to spells. The numbers reflect the amount of spells known. For a class that doesn't know spells, but prepares them from a list, you should put "list" here. For a class that uses a spellbook, you should put "book" here.

		prepared : true, //Optional; This indicates that the class has to prepare spells like a cleric/druid/paladin/wizard

	},

	spellcastingList : { //Optional; Only needed if the class doesn't have its own spell list. This object denotes what spells the class has access to. All things in this object constrain the selection of spells that will be available. The contstraints are cumulative.

		class : "any", //Required; The name of the class from whose spell list the spells come from. This can be "any" if the spells are not limited by a spell list of just one class. The entry has to match the name of the class in the SpellsList

		ritual : false, //Optional; Denotes if only ritual (true) or only non-ritual (false) spells should be included in the list

		spells : [   // cantrips
    "blade ward", "dancing lights", "light", "lightning lure", "mage hand", "magic stone", "mending", "message", "mind sliver", "minor illusion", "prestidigitation", "resistance", "spare the dying", "thunderclap", "true strike", "word of radiance",
 
    // 1st level
    "absorb elements", "alarm", "bane", "catapult", "chromatic orb", "color spray", "comprehend languages", "cure wounds", "detect magic", "detect poison and disease", "expeditious retreat", "faerie fire", "feather fall", "find familiar", "healing word", "heroism", "identify", "illusury script", "jump", "longstrider", "mage armor", "magic missile", "sanctuary", "shield", "sleep", "tenser's floating disk", "unseen servant", "witch bolt",
 
    // 2nd level
    "aid", "arcane lock", "blur", "crown of madness", "darkness", "detect thoughts", "enhance ability", "enlarge/reduce", "find traps", "hold person", "invisibility", "knock", "lesser restoration", "levitate", "locate object", "mind spike", "mirror image", "misty step", "pass without trace", "protection from poison", "see invisibility", "shatter", "silence", "skywrite", "zone of truth",
 
    //3rd level 
    "blink", "counterspell", "create food and water", "daylight", "dispel magic", "fly", "haste", "hypnotic pattern", "intellect fortress", "life transference", "lightning bolt", "magic circle", "major image", "mass healing word", "nondetection", "protection from energy", "remove curse", "revivify", "sending", "slow", "tongues",
 
    //4th level
    "arcane eye", "banishment", "compulsion", "confusion", "dimension door", "fabricate", "freedom of movement", "greater invisibility", "hallucinatory terrain", "locate creature", "otiluke's resilient sphere", "phantasmal killer", "sickening radiance", "summon construct", 
 
    //5th level
    "antilife shell", "awaken", "bigby's hand", "circle of power", "contact other plane", "creation", "dream", "far step", "greater restoration", "legend lore", "mass cure wounds", "mislead", "passwall", "raise dead", "rary's telepathic bond", "scrying", "seeming", "skill empowerment", "telekinesis", "teleportation circle", "wall of force",
 
    //6th level
    "arcane gate", "chain lightning", "disintegrate", "eyebite", "find the path", "flesh to stone", "globe of invulnerbility", "guards and wards", "heal", "heroes' feast", "mental prison", "programmed illusion", "scatter", "sunbeam", "true seeing", "word of recall", 
 
    //7th level
    "etherealness", "forcecage", "mirage arcane", "mordenkainen's sword", "plane shift", "prismatic spray", "project image", "regenerate", "resurrection", "reverse gravity", "sequester", "simulacrum", "symbol", "teleport", 
 
    //8th level
    "antimagic field", "antipathy/sympathy", "clone", "feeblemind", "glibness", "illusory dragon", "mind blank", "sunburst", "telepathy", 
 
    //9th level
    "astral projection", "gate", "invulnerbility", "mass heal", "power word heal", "prismatic wall", "time stop", "true resurrection"], //Optional; If a "spells" array is present, all other objects will be ignored and only this list of spells will populate the list of available spells. each entry has to match the name of the spell in the SpellsList

	},
	//You can also have the list be added to the known spells of a class by making the 101th entry in the array read "AddToKnown" (i.e. spellcastingExtra[100] = "AddToKnown");

	features : { //required;  the class features. Each works the same way, so only a couple of example are given. You can add as many as you want

		"spellcasting" : {
			name : "Spellcasting",
			source : ["P", 114],
			minlevel : 1,
			description : "\n   " + "I can cast prepared sage cantrips/spells, using Intelligence as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I can cast any prepared sage spell as a ritual if they have the ritual tag",
			additional : ["3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known"], //optional; text to display in the header of the feature. This can be one value, but can also be an array of 20 values, one for each level.
		},
		"nouliths" : {
			name : "Nouliths",
			source : ["P", 114],
			minlevel : 1,
			description : "\n   " + "I gain the ability to operate a Noulith",
			additional : ["1 noulith", "1 noulith", "1 noulith", "1 noulith", "2 nouliths", "2 nouliths", "2 nouliths", "2 nouliths", "2 nouliths", "3 nouliths", "3 nouliths", "3 nouliths", "3 nouliths", "3 nouliths", "4 nouliths", "4 nouliths", "4 nouliths", "4 nouliths", "4 nouliths", "5 nouliths"], //optional; text to display in the header of the feature. This can be one value, but can also be an array of 20 values, one for each level.
		},
		"aether shot" : {
			name : "Aether Shot",
			source : ["P", 72],
			minlevel : 1,
			description : "\n   " + "As an action, I can shoot a bolt of force from each noulith dealing 1d8 force damage",
			action : ["action", ""] //optional; adds the name of this feature to the bonus action list when chosen. The options are "action", "bonus action", and "reaction"
		},

		"subclassfeature1" : { //You need at least one entry named "subclassfeatureX". It signals the sheet to ask the user for which subclass he would like to have. The level of this feature should match the level the class needs to select a subclass. Once a subclass is selected, any feature with "subclassfeature" in the object name in the class entry will be ignored.
			name : "Sage Specialization",
			source : ["P", 72],
			minlevel : 2,
			description : "\n   " + "Choose a Sage Specialization you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Savant, Erudite, Philosopher",
		},
		
		"wings of aether" : {
			name : "Wings of Aether",
			source : ["P", 72],
			minlevel : 18,
			description : "\n   " + "For each Noulith not deployed gain a +10 fly speed.",
		},

		"noulithic god" : {
			name : "Noulithic God",
			source : ["P", 72],
			minlevel : 20,
			description : ["\n   " + "As a Bonus action refresh your Overcharge feature.",
			"\n   " + "You may do this once per Long Rest"],
			action: ["bonus", ""],
			usages: 1,
			recovery : "long rest",
		},
		
		"subclassfeature3.1" : {
			name : "", //any feature who's name is empty like this one is, will be ignored. Since v12.5 of the sheet, an entry like this serves no function
			minlevel : 2,
		},

	}
};


/*	-INFORMATION-
	Subject:	Subclass (a.k.a. Archetype)
	Effect:		This is the syntax for adding a new subclass/archetype to a class that is defined in the sheet, or to a class you made yourself
	Sheet:		v12.999 (2017-11-29)
*/
//Savant
AddSubClass( // this is the function you will be calling to add the variant

	"sage", // Parent Class object name; Required; This has to be the exact name of the class of which you are adding a subclass. Look for the name of the class in the ClassList variable. For the default 12 classes these names are: "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", and "wizard"

	"sagesavant", // Object name; Required; The name the entry in the ClassSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere

	{ // don't forget this opening bracket

		regExpSearch : /^(?=.*sage)(?=.*savant).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "special" and "me" in it, disregarding capitalization). If this looks too complicated, just write: /specialme/i

		subname : "Savant", //required; the name of the subclass

		source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

		// after defining the above three, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the ClassList. So if you do not need something to be different than the basics of the class (for example, you subclass uses the same spellcasting ability), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the ClassList (see "Homebrew Syntax - ClassList.js"). You can define all the same stuff in the same way. The below are a couple of examples:

		fullname : "Sage (Savant)", //if no fullname is defined it will be automatically generated as "Class Name (Subclass name)". In this example that would be: "MyClass (Path of SpecialMe)"

		abilitySave : 4, //overwrites the abilitySave that was defined in the ClassList
		abilitySaveAlt : 4,//overwrites the abilitySaveAlt that was defined in the ClassList
		spellcastingFactor : 1, //overwrites the spellcastingFactor that was defined in the ClassList

		features : { //unlike the other entries, "features" will not delete all the features from the ClassList, but will add to the features in the ClassList. For this to work properly, the feature object has to be named "subclassfeatureX" and not something appropriate for the feature. The below are the features of the purple Dragon Knight

			"subclassfeature2" : { // has to start with "subclassfeature" followed by a number. Note that the name has to be unique for this subclass, but it can be the same name as one of the features of the class in the ClassList variable. If you use the same name as a feature in the ClassList variable, it will be overwritten with this entry
				name : "Pristmatic Destrution",
				source : ["HB", 128],
				minlevel : 2,
				description : ["\n   " + "As an action I may release a 15ft cone of destruction from each Noulith.",
				"\n   " + "All creatures must affected must save from each cone individually. Dex save or half 2d8 force.",
				"\n   " + "This may be done a number of times equal to Proficiency Mod per long rest."],
				action : "action",
				usages: [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6],
				recovery : "long rest",
				
			},
			"subclassfeature3" : {
				name : "Aetheric Intensity",
				source : ["HB", 128],
				minlevel : 6,
				description : "\n   " + "Aether Shot adds your Intelligence Modifier to it's damage rolls",
			},
			
			"subclassfeature4" : {
				name : "Sundering Shot",
				source : ["HB", 128],
				minlevel : 10,
				description : "\n   " + "When I hit a creature with Aether Shot my crit range increases to 19 or 20 for my next Aether Shot." + "\n   " + "Each subsequent hit lowers the critical threshold until the end of turn or a critcal hit lands.",
				},
			"subclassfeature5" : {
				name : "Overcharge: Indignation",
				source : ["HB", 128],
				minlevel : 14,
				description : "\n   " + "May use Aether Shot as a Bonus action once per Long Rest.",
				action: "bonus",
				usage: 1,
				recovery: "long rest"
			},
		}
	}
);

//Erudite
AddSubClass( // this is the function you will be calling to add the variant

	"sage", // Parent Class object name; Required; This has to be the exact name of the class of which you are adding a subclass. Look for the name of the class in the ClassList variable. For the default 12 classes these names are: "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", and "wizard"

	"sageerudite", // Object name; Required; The name the entry in the ClassSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere

	{ // don't forget this opening bracket

		regExpSearch : /^(?=.*sage)(?=.*erudite).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "special" and "me" in it, disregarding capitalization). If this looks too complicated, just write: /specialme/i

		subname : "Erudite", //required; the name of the subclass

		source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

		// after defining the above three, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the ClassList. So if you do not need something to be different than the basics of the class (for example, you subclass uses the same spellcasting ability), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the ClassList (see "Homebrew Syntax - ClassList.js"). You can define all the same stuff in the same way. The below are a couple of examples:

		fullname : "Sage (Erudite)", //if no fullname is defined it will be automatically generated as "Class Name (Subclass name)". In this example that would be: "MyClass (Path of SpecialMe)"

		abilitySave : 4, //overwrites the abilitySave that was defined in the ClassList
		abilitySaveAlt : 4,//overwrites the abilitySaveAlt that was defined in the ClassList
		spellcastingFactor : 1, //overwrites the spellcastingFactor that was defined in the ClassList

		features : { //unlike the other entries, "features" will not delete all the features from the ClassList, but will add to the features in the ClassList. For this to work properly, the feature object has to be named "subclassfeatureX" and not something appropriate for the feature. The below are the features of the purple Dragon Knight

			"subclassfeature2" : { // has to start with "subclassfeature" followed by a number. Note that the name has to be unique for this subclass, but it can be the same name as one of the features of the class in the ClassList variable. If you use the same name as a feature in the ClassList variable, it will be overwritten with this entry
				name : "Guardian Shard",
				source : ["HB", 128],
				minlevel : 2,
				description : ["\n   " + "As a bonus action I may equip any number of nouliths to allies within range.",
				"\n   " + "While equiped I may cast touch spells through the Noulith as though standing beside the creature.",
				"\n   " + "As a reaction I may add my Intelligence modifier to the creatures AC, this may be done a number of times based on Proficiency bonus"],
				action : "reaction",
				usages: [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6],
				recovery : "long rest",
				
			},
			"subclassfeature3" : {
				name : "Aether Wall",
				source : ["HB", 128],
				minlevel : 6,
				description : ["\n   " + "You may link Noulith's together to create a translucent wall 10 ft wide and tall.",
				"\n   " + "Aether Wall provides 3/4 cover, passing through requires a Strength (Athletics) check vs spell save dc.",
				"\n   " + "A creature surrounded by Aether Wall takes disadvantage on checks to break through. These may be used as a bridge and dissasembled as a bonus action."],
			},
			
			"subclassfeature4" : {
				name : "Aetheric Armour",
				source : ["HB", 128],
				minlevel : 10,
				description : "\n   " + "When using Guardian Shard the protected creature also gains temp. hp equal to Intelligence Modifier.",
				},
			"subclassfeature5" : {
				name : "Overcharge: Impenetrable",
				source : ["HB", 128],
				minlevel : 14,
				description : "\n   " + "As an action may supercharge a protected creature. For a number of rounds equal to Intelligence modifier the creature gains a damage threshold equal to 5 + Int Mod + Prof. bonus. They take no dmg unless it exceeds that threshold.",
				action: "action",
				usage: 1,
				recovery: "long rest"
			},
		}
	}
);

//Philosopher
AddSubClass( // this is the function you will be calling to add the variant

	"sage", // Parent Class object name; Required; This has to be the exact name of the class of which you are adding a subclass. Look for the name of the class in the ClassList variable. For the default 12 classes these names are: "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", and "wizard"

	"sagephilosopher", // Object name; Required; The name the entry in the ClassSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere

	{ // don't forget this opening bracket

		regExpSearch : /^(?=.*sage)(?=.*philosopher).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "special" and "me" in it, disregarding capitalization). If this looks too complicated, just write: /specialme/i

		subname : "Philosopher", //required; the name of the subclass

		source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

		// after defining the above three, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the ClassList. So if you do not need something to be different than the basics of the class (for example, you subclass uses the same spellcasting ability), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the ClassList (see "Homebrew Syntax - ClassList.js"). You can define all the same stuff in the same way. The below are a couple of examples:

		fullname : "Sage (Philosopher)", //if no fullname is defined it will be automatically generated as "Class Name (Subclass name)". In this example that would be: "MyClass (Path of SpecialMe)"

		abilitySave : 4, //overwrites the abilitySave that was defined in the ClassList
		abilitySaveAlt : 4,//overwrites the abilitySaveAlt that was defined in the ClassList
		spellcastingFactor : 1, //overwrites the spellcastingFactor that was defined in the ClassList

		features : { //unlike the other entries, "features" will not delete all the features from the ClassList, but will add to the features in the ClassList. For this to work properly, the feature object has to be named "subclassfeatureX" and not something appropriate for the feature. The below are the features of the purple Dragon Knight

			"subclassfeature2" : { // has to start with "subclassfeature" followed by a number. Note that the name has to be unique for this subclass, but it can be the same name as one of the features of the class in the ClassList variable. If you use the same name as a feature in the ClassList variable, it will be overwritten with this entry
				name : "Aetheric Siphon",
				source : ["HB", 128],
				minlevel : 2,
				description : ["\n   " + "When you hit a creature with Aether Shot it generate a Noulith charge. These charges last for 1 hour or until used.",
				"\n   " + "As a bonus action may spend Noulith Charges to create a Spell Slot. Spell Level 1 = 3 Charges, 2=5, 3=7, 4=9, 5=11.",
				"\n   " + "May only create a number of spells equal to Proficiency bonus per Long Rest."],
				action : "bonus",
				usages: [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6],
				recovery : "long rest",
			},
			"subclassfeature3" : {
				name : "Aetheric Adaptation (1)",
				source : ["HB", 128],
				minlevel : 6,
				description : ["\n   " + "You gain the ability to modify spells using Noulith Charges.",
				"\n   " + "Choose Two Adaptations at 6th level then another at 10th and 14th.",
				"\n   " + "May only use adaptations a number of times equal to Proficiency bonus per short rest."],
				choices: ["Careful Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Noulithic Casting", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
				choicesNotinMenu : true,
				"careful spell" : {
					name : "Careful Spell",
				description : "\n   " + "Spend 1 Noulith charge, a number of chosen creatures = Int Modifier automatically suceed on saving throw."
				},
				"empowered spell" : {
					name : "Empowered Spell",
				description : "\n   " + "Spend 1 Noulith charge, reroll a number of damage dice = Int Modifier, may be combined with other Adaptations."
				},
				"extended spell" : {
					name : "Extended Spell",
				description : "\n   " + "Spend 1 Noulith charge, double the duration of a spell of at least 1 Minute to a maximum of 24 hours."
				},
				"heightened spell" : {
					name : "Heightened Spell",
				description : "\n   " + "Spend 3 Noulith charges, one target of the spell has disadvantage on their Save."
				},
				"noulithic casting" : {
					name : "Noulithic Casting",
				description : "\n   " + "Spend 1 Noulith charge, may cast spell as though standing where a Noulith is located."
				},
				"quickened spell" : {
					name : "Quickened Spell",
				description : "\n   " + "Spend 2 Noulith charges, cast a spell with an Casting Time of 1 Action as a Bonus action.."
				},
				"subtle spell" : {
					name : "Subtle Spell",
				description : "\n   " + "Spend 1 Noulith charge, cast your spell without Somatic or Verbal components."
				},
				"twinned spell" : {
					name : "Twinned Spell",
				description : "\n   " + "Spend 1 Noulith charge per spell level, add an additional target to a spell that can only target one creature."
				},
			},
			"subclassfeature6" : {
				name : "Aetheric Adaptation (2)",
				source : ["HB", 128],
				minlevel : 6,
				description : [""],
				choices: ["Careful Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Noulithic Casting", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
				choicesNotinMenu : true,
				"careful spell" : {
					name : "Careful Spell",
				description : "\n   " + "Spend 1 Noulith charge, a number of chosen creatures = Int Modifier automatically suceed on saving throw."
				},
				"empowered spell" : {
					name : "Empowered Spell",
				description : "\n   " + "Spend 1 Noulith charge, reroll a number of damage dice = Int Modifier, may be combined with other Adaptations."
				},
				"extended spell" : {
					name : "Extended Spell",
				description : "\n   " + "Spend 1 Noulith charge, double the duration of a spell of at least 1 Minute to a maximum of 24 hours."
				},
				"heightened spell" : {
					name : "Heightened Spell",
				description : "\n   " + "Spend 3 Noulith charges, one target of the spell has disadvantage on their Save."
				},
				"noulithic casting" : {
					name : "Noulithic Casting",
				description : "\n   " + "Spend 1 Noulith charge, may cast spell as though standing where a Noulith is located."
				},
				"quickened spell" : {
					name : "Quickened Spell",
				description : "\n   " + "Spend 2 Noulith charges, cast a spell with an Casting Time of 1 Action as a Bonus action.."
				},
				"subtle spell" : {
					name : "Subtle Spell",
				description : "\n   " + "Spend 1 Noulith charge, cast your spell without Somatic or Verbal components."
				},
				"twinned spell" : {
					name : "Twinned Spell",
				description : "\n   " + "Spend 1 Noulith charge per spell level, add an additional target to a spell that can only target one creature."
				},
			},
			"subclassfeature7" : {
				name : "Aetheric Adaptation (10)",
				source : ["HB", 128],
				minlevel : 10,
				description : [""],
				choices: ["Careful Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Noulithic Casting", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
				choicesNotinMenu : true,
				"careful spell" : {
					name : "Careful Spell",
				description : "\n   " + "Spend 1 Noulith charge, a number of chosen creatures = Int Modifier automatically suceed on saving throw."
				},
				"empowered spell" : {
					name : "Empowered Spell",
				description : "\n   " + "Spend 1 Noulith charge, reroll a number of damage dice = Int Modifier, may be combined with other Adaptations."
				},
				"extended spell" : {
					name : "Extended Spell",
				description : "\n   " + "Spend 1 Noulith charge, double the duration of a spell of at least 1 Minute to a maximum of 24 hours."
				},
				"heightened spell" : {
					name : "Heightened Spell",
				description : "\n   " + "Spend 3 Noulith charges, one target of the spell has disadvantage on their Save."
				},
				"noulithic casting" : {
					name : "Noulithic Casting",
				description : "\n   " + "Spend 1 Noulith charge, may cast spell as though standing where a Noulith is located."
				},
				"quickened spell" : {
					name : "Quickened Spell",
				description : "\n   " + "Spend 2 Noulith charges, cast a spell with an Casting Time of 1 Action as a Bonus action.."
				},
				"subtle spell" : {
					name : "Subtle Spell",
				description : "\n   " + "Spend 1 Noulith charge, cast your spell without Somatic or Verbal components."
				},
				"twinned spell" : {
					name : "Twinned Spell",
				description : "\n   " + "Spend 1 Noulith charge per spell level, add an additional target to a spell that can only target one creature."
				},
			},
			
			"subclassfeature4" : {
				name : "Efficient Absorption",
				source : ["HB", 128],
				minlevel : 10,
				description : "\n   " + "When using Aether Shot gain 2 charges per successful hit instead of 1.",
				},
			"subclassfeature5" : {
				name : "Overcharge: Aetherial Drain",
				source : ["HB", 128],
				minlevel : 14,
				description : "\n   " + "As a Bonus action may generate Noulith Charges from the Aether. Gain 3 Noulith Charges per Noulith you control.",
				action: "bonus",
				usage: 1,
				recovery: "long rest"
			},
		"subclassfeature8" : {
				name : "Aetheric Adaptation (14)",
				source : ["HB", 128],
				minlevel : 14,
				description : [""],
				choices: ["Careful Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Noulithic Casting", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
				choicesNotinMenu : true,
				"careful spell" : {
					name : "Careful Spell",
				description : "\n   " + "Spend 1 Noulith charge, a number of chosen creatures = Int Modifier automatically suceed on saving throw."
				},
				"empowered spell" : {
					name : "Empowered Spell",
				description : "\n   " + "Spend 1 Noulith charge, reroll a number of damage dice = Int Modifier, may be combined with other Adaptations."
				},
				"extended spell" : {
					name : "Extended Spell",
				description : "\n   " + "Spend 1 Noulith charge, double the duration of a spell of at least 1 Minute to a maximum of 24 hours."
				},
				"heightened spell" : {
					name : "Heightened Spell",
				description : "\n   " + "Spend 3 Noulith charges, one target of the spell has disadvantage on their Save."
				},
				"noulithic casting" : {
					name : "Noulithic Casting",
				description : "\n   " + "Spend 1 Noulith charge, may cast spell as though standing where a Noulith is located."
				},
				"quickened spell" : {
					name : "Quickened Spell",
				description : "\n   " + "Spend 2 Noulith charges, cast a spell with an Casting Time of 1 Action as a Bonus action.."
				},
				"subtle spell" : {
					name : "Subtle Spell",
				description : "\n   " + "Spend 1 Noulith charge, cast your spell without Somatic or Verbal components."
				},
				"twinned spell" : {
					name : "Twinned Spell",
				description : "\n   " + "Spend 1 Noulith charge per spell level, add an additional target to a spell that can only target one creature."
				},
			},
		}
	}
);

//Custom Weapons
WeaponsList["aethershot"] = {
	name : "Aether Shot",
	source : ["SBFFXIV", 204],
	defaultExcluded : false,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this weapon/attack should be excluded by default (true) or included by default (false)
	Include this attribute and set it to true if the weapon/attack should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.
	This is useful for optional weapons/attacks that you wouldn't normally want to use (e.g. playtest or campaign-specific).
	Setting this attribute to false is the same as not including this attribute.
*/
	regExpSearch : /^(?=.*aether)(?=.*shot).*$/i,
	type : "Cantrip",
/*	type // REQUIRED //
	TYPE:	string
	USE:	type of the weapon
	The type of the weapon will be used to determine if the character is proficient with the weapon and
	if the weapon's proficiency box should be checked for it.
	There are several pre-defined types that exist by default in the sheet:
		"AlwaysProf"		// none of the other types apply, always proficient
		"Natural"			// natural weapons (always proficient)
		"Simple"			// simple weapons
		"Martial"			// martial weapons
		"Cantrip"			// cantrips (always proficient)
		"Spell"				// 1st-level and higher spells (always proficient)
		"Improvised Weapons"// improvised weapons such as vial of acid
	Alternatively, you can define a type yourself.
	If this type matches a word in the 'Other Weapon Proficiencies' field,
	the character will be considered proficient with the weapon.
	But if this type doesn't match anything, proficiency will not be applied.
	If the attack is a spell/cantrip, but it functions like a weapon attack (for fighting styles for example),
	then you will want to set this to "Simple" or "Martial", while also
	setting the `list` or `SpellsList` attributes to that of a spell/cantrip.
	That way, the attack is seen as both a spell and a weapon by other automation.
*/
	ability : 4,
/*	ability // REQUIRED //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
	USE:	set the ability score used for weapon/attack
	This ability score is used to determine the To Hit (or DC) and Damage of the weapon/attack.
	If the weapon has the finesse property, set the ability to 1.
	The sheet will automatically determine whether to use Strength or
	Dexterity based on the character's ability scores.
	Even with this attribute, the sheet will automatically use the spellcasting ability if:
		* The attribute `list` or `type` is set to "Cantrip" or "Spell", or
		* the object name of the weapon matches an entry in the `SpellsList` object, or
		* the attribute `SpellsList` is set and matches a `SpellsList` entry.
	It will look for the highest spellcasting ability score from the character's spellcasting classes,
	but considering the following:
		1. If this spell is known by any of the character's classes, it will only consider those classes.
		2. If this spell is not known by any of the character's classes, it will consider all its spellcasting classes.
		3. If the character has no spellcasting classes, it will use the attribute given here.
	You can change this behaviour with the `useSpellcastingAbility` attribute, see below.
	Setting this to 0 will cause the To Hit and Damage to be calculated without any ability score modifier.
	Setting this to false is the same as not including this attribute and
	will cause the weapon to not have any To Hit or Damage calculated.
*/
	abilitytodamage : false,
	damage : [1, 8, "force"],
	range : "Ranged, 30/60 ft",
/*	range // REQUIRED //
	TYPE:	string
	USE:	the text as it will be put in the Range field for the attack
	This string is put on the sheet literally.
	For short- and long ranges, use the notation [short]/[long] [unit].
	The units should be in the imperial system and they will be
	automatically converted to the metric system by the sheet if set to do so.
	For melee range, just use "Melee".
*/
	description : "May move Noulith's as a bonus action, 30 ft fly speed. Each attacks seperately.",
	tooltip : "",

	special : true,
	list : "spell",
/*	type // OPTIONAL //
	TYPE:	string
	USE:	determines the sorting of the weapon in the drop-down field
	This attribute can have any value you want.
	Any weapon with the same 'list' attribute will be grouped together.
	There are several pre-defined lists that exist by default in the sheet:
		"melee"		// melee weapons
		"ranged"	// ranged weapons
		"spell"		// cantrips and spells
		"improvised"// improvised weapons such as vial of acid
	If you use any other string than the four options given above,
	the weapon will appear at the end of the drop-down options.
	Setting this to and empty string ("") is the same as not including this attribute.
	>> NOTE WHEN USING weaponOptions <<
	The 'list' attribute is ignored for WeaponsList objects used in the 'weaponOptions' attribute.
	Instead, all things added using the 'weaponOptions' attribute will always be added at the top of the drop-down field.
*/
	weight : 0,
	dc : false,
	modifiers : ["", ""],
/*	modifiers // OPTIONAL //
	TYPE:	array with 2 entries
	USE:	add something to the weapon's modifier fields
	This array has two entries:
	1. string or number
		The first entry is what to put in the To Hit modifier field.
		If this starts with "dc", the To Hit will be calculated as a DC.
	2. string or number
		The second entry is what to put in the Damage modifier field.
	These modifier fields are added to the calculated values of To Hit/Damage.
	By default, these modifier fields are hidden on the sheet.
	Their visibility can be toggled with the "Modifiers" bookmark.
	Both entries in the array can have the same kind of value.
	This can be any combination of numbers, mathematical operators,
	and three-letter ability score abbreviations for ability score modifiers,
	or 'Prof' for the proficiency bonus.
	For example, to add the proficiency bonus, Constitution modifier, and subtract 2, it would look like this:
		"Prof+Con-2"
	Or, another example, to add 1, it would look like this:
		1
	Setting both entries of the array to either 0 or an empty string ("") is the same as not including this attribute.
*/
	monkweapon : false,
	isMagicWeapon : true,
	isAlwaysProf : true,
	ammo : "",
	SpellsList : "",
	useSpellcastingAbility : true,
	useSpellMod : "",
	baseWeapon : "",
};

//Feats
FeatsList["agonizingshot"] = {
	name : "Agonizing Aether Shot",
	source : ["HB", 204],
	defaultExcluded : false,
	prerequisite : "Sage class",
	prereqeval : function(v) {
		return classes.known.sage ? true : false;
	},
/*	prereqeval // OPTIONAL //
	TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
	USE:	this should return 'true' if the prerequisite is met or 'false' otherwise
	Both examples do the exact same thing, just one is a string and the other is a function.
	Writing a function is better as it is easier to avoid syntax errors and will run faster.
	The string option is there for backwards-compatibility and this explanation assumes you are writing a function.
	The function is fed one variable, v, an object containing attributes with information about the character.
	Changing these attributes does nothing, but you can use them to test if the character meets the requirements.
	An explanation of the different attributes of this variable:
	var v = {
		isSpellcaster,  	// boolean; true if the character has spellcasting from a source other than magic items
		isSpellcastingClass,// boolean; true if the character has spell slots from a class (i.e. the Spellcasting or Pact Magic feature)
		characterLevel, 	// number; the total character level
		shieldProf,     	// boolean; true if the checkbox for shield proficiency is checked
		lightArmorProf, 	// boolean; true if the checkbox for light armour proficiency is checked
		mediumArmorProf,	// boolean; true if the checkbox for medium armour proficiency is checked
		heavyArmorProf, 	// boolean; true if the checkbox for heavy armour proficiency is checked
		simpleWeaponsProf,	// boolean; true if the checkbox for simple weapon proficiency is checked
		martialWeaponsProf,	// boolean; true if the checkbox for martial weapon proficiency is checked
		otherWeaponsProf,	// array; the WeaponsList object names of those listed in the other weapon proficiencies field (or the literal string if not a recognized weapon)
		toolProfs,   		// array; the contents of the tool fields, one field per array entry
		toolProfsLC,   		// array; same as toolProfs, but all lowercase
		languageProfs,   	// array; the contents of the language fields, one field per array entry
		languageProfsLC,   	// array; same as languageProfs, but all lowercase
		skillProfs,     	// array; the skills the character is proficient in, one skill name per array entry
		skillProfsLC,   	// array; same as skillProfs, but all lowercase
		skillExpertise,     // array; the skills the character has expertise with, one skill name per array entry
		skillExpertiseLC,   // array; same as skillExpertise, but all lowercase
		hasEldritchBlast,	// boolean; true if the character has the Eldritch Blast cantrips
		choice,      		// string; the sub-choice of this feat (empty string if no choice)
	}
	N.B. The first entry of both the toolProfs and languageProfs arrays is the contents of the 'More Proficiency' field
	Other than using the 'v' variable, this function can be any JavaScript you want.
	Common usage examples:
		"return CurrentRace.known.indexOf('dwarf') !== -1;" // Test if race is a dwarf
		"return classes.known.cleric ? true : false;" // Test if character has any levels in the cleric class
		"return What('Dex') >= 13;" // Test if character has a Dexterity score of 13 or more
*/
	allowDuplicates : false,
	description : "When you use your Aether Shot, add your Intelligence modifier to the damage it deals on hit.",
	calculate : "event.value = \"When you use your Aether shot add your Intelligence Modifer (\" + What(\"Int Mod\") +  \") to the damage it deals on a hit.\";",
/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>
	You can have the feat affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.
	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.
*/

};

//Backgrounds

//Magitek Engineer
BackgroundList["magitek engineer"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	regExpSearch : /^(?=.*magitek)(?=.*engineer).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has the consecutive words "where", "i", "am", and "from" in it, disregarding capitalization or words in between). If this looks too complicated, just write: /where i am from/i

	name : "Magitek Engineer", //required; the name as used

	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	skills : ["Investigation"], //optional; skill proficiencies gained from having the background. If the background doesn't give fixed proficiencies, but instead gives a choice, delete this line and use the line below, "skillstxt"

	gold : 5, //required; the amount of gold pieces added to the Equipment section on the second page when selecting "Background's items and gold" from the "Add Equipment" menu.

	equipleft : [ //optional; syntax is: ["description", "amount", "weight"]. Put "" if it is nothing, don't put 0
		["Work Clothes", "", ""],
		["Engineer's Kith", "", 10],
		["Welding Goggles", "", ""],
		["Container of Ceruleum", "", ""],
	], //items as they are added to the left column of the Equipment section on the second page when selecting "Background's items and gold" from the "Add Equipment" menu.

	feature : "Architectus", //required; the name of the background feature as it will appear on the sheet. The feature is then retrieved from the BackgroundFeatureList, see below

	trait : [
		"I sneak my initials onto everything I work on.",
		"I feel the need to touch everything I see.",
		"I have my own unique design flair, it's important.",
		"I'm sick of telling people to fill the bloody kettle!",
		"I have a habit of dismantling things when I'm bored.",
		"I see little value in gil, unless it's to purchaseknowledge like books or Allagan tomestones.",
		"It irks me greatly when things aren't straight or orderly.",
		"I talk at length about magitek - and often too fast."
	], //required; A list of the personality traits that can be chosen using the "Add Features" button on the second page. This list can be any length.

	ideal : [
		["Methods",
			"Methods. I take extra time to complete things. (Lawful)"
		],
		["Power",
			"Power. I smile when I hear imperial warmachina wasused to squash impertinent savages. (Evil)"
		],
		["Greed",
			"Greed. Advance the realm? I'd rather use magitek toadvance my purse. (Neutral)"
		],
		["Philanthropy",
			"Philanthropy. If the device doesn't help anyone, thenwhat is the point? (Good)"
		],
		["War",
			"War. I measure success based on the amount ofwanton destruction my projects cause. (Chaotic)"
		],
		["Innovation",
			"Innovation. Every minute improvement brings therealm one step closer to advancement. (Any)"
		],
	], //required; A list of the  ideals that can be chosen using the "Add Features" button on the second page. This list can be any length. Take note of the two-step build for every ideal, this is essential!

	bond : [
		"I trust those who appreciate my knowledge and labor.",
		"I've drawn up blueprints - I will see it to fruition.",
		"My allegiance is to no nation, only to my ingenuity.",
		"My mentors had taught me everything they knew.",
		"I'm surrounded by, admittedly endearing, idiots.",
		"I often get attached to anything I build or work on."
	], //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.

	flaw : [
		"I'll do anything to get my hands on something rare or priceless.",
		"I'm quick to assume that someone is trying to cheat me.",
		"No one must ever learn that I once stole money from guild coffers.",
		"I'm never satisfied with what I have – I always want more.",
		"I would kill to acquire a noble title.",
		"I'm horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I'm surrounded by rivals."
	],  //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.

	extra : [
		"Select a Magitek Specialty",
		"Aerial|Constructs",
		"Equipment|Personnel",
		"Infra. Systems",
		"Land Veh.|Constructs",
	], //optional; the extra options the background gives on the first page of the sheet (in line Background at the top there are two drop-down menus). The first entry in this array is what is used for the mouseover text. If your background offers no extra features, simply delete this entry. Make sure that text you enter here fits into the field, or it won't look as good

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : [["Engineer's kit", ""], ["Vehicles (Magitek)", ""]], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated

	languageProfs : ["Garlean"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	variant : [""], //optional; the variants this background has, using the exact names of the entry of the variant in the BackgroundSubList. If you don't want to define a variant, you can remove this line

	lifestyle : "comfortable", //optional; sets the lifestyle of the sheet. Options are: "wretched", "squalid", "poor", "modest", "comfortable", "wealthy", or "aristocratic"
};

BackgroundFeatureList["architectus"] = {  //Note the use of only lower case!
	description : "You are assigned the rank of jen, recognized within Garlemald. You possess specialized knowledge on magitek devices including objects, vehicles, and constructs. Outside of combat, if a particular piece of magitek correlates with your specialization, this knowledge is second nature to you and does not require a skill check.", //required; the description of the feature as it will be put on the sheet. Make sure that this fits into the field or it won't look so pretty.

	source : ["FFXIV:WC", 149], //required; the source and the page number of the feature
};

//Magitek Engineer (IW)
BackgroundList["magitek engineer iw"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	regExpSearch : /^(?=.*magitek)(?=.*engineer)(?=.*iw).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has the consecutive words "where", "i", "am", and "from" in it, disregarding capitalization or words in between). If this looks too complicated, just write: /where i am from/i

	name : "Magitek Engineer (IW)", //required; the name as used

	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	skills : ["Investigation"], //optional; skill proficiencies gained from having the background. If the background doesn't give fixed proficiencies, but instead gives a choice, delete this line and use the line below, "skillstxt"

	gold : 5, //required; the amount of gold pieces added to the Equipment section on the second page when selecting "Background's items and gold" from the "Add Equipment" menu.

	equipleft : [ //optional; syntax is: ["description", "amount", "weight"]. Put "" if it is nothing, don't put 0
		["Work Clothes", "", ""],
		["Engineer's Kith", "", 10],
		["Welding Goggles", "", ""],
		["Container of Ceruleum", "", ""],
	], //items as they are added to the left column of the Equipment section on the second page when selecting "Background's items and gold" from the "Add Equipment" menu.

	feature : "Freedom through Technology", //required; the name of the background feature as it will appear on the sheet. The feature is then retrieved from the BackgroundFeatureList, see below

	trait : [
		"I sneak my initials onto everything I work on.",
		"I feel the need to touch everything I see.",
		"I have my own unique design flair, it's important.",
		"I'm sick of telling people to fill the bloody kettle!",
		"I have a habit of dismantling things when I'm bored.",
		"I see little value in gil, unless it's to purchaseknowledge like books or Allagan tomestones.",
		"It irks me greatly when things aren't straight or orderly.",
		"I talk at length about magitek - and often too fast."
	], //required; A list of the personality traits that can be chosen using the "Add Features" button on the second page. This list can be any length.

	ideal : [
		["Methods",
			"Methods. I take extra time to complete things. (Lawful)"
		],
		["Power",
			"Power. I smile when I hear imperial warmachina wasused to squash impertinent savages. (Evil)"
		],
		["Greed",
			"Greed. Advance the realm? I'd rather use magitek toadvance my purse. (Neutral)"
		],
		["Philanthropy",
			"Philanthropy. If the device doesn't help anyone, thenwhat is the point? (Good)"
		],
		["War",
			"War. I measure success based on the amount ofwanton destruction my projects cause. (Chaotic)"
		],
		["Innovation",
			"Innovation. Every minute improvement brings therealm one step closer to advancement. (Any)"
		],
	], //required; A list of the  ideals that can be chosen using the "Add Features" button on the second page. This list can be any length. Take note of the two-step build for every ideal, this is essential!

	bond : [
		"I trust those who appreciate my knowledge and labor.",
		"I've drawn up blueprints - I will see it to fruition.",
		"My allegiance is to no nation, only to my ingenuity.",
		"My mentors had taught me everything they knew.",
		"I'm surrounded by, admittedly endearing, idiots.",
		"I often get attached to anything I build or work on."
	], //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.

	flaw : [
		"I'll do anything to get my hands on something rare or priceless.",
		"I'm quick to assume that someone is trying to cheat me.",
		"No one must ever learn that I once stole money from guild coffers.",
		"I'm never satisfied with what I have – I always want more.",
		"I would kill to acquire a noble title.",
		"I'm horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I'm surrounded by rivals."
	],  //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.

	extra : [
		"Select a Magitek Specialty",
		"Aerial|Constructs",
		"Equipment|Personnel",
		"Infra. Systems",
		"Land Veh.|Constructs",
	], //optional; the extra options the background gives on the first page of the sheet (in line Background at the top there are two drop-down menus). The first entry in this array is what is used for the mouseover text. If your background offers no extra features, simply delete this entry. Make sure that text you enter here fits into the field, or it won't look as good

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : [["Engineer's kit", ""], ["Vehicles (Magitek)", ""]], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated

	languageProfs : ["Garlean"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	variant : [""], //optional; the variants this background has, using the exact names of the entry of the variant in the BackgroundSubList. If you don't want to define a variant, you can remove this line

	lifestyle : "comfortable", //optional; sets the lifestyle of the sheet. Options are: "wretched", "squalid", "poor", "modest", "comfortable", "wealthy", or "aristocratic"
};

BackgroundFeatureList["freedom through technology"] = {  //Note the use of only lower case!
	description : "Using the crafting an item rules as described in Xanathar's Guide to Everything, and with use of an engineers' kit, you are able to take a nonmagical object, piece of gear, or item, and convert it into a magitek iteration of itself. Work with your DM to determine the nature and extent of the innovationthat the conversion grants.", //required; the description of the feature as it will be put on the sheet. Make sure that this fits into the field or it won't look so pretty.
	source : ["FFXIV:WC", 149], //required; the source and the page number of the feature
};