'use strict';

/* Controllers */

angular.module('citySensing.controllers', [])
  .controller('mainCtrl', function($scope, $http, gridService, apiService, $rootScope) {

    // base grid for the map
    $scope.gridUrl = "grid/grid_milan.json";
    // default initial start value
    $scope.star = 1365469200000;
    // default initial end value
    $scope.end = 1366182000000;

    $scope.threshold = {"value" : 50};

    //set map config
    $scope.coordinates = [45.4640, 9.1916]; //map center
    $scope.southWest = [45.2865, 8.9017]; //sw max bound coordinates
    $scope.northEast = [45.6313, 9.4153]; //ne max bound coordinates
    $scope.zoom = 13; //init zoom
    $scope.tile = 'm'; //tile set

    $scope.colorList = [
      {
        label: "Social Sentiment",
        value: "social_sentiment",
      },
      {
        label: "Social Activity",
        value: "social_activity"
      },
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      },
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      }
    ]

    $scope.color = $scope.colorList[0]

    $scope.chooseColor = function(color) {
      $scope.color = color;
    }

    $scope.colors = {
      social_sentiment : "#F0965B",
      social_activity : "#F8C4A3",
      mobily_activity : "#87bbdc",
      mobily_anomaly : "#236fa6"
    }

    $scope.sizeList = [
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      },
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      },
      {
        label: "Social Sentiment",
        value: "social_sentiment",
      },
      {
        label: "Social Activity",
        value: "social_activity"
      }
    ]

    $scope.size = $scope.sizeList[0]

    $scope.chooseSize = function(size) {
      $scope.size = size;
    }

    gridService.getGrid($scope.gridUrl).then(
      function(data){
        $scope.grid = data;
      },
      function(error){

      }
    )

    $scope.anomalyColumnName = "anomaly_index";

    $scope.updateColumnName = function(){
      if (!$scope.anomalyColumnName || $scope.anomalyColumnName == ""){
        delete $scope.request.anomalyColumnName;
        return;
      }
      $scope.request.anomalyColumnName = $scope.anomalyColumnName;
    }

    $scope.exponent = $scope.anomalyExponent = 10;

    $scope.updateExponent = function(){
      if (!$scope.exponent || $scope.exponent == "") return;
      $scope.anomalyExponent = $scope.exponent;
    }


    $scope.showMap = true;

    $scope.request = {
      start: 1365469200000,
      end: 1366182000000,
      cells: [],
      port: 8003
    }



    $scope.areas = [
      {name: "Milano (all cells)", cells : []},
      {name: "Brera Design District", cells : [5858, 5859, 5860, 5861, 5758, 5759, 5760, 5761, 5658, 5659, 5660, 5661, 5558, 5559, 5560, 5561, 5458, 5459, 5460, 5461, 5358, 5359, 5360, 5361, 5258, 5259, 5260, 5261]},
      {name: "Zona Tortona", cells : [4749, 4750, 4751, 4752, 4753, 4649, 4650, 4651, 4652, 4653, 4549, 4550, 4551, 4552, 4553, 4449, 4450, 4451, 4452, 4453]},
      {name: "Lambrate Ventura", cells : [6176, 6177, 6178, 6179, 6180, 6076, 6077, 6078, 6079, 6080, 5976, 5977, 5978, 5979, 5980, 5876, 5877, 5878, 5879, 5880]},
      {name: "Università degli Studi", cells : [4961, 4962, 4963, 4964, 4861, 4862, 4863, 4864, 4761, 4762, 4763, 4764]},
      {name: "Centro", cells : [5158, 5159, 5160, 5161, 5162, 5163, 5164, 5058, 5059, 5060, 5061, 5062, 5063, 5064]},
      {name: "Porta Venezia", cells : [5862, 5863, 5864, 5865, 5866, 5867, 5868, 5869, 5870, 5762, 5763, 5764, 5765, 5766, 5767, 5768, 5769, 5770, 5662, 5663, 5664, 5665, 5666, 5667, 5668, 5669, 5670, 5562, 5563, 5564, 5565, 5566, 5567, 5568, 5569, 5570, 5462, 5463, 5464, 5465, 5466, 5467, 5468, 5469, 5470]},
      {name: "Porta Romana", cells : [4661, 4662, 4663, 4664, 4665, 4666, 4667, 4668, 4561, 4562, 4563, 4564, 4565, 4566, 4567, 4568, 4461, 4462, 4463, 4464, 4465, 4466, 4467, 4468, 4361, 4362, 4363, 4364, 4365, 4366, 4367, 4368]},
      {name: "Museo della Scienza", cells : [5054, 5055, 4954, 4955]},
      {name: "Triennale", cells : [5853, 5854, 5855, 5856, 5857, 5753, 5754, 5755, 5756, 5757, 5653, 5654, 5655, 5656, 5657, 5553, 5554, 5555, 5556, 5557, 5453, 5454, 5455, 5456, 5457, 5353, 5354, 5355, 5356, 5357, 5253, 5254, 5255, 5256, 5257]}
    ]

    // dismiss errors
    $scope.dismiss = function(){
      $scope.error = false;
    }

    $scope.clearSelection = function(){
      $scope.request.cells = [];
      $scope.request.start = $scope.star;
      $scope.request.end = $scope.end;
    }

    $scope.searchContact = {'location' : 'national'};
    
    $scope.inoutComparator = function(expected, actual){
        if(expected && actual){
            if(expected == 'international' || expected == 'national'){
                return angular.equals(expected, actual)
            }
            else {
                if(expected.toLowerCase().indexOf(actual.toLowerCase()) == -1){
                    return false;
                }
                else{
                    return true
                }
            }
        }

    };

    $scope.toCountryName = function(code){
      var countryCode = {
        "93" : {"country_name" : "Afghanistan"},
        "355" : {"country_name" : "Albania"},
        "213" : {"country_name" : "Algeria"},
        "376" : {"country_name" : "Andorra"},
        "244" : {"country_name" : "Angola"},
        "54" : {"country_name" : "Argentina"},
        "374" : {"country_name" : "Armenia"},
        "297" : {"country_name" : "Aruba"},
        "247" : {"country_name" : "Ascension"},
        "61" : {"country_name" : "Australia"},
        "672" : {"country_name" : "Australian External Territories"},
        "43" : {"country_name" : "Austria"},
        "994" : {"country_name" : "Azerbaijan"},
        "973" : {"country_name" : "Bahrain"},
        "880" : {"country_name" : "Bangladesh"},
        "375" : {"country_name" : "Belarus"},
        "32" : {"country_name" : "Belgium"},
        "501" : {"country_name" : "Belize"},
        "229" : {"country_name" : "Benin"},
        "975" : {"country_name" : "Bhutan"},
        "591" : {"country_name" : "Bolivia"},
        "387" : {"country_name" : "Bosnia and Herzegovina"},
        "267" : {"country_name" : "Botswana"},
        "55" : {"country_name" : "Brazil"},
        "246" : {"country_name" : "British Indian Ocean Territory"},
        "673" : {"country_name" : "Brunei Darussalam"},
        "359" : {"country_name" : "Bulgaria"},
        "226" : {"country_name" : "Burkina Faso"},
        "95" : {"country_name" : "Burma"},
        "257" : {"country_name" : "Burundi"},
        "855" : {"country_name" : "Cambodia"},
        "237" : {"country_name" : "Cameroon"},
        "238" : {"country_name" : "Cape Verde"},
        "236" : {"country_name" : "Central African Republic"},
        "235" : {"country_name" : "Chad"},
        "56" : {"country_name" : "Chile"},
        "86" : {"country_name" : "China"},
        "57" : {"country_name" : "Colombia"},
        "269" : {"country_name" : "Comoros"},
        "242" : {"country_name" : "Congo"},
        "243" : {"country_name" : "Congo, Democratic Republic of the (Zaire)"},
        "682" : {"country_name" : "Cook Islands"},
        "506" : {"country_name" : "Costa Rica"},
        "385" : {"country_name" : "Croatia"},
        "53" : {"country_name" : "Cuba"},
        "357" : {"country_name" : "Cyprus"},
        "420" : {"country_name" : "Czech Republic"},
        "225" : {"country_name" : "Côte d'Ivoire"},
        "45" : {"country_name" : "Denmark"},
        "253" : {"country_name" : "Djibouti"},
        "670" : {"country_name" : "East Timor"},
        "593" : {"country_name" : "Ecuador"},
        "20" : {"country_name" : "Egypt"},
        "503" : {"country_name" : "El Salvador"},
        "240" : {"country_name" : "Equatorial Guinea"},
        "291" : {"country_name" : "Eritrea"},
        "372" : {"country_name" : "Estonia"},
        "251" : {"country_name" : "Ethiopia"},
        "500" : {"country_name" : "Falkland Islands"},
        "298" : {"country_name" : "Faroe Islands"},
        "679" : {"country_name" : "Fiji"},
        "358" : {"country_name" : "Finland"},
        "33" : {"country_name" : "France"},
        "596" : {"country_name" : "French Antilles"},
        "594" : {"country_name" : "French Guiana"},
        "689" : {"country_name" : "French Polynesia"},
        "241" : {"country_name" : "Gabon"},
        "220" : {"country_name" : "Gambia"},
        "995" : {"country_name" : "Georgia"},
        "49" : {"country_name" : "Germany"},
        "233" : {"country_name" : "Ghana"},
        "350" : {"country_name" : "Gibraltar"},
        "881" : {"country_name" : "Global Mobile Satellite System (GMSS)"},
        "30" : {"country_name" : "Greece"},
        "299" : {"country_name" : "Greenland"},
        "590" : {"country_name" : "Guadeloupe"},
        "502" : {"country_name" : "Guatemala"},
        "224" : {"country_name" : "Guinea"},
        "245" : {"country_name" : "Guinea-Bissau"},
        "592" : {"country_name" : "Guyana"},
        "509" : {"country_name" : "Haiti"},
        "504" : {"country_name" : "Honduras"},
        "852" : {"country_name" : "Hong Kong"},
        "36" : {"country_name" : "Hungary"},
        "354" : {"country_name" : "Iceland"},
        "91" : {"country_name" : "India"},
        "62" : {"country_name" : "Indonesia"},
        "870" : {"country_name" : "Inmarsat SNAC"},
        "800" : {"country_name" : "International Freephone Service"},
        "808" : {"country_name" : "International Shared Cost Service (ISCS)"},
        "98" : {"country_name" : "Iran"},
        "964" : {"country_name" : "Iraq"},
        "353" : {"country_name" : "Ireland"},
        "972" : {"country_name" : "Israel"},
        "39" : {"country_name" : "Italy"},
        "81" : {"country_name" : "Japan"},
        "962" : {"country_name" : "Jordan"},
        "254" : {"country_name" : "Kenya"},
        "686" : {"country_name" : "Kiribati"},
        "850" : {"country_name" : "Korea, North"},
        "82" : {"country_name" : "Korea, South"},
        "965" : {"country_name" : "Kuwait"},
        "996" : {"country_name" : "Kyrgyzstan"},
        "856" : {"country_name" : "Laos"},
        "371" : {"country_name" : "Latvia"},
        "961" : {"country_name" : "Lebanon"},
        "266" : {"country_name" : "Lesotho"},
        "231" : {"country_name" : "Liberia"},
        "218" : {"country_name" : "Libya"},
        "423" : {"country_name" : "Liechtenstein"},
        "370" : {"country_name" : "Lithuania"},
        "352" : {"country_name" : "Luxembourg"},
        "853" : {"country_name" : "Macau"},
        "389" : {"country_name" : "Macedonia"},
        "261" : {"country_name" : "Madagascar"},
        "265" : {"country_name" : "Malawi"},
        "60" : {"country_name" : "Malaysia"},
        "960" : {"country_name" : "Maldives"},
        "223" : {"country_name" : "Mali"},
        "356" : {"country_name" : "Malta"},
        "692" : {"country_name" : "Marshall Islands"},
        "222" : {"country_name" : "Mauritania"},
        "230" : {"country_name" : "Mauritius"},
        "52" : {"country_name" : "Mexico"},
        "691" : {"country_name" : "Micronesia, Federated States of"},
        "373" : {"country_name" : "Moldova"},
        "377" : {"country_name" : "Monaco"},
        "976" : {"country_name" : "Mongolia"},
        "382" : {"country_name" : "Montenegro"},
        "212" : {"country_name" : "Morocco"},
        "258" : {"country_name" : "Mozambique"},
        "264" : {"country_name" : "Namibia"},
        "674" : {"country_name" : "Nauru"},
        "977" : {"country_name" : "Nepal"},
        "31" : {"country_name" : "Netherlands"},
        "687" : {"country_name" : "New Caledonia"},
        "64" : {"country_name" : "New Zealand"},
        "505" : {"country_name" : "Nicaragua"},
        "227" : {"country_name" : "Niger"},
        "234" : {"country_name" : "Nigeria"},
        "683" : {"country_name" : "Niue"},
        "47" : {"country_name" : "Norway"},
        "968" : {"country_name" : "Oman"},
        "92" : {"country_name" : "Pakistan"},
        "680" : {"country_name" : "Palau"},
        "970" : {"country_name" : "Palestinian territories"},
        "507" : {"country_name" : "Panama"},
        "675" : {"country_name" : "Papua New Guinea"},
        "595" : {"country_name" : "Paraguay"},
        "51" : {"country_name" : "Peru"},
        "63" : {"country_name" : "Philippines"},
        "48" : {"country_name" : "Poland"},
        "351" : {"country_name" : "Portugal"},
        "974" : {"country_name" : "Qatar"},
        "40" : {"country_name" : "Romania"},
        "250" : {"country_name" : "Rwanda"},
        "262" : {"country_name" : "Réunion"},
        "7" : {"country_name" : "Russia"},
        "290" : {"country_name" : "Saint Helena"},
        "508" : {"country_name" : "Saint Pierre and Miquelon"},
        "685" : {"country_name" : "Samoa"},
        "378" : {"country_name" : "San Marino"},
        "966" : {"country_name" : "Saudi Arabia"},
        "221" : {"country_name" : "Senegal"},
        "381" : {"country_name" : "Serbia"},
        "248" : {"country_name" : "Seychelles"},
        "232" : {"country_name" : "Sierra Leone"},
        "65" : {"country_name" : "Singapore"},
        "421" : {"country_name" : "Slovakia"},
        "386" : {"country_name" : "Slovenia"},
        "677" : {"country_name" : "Solomon Islands"},
        "252" : {"country_name" : "Somalia"},
        "27" : {"country_name" : "South Africa"},
        "211" : {"country_name" : "South Sudan"},
        "34" : {"country_name" : "Spain"},
        "94" : {"country_name" : "Sri Lanka"},
        "249" : {"country_name" : "Sudan"},
        "597" : {"country_name" : "Suriname"},
        "268" : {"country_name" : "Swaziland"},
        "46" : {"country_name" : "Sweden"},
        "41" : {"country_name" : "Switzerland"},
        "963" : {"country_name" : "Syria"},
        "239" : {"country_name" : "São Tomé and Príncipe"},
        "886" : {"country_name" : "Taiwan"},
        "992" : {"country_name" : "Tajikistan"},
        "66" : {"country_name" : "Thailand"},
        "228" : {"country_name" : "Togo"},
        "690" : {"country_name" : "Tokelau"},
        "676" : {"country_name" : "Tonga"},
        "216" : {"country_name" : "Tunisia"},
        "90" : {"country_name" : "Turkey"},
        "993" : {"country_name" : "Turkmenistan"},
        "688" : {"country_name" : "Tuvalu"},
        "256" : {"country_name" : "Uganda"},
        "380" : {"country_name" : "Ukraine"},
        "971" : {"country_name" : "United Arab Emirates"},
        "44" : {"country_name" : "United Kingdom"},
        "878" : {"country_name" : "Universal Personal Telecommunications (UPT)"},
        "1" : {"country_name" : "United States - Canada"},
        "598" : {"country_name" : "Uruguay"},
        "998" : {"country_name" : "Uzbekistan"},
        "678" : {"country_name" : "Vanuatu"},
        "58" : {"country_name" : "Venezuela"},
        "84" : {"country_name" : "Vietnam"},
        "681" : {"country_name" : "Wallis and Futuna"},
        "967" : {"country_name" : "Yemen"},
        "260" : {"country_name" : "Zambia"},
        "255" : {"country_name" : "Zanzibar"},
        "263" : {"country_name" : "Zimbabwe"}
        };
      
        if (countryCode[code]){ return countryCode[code]["country_name"]}
        else{ return "unknown"}
    }


  })
  .controller('mfw', function($scope, $http, gridService, apiService, $rootScope) {

    // base grid for the map
    $scope.gridUrl = "grid/grid_milan.json";
    // default initial start value
    $scope.star = 1377986400000;
    // default initial end value
    $scope.end = 1381442399000;

    $scope.threshold = {"value" : 50};

    //set map config
    $scope.coordinates = [45.4640, 9.1916]; //map center
    $scope.southWest = [45.2865, 8.9017]; //sw max bound coordinates
    $scope.northEast = [45.6313, 9.4153]; //ne max bound coordinates
    $scope.zoom = 13; //init zoom
    $scope.tile = 'm'; //tile set

    $scope.colorList = [
      {
        label: "Social Sentiment",
        value: "social_sentiment",
      },
      {
        label: "Social Activity",
        value: "social_activity"
      },
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      },
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      }
    ]

    $scope.color = $scope.colorList[0]

    $scope.chooseColor = function(color) {
      $scope.color = color;
    }

    $scope.colors = {
      social_sentiment : "#F0965B",
      social_activity : "#F8C4A3",
      mobily_activity : "#87bbdc",
      mobily_anomaly : "#236fa6"
    }

    $scope.sizeList = [
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      },
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      },
      {
        label: "Social Sentiment",
        value: "social_sentiment",
      },
      {
        label: "Social Activity",
        value: "social_activity"
      }
    ]

    $scope.size = $scope.sizeList[0]

    $scope.chooseSize = function(size) {
      $scope.size = size;
    }

    gridService.getGrid($scope.gridUrl).then(
      function(data){
        $scope.grid = data;
      },
      function(error){

      }
    )

    $scope.anomalyColumnName = "anomaly_index";

    $scope.updateColumnName = function(){
      if (!$scope.anomalyColumnName || $scope.anomalyColumnName == ""){
        delete $scope.request.anomalyColumnName;
        return;
      }
      $scope.request.anomalyColumnName = $scope.anomalyColumnName;
    }

    $scope.exponent = $scope.anomalyExponent = 10;

    $scope.updateExponent = function(){
      if (!$scope.exponent || $scope.exponent == "") return;
      $scope.anomalyExponent = $scope.exponent;
    }


    $scope.showMap = true;

    $scope.request = {
      start: 1377986400000,
      end: 1381442399000,
      cells: [],
      port: 8009
    }



    $scope.areas = [
      {name: "Milano (all cells)", cells : []},
      {name: "Brera Design District", cells : [5858, 5859, 5860, 5861, 5758, 5759, 5760, 5761, 5658, 5659, 5660, 5661, 5558, 5559, 5560, 5561, 5458, 5459, 5460, 5461, 5358, 5359, 5360, 5361, 5258, 5259, 5260, 5261]},
      {name: "Zona Tortona", cells : [4749, 4750, 4751, 4752, 4753, 4649, 4650, 4651, 4652, 4653, 4549, 4550, 4551, 4552, 4553, 4449, 4450, 4451, 4452, 4453]},
      {name: "Lambrate Ventura", cells : [6176, 6177, 6178, 6179, 6180, 6076, 6077, 6078, 6079, 6080, 5976, 5977, 5978, 5979, 5980, 5876, 5877, 5878, 5879, 5880]},
      {name: "Università degli Studi", cells : [4961, 4962, 4963, 4964, 4861, 4862, 4863, 4864, 4761, 4762, 4763, 4764]},
      {name: "Centro", cells : [5158, 5159, 5160, 5161, 5162, 5163, 5164, 5058, 5059, 5060, 5061, 5062, 5063, 5064]},
      {name: "Porta Venezia", cells : [5862, 5863, 5864, 5865, 5866, 5867, 5868, 5869, 5870, 5762, 5763, 5764, 5765, 5766, 5767, 5768, 5769, 5770, 5662, 5663, 5664, 5665, 5666, 5667, 5668, 5669, 5670, 5562, 5563, 5564, 5565, 5566, 5567, 5568, 5569, 5570, 5462, 5463, 5464, 5465, 5466, 5467, 5468, 5469, 5470]},
      {name: "Porta Romana", cells : [4661, 4662, 4663, 4664, 4665, 4666, 4667, 4668, 4561, 4562, 4563, 4564, 4565, 4566, 4567, 4568, 4461, 4462, 4463, 4464, 4465, 4466, 4467, 4468, 4361, 4362, 4363, 4364, 4365, 4366, 4367, 4368]},
      {name: "Museo della Scienza", cells : [5054, 5055, 4954, 4955]},
      {name: "Triennale", cells : [5853, 5854, 5855, 5856, 5857, 5753, 5754, 5755, 5756, 5757, 5653, 5654, 5655, 5656, 5657, 5553, 5554, 5555, 5556, 5557, 5453, 5454, 5455, 5456, 5457, 5353, 5354, 5355, 5356, 5357, 5253, 5254, 5255, 5256, 5257]}
    ]

    // dismiss errors
    $scope.dismiss = function(){
      $scope.error = false;
    }

    $scope.clearSelection = function(){
      $scope.request.cells = [];
      $scope.request.start = $scope.star;
      $scope.request.end = $scope.end;
    }

    $scope.searchContact = {'location' : 'national'};
    
    $scope.inoutComparator = function(expected, actual){
        if(expected && actual){
            if(expected == 'international' || expected == 'national'){
                return angular.equals(expected, actual)
            }
            else {
                if(expected.toLowerCase().indexOf(actual.toLowerCase()) == -1){
                    return false;
                }
                else{
                    return true
                }
            }
        }

    };

    $scope.toCountryName = function(code){
      var countryCode = {
        "93" : {"country_name" : "Afghanistan"},
        "355" : {"country_name" : "Albania"},
        "213" : {"country_name" : "Algeria"},
        "376" : {"country_name" : "Andorra"},
        "244" : {"country_name" : "Angola"},
        "54" : {"country_name" : "Argentina"},
        "374" : {"country_name" : "Armenia"},
        "297" : {"country_name" : "Aruba"},
        "247" : {"country_name" : "Ascension"},
        "61" : {"country_name" : "Australia"},
        "672" : {"country_name" : "Australian External Territories"},
        "43" : {"country_name" : "Austria"},
        "994" : {"country_name" : "Azerbaijan"},
        "973" : {"country_name" : "Bahrain"},
        "880" : {"country_name" : "Bangladesh"},
        "375" : {"country_name" : "Belarus"},
        "32" : {"country_name" : "Belgium"},
        "501" : {"country_name" : "Belize"},
        "229" : {"country_name" : "Benin"},
        "975" : {"country_name" : "Bhutan"},
        "591" : {"country_name" : "Bolivia"},
        "387" : {"country_name" : "Bosnia and Herzegovina"},
        "267" : {"country_name" : "Botswana"},
        "55" : {"country_name" : "Brazil"},
        "246" : {"country_name" : "British Indian Ocean Territory"},
        "673" : {"country_name" : "Brunei Darussalam"},
        "359" : {"country_name" : "Bulgaria"},
        "226" : {"country_name" : "Burkina Faso"},
        "95" : {"country_name" : "Burma"},
        "257" : {"country_name" : "Burundi"},
        "855" : {"country_name" : "Cambodia"},
        "237" : {"country_name" : "Cameroon"},
        "238" : {"country_name" : "Cape Verde"},
        "236" : {"country_name" : "Central African Republic"},
        "235" : {"country_name" : "Chad"},
        "56" : {"country_name" : "Chile"},
        "86" : {"country_name" : "China"},
        "57" : {"country_name" : "Colombia"},
        "269" : {"country_name" : "Comoros"},
        "242" : {"country_name" : "Congo"},
        "243" : {"country_name" : "Congo, Democratic Republic of the (Zaire)"},
        "682" : {"country_name" : "Cook Islands"},
        "506" : {"country_name" : "Costa Rica"},
        "385" : {"country_name" : "Croatia"},
        "53" : {"country_name" : "Cuba"},
        "357" : {"country_name" : "Cyprus"},
        "420" : {"country_name" : "Czech Republic"},
        "225" : {"country_name" : "Côte d'Ivoire"},
        "45" : {"country_name" : "Denmark"},
        "253" : {"country_name" : "Djibouti"},
        "670" : {"country_name" : "East Timor"},
        "593" : {"country_name" : "Ecuador"},
        "20" : {"country_name" : "Egypt"},
        "503" : {"country_name" : "El Salvador"},
        "240" : {"country_name" : "Equatorial Guinea"},
        "291" : {"country_name" : "Eritrea"},
        "372" : {"country_name" : "Estonia"},
        "251" : {"country_name" : "Ethiopia"},
        "500" : {"country_name" : "Falkland Islands"},
        "298" : {"country_name" : "Faroe Islands"},
        "679" : {"country_name" : "Fiji"},
        "358" : {"country_name" : "Finland"},
        "33" : {"country_name" : "France"},
        "596" : {"country_name" : "French Antilles"},
        "594" : {"country_name" : "French Guiana"},
        "689" : {"country_name" : "French Polynesia"},
        "241" : {"country_name" : "Gabon"},
        "220" : {"country_name" : "Gambia"},
        "995" : {"country_name" : "Georgia"},
        "49" : {"country_name" : "Germany"},
        "233" : {"country_name" : "Ghana"},
        "350" : {"country_name" : "Gibraltar"},
        "881" : {"country_name" : "Global Mobile Satellite System (GMSS)"},
        "30" : {"country_name" : "Greece"},
        "299" : {"country_name" : "Greenland"},
        "590" : {"country_name" : "Guadeloupe"},
        "502" : {"country_name" : "Guatemala"},
        "224" : {"country_name" : "Guinea"},
        "245" : {"country_name" : "Guinea-Bissau"},
        "592" : {"country_name" : "Guyana"},
        "509" : {"country_name" : "Haiti"},
        "504" : {"country_name" : "Honduras"},
        "852" : {"country_name" : "Hong Kong"},
        "36" : {"country_name" : "Hungary"},
        "354" : {"country_name" : "Iceland"},
        "91" : {"country_name" : "India"},
        "62" : {"country_name" : "Indonesia"},
        "870" : {"country_name" : "Inmarsat SNAC"},
        "800" : {"country_name" : "International Freephone Service"},
        "808" : {"country_name" : "International Shared Cost Service (ISCS)"},
        "98" : {"country_name" : "Iran"},
        "964" : {"country_name" : "Iraq"},
        "353" : {"country_name" : "Ireland"},
        "972" : {"country_name" : "Israel"},
        "39" : {"country_name" : "Italy"},
        "81" : {"country_name" : "Japan"},
        "962" : {"country_name" : "Jordan"},
        "254" : {"country_name" : "Kenya"},
        "686" : {"country_name" : "Kiribati"},
        "850" : {"country_name" : "Korea, North"},
        "82" : {"country_name" : "Korea, South"},
        "965" : {"country_name" : "Kuwait"},
        "996" : {"country_name" : "Kyrgyzstan"},
        "856" : {"country_name" : "Laos"},
        "371" : {"country_name" : "Latvia"},
        "961" : {"country_name" : "Lebanon"},
        "266" : {"country_name" : "Lesotho"},
        "231" : {"country_name" : "Liberia"},
        "218" : {"country_name" : "Libya"},
        "423" : {"country_name" : "Liechtenstein"},
        "370" : {"country_name" : "Lithuania"},
        "352" : {"country_name" : "Luxembourg"},
        "853" : {"country_name" : "Macau"},
        "389" : {"country_name" : "Macedonia"},
        "261" : {"country_name" : "Madagascar"},
        "265" : {"country_name" : "Malawi"},
        "60" : {"country_name" : "Malaysia"},
        "960" : {"country_name" : "Maldives"},
        "223" : {"country_name" : "Mali"},
        "356" : {"country_name" : "Malta"},
        "692" : {"country_name" : "Marshall Islands"},
        "222" : {"country_name" : "Mauritania"},
        "230" : {"country_name" : "Mauritius"},
        "52" : {"country_name" : "Mexico"},
        "691" : {"country_name" : "Micronesia, Federated States of"},
        "373" : {"country_name" : "Moldova"},
        "377" : {"country_name" : "Monaco"},
        "976" : {"country_name" : "Mongolia"},
        "382" : {"country_name" : "Montenegro"},
        "212" : {"country_name" : "Morocco"},
        "258" : {"country_name" : "Mozambique"},
        "264" : {"country_name" : "Namibia"},
        "674" : {"country_name" : "Nauru"},
        "977" : {"country_name" : "Nepal"},
        "31" : {"country_name" : "Netherlands"},
        "687" : {"country_name" : "New Caledonia"},
        "64" : {"country_name" : "New Zealand"},
        "505" : {"country_name" : "Nicaragua"},
        "227" : {"country_name" : "Niger"},
        "234" : {"country_name" : "Nigeria"},
        "683" : {"country_name" : "Niue"},
        "47" : {"country_name" : "Norway"},
        "968" : {"country_name" : "Oman"},
        "92" : {"country_name" : "Pakistan"},
        "680" : {"country_name" : "Palau"},
        "970" : {"country_name" : "Palestinian territories"},
        "507" : {"country_name" : "Panama"},
        "675" : {"country_name" : "Papua New Guinea"},
        "595" : {"country_name" : "Paraguay"},
        "51" : {"country_name" : "Peru"},
        "63" : {"country_name" : "Philippines"},
        "48" : {"country_name" : "Poland"},
        "351" : {"country_name" : "Portugal"},
        "974" : {"country_name" : "Qatar"},
        "40" : {"country_name" : "Romania"},
        "250" : {"country_name" : "Rwanda"},
        "262" : {"country_name" : "Réunion"},
        "7" : {"country_name" : "Russia"},
        "290" : {"country_name" : "Saint Helena"},
        "508" : {"country_name" : "Saint Pierre and Miquelon"},
        "685" : {"country_name" : "Samoa"},
        "378" : {"country_name" : "San Marino"},
        "966" : {"country_name" : "Saudi Arabia"},
        "221" : {"country_name" : "Senegal"},
        "381" : {"country_name" : "Serbia"},
        "248" : {"country_name" : "Seychelles"},
        "232" : {"country_name" : "Sierra Leone"},
        "65" : {"country_name" : "Singapore"},
        "421" : {"country_name" : "Slovakia"},
        "386" : {"country_name" : "Slovenia"},
        "677" : {"country_name" : "Solomon Islands"},
        "252" : {"country_name" : "Somalia"},
        "27" : {"country_name" : "South Africa"},
        "211" : {"country_name" : "South Sudan"},
        "34" : {"country_name" : "Spain"},
        "94" : {"country_name" : "Sri Lanka"},
        "249" : {"country_name" : "Sudan"},
        "597" : {"country_name" : "Suriname"},
        "268" : {"country_name" : "Swaziland"},
        "46" : {"country_name" : "Sweden"},
        "41" : {"country_name" : "Switzerland"},
        "963" : {"country_name" : "Syria"},
        "239" : {"country_name" : "São Tomé and Príncipe"},
        "886" : {"country_name" : "Taiwan"},
        "992" : {"country_name" : "Tajikistan"},
        "66" : {"country_name" : "Thailand"},
        "228" : {"country_name" : "Togo"},
        "690" : {"country_name" : "Tokelau"},
        "676" : {"country_name" : "Tonga"},
        "216" : {"country_name" : "Tunisia"},
        "90" : {"country_name" : "Turkey"},
        "993" : {"country_name" : "Turkmenistan"},
        "688" : {"country_name" : "Tuvalu"},
        "256" : {"country_name" : "Uganda"},
        "380" : {"country_name" : "Ukraine"},
        "971" : {"country_name" : "United Arab Emirates"},
        "44" : {"country_name" : "United Kingdom"},
        "878" : {"country_name" : "Universal Personal Telecommunications (UPT)"},
        "1" : {"country_name" : "United States - Canada"},
        "598" : {"country_name" : "Uruguay"},
        "998" : {"country_name" : "Uzbekistan"},
        "678" : {"country_name" : "Vanuatu"},
        "58" : {"country_name" : "Venezuela"},
        "84" : {"country_name" : "Vietnam"},
        "681" : {"country_name" : "Wallis and Futuna"},
        "967" : {"country_name" : "Yemen"},
        "260" : {"country_name" : "Zambia"},
        "255" : {"country_name" : "Zanzibar"},
        "263" : {"country_name" : "Zimbabwe"}
        };
      
        if (countryCode[code]){ return countryCode[code]["country_name"]}
        else{ return "unknown"}
    }


  })
  .controller('lcg', function($scope, $http, gridService, apiService, $rootScope) {

    // base grid for the map
    $scope.gridUrl = "grid/grid_lucca.json";
    // default initial start value
    $scope.star = 1381701600000;
    // default initial end value
    $scope.end = 1383951599000;

    $scope.threshold = {"value" : 50};

    //set map config
    $scope.coordinates = [43.8647, 10.6413]; //map center 
    $scope.southWest = [43.8127, 10.4631]; //sw max bound coordinates
    $scope.northEast = [43.9088, 10.8291]; //ne max bound coordinates
    $scope.zoom = 12; //init zoom
    $scope.tile = 'l'; //tile set


    $scope.colorList = [
      {
        label: "Social Sentiment",
        value: "social_sentiment",
      },
      {
        label: "Social Activity",
        value: "social_activity"
      },
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      },
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      }
    ]

    $scope.color = $scope.colorList[0]

    $scope.chooseColor = function(color) {
      $scope.color = color;
    }

    $scope.colors = {
      social_sentiment : "#F0965B",
      social_activity : "#F8C4A3",
      mobily_activity : "#87bbdc",
      mobily_anomaly : "#236fa6"
    }

    $scope.sizeList = [
      {
        label: "Mobile Activity",
        value: "mobily_activity"
      },
      {
        label: "Mobile Anomaly",
        value: "mobily_anomaly"
      },
      {
        label: "Social Sentiment",
        value: "social_sentiment",
      },
      {
        label: "Social Activity",
        value: "social_activity"
      }
    ]

    $scope.size = $scope.sizeList[0]

    $scope.chooseSize = function(size) {
      $scope.size = size;
    }

    gridService.getGrid($scope.gridUrl).then(
      function(data){
        $scope.grid = data;
      },
      function(error){

      }
    )

    $scope.anomalyColumnName = "anomaly_index";

    $scope.updateColumnName = function(){
      if (!$scope.anomalyColumnName || $scope.anomalyColumnName == ""){
        delete $scope.request.anomalyColumnName;
        return;
      }
      $scope.request.anomalyColumnName = $scope.anomalyColumnName;
    }

    $scope.exponent = $scope.anomalyExponent = 10;

    $scope.updateExponent = function(){
      if (!$scope.exponent || $scope.exponent == "") return;
      $scope.anomalyExponent = $scope.exponent;
    }


    $scope.showMap = true;

    $scope.request = {
      start: 1381701600000,
      end: 1383951599000,
      cells: [],
      port: 8010
    }



    $scope.areas = [
      {name: "Lucca Comics (all cells)", cells : []},
      {name: "Lucca", cells : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,25]},
      {name: "Montecatini", cells : [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]}
      ]

    // dismiss errors
    $scope.dismiss = function(){
      $scope.error = false;
    }

    $scope.clearSelection = function(){
      $scope.request.cells = [];
      $scope.request.start = $scope.star;
      $scope.request.end = $scope.end;
    }

    $scope.searchContact = {'location' : 'national'};
    
    $scope.inoutComparator = function(expected, actual){
        if(expected && actual){
            if(expected == 'international' || expected == 'national'){
                return angular.equals(expected, actual)
            }
            else {
                if(expected.toLowerCase().indexOf(actual.toLowerCase()) == -1){
                    return false;
                }
                else{
                    return true
                }
            }
        }

    };

    $scope.toCountryName = function(code){
      var countryCode = {
        "93" : {"country_name" : "Afghanistan"},
        "355" : {"country_name" : "Albania"},
        "213" : {"country_name" : "Algeria"},
        "376" : {"country_name" : "Andorra"},
        "244" : {"country_name" : "Angola"},
        "54" : {"country_name" : "Argentina"},
        "374" : {"country_name" : "Armenia"},
        "297" : {"country_name" : "Aruba"},
        "247" : {"country_name" : "Ascension"},
        "61" : {"country_name" : "Australia"},
        "672" : {"country_name" : "Australian External Territories"},
        "43" : {"country_name" : "Austria"},
        "994" : {"country_name" : "Azerbaijan"},
        "973" : {"country_name" : "Bahrain"},
        "880" : {"country_name" : "Bangladesh"},
        "375" : {"country_name" : "Belarus"},
        "32" : {"country_name" : "Belgium"},
        "501" : {"country_name" : "Belize"},
        "229" : {"country_name" : "Benin"},
        "975" : {"country_name" : "Bhutan"},
        "591" : {"country_name" : "Bolivia"},
        "387" : {"country_name" : "Bosnia and Herzegovina"},
        "267" : {"country_name" : "Botswana"},
        "55" : {"country_name" : "Brazil"},
        "246" : {"country_name" : "British Indian Ocean Territory"},
        "673" : {"country_name" : "Brunei Darussalam"},
        "359" : {"country_name" : "Bulgaria"},
        "226" : {"country_name" : "Burkina Faso"},
        "95" : {"country_name" : "Burma"},
        "257" : {"country_name" : "Burundi"},
        "855" : {"country_name" : "Cambodia"},
        "237" : {"country_name" : "Cameroon"},
        "238" : {"country_name" : "Cape Verde"},
        "236" : {"country_name" : "Central African Republic"},
        "235" : {"country_name" : "Chad"},
        "56" : {"country_name" : "Chile"},
        "86" : {"country_name" : "China"},
        "57" : {"country_name" : "Colombia"},
        "269" : {"country_name" : "Comoros"},
        "242" : {"country_name" : "Congo"},
        "243" : {"country_name" : "Congo, Democratic Republic of the (Zaire)"},
        "682" : {"country_name" : "Cook Islands"},
        "506" : {"country_name" : "Costa Rica"},
        "385" : {"country_name" : "Croatia"},
        "53" : {"country_name" : "Cuba"},
        "357" : {"country_name" : "Cyprus"},
        "420" : {"country_name" : "Czech Republic"},
        "225" : {"country_name" : "Côte d'Ivoire"},
        "45" : {"country_name" : "Denmark"},
        "253" : {"country_name" : "Djibouti"},
        "670" : {"country_name" : "East Timor"},
        "593" : {"country_name" : "Ecuador"},
        "20" : {"country_name" : "Egypt"},
        "503" : {"country_name" : "El Salvador"},
        "240" : {"country_name" : "Equatorial Guinea"},
        "291" : {"country_name" : "Eritrea"},
        "372" : {"country_name" : "Estonia"},
        "251" : {"country_name" : "Ethiopia"},
        "500" : {"country_name" : "Falkland Islands"},
        "298" : {"country_name" : "Faroe Islands"},
        "679" : {"country_name" : "Fiji"},
        "358" : {"country_name" : "Finland"},
        "33" : {"country_name" : "France"},
        "596" : {"country_name" : "French Antilles"},
        "594" : {"country_name" : "French Guiana"},
        "689" : {"country_name" : "French Polynesia"},
        "241" : {"country_name" : "Gabon"},
        "220" : {"country_name" : "Gambia"},
        "995" : {"country_name" : "Georgia"},
        "49" : {"country_name" : "Germany"},
        "233" : {"country_name" : "Ghana"},
        "350" : {"country_name" : "Gibraltar"},
        "881" : {"country_name" : "Global Mobile Satellite System (GMSS)"},
        "30" : {"country_name" : "Greece"},
        "299" : {"country_name" : "Greenland"},
        "590" : {"country_name" : "Guadeloupe"},
        "502" : {"country_name" : "Guatemala"},
        "224" : {"country_name" : "Guinea"},
        "245" : {"country_name" : "Guinea-Bissau"},
        "592" : {"country_name" : "Guyana"},
        "509" : {"country_name" : "Haiti"},
        "504" : {"country_name" : "Honduras"},
        "852" : {"country_name" : "Hong Kong"},
        "36" : {"country_name" : "Hungary"},
        "354" : {"country_name" : "Iceland"},
        "91" : {"country_name" : "India"},
        "62" : {"country_name" : "Indonesia"},
        "870" : {"country_name" : "Inmarsat SNAC"},
        "800" : {"country_name" : "International Freephone Service"},
        "808" : {"country_name" : "International Shared Cost Service (ISCS)"},
        "98" : {"country_name" : "Iran"},
        "964" : {"country_name" : "Iraq"},
        "353" : {"country_name" : "Ireland"},
        "972" : {"country_name" : "Israel"},
        "39" : {"country_name" : "Italy"},
        "81" : {"country_name" : "Japan"},
        "962" : {"country_name" : "Jordan"},
        "254" : {"country_name" : "Kenya"},
        "686" : {"country_name" : "Kiribati"},
        "850" : {"country_name" : "Korea, North"},
        "82" : {"country_name" : "Korea, South"},
        "965" : {"country_name" : "Kuwait"},
        "996" : {"country_name" : "Kyrgyzstan"},
        "856" : {"country_name" : "Laos"},
        "371" : {"country_name" : "Latvia"},
        "961" : {"country_name" : "Lebanon"},
        "266" : {"country_name" : "Lesotho"},
        "231" : {"country_name" : "Liberia"},
        "218" : {"country_name" : "Libya"},
        "423" : {"country_name" : "Liechtenstein"},
        "370" : {"country_name" : "Lithuania"},
        "352" : {"country_name" : "Luxembourg"},
        "853" : {"country_name" : "Macau"},
        "389" : {"country_name" : "Macedonia"},
        "261" : {"country_name" : "Madagascar"},
        "265" : {"country_name" : "Malawi"},
        "60" : {"country_name" : "Malaysia"},
        "960" : {"country_name" : "Maldives"},
        "223" : {"country_name" : "Mali"},
        "356" : {"country_name" : "Malta"},
        "692" : {"country_name" : "Marshall Islands"},
        "222" : {"country_name" : "Mauritania"},
        "230" : {"country_name" : "Mauritius"},
        "52" : {"country_name" : "Mexico"},
        "691" : {"country_name" : "Micronesia, Federated States of"},
        "373" : {"country_name" : "Moldova"},
        "377" : {"country_name" : "Monaco"},
        "976" : {"country_name" : "Mongolia"},
        "382" : {"country_name" : "Montenegro"},
        "212" : {"country_name" : "Morocco"},
        "258" : {"country_name" : "Mozambique"},
        "264" : {"country_name" : "Namibia"},
        "674" : {"country_name" : "Nauru"},
        "977" : {"country_name" : "Nepal"},
        "31" : {"country_name" : "Netherlands"},
        "687" : {"country_name" : "New Caledonia"},
        "64" : {"country_name" : "New Zealand"},
        "505" : {"country_name" : "Nicaragua"},
        "227" : {"country_name" : "Niger"},
        "234" : {"country_name" : "Nigeria"},
        "683" : {"country_name" : "Niue"},
        "47" : {"country_name" : "Norway"},
        "968" : {"country_name" : "Oman"},
        "92" : {"country_name" : "Pakistan"},
        "680" : {"country_name" : "Palau"},
        "970" : {"country_name" : "Palestinian territories"},
        "507" : {"country_name" : "Panama"},
        "675" : {"country_name" : "Papua New Guinea"},
        "595" : {"country_name" : "Paraguay"},
        "51" : {"country_name" : "Peru"},
        "63" : {"country_name" : "Philippines"},
        "48" : {"country_name" : "Poland"},
        "351" : {"country_name" : "Portugal"},
        "974" : {"country_name" : "Qatar"},
        "40" : {"country_name" : "Romania"},
        "250" : {"country_name" : "Rwanda"},
        "262" : {"country_name" : "Réunion"},
        "7" : {"country_name" : "Russia"},
        "290" : {"country_name" : "Saint Helena"},
        "508" : {"country_name" : "Saint Pierre and Miquelon"},
        "685" : {"country_name" : "Samoa"},
        "378" : {"country_name" : "San Marino"},
        "966" : {"country_name" : "Saudi Arabia"},
        "221" : {"country_name" : "Senegal"},
        "381" : {"country_name" : "Serbia"},
        "248" : {"country_name" : "Seychelles"},
        "232" : {"country_name" : "Sierra Leone"},
        "65" : {"country_name" : "Singapore"},
        "421" : {"country_name" : "Slovakia"},
        "386" : {"country_name" : "Slovenia"},
        "677" : {"country_name" : "Solomon Islands"},
        "252" : {"country_name" : "Somalia"},
        "27" : {"country_name" : "South Africa"},
        "211" : {"country_name" : "South Sudan"},
        "34" : {"country_name" : "Spain"},
        "94" : {"country_name" : "Sri Lanka"},
        "249" : {"country_name" : "Sudan"},
        "597" : {"country_name" : "Suriname"},
        "268" : {"country_name" : "Swaziland"},
        "46" : {"country_name" : "Sweden"},
        "41" : {"country_name" : "Switzerland"},
        "963" : {"country_name" : "Syria"},
        "239" : {"country_name" : "São Tomé and Príncipe"},
        "886" : {"country_name" : "Taiwan"},
        "992" : {"country_name" : "Tajikistan"},
        "66" : {"country_name" : "Thailand"},
        "228" : {"country_name" : "Togo"},
        "690" : {"country_name" : "Tokelau"},
        "676" : {"country_name" : "Tonga"},
        "216" : {"country_name" : "Tunisia"},
        "90" : {"country_name" : "Turkey"},
        "993" : {"country_name" : "Turkmenistan"},
        "688" : {"country_name" : "Tuvalu"},
        "256" : {"country_name" : "Uganda"},
        "380" : {"country_name" : "Ukraine"},
        "971" : {"country_name" : "United Arab Emirates"},
        "44" : {"country_name" : "United Kingdom"},
        "878" : {"country_name" : "Universal Personal Telecommunications (UPT)"},
        "1" : {"country_name" : "United States - Canada"},
        "598" : {"country_name" : "Uruguay"},
        "998" : {"country_name" : "Uzbekistan"},
        "678" : {"country_name" : "Vanuatu"},
        "58" : {"country_name" : "Venezuela"},
        "84" : {"country_name" : "Vietnam"},
        "681" : {"country_name" : "Wallis and Futuna"},
        "967" : {"country_name" : "Yemen"},
        "260" : {"country_name" : "Zambia"},
        "255" : {"country_name" : "Zanzibar"},
        "263" : {"country_name" : "Zimbabwe"}
        };
      
        if (countryCode[code]){ return countryCode[code]["country_name"]}
        else{ return "unknown"}
    }


  })