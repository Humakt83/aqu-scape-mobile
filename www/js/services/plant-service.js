angular.module('aqu-scape').factory('PlantService', [ function() {

    function Plant(scientificName, finnishName, diameter) {
        this.scientificName = scientificName;
        this.finnishName = finnishName;
        this.diameter = diameter;
    }
    
    var plantsArray = [new Plant('Crinum calamistratum', 'Kiharakriinumi', 15),
        new Plant('Ceratophyllum submersum', 'Hentokarvalehti', 25),
        new Plant('Taxiphyllum barbieri', 'Jaavansammal', 20),
        new Plant('Taxiphyllum barbieri', 'Kelluhankasammal', 10),
        new Plant('Microsorum pteropus', 'Jaavansaniainen', 5),
        new Plant('Ceratopteris thalictroides', 'Vesisaniainen', 20),
        new Plant('Vallisneria spiralis', 'Vallisneria', 18),
        new Plant('Rotala rotundifolla', 'Hentorotala', 15),
        new Plant('Pistia stratiotes', 'Pistia', 22),
        new Plant('Nymphaea micrantha', 'Rusolumme', 27),
        new Plant('Najas guadalupensis', 'Hentonäkinruoho', 29),
        new Plant('Mayaca fluviatilis', 'Hapsuruoho', 30),
        new Plant('Myriophyllum tuberculatum', 'Ruosteärviä', 32),
        new Plant('Limnophila sessiliflora', 'Vedensuosikki', 33),
        new Plant('Hygrophila polysperma', 'Intianvesitähdikki', 13),
        new Plant('Hydrocotyle leucocephala', 'Konnanputki', 10),
        new Plant('Elodea canadensis', 'Kanadanvesirutto', 8),
        new Plant('Echidonorus `Rubin`', 'Rubiinivesimiekka', 7),
        new Plant('Echidonorus `Red Special`', 'Ruostevesimiekka', 4),
        new Plant('Echidonorus grisebachii', 'Amazoninvesimiekka', 2),
        new Plant('Anubias barteri var. barteri', 'Herttakeihäslehti', 5),
        new Plant('Anubias barteri var. coffeifolia', 'Kahvikeihäslehti', 10),
        new Plant('Saururus cernuus', 'Herttalehti', 20),
        new Plant('Gymnocoronis spilanthoides', 'Vesiasteri', 11),
        new Plant('Microsorum pteropus', 'Jaavansaniainen', 22),
        new Plant('Cryptocorune xwillisii', 'Kääpiömelalehti', 18),
        new Plant('Cryptocorune undulata', 'Aaltomelalehti', 19),
        new Plant('Eleocharis acicularis', 'Hapsiluikka', 5)
    ];

    return {
        getPlants : function() {
            return plantsArray;
        }
    }
}]);
