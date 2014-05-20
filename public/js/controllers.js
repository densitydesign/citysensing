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
        label: "Social Activity",
        value: "social_activity"
      },
      {
        label: "Social Sentiment",
        value: "social_sentiment",
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

    $scope.exponent = $scope.anomalyExponent = 1;

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
"376" : {
      "name" : "Andorra",
      "origin" : "nation",
      "letterCode" : "AD"
    },
"971" : {
      "name" : "United Arab Emirates",
      "origin" : "nation",
      "letterCode" : "AE"
    },
"93" : {
      "name" : "Afghanistan",
      "origin" : "nation",
      "letterCode" : "AF"
    },
"355" : {
      "name" : "Albania",
      "origin" : "nation",
      "letterCode" : "AL"
    },
"374" : {
      "name" : "Armenia",
      "origin" : "nation",
      "letterCode" : "AM"
    },
"244" : {
      "name" : "Angola",
      "origin" : "nation",
      "letterCode" : "AO"
    },
"54" : {
      "name" : "Argentina",
      "origin" : "nation",
      "letterCode" : "AR"
    },
"43" : {
      "name" : "Austria",
      "origin" : "nation",
      "letterCode" : "AT"
    },
"61" : {
      "name" : "Australia",
      "origin" : "nation",
      "letterCode" : "AU"
    },
"297" : {
      "name" : "Aruba",
      "origin" : "nation",
      "letterCode" : "AW"
    },
"994" : {
      "name" : "Azerbaijan",
      "origin" : "nation",
      "letterCode" : "AZ"
    },
"387" : {
      "name" : "Bosnia and Herzegovina",
      "origin" : "nation",
      "letterCode" : "BA"
    },
"880" : {
      "name" : "Bangladesh",
      "origin" : "nation",
      "letterCode" : "BD"
    },
"32" : {
      "name" : "Belgium",
      "origin" : "nation",
      "letterCode" : "BE"
    },
"226" : {
      "name" : "Burkina Faso",
      "origin" : "nation",
      "letterCode" : "BF"
    },
"359" : {
      "name" : "Bulgaria",
      "origin" : "nation",
      "letterCode" : "BG"
    },
"973" : {
      "name" : "Bahrain",
      "origin" : "nation",
      "letterCode" : "BH"
    },
"257" : {
      "name" : "Burundi",
      "origin" : "nation",
      "letterCode" : "BI"
    },
"229" : {
      "name" : "Benin",
      "origin" : "nation",
      "letterCode" : "BJ"
    },
"673" : {
      "name" : "Brunei Darussalam",
      "origin" : "nation",
      "letterCode" : "BN"
    },
"55" : {
      "name" : "Brazil",
      "origin" : "nation",
      "letterCode" : "BR"
    },
"975" : {
      "name" : "Bhutan",
      "origin" : "nation",
      "letterCode" : "BT"
    },
"267" : {
      "name" : "Botswana",
      "origin" : "nation",
      "letterCode" : "BW"
    },
"375" : {
      "name" : "Belarus",
      "origin" : "nation",
      "letterCode" : "BY"
    },
"501" : {
      "name" : "Belize",
      "origin" : "nation",
      "letterCode" : "BZ"
    },
"236" : {
      "name" : "Central African Republic",
      "origin" : "nation",
      "letterCode" : "CF"
    },
"242" : {
      "name" : "Congo",
      "origin" : "nation",
      "letterCode" : "CG"
    },
"41" : {
      "name" : "Switzerland",
      "origin" : "nation",
      "letterCode" : "CH"
    },
"682" : {
      "name" : "Cook Islands",
      "origin" : "nation",
      "letterCode" : "CK"
    },
"56" : {
      "name" : "Chile",
      "origin" : "nation",
      "letterCode" : "CL"
    },
"237" : {
      "name" : "Cameroon",
      "origin" : "nation",
      "letterCode" : "CM"
    },
"86" : {
      "name" : "China",
      "origin" : "nation",
      "letterCode" : "CN"
    },
"57" : {
      "name" : "Colombia",
      "origin" : "nation",
      "letterCode" : "CO"
    },
"506" : {
      "name" : "Costa Rica",
      "origin" : "nation",
      "letterCode" : "CR"
    },
"53" : {
      "name" : "Cuba",
      "origin" : "nation",
      "letterCode" : "CU"
    },
"357" : {
      "name" : "Cyprus",
      "origin" : "nation",
      "letterCode" : "CY"
    },
"420" : {
      "name" : "Czech Republic",
      "origin" : "nation",
      "letterCode" : "CZ"
    },
"49" : {
      "name" : "Germany",
      "origin" : "nation",
      "letterCode" : "DE"
    },
"253" : {
      "name" : "Djibouti",
      "origin" : "nation",
      "letterCode" : "DJ"
    },
"45" : {
      "name" : "Denmark",
      "origin" : "nation",
      "letterCode" : "DK"
    },
"213" : {
      "name" : "Algeria",
      "origin" : "nation",
      "letterCode" : "DZ"
    },
"593" : {
      "name" : "Ecuador",
      "origin" : "nation",
      "letterCode" : "EC"
    },
"372" : {
      "name" : "Estonia",
      "origin" : "nation",
      "letterCode" : "EE"
    },
"20" : {
      "name" : "Egypt",
      "origin" : "nation",
      "letterCode" : "EG"
    },
"291" : {
      "name" : "Eritrea",
      "origin" : "nation",
      "letterCode" : "ER"
    },
"34" : {
      "name" : "Spain",
      "origin" : "nation",
      "letterCode" : "ES"
    },
"251" : {
      "name" : "Ethiopia",
      "origin" : "nation",
      "letterCode" : "ET"
    },
"358" : {
      "name" : "Finland",
      "origin" : "nation",
      "letterCode" : "FI"
    },
"679" : {
      "name" : "Fiji",
      "origin" : "nation",
      "letterCode" : "FJ"
    },
"691" : {
      "name" : "Micronesia, Federated States of",
      "origin" : "nation",
      "letterCode" : "FM"
    },
"298" : {
      "name" : "Faroe Islands",
      "origin" : "nation",
      "letterCode" : "FO"
    },
"33" : {
      "name" : "France",
      "origin" : "nation",
      "letterCode" : "FR"
    },
"241" : {
      "name" : "Gabon",
      "origin" : "nation",
      "letterCode" : "GA"
    },
"44" : {
      "name" : "United Kingdom",
      "origin" : "nation",
      "letterCode" : "GB"
    },
"995" : {
      "name" : "Georgia",
      "origin" : "nation",
      "letterCode" : "GE"
    },
"594" : {
      "name" : "French Guiana",
      "origin" : "nation",
      "letterCode" : "GF"
    },
"233" : {
      "name" : "Ghana",
      "origin" : "nation",
      "letterCode" : "GH"
    },
"350" : {
      "name" : "Gibraltar",
      "origin" : "nation",
      "letterCode" : "GI"
    },
"299" : {
      "name" : "Greenland",
      "origin" : "nation",
      "letterCode" : "GL"
    },
"220" : {
      "name" : "Gambia",
      "origin" : "nation",
      "letterCode" : "GM"
    },
"224" : {
      "name" : "Guinea",
      "origin" : "nation",
      "letterCode" : "GN"
    },
"590" : {
      "name" : "Guadeloupe",
      "origin" : "nation",
      "letterCode" : "GP"
    },
"240" : {
      "name" : "Equatorial Guinea",
      "origin" : "nation",
      "letterCode" : "GQ"
    },
"30" : {
      "name" : "Greece",
      "origin" : "nation",
      "letterCode" : "GR"
    },
"502" : {
      "name" : "Guatemala",
      "origin" : "nation",
      "letterCode" : "GT"
    },
"245" : {
      "name" : "Guinea-Bissau",
      "origin" : "nation",
      "letterCode" : "GW"
    },
"592" : {
      "name" : "Guyana",
      "origin" : "nation",
      "letterCode" : "GY"
    },
"852" : {
      "name" : "Hong Kong",
      "origin" : "nation",
      "letterCode" : "HK"
    },
"504" : {
      "name" : "Honduras",
      "origin" : "nation",
      "letterCode" : "HN"
    },
"385" : {
      "name" : "Croatia",
      "origin" : "nation",
      "letterCode" : "HR"
    },
"509" : {
      "name" : "Haiti",
      "origin" : "nation",
      "letterCode" : "HT"
    },
"36" : {
      "name" : "Hungary",
      "origin" : "nation",
      "letterCode" : "HU"
    },
"62" : {
      "name" : "Indonesia",
      "origin" : "nation",
      "letterCode" : "ID"
    },
"353" : {
      "name" : "Ireland",
      "origin" : "nation",
      "letterCode" : "IE"
    },
"972" : {
      "name" : "Israel",
      "origin" : "nation",
      "letterCode" : "IL"
    },
"91" : {
      "name" : "India",
      "origin" : "nation",
      "letterCode" : "IN"
    },
"246" : {
      "name" : "British Indian Ocean Territory",
      "origin" : "nation",
      "letterCode" : "IO"
    },
"964" : {
      "name" : "Iraq",
      "origin" : "nation",
      "letterCode" : "IQ"
    },
"354" : {
      "name" : "Iceland",
      "origin" : "nation",
      "letterCode" : "IS"
    },
"39" : {
      "name" : "Italy",
      "origin" : "nation",
      "letterCode" : "IT"
    },
"962" : {
      "name" : "Jordan",
      "origin" : "nation",
      "letterCode" : "JO"
    },
"81" : {
      "name" : "Japan",
      "origin" : "nation",
      "letterCode" : "JP"
    },
"254" : {
      "name" : "Kenya",
      "origin" : "nation",
      "letterCode" : "KE"
    },
"996" : {
      "name" : "Kyrgyzstan",
      "origin" : "nation",
      "letterCode" : "KG"
    },
"855" : {
      "name" : "Cambodia",
      "origin" : "nation",
      "letterCode" : "KH"
    },
"686" : {
      "name" : "Kiribati",
      "origin" : "nation",
      "letterCode" : "KI"
    },
"269" : {
      "name" : "Comoros",
      "origin" : "nation",
      "letterCode" : "KM"
    },
"965" : {
      "name" : "Kuwait",
      "origin" : "nation",
      "letterCode" : "KW"
    },
"961" : {
      "name" : "Lebanon",
      "origin" : "nation",
      "letterCode" : "LB"
    },
"423" : {
      "name" : "Liechtenstein",
      "origin" : "nation",
      "letterCode" : "LI"
    },
"94" : {
      "name" : "Sri Lanka",
      "origin" : "nation",
      "letterCode" : "LK"
    },
"231" : {
      "name" : "Liberia",
      "origin" : "nation",
      "letterCode" : "LR"
    },
"266" : {
      "name" : "Lesotho",
      "origin" : "nation",
      "letterCode" : "LS"
    },
"370" : {
      "name" : "Lithuania",
      "origin" : "nation",
      "letterCode" : "LT"
    },
"352" : {
      "name" : "Luxembourg",
      "origin" : "nation",
      "letterCode" : "LU"
    },
"371" : {
      "name" : "Latvia",
      "origin" : "nation",
      "letterCode" : "LV"
    },
"218" : {
      "name" : "Libya",
      "origin" : "nation",
      "letterCode" : "LY"
    },
"212" : {
      "name" : "Morocco",
      "origin" : "nation",
      "letterCode" : "MA"
    },
"377" : {
      "name" : "Monaco",
      "origin" : "nation",
      "letterCode" : "MC"
    },
"382" : {
      "name" : "Montenegro",
      "origin" : "nation",
      "letterCode" : "ME"
    },
"261" : {
      "name" : "Madagascar",
      "origin" : "nation",
      "letterCode" : "MG"
    },
"692" : {
      "name" : "Marshall Islands",
      "origin" : "nation",
      "letterCode" : "MH"
    },
"223" : {
      "name" : "Mali",
      "origin" : "nation",
      "letterCode" : "ML"
    },
"976" : {
      "name" : "Mongolia",
      "origin" : "nation",
      "letterCode" : "MN"
    },
"222" : {
      "name" : "Mauritania",
      "origin" : "nation",
      "letterCode" : "MR"
    },
"356" : {
      "name" : "Malta",
      "origin" : "nation",
      "letterCode" : "MT"
    },
"230" : {
      "name" : "Mauritius",
      "origin" : "nation",
      "letterCode" : "MU"
    },
"960" : {
      "name" : "Maldives",
      "origin" : "nation",
      "letterCode" : "MV"
    },
"265" : {
      "name" : "Malawi",
      "origin" : "nation",
      "letterCode" : "MW"
    },
"52" : {
      "name" : "Mexico",
      "origin" : "nation",
      "letterCode" : "MX"
    },
"60" : {
      "name" : "Malaysia",
      "origin" : "nation",
      "letterCode" : "MY"
    },
"258" : {
      "name" : "Mozambique",
      "origin" : "nation",
      "letterCode" : "MZ"
    },
"264" : {
      "name" : "Namibia",
      "origin" : "nation",
      "letterCode" : "NA"
    },
"687" : {
      "name" : "New Caledonia",
      "origin" : "nation",
      "letterCode" : "NC"
    },
"227" : {
      "name" : "Niger",
      "origin" : "nation",
      "letterCode" : "NE"
    },
"234" : {
      "name" : "Nigeria",
      "origin" : "nation",
      "letterCode" : "NG"
    },
"505" : {
      "name" : "Nicaragua",
      "origin" : "nation",
      "letterCode" : "NI"
    },
"31" : {
      "name" : "Netherlands",
      "origin" : "nation",
      "letterCode" : "NL"
    },
"47" : {
      "name" : "Norway",
      "origin" : "nation",
      "letterCode" : "NO"
    },
"977" : {
      "name" : "Nepal",
      "origin" : "nation",
      "letterCode" : "NP"
    },
"674" : {
      "name" : "Nauru",
      "origin" : "nation",
      "letterCode" : "NR"
    },
"683" : {
      "name" : "Niue",
      "origin" : "nation",
      "letterCode" : "NU"
    },
"64" : {
      "name" : "New Zealand",
      "origin" : "nation",
      "letterCode" : "NZ"
    },
"968" : {
      "name" : "Oman",
      "origin" : "nation",
      "letterCode" : "OM"
    },
"507" : {
      "name" : "Panama",
      "origin" : "nation",
      "letterCode" : "PA"
    },
"51" : {
      "name" : "Peru",
      "origin" : "nation",
      "letterCode" : "PE"
    },
"689" : {
      "name" : "French Polynesia",
      "origin" : "nation",
      "letterCode" : "PF"
    },
"675" : {
      "name" : "Papua New Guinea",
      "origin" : "nation",
      "letterCode" : "PG"
    },
"63" : {
      "name" : "Philippines",
      "origin" : "nation",
      "letterCode" : "PH"
    },
"92" : {
      "name" : "Pakistan",
      "origin" : "nation",
      "letterCode" : "PK"
    },
"48" : {
      "name" : "Poland",
      "origin" : "nation",
      "letterCode" : "PL"
    },
"508" : {
      "name" : "Saint Pierre and Miquelon",
      "origin" : "nation",
      "letterCode" : "PM"
    },
"351" : {
      "name" : "Portugal",
      "origin" : "nation",
      "letterCode" : "PT"
    },
"680" : {
      "name" : "Palau",
      "origin" : "nation",
      "letterCode" : "PW"
    },
"595" : {
      "name" : "Paraguay",
      "origin" : "nation",
      "letterCode" : "PY"
    },
"974" : {
      "name" : "Qatar",
      "origin" : "nation",
      "letterCode" : "QA"
    },
"40" : {
      "name" : "Romania",
      "origin" : "nation",
      "letterCode" : "RO"
    },
"381" : {
      "name" : "Serbia",
      "origin" : "nation",
      "letterCode" : "RS"
    },
"250" : {
      "name" : "Rwanda",
      "origin" : "nation",
      "letterCode" : "RW"
    },
"966" : {
      "name" : "Saudi Arabia",
      "origin" : "nation",
      "letterCode" : "SA"
    },
"677" : {
      "name" : "Solomon Islands",
      "origin" : "nation",
      "letterCode" : "SB"
    },
"248" : {
      "name" : "Seychelles",
      "origin" : "nation",
      "letterCode" : "SC"
    },
"249" : {
      "name" : "Sudan",
      "origin" : "nation",
      "letterCode" : "SD"
    },
"46" : {
      "name" : "Sweden",
      "origin" : "nation",
      "letterCode" : "SE"
    },
"65" : {
      "name" : "Singapore",
      "origin" : "nation",
      "letterCode" : "SG"
    },
"386" : {
      "name" : "Slovenia",
      "origin" : "nation",
      "letterCode" : "SI"
    },
"421" : {
      "name" : "Slovakia",
      "origin" : "nation",
      "letterCode" : "SK"
    },
"232" : {
      "name" : "Sierra Leone",
      "origin" : "nation",
      "letterCode" : "SL"
    },
"378" : {
      "name" : "San Marino",
      "origin" : "nation",
      "letterCode" : "SM"
    },
"221" : {
      "name" : "Senegal",
      "origin" : "nation",
      "letterCode" : "SN"
    },
"252" : {
      "name" : "Somalia",
      "origin" : "nation",
      "letterCode" : "SO"
    },
"597" : {
      "name" : "Suriname",
      "origin" : "nation",
      "letterCode" : "SR"
    },
"211" : {
      "name" : "South Sudan",
      "origin" : "nation",
      "letterCode" : "SS"
    },
"503" : {
      "name" : "El Salvador",
      "origin" : "nation",
      "letterCode" : "SV"
    },
"268" : {
      "name" : "Swaziland",
      "origin" : "nation",
      "letterCode" : "SZ"
    },
"235" : {
      "name" : "Chad",
      "origin" : "nation",
      "letterCode" : "TD"
    },
"228" : {
      "name" : "Togo",
      "origin" : "nation",
      "letterCode" : "TG"
    },
"66" : {
      "name" : "Thailand",
      "origin" : "nation",
      "letterCode" : "TH"
    },
"992" : {
      "name" : "Tajikistan",
      "origin" : "nation",
      "letterCode" : "TJ"
    },
"690" : {
      "name" : "Tokelau",
      "origin" : "nation",
      "letterCode" : "TK"
    },
"993" : {
      "name" : "Turkmenistan",
      "origin" : "nation",
      "letterCode" : "TM"
    },
"216" : {
      "name" : "Tunisia",
      "origin" : "nation",
      "letterCode" : "TN"
    },
"676" : {
      "name" : "Tonga",
      "origin" : "nation",
      "letterCode" : "TO"
    },
"90" : {
      "name" : "Turkey",
      "origin" : "nation",
      "letterCode" : "TR"
    },
"688" : {
      "name" : "Tuvalu",
      "origin" : "nation",
      "letterCode" : "TV"
    },
"256" : {
      "name" : "Uganda",
      "origin" : "nation",
      "letterCode" : "UG"
    },
"598" : {
      "name" : "Uruguay",
      "origin" : "nation",
      "letterCode" : "UY"
    },
"998" : {
      "name" : "Uzbekistan",
      "origin" : "nation",
      "letterCode" : "UZ"
    },
"678" : {
      "name" : "Vanuatu",
      "origin" : "nation",
      "letterCode" : "VU"
    },
"681" : {
      "name" : "Wallis and Futuna",
      "origin" : "nation",
      "letterCode" : "WF"
    },
"685" : {
      "name" : "Samoa",
      "origin" : "nation",
      "letterCode" : "WS"
    },
"967" : {
      "name" : "Yemen",
      "origin" : "nation",
      "letterCode" : "YE"
    },
"27" : {
      "name" : "South Africa",
      "origin" : "nation",
      "letterCode" : "ZA"
    },
"260" : {
      "name" : "Zambia",
      "origin" : "nation",
      "letterCode" : "ZM"
    },
"263" : {
      "name" : "Zimbabwe",
      "origin" : "nation",
      "letterCode" : "ZW"
    },
    "Alessandria" : {
      "origin" : "province",
      "name" : "Alessandria",
      "letterCode" : "AL"
    },
    "Ancona" : {
      "origin" : "province",
      "name" : "Ancona",
      "letterCode" : "AN"
    },
    "Aosta" : {
      "origin" : "province",
      "name" : "Aosta",
      "letterCode" : "AO"
    },
    "Arezzo" : {
      "origin" : "province",
      "name" : "Arezzo",
      "letterCode" : "AR"
    },
    "Ascoli Piceno" : {
      "origin" : "province",
      "name" : "Ascoli Piceno",
      "letterCode" : "AP"
    },
    "Asti" : {
      "origin" : "province",
      "name" : "Asti",
      "letterCode" : "AT"
    },
    "Avellino" : {
      "origin" : "province",
      "name" : "Avellino",
      "letterCode" : "AV"
    },
    "Bari" : {
      "origin" : "province",
      "name" : "Bari",
      "letterCode" : "BA"
    },
    "Barletta-Andria-Trani" : {
      "origin" : "province",
      "name" : "Barletta-Andria-Trani",
      "letterCode" : "BT"
    },
    "Belluno" : {
      "origin" : "province",
      "name" : "Belluno",
      "letterCode" : "BL"
    },
    "Benevento" : {
      "origin" : "province",
      "name" : "Benevento",
      "letterCode" : "BN"
    },
    "Bergamo" : {
      "origin" : "province",
      "name" : "Bergamo",
      "letterCode" : "BG"
    },
    "Biella" : {
      "origin" : "province",
      "name" : "Biella",
      "letterCode" : "BI"
    },
    "Bologna" : {
      "origin" : "province",
      "name" : "Bologna",
      "letterCode" : "BO"
    },
    "Bolzano" : {
      "origin" : "province",
      "name" : "Bolzano",
      "letterCode" : "BZ"
    },
    "Brescia" : {
      "origin" : "province",
      "name" : "Brescia",
      "letterCode" : "BS"
    },
    "Brindisi" : {
      "origin" : "province",
      "name" : "Brindisi",
      "letterCode" : "BR"
    },
    "Cagliari" : {
      "origin" : "province",
      "name" : "Cagliari",
      "letterCode" : "CA"
    },
    "Caltanissetta" : {
      "origin" : "province",
      "name" : "Caltanissetta",
      "letterCode" : "CL"
    },
    "Campobasso" : {
      "origin" : "province",
      "name" : "Campobasso",
      "letterCode" : "CB"
    },
    "Carbonia-Iglesias" : {
      "origin" : "province",
      "name" : "Carbonia-Iglesias",
      "letterCode" : "CI"
    },
    "Caserta" : {
      "origin" : "province",
      "name" : "Caserta",
      "letterCode" : "CE"
    },
    "Catania" : {
      "origin" : "province",
      "name" : "Catania",
      "letterCode" : "CT"
    },
    "Catanzaro" : {
      "origin" : "province",
      "name" : "Catanzaro",
      "letterCode" : "CZ"
    },
    "Chieti" : {
      "origin" : "province",
      "name" : "Chieti",
      "letterCode" : "CH"
    },
    "Como" : {
      "origin" : "province",
      "name" : "Como",
      "letterCode" : "CO"
    },
    "Cosenza" : {
      "origin" : "province",
      "name" : "Cosenza",
      "letterCode" : "CS"
    },
    "Cremona" : {
      "origin" : "province",
      "name" : "Cremona",
      "letterCode" : "CR"
    },
    "Crotone" : {
      "origin" : "province",
      "name" : "Crotone",
      "letterCode" : "KR"
    },
    "Cuneo" : {
      "origin" : "province",
      "name" : "Cuneo",
      "letterCode" : "CN"
    },
    "Enna" : {
      "origin" : "province",
      "name" : "Enna",
      "letterCode" : "EN"
    },
    "Fermo" : {
      "origin" : "province",
      "name" : "Fermo",
      "letterCode" : "FM"
    },
    "Ferrara" : {
      "origin" : "province",
      "name" : "Ferrara",
      "letterCode" : "FE"
    },
    "Firenze" : {
      "origin" : "province",
      "name" : "Firenze",
      "letterCode" : "FI"
    },
    "Fiume" : {
      "origin" : "province",
      "name" : "Fiume",
      "letterCode" : "FU"
    },
    "Foggia" : {
      "origin" : "province",
      "name" : "Foggia",
      "letterCode" : "FG"
    },
    "Forlì-Cesena" : {
      "origin" : "province",
      "name" : "Forlì-Cesena",
      "letterCode" : "FC"
    },
    "Frosinone" : {
      "origin" : "province",
      "name" : "Frosinone",
      "letterCode" : "FR"
    },
    "Genova" : {
      "origin" : "province",
      "name" : "Genova",
      "letterCode" : "GE"
    },
    "Gorizia" : {
      "origin" : "province",
      "name" : "Gorizia",
      "letterCode" : "GO"
    },
    "Grosseto" : {
      "origin" : "province",
      "name" : "Grosseto",
      "letterCode" : "GR"
    },
    "Imperia" : {
      "origin" : "province",
      "name" : "Imperia",
      "letterCode" : "IM"
    },
    "Isernia" : {
      "origin" : "province",
      "name" : "Isernia",
      "letterCode" : "IS"
    },
    "L'Aquila" : {
      "origin" : "province",
      "name" : "L'Aquila",
      "letterCode" : "AQ"
    },
    "La Spezia" : {
      "origin" : "province",
      "name" : "La Spezia",
      "letterCode" : "SP"
    },
    "Latina" : {
      "origin" : "province",
      "name" : "Latina",
      "letterCode" : "LT"
    },
    "Lecce" : {
      "origin" : "province",
      "name" : "Lecce",
      "letterCode" : "LE"
    },
    "Lecco" : {
      "origin" : "province",
      "name" : "Lecco",
      "letterCode" : "LC"
    },
    "Livorno" : {
      "origin" : "province",
      "name" : "Livorno",
      "letterCode" : "LI"
    },
    "Lodi" : {
      "origin" : "province",
      "name" : "Lodi",
      "letterCode" : "LO"
    },
    "Lubiana" : {
      "origin" : "province",
      "name" : "Lubiana",
      "letterCode" : "LB"
    },
    "Lucca" : {
      "origin" : "province",
      "name" : "Lucca",
      "letterCode" : "LU"
    },
    "Macerata" : {
      "origin" : "province",
      "name" : "Macerata",
      "letterCode" : "MC"
    },
    "Mantova" : {
      "origin" : "province",
      "name" : "Mantova",
      "letterCode" : "MN"
    },
    "Massa-Carrara" : {
      "origin" : "province",
      "name" : "Massa-Carrara",
      "letterCode" : "MS"
    },
    "Matera" : {
      "origin" : "province",
      "name" : "Matera",
      "letterCode" : "MT"
    },
    "Medio Campidano" : {
      "origin" : "province",
      "name" : "Medio Campidano",
      "letterCode" : "VS"
    },
    "Messina" : {
      "origin" : "province",
      "name" : "Messina",
      "letterCode" : "ME"
    },
    "Milano" : {
      "origin" : "province",
      "name" : "Milano",
      "letterCode" : "MI"
    },
    "Modena" : {
      "origin" : "province",
      "name" : "Modena",
      "letterCode" : "MO"
    },
    "Monza e Brianza" : {
      "origin" : "province",
      "name" : "Monza e Brianza",
      "letterCode" : "MB"
    },
    "Napoli" : {
      "origin" : "province",
      "name" : "Napoli",
      "letterCode" : "NA"
    },
    "Novara" : {
      "origin" : "province",
      "name" : "Novara",
      "letterCode" : "NO"
    },
    "Nuoro" : {
      "origin" : "province",
      "name" : "Nuoro",
      "letterCode" : "NU"
    },
    "Ogliastra" : {
      "origin" : "province",
      "name" : "Ogliastra",
      "letterCode" : "OG"
    },
    "Olbia-Tempio" : {
      "origin" : "province",
      "name" : "Olbia-Tempio",
      "letterCode" : "OT"
    },
    "Oristano" : {
      "origin" : "province",
      "name" : "Oristano",
      "letterCode" : "OR"
    },
    "Padova" : {
      "origin" : "province",
      "name" : "Padova",
      "letterCode" : "PD"
    },
    "Palermo" : {
      "origin" : "province",
      "name" : "Palermo",
      "letterCode" : "PA"
    },
    "Parma" : {
      "origin" : "province",
      "name" : "Parma",
      "letterCode" : "PR"
    },
    "Pavia" : {
      "origin" : "province",
      "name" : "Pavia",
      "letterCode" : "PV"
    },
    "Perugia" : {
      "origin" : "province",
      "name" : "Perugia",
      "letterCode" : "PG"
    },
    "Pesaro e Urbino" : {
      "origin" : "province",
      "name" : "Pesaro e Urbino",
      "letterCode" : "PU"
    },
    "Pescara" : {
      "origin" : "province",
      "name" : "Pescara",
      "letterCode" : "PE"
    },
    "Piacenza" : {
      "origin" : "province",
      "name" : "Piacenza",
      "letterCode" : "PC"
    },
    "Pisa" : {
      "origin" : "province",
      "name" : "Pisa",
      "letterCode" : "PI"
    },
    "Pistoia" : {
      "origin" : "province",
      "name" : "Pistoia",
      "letterCode" : "PT"
    },
    "Pola" : {
      "origin" : "province",
      "name" : "Pola",
      "letterCode" : "PL"
    },
    "Pordenone" : {
      "origin" : "province",
      "name" : "Pordenone",
      "letterCode" : "PN"
    },
    "Potenza" : {
      "origin" : "province",
      "name" : "Potenza",
      "letterCode" : "PZ"
    },
    "Prato" : {
      "origin" : "province",
      "name" : "Prato",
      "letterCode" : "PO"
    },
    "Ragusa" : {
      "origin" : "province",
      "name" : "Ragusa",
      "letterCode" : "RG"
    },
    "Ravenna" : {
      "origin" : "province",
      "name" : "Ravenna",
      "letterCode" : "RA"
    },
    "Reggio Calabria" : {
      "origin" : "province",
      "name" : "Reggio Calabria",
      "letterCode" : "RC"
    },
    "Reggio nell'Emilia" : {
      "origin" : "province",
      "name" : "Reggio nell'Emilia",
      "letterCode" : "RE"
    },
    "Rieti" : {
      "origin" : "province",
      "name" : "Rieti",
      "letterCode" : "RI"
    },
    "Rimini" : {
      "origin" : "province",
      "name" : "Rimini",
      "letterCode" : "RN"
    },
    "Roma" : {
      "origin" : "province",
      "name" : "Roma",
      "letterCode" : "RM"
    },
    "Rovigo" : {
      "origin" : "province",
      "name" : "Rovigo",
      "letterCode" : "RO"
    },
    "Salerno" : {
      "origin" : "province",
      "name" : "Salerno",
      "letterCode" : "SA"
    },
    "Sassari" : {
      "origin" : "province",
      "name" : "Sassari",
      "letterCode" : "SS"
    },
    "Savona" : {
      "origin" : "province",
      "name" : "Savona",
      "letterCode" : "SV"
    },
    "Siena" : {
      "origin" : "province",
      "name" : "Siena",
      "letterCode" : "SI"
    },
    "Siracusa" : {
      "origin" : "province",
      "name" : "Siracusa",
      "letterCode" : "SR"
    },
    "Sondrio" : {
      "origin" : "province",
      "name" : "Sondrio",
      "letterCode" : "SO"
    },
    "Taranto" : {
      "origin" : "province",
      "name" : "Taranto",
      "letterCode" : "TA"
    },
    "Teramo" : {
      "origin" : "province",
      "name" : "Teramo",
      "letterCode" : "TE"
    },
    "Terni" : {
      "origin" : "province",
      "name" : "Terni",
      "letterCode" : "TR"
    },
    "Torino" : {
      "origin" : "province",
      "name" : "Torino",
      "letterCode" : "TO"
    },
    "Trapani" : {
      "origin" : "province",
      "name" : "Trapani",
      "letterCode" : "TP"
    },
    "Trento" : {
      "origin" : "province",
      "name" : "Trento",
      "letterCode" : "TN"
    },
    "Treviso" : {
      "origin" : "province",
      "name" : "Treviso",
      "letterCode" : "TV"
    },
    "Trieste" : {
      "origin" : "province",
      "name" : "Trieste",
      "letterCode" : "TS"
    },
    "Udine" : {
      "origin" : "province",
      "name" : "Udine",
      "letterCode" : "UD"
    },
    "Varese" : {
      "origin" : "province",
      "name" : "Varese",
      "letterCode" : "VA"
    },
    "Venezia" : {
      "origin" : "province",
      "name" : "Venezia",
      "letterCode" : "VE"
    },
    "Verbano-Cusio-Ossola" : {
      "origin" : "province",
      "name" : "Verbano-Cusio-Ossola",
      "letterCode" : "VB"
    },
    "Vercelli" : {
      "origin" : "province",
      "name" : "Vercelli",
      "letterCode" : "VC"
    },
    "Verona" : {
      "origin" : "province",
      "name" : "Verona",
      "letterCode" : "VR"
    },
    "Vibo Valentia" : {
      "origin" : "province",
      "name" : "Vibo Valentia",
      "letterCode" : "VV"
    },
    "Vicenza" : {
      "origin" : "province",
      "name" : "Vicenza",
      "letterCode" : "VI"
    },
    "Viterbo" : {
      "origin" : "province",
      "name" : "Viterbo",
      "letterCode" : "VT"
    },
    "Zara" : {
      "origin" : "province",
      "name" : "Zara",
      "letterCode" : "ZA"
    }
};
      
        if (countryCode[code]){ return countryCode[code]["letterCode"]}
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
        label: "Social Activity",
        value: "social_activity"
      },
      {
        label: "Social Sentiment",
        value: "social_sentiment",
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

    $scope.exponent = $scope.anomalyExponent = 1;

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
        label: "Social Activity",
        value: "social_activity"
      },
      {
        label: "Social Sentiment",
        value: "social_sentiment",
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

    $scope.exponent = $scope.anomalyExponent = 1;

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