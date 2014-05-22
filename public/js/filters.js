'use strict';

/* Filters */

angular.module('citySensing.filters', []).

	filter('truncate', function () {
		return function (text, length, end) {
			if(!text) return;
	    /*if (isNaN(length))
	        length = 12;

	    if (end === undefined)
	        end = "";

	    if (text.length <= length || text.length - end.length <= length) {
	        return text;
	    }
	    else {
	        return String(text).substring(0, length-end.length) + end;
	    }*/
	    return parseFloat(text).toFixed(7);
		}
	})

	.filter('titleCase', function () {
		return function (str) {
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	})

	.filter('toDate', function () {
		return function (unix) {
			var format = d3.time.format("%d/%m/%Y"),
					date = new Date(unix);
			return format(date);//str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	})

	.filter('toDateTime', function () {
		return function (unix) {
			var format = d3.time.format("%c"),
					date = new Date(unix);
			return format(date);//str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	})
	.filter('toCountryName', function(){
		return function(code, field){
      var countryCode = {
"93" : {
      "origin" : "nation",
      "name" : "Afghanistan",
      "letterCode" : "AF"
    },
"355" : {
      "origin" : "nation",
      "name" : "Albania",
      "letterCode" : "AL"
    },
"213" : {
      "origin" : "nation",
      "name" : "Algeria",
      "letterCode" : "DZ"
    },
"376" : {
      "origin" : "nation",
      "name" : "Andorra",
      "letterCode" : "AD"
    },
"244" : {
      "origin" : "nation",
      "name" : "Angola",
      "letterCode" : "AO"
    },
"54" : {
      "origin" : "nation",
      "name" : "Argentina",
      "letterCode" : "AR"
    },
"374" : {
      "origin" : "nation",
      "name" : "Armenia",
      "letterCode" : "AM"
    },
"297" : {
      "origin" : "nation",
      "name" : "Aruba",
      "letterCode" : "AW"
    },
"247" : {
      "origin" : "nation",
      "name" : "Ascension",
      "letterCode" : "SH"
    },
"61" : {
      "origin" : "nation",
      "name" : "Australia",
      "letterCode" : "AU"
    },
"672" : {
      "origin" : "nation",
      "name" : "Australian External Territories",
      "letterCode" : "AU"
    },
"43" : {
      "origin" : "nation",
      "name" : "Austria",
      "letterCode" : "AT"
    },
"994" : {
      "origin" : "nation",
      "name" : "Azerbaijan",
      "letterCode" : "AZ"
    },
"973" : {
      "origin" : "nation",
      "name" : "Bahrain",
      "letterCode" : "BH"
    },
"880" : {
      "origin" : "nation",
      "name" : "Bangladesh",
      "letterCode" : "BD"
    },
"375" : {
      "origin" : "nation",
      "name" : "Belarus",
      "letterCode" : "BY"
    },
"32" : {
      "origin" : "nation",
      "name" : "Belgium",
      "letterCode" : "BE"
    },
"501" : {
      "origin" : "nation",
      "name" : "Belize",
      "letterCode" : "BZ"
    },
"229" : {
      "origin" : "nation",
      "name" : "Benin",
      "letterCode" : "BJ"
    },
"975" : {
      "origin" : "nation",
      "name" : "Bhutan",
      "letterCode" : "BT"
    },
"591" : {
      "origin" : "nation",
      "name" : "Bolivia",
      "letterCode" : "BO"
    },
"387" : {
      "origin" : "nation",
      "name" : "Bosnia and Herzegovina",
      "letterCode" : "BA"
    },
"267" : {
      "origin" : "nation",
      "name" : "Botswana",
      "letterCode" : "BW"
    },
"55" : {
      "origin" : "nation",
      "name" : "Brazil",
      "letterCode" : "BR"
    },
"246" : {
      "origin" : "nation",
      "name" : "British Indian Ocean Territory",
      "letterCode" : "IO"
    },
"673" : {
      "origin" : "nation",
      "name" : "Brunei Darussalam",
      "letterCode" : "BN"
    },
"359" : {
      "origin" : "nation",
      "name" : "Bulgaria",
      "letterCode" : "BG"
    },
"226" : {
      "origin" : "nation",
      "name" : "Burkina Faso",
      "letterCode" : "BF"
    },
"95" : {
      "origin" : "nation",
      "name" : "Myanmar",
      "letterCode" : "MM"
    },
"257" : {
      "origin" : "nation",
      "name" : "Burundi",
      "letterCode" : "BI"
    },
"855" : {
      "origin" : "nation",
      "name" : "Cambodia",
      "letterCode" : "KH"
    },
"237" : {
      "origin" : "nation",
      "name" : "Cameroon",
      "letterCode" : "CM"
    },
"238" : {
      "origin" : "nation",
      "name" : "Cape Verde",
      "letterCode" : "CV"
    },
"236" : {
      "origin" : "nation",
      "name" : "Central African Republic",
      "letterCode" : "CF"
    },
"235" : {
      "origin" : "nation",
      "name" : "Chad",
      "letterCode" : "TD"
    },
"56" : {
      "origin" : "nation",
      "name" : "Chile",
      "letterCode" : "CL"
    },
"86" : {
      "origin" : "nation",
      "name" : "China",
      "letterCode" : "CN"
    },
"57" : {
      "origin" : "nation",
      "name" : "Colombia",
      "letterCode" : "CO"
    },
"269" : {
      "origin" : "nation",
      "name" : "Comoros",
      "letterCode" : "KM"
    },
"242" : {
      "origin" : "nation",
      "name" : "Congo",
      "letterCode" : "CG"
    },
"243" : {
      "origin" : "nation",
      "name" : "Congo, Democratic Republic of the (Zaire)",
      "letterCode" : "CD"
    },
"682" : {
      "origin" : "nation",
      "name" : "Cook Islands",
      "letterCode" : "CK"
    },
"506" : {
      "origin" : "nation",
      "name" : "Costa Rica",
      "letterCode" : "CR"
    },
"385" : {
      "origin" : "nation",
      "name" : "Croatia",
      "letterCode" : "HR"
    },
"53" : {
      "origin" : "nation",
      "name" : "Cuba",
      "letterCode" : "CU"
    },
"357" : {
      "origin" : "nation",
      "name" : "Cyprus",
      "letterCode" : "CY"
    },
"420" : {
      "origin" : "nation",
      "name" : "Czech Republic",
      "letterCode" : "CZ"
    },
"225" : {
      "origin" : "nation",
      "name" : "Ivory Coast",
      "letterCode" : "CI"
    },
"45" : {
      "origin" : "nation",
      "name" : "Denmark",
      "letterCode" : "DK"
    },
"253" : {
      "origin" : "nation",
      "name" : "Djibouti",
      "letterCode" : "DJ"
    },
"670" : {
      "origin" : "nation",
      "name" : "East Timor",
      "letterCode" : "TL"
    },
"593" : {
      "origin" : "nation",
      "name" : "Ecuador",
      "letterCode" : "EC"
    },
"20" : {
      "origin" : "nation",
      "name" : "Egypt",
      "letterCode" : "EG"
    },
"503" : {
      "origin" : "nation",
      "name" : "El Salvador",
      "letterCode" : "SV"
    },
"240" : {
      "origin" : "nation",
      "name" : "Equatorial Guinea",
      "letterCode" : "GQ"
    },
"291" : {
      "origin" : "nation",
      "name" : "Eritrea",
      "letterCode" : "ER"
    },
"372" : {
      "origin" : "nation",
      "name" : "Estonia",
      "letterCode" : "EE"
    },
"251" : {
      "origin" : "nation",
      "name" : "Ethiopia",
      "letterCode" : "ET"
    },
"500" : {
      "origin" : "nation",
      "name" : "Falkland Islands",
      "letterCode" : "FK"
    },
"298" : {
      "origin" : "nation",
      "name" : "Faroe Islands",
      "letterCode" : "FO"
    },
"679" : {
      "origin" : "nation",
      "name" : "Fiji",
      "letterCode" : "FJ"
    },
"358" : {
      "origin" : "nation",
      "name" : "Finland",
      "letterCode" : "FI"
    },
"33" : {
      "origin" : "nation",
      "name" : "France",
      "letterCode" : "FR"
    },
"596" : {
      "origin" : "nation",
      "name" : "French Antilles",
      "letterCode" : "AN"
    },
"594" : {
      "origin" : "nation",
      "name" : "French Guiana",
      "letterCode" : "GF"
    },
"689" : {
      "origin" : "nation",
      "name" : "French Polynesia",
      "letterCode" : "PF"
    },
"241" : {
      "origin" : "nation",
      "name" : "Gabon",
      "letterCode" : "GA"
    },
"220" : {
      "origin" : "nation",
      "name" : "Gambia",
      "letterCode" : "GM"
    },
"995" : {
      "origin" : "nation",
      "name" : "Georgia",
      "letterCode" : "GE"
    },
"49" : {
      "origin" : "nation",
      "name" : "Germany",
      "letterCode" : "DE"
    },
"233" : {
      "origin" : "nation",
      "name" : "Ghana",
      "letterCode" : "GH"
    },
"350" : {
      "origin" : "nation",
      "name" : "Gibraltar",
      "letterCode" : "GI"
    },
"881" : {
      "origin" : "nation",
      "name" : "Global Mobile Satellite System (GMSS)",
      "letterCode" : null
    },
"30" : {
      "origin" : "nation",
      "name" : "Greece",
      "letterCode" : "GR"
    },
"299" : {
      "origin" : "nation",
      "name" : "Greenland",
      "letterCode" : "GL"
    },
"590" : {
      "origin" : "nation",
      "name" : "Guadeloupe",
      "letterCode" : "GP"
    },
"502" : {
      "origin" : "nation",
      "name" : "Guatemala",
      "letterCode" : "GT"
    },
"224" : {
      "origin" : "nation",
      "name" : "Guinea",
      "letterCode" : "GN"
    },
"245" : {
      "origin" : "nation",
      "name" : "Guinea-Bissau",
      "letterCode" : "GW"
    },
"592" : {
      "origin" : "nation",
      "name" : "Guyana",
      "letterCode" : "GY"
    },
"509" : {
      "origin" : "nation",
      "name" : "Haiti",
      "letterCode" : "HT"
    },
"504" : {
      "origin" : "nation",
      "name" : "Honduras",
      "letterCode" : "HN"
    },
"852" : {
      "origin" : "nation",
      "name" : "Hong Kong",
      "letterCode" : "HK"
    },
"36" : {
      "origin" : "nation",
      "name" : "Hungary",
      "letterCode" : "HU"
    },
"354" : {
      "origin" : "nation",
      "name" : "Iceland",
      "letterCode" : "IS"
    },
"91" : {
      "origin" : "nation",
      "name" : "India",
      "letterCode" : "IN"
    },
"62" : {
      "origin" : "nation",
      "name" : "Indonesia",
      "letterCode" : "ID"
    },
"870" : {
      "origin" : "nation",
      "name" : "Inmarsat SNAC",
      "letterCode" : null
    },
"800" : {
      "origin" : "nation",
      "name" : "International Freephone Service",
      "letterCode" : null
    },
"808" : {
      "origin" : "nation",
      "name" : "International Shared Cost Service (ISCS)",
      "letterCode" : null
    },
"98" : {
      "origin" : "nation",
      "name" : "Iran",
      "letterCode" : "IR"
    },
"964" : {
      "origin" : "nation",
      "name" : "Iraq",
      "letterCode" : "IQ"
    },
"353" : {
      "origin" : "nation",
      "name" : "Ireland",
      "letterCode" : "IE"
    },
"972" : {
      "origin" : "nation",
      "name" : "Israel",
      "letterCode" : "IL"
    },
"39" : {
      "origin" : "nation",
      "name" : "Italy",
      "letterCode" : "IT"
    },
"81" : {
      "origin" : "nation",
      "name" : "Japan",
      "letterCode" : "JP"
    },
"962" : {
      "origin" : "nation",
      "name" : "Jordan",
      "letterCode" : "JO"
    },
"254" : {
      "origin" : "nation",
      "name" : "Kenya",
      "letterCode" : "KE"
    },
"686" : {
      "origin" : "nation",
      "name" : "Kiribati",
      "letterCode" : "KI"
    },
"850" : {
      "origin" : "nation",
      "name" : "Korea, North",
      "letterCode" : "KP"
    },
"82" : {
      "origin" : "nation",
      "name" : "Korea, South",
      "letterCode" : "KR"
    },
"965" : {
      "origin" : "nation",
      "name" : "Kuwait",
      "letterCode" : "KW"
    },
"996" : {
      "origin" : "nation",
      "name" : "Kyrgyzstan",
      "letterCode" : "KG"
    },
"856" : {
      "origin" : "nation",
      "name" : "Laos",
      "letterCode" : "LA"
    },
"371" : {
      "origin" : "nation",
      "name" : "Latvia",
      "letterCode" : "LV"
    },
"961" : {
      "origin" : "nation",
      "name" : "Lebanon",
      "letterCode" : "LB"
    },
"266" : {
      "origin" : "nation",
      "name" : "Lesotho",
      "letterCode" : "LS"
    },
"231" : {
      "origin" : "nation",
      "name" : "Liberia",
      "letterCode" : "LR"
    },
"218" : {
      "origin" : "nation",
      "name" : "Libya",
      "letterCode" : "LY"
    },
"423" : {
      "origin" : "nation",
      "name" : "Liechtenstein",
      "letterCode" : "LI"
    },
"370" : {
      "origin" : "nation",
      "name" : "Lithuania",
      "letterCode" : "LT"
    },
"352" : {
      "origin" : "nation",
      "name" : "Luxembourg",
      "letterCode" : "LU"
    },
"853" : {
      "origin" : "nation",
      "name" : "Macau",
      "letterCode" : "MO"
    },
"389" : {
      "origin" : "nation",
      "name" : "Macedonia",
      "letterCode" : "MK"
    },
"261" : {
      "origin" : "nation",
      "name" : "Madagascar",
      "letterCode" : "MG"
    },
"265" : {
      "origin" : "nation",
      "name" : "Malawi",
      "letterCode" : "MW"
    },
"60" : {
      "origin" : "nation",
      "name" : "Malaysia",
      "letterCode" : "MY"
    },
"960" : {
      "origin" : "nation",
      "name" : "Maldives",
      "letterCode" : "MV"
    },
"223" : {
      "origin" : "nation",
      "name" : "Mali",
      "letterCode" : "ML"
    },
"356" : {
      "origin" : "nation",
      "name" : "Malta",
      "letterCode" : "MT"
    },
"692" : {
      "origin" : "nation",
      "name" : "Marshall Islands",
      "letterCode" : "MH"
    },
"222" : {
      "origin" : "nation",
      "name" : "Mauritania",
      "letterCode" : "MR"
    },
"230" : {
      "origin" : "nation",
      "name" : "Mauritius",
      "letterCode" : "MU"
    },
"52" : {
      "origin" : "nation",
      "name" : "Mexico",
      "letterCode" : "MX"
    },
"691" : {
      "origin" : "nation",
      "name" : "Micronesia, Federated States of",
      "letterCode" : "FM"
    },
"373" : {
      "origin" : "nation",
      "name" : "Moldova",
      "letterCode" : "MD"
    },
"377" : {
      "origin" : "nation",
      "name" : "Monaco",
      "letterCode" : "MC"
    },
"976" : {
      "origin" : "nation",
      "name" : "Mongolia",
      "letterCode" : "MN"
    },
"382" : {
      "origin" : "nation",
      "name" : "Montenegro",
      "letterCode" : "ME"
    },
"212" : {
      "origin" : "nation",
      "name" : "Morocco",
      "letterCode" : "MA"
    },
"258" : {
      "origin" : "nation",
      "name" : "Mozambique",
      "letterCode" : "MZ"
    },
"264" : {
      "origin" : "nation",
      "name" : "Namibia",
      "letterCode" : "NA"
    },
"674" : {
      "origin" : "nation",
      "name" : "Nauru",
      "letterCode" : "NR"
    },
"977" : {
      "origin" : "nation",
      "name" : "Nepal",
      "letterCode" : "NP"
    },
"31" : {
      "origin" : "nation",
      "name" : "Netherlands",
      "letterCode" : "NL"
    },
"687" : {
      "origin" : "nation",
      "name" : "New Caledonia",
      "letterCode" : "NC"
    },
"64" : {
      "origin" : "nation",
      "name" : "New Zealand",
      "letterCode" : "NZ"
    },
"505" : {
      "origin" : "nation",
      "name" : "Nicaragua",
      "letterCode" : "NI"
    },
"227" : {
      "origin" : "nation",
      "name" : "Niger",
      "letterCode" : "NE"
    },
"234" : {
      "origin" : "nation",
      "name" : "Nigeria",
      "letterCode" : "NG"
    },
"683" : {
      "origin" : "nation",
      "name" : "Niue",
      "letterCode" : "NU"
    },
"47" : {
      "origin" : "nation",
      "name" : "Norway",
      "letterCode" : "NO"
    },
"968" : {
      "origin" : "nation",
      "name" : "Oman",
      "letterCode" : "OM"
    },
"92" : {
      "origin" : "nation",
      "name" : "Pakistan",
      "letterCode" : "PK"
    },
"680" : {
      "origin" : "nation",
      "name" : "Palau",
      "letterCode" : "PW"
    },
"970" : {
      "origin" : "nation",
      "name" : "Palestinian territories",
      "letterCode" : "PSE"
    },
"507" : {
      "origin" : "nation",
      "name" : "Panama",
      "letterCode" : "PA"
    },
"675" : {
      "origin" : "nation",
      "name" : "Papua New Guinea",
      "letterCode" : "PG"
    },
"595" : {
      "origin" : "nation",
      "name" : "Paraguay",
      "letterCode" : "PY"
    },
"51" : {
      "origin" : "nation",
      "name" : "Peru",
      "letterCode" : "PE"
    },
"63" : {
      "origin" : "nation",
      "name" : "Philippines",
      "letterCode" : "PH"
    },
"48" : {
      "origin" : "nation",
      "name" : "Poland",
      "letterCode" : "PL"
    },
"351" : {
      "origin" : "nation",
      "name" : "Portugal",
      "letterCode" : "PT"
    },
"974" : {
      "origin" : "nation",
      "name" : "Qatar",
      "letterCode" : "QA"
    },
"40" : {
      "origin" : "nation",
      "name" : "Romania",
      "letterCode" : "RO"
    },
"250" : {
      "origin" : "nation",
      "name" : "Rwanda",
      "letterCode" : "RW"
    },
"262" : {
      "origin" : "nation",
      "name" : "Reunion",
      "letterCode" : "RE"
    },
"7" : {
      "origin" : "nation",
      "name" : "Russia",
      "letterCode" : "RU"
    },
"290" : {
      "origin" : "nation",
      "name" : "Saint Helena",
      "letterCode" : "SH"
    },
"508" : {
      "origin" : "nation",
      "name" : "Saint Pierre and Miquelon",
      "letterCode" : "PM"
    },
"685" : {
      "origin" : "nation",
      "name" : "Samoa",
      "letterCode" : "WS"
    },
"378" : {
      "origin" : "nation",
      "name" : "San Marino",
      "letterCode" : "SM"
    },
"966" : {
      "origin" : "nation",
      "name" : "Saudi Arabia",
      "letterCode" : "SA"
    },
"221" : {
      "origin" : "nation",
      "name" : "Senegal",
      "letterCode" : "SN"
    },
"381" : {
      "origin" : "nation",
      "name" : "Serbia",
      "letterCode" : "RS"
    },
"248" : {
      "origin" : "nation",
      "name" : "Seychelles",
      "letterCode" : "SC"
    },
"232" : {
      "origin" : "nation",
      "name" : "Sierra Leone",
      "letterCode" : "SL"
    },
"65" : {
      "origin" : "nation",
      "name" : "Singapore",
      "letterCode" : "SG"
    },
"421" : {
      "origin" : "nation",
      "name" : "Slovakia",
      "letterCode" : "SK"
    },
"386" : {
      "origin" : "nation",
      "name" : "Slovenia",
      "letterCode" : "SI"
    },
"677" : {
      "origin" : "nation",
      "name" : "Solomon Islands",
      "letterCode" : "SB"
    },
"252" : {
      "origin" : "nation",
      "name" : "Somalia",
      "letterCode" : "SO"
    },
"27" : {
      "origin" : "nation",
      "name" : "South Africa",
      "letterCode" : "ZA"
    },
"211" : {
      "origin" : "nation",
      "name" : "South Sudan",
      "letterCode" : "SS"
    },
"34" : {
      "origin" : "nation",
      "name" : "Spain",
      "letterCode" : "ES"
    },
"94" : {
      "origin" : "nation",
      "name" : "Sri Lanka",
      "letterCode" : "LK"
    },
"249" : {
      "origin" : "nation",
      "name" : "Sudan",
      "letterCode" : "SD"
    },
"597" : {
      "origin" : "nation",
      "name" : "Suriname",
      "letterCode" : "SR"
    },
"268" : {
      "origin" : "nation",
      "name" : "Swaziland",
      "letterCode" : "SZ"
    },
"46" : {
      "origin" : "nation",
      "name" : "Sweden",
      "letterCode" : "SE"
    },
"41" : {
      "origin" : "nation",
      "name" : "Switzerland",
      "letterCode" : "CH"
    },
"963" : {
      "origin" : "nation",
      "name" : "Syria",
      "letterCode" : "SY"
    },
"239" : {
      "origin" : "nation",
      "name" : "Sao Tome e Principe",
      "letterCode" : "ST"
    },
"886" : {
      "origin" : "nation",
      "name" : "Taiwan",
      "letterCode" : "TW"
    },
"992" : {
      "origin" : "nation",
      "name" : "Tajikistan",
      "letterCode" : "TJ"
    },
"66" : {
      "origin" : "nation",
      "name" : "Thailand",
      "letterCode" : "TH"
    },
"228" : {
      "origin" : "nation",
      "name" : "Togo",
      "letterCode" : "TG"
    },
"690" : {
      "origin" : "nation",
      "name" : "Tokelau",
      "letterCode" : "TK"
    },
"676" : {
      "origin" : "nation",
      "name" : "Tonga",
      "letterCode" : "TO"
    },
"216" : {
      "origin" : "nation",
      "name" : "Tunisia",
      "letterCode" : "TN"
    },
"90" : {
      "origin" : "nation",
      "name" : "Turkey",
      "letterCode" : "TR"
    },
"993" : {
      "origin" : "nation",
      "name" : "Turkmenistan",
      "letterCode" : "TM"
    },
"688" : {
      "origin" : "nation",
      "name" : "Tuvalu",
      "letterCode" : "TV"
    },
"256" : {
      "origin" : "nation",
      "name" : "Uganda",
      "letterCode" : "UG"
    },
"380" : {
      "origin" : "nation",
      "name" : "Ukraine",
      "letterCode" : "UA"
    },
"971" : {
      "origin" : "nation",
      "name" : "United Arab Emirates",
      "letterCode" : "AE"
    },
"44" : {
      "origin" : "nation",
      "name" : "United Kingdom",
      "letterCode" : "GB"
    },
"878" : {
      "origin" : "nation",
      "name" : "Universal Personal Telecommunications (UPT)",
      "letterCode" : null
    },
"1" : {
      "origin" : "nation",
      "name" : "United States - Canada",
      "letterCode" : "USA-CA"
    },
"598" : {
      "origin" : "nation",
      "name" : "Uruguay",
      "letterCode" : "UY"
    },
"998" : {
      "origin" : "nation",
      "name" : "Uzbekistan",
      "letterCode" : "UZ"
    },
"678" : {
      "origin" : "nation",
      "name" : "Vanuatu",
      "letterCode" : "VU"
    },
"58" : {
      "origin" : "nation",
      "name" : "Venezuela",
      "letterCode" : "YV"
    },
"84" : {
      "origin" : "nation",
      "name" : "Vietnam",
      "letterCode" : "VN"
    },
"681" : {
      "origin" : "nation",
      "name" : "Wallis and Futuna",
      "letterCode" : "WF"
    },
"967" : {
      "origin" : "nation",
      "name" : "Yemen",
      "letterCode" : "YE"
    },
"260" : {
      "origin" : "nation",
      "name" : "Zambia",
      "letterCode" : "ZM"
    },
"255" : {
      "origin" : "nation",
      "name" : "Zanzibar",
      "letterCode" : "TZ"
    },
"263" : {
      "origin" : "nation",
      "name" : "Zimbabwe",
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
      
        if (countryCode[code]){ return countryCode[code][field]}
        else{ return "unknown"}
    }
	})