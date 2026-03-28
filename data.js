const THEMES = {
  salutations: {
    label:"Salutations & Politesse", icon:"👋", color:"#FF3B30",
    words:[
      {mg:"Manahoana",fr:"Bonjour / Salut",ph:"ma-na-OO-na"},
      {mg:"Veloma",fr:"Au revoir",ph:"ve-LOO-ma"},
      {mg:"Misaotra",fr:"Merci",ph:"mi-SOW-tra"},
      {mg:"Azafady",fr:"S'il vous plaît / Excusez-moi",ph:"a-za-FA-di"},
      {mg:"Eny",fr:"Oui",ph:"EH-ni"},
      {mg:"Tsia",fr:"Non",ph:"TSYA"}
    ]
  },
  famille: {
    label:"Famille & Relations", icon:"👨‍👩‍👧", color:"#FF9500",
    words:[
      {mg:"Reny",fr:"Mère",ph:"REH-ni"},
      {mg:"Ray",fr:"Père",ph:"RAY"},
      {mg:"Zaza",fr:"Enfant",ph:"ZA-za"},
      {mg:"Rahalahy",fr:"Frère",ph:"ra-ha-LA-hi"},
      {mg:"Anabavy",fr:"Sœur",ph:"a-na-BA-vi"}
    ]
  },
  verbes: {
    label: "Verbes d'action", icon: "🏃", color: "#34C759",
    words: [
      {mg:"Manao",fr:"Faire",ph:"ma-NAW"},
      {mg:"Mandeha",fr:"Aller / Partir",ph:"man-DEH-ha"},
      {mg:"Mihinana",fr:"Manger",ph:"mi-HI-na-na"},
      {mg:"Misotro",fr:"Boire",ph:"mi-SOO-troo"},
      {mg:"Matory",fr:"Dormir",ph:"ma-TOO-ri"}
    ]
  },
  adjectifs: {
    label: "Adjectifs courants", icon: "✨", color: "#AF52DE",
    words: [
      {mg:"Tsara",fr:"Bon / Bien",ph:"TSA-ra"},
      {mg:"Ratsy",fr:"Mauvais",ph:"RA-tsi"},
      {mg:"Lehibe",fr:"Grand",ph:"leh-HI-beh"},
      {mg:"Kely",fr:"Petit",ph:"KEH-li"},
      {mg:"Lavitra",fr:"Loin",ph:"LA-vi-tra"}
    ]
  },
  survie: {
    label: "Survie & Urgences", icon: "🆘", color: "#FF2D55",
    words: [
      {mg:"Ampio aho!",fr:"Aidez-moi !",ph:"am-PI-oo a-oo"},
      {mg:"Vonjeo!",fr:"Au secours !",ph:"voon-JEH-oo"},
      {mg:"Tsy azoko",fr:"Je ne comprends pas",ph:"tsi a-ZOO-koo"},
      {mg:"Avereno azafady",fr:"Répétez s'il vous plaît",ph:"a-veh-REH-noo a-za-FA-di"},
      {mg:"Mila dokotera aho",fr:"J'ai besoin d'un médecin",ph:"MI-la doo-koo-TEH-ra a-oo"}
    ]
  }
};

const GRAMMAR_LESSONS = [
  {id:"vos",title:"Structure VOS",icon:"📐",color:"#FF3B30",
   content:[
     {type:"text",text:"Le malgache suit l'ordre **Verbe – Objet – Sujet (VOS)**, à l'opposé du français."},
     {type:"example",mg:"Mamaky boky ny mpianatra",fr:"L'étudiant lit des livres",note:"Lit livre(s) l'étudiant"}
   ],tip:"Pense toujours à l'envers : action → objet → qui fait l'action."},
  
  {id:"conj_bases", title: "Conjugaison : Les 3 temps", icon: "⏳", color: "#FF9500",
    content: [
      {type: "text", text: "En malgache, la conjugaison est extrêmement simple ! Le verbe ne change **pas** selon la personne."},
      {type: "bullet", items: ["**M** : Présent (ex: **M**andeha)","**N** : Passé (ex: **N**andeha)","**H** : Futur (ex: **H**andeha)"]},
      {type: "example", mg: "Nihinana vary izy", fr: "Il a mangé du riz", note: "Nihinana = passé de Mihinana"}
    ],tip: "Remplace simplement le M initial par un N (passé) ou un H (futur) !"}
];
