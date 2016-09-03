angular.module('aqu-scape').factory('PlantService', [ function() {

    function Plant(scientificName, finnishName) {
        this.scientificName = scientificName;
        this.finnishName = finnishName;
    }
    
    var plantsArray = [new Plant('Crinum calamistratum', 'Kiharakriinumi'),
        new Plant('Ceratophyllum submersum', 'Hentokarvalehti'),
        new Plant('Taxiphyllum barbieri', 'Jaavansammal'),
        new Plant('Taxiphyllum barbieri', 'Kelluhankasammal'),
        new Plant('Microsorum pteropus', 'Jaavansaniainen'),
        new Plant('Ceratopteris thalictroides', 'Vesisaniainen'),
        new Plant('Vallisneria spiralis', 'Vallisneria'),
        new Plant('Rotala rotundifolla', 'Hentorotala'),
        new Plant('Pistia stratiotes', 'Pistia'),
        new Plant('Nymphaea micrantha', 'Rusolumme'),
        new Plant('Najas guadalupensis', 'Hentonäkinruoho'),
        new Plant('Mayaca fluviatilis', 'Hapsuruoho'),
        new Plant('Myriophyllum tuberculatum', 'Ruosteärviä'),
        new Plant('Limnophila sessiliflora', 'Vedensuosikki'),
        new Plant('Hygrophila polysperma', 'Intianvesitähdikki'),
        new Plant('Hydrocotyle leucocephala', 'Konnanputki'),
        new Plant('Elodea canadensis', 'Kanadanvesirutto'),
        new Plant('Echidonorus `Rubin`', 'Rubiinivesimiekka'),
        new Plant('Echidonorus `Red Special`', 'Ruostevesimiekka'),
        new Plant('Echidonorus grisebachii', 'Amazoninvesimiekka'),
        new Plant('Anubias barteri var. barteri', 'Herttakeihäslehti'),
        new Plant('Anubias barteri var. coffeifolia', 'Kahvikeihäslehti'),
        new Plant('Saururus cernuus', 'Herttalehti'),
        new Plant('Gymnocoronis spilanthoides', 'Vesiasteri'),
        new Plant('Microsorum pteropus', 'Jaavansaniainen'),
        new Plant('Cryptocorune xwillisii', 'Kääpiömelalehti'),
        new Plant('Cryptocorune undulata', 'Aaltomelalehti'),
        new Plant('Eleocharis acicularis', 'Hapsiluikka')
    ];

    return {
        getPlants : function() {
            return plantsArray;
        }
    }
}]);
