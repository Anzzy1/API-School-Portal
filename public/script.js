let API_BASE = '';
let currentUser = null;
let currentToken = null;

const phData = {
    'NCR - National Capital Region': ['Caloocan', 'Las Piñas', 'Makati', 'Malabon', 'Mandaluyong', 'Manila', 'Marikina', 'Muntinlupa', 'Navotas', 'Parañaque', 'Pasay', 'Pasig', 'Pateros', 'Quezon City', 'San Juan', 'Taguig', 'Valenzuela'],
    'CAR - Cordillera Administrative Region': ['Baguio', 'Benguet', 'Ifugao', 'Kalinga', 'Mountain Province', 'Apayao', 'Abra'],
    'Region I - Ilocos Region': ['Dagupan', 'San Carlos', 'Urdaneta', 'Alaminos', 'Laoag', 'Vigan', 'Ilocos Norte', 'Ilocos Sur', 'La Union', 'Pangasinan'],
    'Region II - Cagayan Valley': ['Tuguegarao', 'Cauayan', 'Santiago', 'Batanes', 'Cagayan', 'Isabela', 'Nueva Vizcaya', 'Quirino'],
    'Region III - Central Luzon': ['Angeles City', 'Olongapo', 'San Fernando', 'Tarlac City', 'Cabanatuan', 'Gapan', 'San Jose', 'Palayan', 'Baler', 'Aurora', 'Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac', 'Zambales'],
    'Region IV-A - CALABARZON': ['Antipolo City', 'Bacoor', 'Imus', 'Dasmariñas', 'Calamba', 'San Pablo', 'Santa Rosa', 'Cabuyao', 'Tanauan', 'Lipa', 'Batangas City', 'Lucena', 'Taytay', 'Cainta', 'Angono', 'Binangonan', 'Cardona', 'Jalajala', 'Morong', 'Pililla', 'Rodriguez', 'San Mateo', 'Tanay', 'Teresa', 'Baras'],
    'Region IV-B - MIMAROPA': ['Calapan', 'Puerto Princesa', 'Marinduque', 'Occidental Mindoro', 'Oriental Mindoro', 'Palawan', 'Romblon'],
    'Region V - Bicol Region': ['Legazpi', 'Naga', 'Iriga', 'Tabaco', 'Ligao', 'Masbate City', 'Sorsogon City', 'Albay', 'Camarines Norte', 'Camarines Sur', 'Catanduanes', 'Masbate', 'Sorsogon'],
    'Region VI - Western Visayas': ['Iloilo City', 'Bacolod', 'Roxas City', 'Silay', 'Talisay', 'Cadiz', 'Sagay', 'Victorias', 'Escalante', 'San Carlos', 'Himamaylan', 'Kabankalan', 'Aklan', 'Antique', 'Capiz', 'Guimaras', 'Iloilo', 'Negros Occidental'],
    'Region VII - Central Visayas': ['Cebu City', 'Lapu-Lapu', 'Mandaue', 'Toledo', 'Talisay', 'Danao', 'Bogo', 'Carcar', 'Naga', 'Tagbilaran', 'Guihulngan', 'Bais', 'Bayawan', 'Canlaon', 'Dumaguete', 'Siquijor', 'Bohol', 'Cebu', 'Negros Oriental'],
    'Region VIII - Eastern Visayas': ['Tacloban', 'Ormoc', 'Baybay', 'Maasin', 'Borongan', 'Catbalogan', 'Calbayog', 'Biliran', 'Eastern Samar', 'Leyte', 'Northern Samar', 'Samar', 'Southern Leyte'],
    'Region IX - Zamboanga Peninsula': ['Zamboanga City', 'Isabela City', 'Pagadian', 'Dipolog', 'Dapitan', 'Zamboanga del Norte', 'Zamboanga del Sur', 'Zamboanga Sibugay'],
    'Region X - Northern Mindanao': ['Cagayan de Oro', 'Iligan', 'Malaybalay', 'Valencia', 'Gingoog', 'El Salvador', 'Ozamiz', 'Oroquieta', 'Tangub', 'Bukidnon', 'Camiguin', 'Lanao del Norte', 'Misamis Occidental', 'Misamis Oriental'],
    'Region XI - Davao Region': ['Davao City', 'Tagum', 'Panabo', 'Samal', 'Digos', 'Mati', 'Davao de Oro', 'Davao del Norte', 'Davao del Sur', 'Davao Occidental', 'Davao Oriental'],
    'Region XII - SOCCSKSARGEN': ['General Santos', 'Koronadal', 'Tacurong', 'Kidapawan', 'Cotabato City', 'Cotabato', 'Sarangani', 'South Cotabato', 'Sultan Kudarat'],
    'Region XIII - Caraga': ['Butuan', 'Surigao City', 'Bislig', 'Tandag', 'Cabadbaran', 'Bayugan', 'Agusan del Norte', 'Agusan del Sur', 'Dinagat Islands', 'Surigao del Norte', 'Surigao del Sur'],
    'BARMM - Bangsamoro Autonomous Region': ['Cotabato City', 'Marawi', 'Lamitan', 'Basilan', 'Lanao del Sur', 'Maguindanao', 'Sulu', 'Tawi-Tawi']
};

const antipoloBarangays = ['San Roque', 'Bagong Nayon', 'Beverly Hills', 'Calawis', 'Cupang', 'Dalig', 'Inarawan', 'Mambugan', 'Mayamot', 'Muntindilaw', 'San Isidro', 'San Jose', 'Santa Cruz', 'Dela Paz', 'Don Antonio', 'Don Bosco'];

const cityBarangays = {
    'Manila': ['Barangay 1','Barangay 2','Barangay 3','Barangay 4','Barangay 5','Barangay 6','Barangay 7','Barangay 8','Barangay 9','Barangay 10','Ermita','Intramuros','Malate','Paco','Pandacan','Port Area','Quiapo','Sampaloc','San Andres','San Miguel','San Nicolas','Santa Ana','Santa Cruz','Santa Mesa','Tondo'],
    'Quezon City': ['Barangay 1','Barangay 2','Barangay 3','Barangay 4','Barangay 5','Barangay 6','Barangay 7','Barangay 8','Barangay 9','Barangay 10','Bagbag','Bagong Lipunan','Bagong Pag-asa','Bagong Silangan','Bahay Toro','Balingasa','Balong Bato','Batasan Hills','Baesa','Bgy. Capitol','Bgy. Central','Bgy. Concepcion','Bgy. Damar','Bgy. Damayang Lagi','Bgy. Del Monte','Bgy. Dioquino Zobel','Bgy. Don Manuel','Bgy. Escopa','Bgy. Fairview','Bgy. Horseshoe','Bgy. Kaunlaran','Bgy. Kristong Hari','Bgy. La Loma','Bgy. Laging Handa','Bgy. Libis','Bgy. Lourdes','Bgy. Maharlika','Bgy. Malaya','Bgy. Manresa','Bgy. Mariana','Bgy. Masagana','Bgy. Matandang Balara','Bgy. Milagrosa','Bgy. Nagkaisang Nayon','Bgy. Nayon Kapitan','Bgy. New Era','Bgy. North Fairview','Bgy. Novaliches','Bgy. Old Capitol','Bgy. Pag-asa','Bgy. Paligsahan','Bgy. Paltok','Bgy. Pasong Putik','Bgy. Pasong Tamo','Bgy. Payatas','Bgy. Phil-Am','Bgy. Pinagkaisahan','Bgy. Pinyahan','Bgy. Project 6','Bgy. Quirino','Bgy. Ramon Magsaysay','Bgy. Roxas','Bgy. Sacred Heart','Bgy. Saint Ignatius','Bgy. San Agustin','Bgy. San Antonio','Bgy. San Bartolome','Bgy. San Isidro','Bgy. San Jose','Bgy. San Miguel','Bgy. San Roque','Bgy. San Vicente','Bgy. Santo Cristo','Bgy. Santo Niño','Bgy. Sauyo','Bgy. Sienna','Bgy. Sikatuna','Bgy. Silangan','Bgy. Socorro','Bgy. South Triangle','Bgy. Tagumpay','Bgy. Talanay','Bgy. Talipapa','Bgy. Tandang Sora','Bgy. Tatalon','Bgy. Teachers Village','Bgy. Ugong Norte','Bgy. Unang Sigaw','Bgy. Valencia','Bgy. Vasra','Bgy. Veterans Village','Bgy. Villa Maria','Bgy. West Triangle','Bgy. White Plains'],
    'Caloocan': ['Barangay 1','Barangay 2','Barangay 3','Barangay 4','Barangay 5','Barangay 6','Barangay 7','Barangay 8','Barangay 9','Barangay 10','Bagumbong','Bagong Barrio','Caloocan Heights','Camarin','Kaunlaran','Libis','Llettes','Llano','Maypajo','Morning Breeze','Navotas East','Pag-asa','Partida','Poblacion','Samsonville','Sangandaan','Tala','Tugatog','Urduja'],
    'Pasig City': ['Bagong Ilog','Bagong Katipunan','Bambang','Buting','Caniogan','Dela Paz','Kalawaan','Kapasigan','Kapitolyo','Malinao','Manggahan','Maybunga','Oranbo','Palatiw','Pinagbuhatan','Pineda','Rosario','Sagad','San Antonio','San Joaquin','San Jose','San Miguel','San Nicolas','Santa Cruz','Santa Lucia','Santa Rosa','Santo Tomas','Santolan','Sumilang','Ugong'],
    'Marikina City': ['Barangay 1','Barangay 2','Barangay 3','Barangay 4','Barangay 5','Barangay 6','Barangay 7','Barangay 8','Barangay 9','Barangay 10','Barangay 11','Barangay 12','Barangay 13','Barangay 14','Barangay 15','Barangay 16','Barangay 17','Barangay 18','Barangay 19','Barangay 20','Barangay 21','Barangay 22','Barangay 23','Barangay 24','Barangay 25','Barangay 26','Barangay 27','Barangay 28','Barangay 29','Barangay 30','Barangay 31','Barangay 32','Barangay 33','Barangay 34','Barangay 35','Barangay 36','Barangay 37','Barangay 38','Barangay 39','Barangay 40','Barangay 41','Barangay 42','Barangay 43','Barangay 44','Barangay 45','Barangay 46','Barangay 47','Barangay 48','Barangay 49','Barangay 50','Concepcion Uno','Concepcion Dos','Jesus Dela Peña','Malanday','Marikina Heights','Nangka','Parang','San Roque','Santa Elena','Santo Niño','Tañong','Tumana'],
    'Taguig': ['Bagumbayan','Bambang','Calzada','Central Bicutan','Central Signal','Dela Paz','Fort Bonifacio','Hagonoy','Ibayo-Tipas','Katuparan','Ligid-Tipas','Lower Bicutan','Maharlika','Napindan','New Lower Bicutan','North Daang Hari','North Signal','Palingon-Tipas','Pinagsama','San Miguel','Santa Ana','South Daang Hari','South Signal','Tanyag','Tuktukan','Upper Bicutan','Ususan','Wawa','Western Bicutan'],
    'Makati': ['Bangkal','Bel-Air','Cembo','Comembo','Dasmarinas','East Rembo','Forbes Park','Guadalupe Nuevo','Guadalupe Viejo','Kasilawan','La Paz','Magallanes','Olympia','Palanan','Pasong Tamo','Pembo','Pinagkaisahan','Pio del Pilar','Pitogo','Poblacion','Post Proper North','Post Proper South','Rizal','San Antonio','San Isidro','San Lorenzo','Santa Cruz','Singkamas','South Cembo','Tejeros','Urdaneta','Valenzuela','West Rembo','West Valley View'],
    'Mandaluyong': ['Addition Hills','Bagong Silang','Barangay 1','Barangay 2','Barangay 3','Barangay 4','Barangay 5','Barangay 6','Barangay 7','Barangay 8','Barangay 9','Barangay 10','Barangay 11','Barangay 12','Barangay 13','Barangay 14','Barangay 15','Barangay 16','Barangay 17','Barangay 18','Barangay 19','Barangay 20','Barangay 21','Barangay 22','Barangay 23','Barangay 24','Barangay 25','Barangay 26','Barangay 27','Buayang Bato','Hulo','Mabini-J. Rizal','Mauway','Namayan','Old Zañiga','Pleasant Hills','San Jose','Vergara','Wack-Wack'],
    'Cainta': ['San Andres','San Isidro','San Juan','San Roque','Santa Rosa','Santo Domingo','Santo Niño'],
    'Taytay': ['Dolores','Muzon','San Isidro','San Juan','Santa Ana','Santa Clara'],
    'Angono': ['Bagumbayan','Kalayaan','Mahabang Parang','Poblacion Ibaba','Poblacion Itaas','San Isidro','San Juan','San Pedro','San Roque','San Vicente','Santo Niño'],
    'Binangonan': ['Batingan','Bilibiran','Calumpang','Campamento','Cansuso','Cataginting','Darangan','Gatbuca','Gulod','Jala','Kalawaan','Kalumpang','Kinanum','Layunan','Libid','Libis','Lumutan','Mahabang Parang','Macamot','Mambog','Mapagong','Monte Vista','Pag-asa','Palangoy','Pantok','Parang','Pinagdala','Pinagkapuyan','Poblacion','Quiling','Rizal','Santa Cruz','Santa Rosa','Santo Niño','Talas'],
    'Rodriguez': ['Balite','Burgos','Gerry','Macabud','Manggahan','Mascap','Montaneza','Nangka','Pacuso','Park 8','Puray','Rosario','San Isidro','San Jose','San Rafael','Sapa','Sibulan'],
    'San Mateo': ['Ampid','Banay-Banay','Dulong Bayan','Guadalupe','Gulod','Malanday','Perez','Pintong Bukawe','Poblacion','Santa Ana','Santo Niño','Silangan'],
    'Tanay': ['Ambol','Cacutud','Calingawan','Cayabu','Cuyambay','Daraitan','Kilala','Laiban','Limbon','Lumutan','Madilay-dilay','Mag-Ampon','Mayagay','Maugat','Monte Cielo','Natividad','Pantoc','Piel','Pilapila','Pinagkamaligan','Platero','Poblacion','Sabina','Sampa','Santo Niño','Sibulan','Tahan','Tandang Kutyo','Wawa'],
    'Teresa': ['Bagumbayan','Dalig','Dulong Busog','May-Iba','Poblacion','Prinza','San Gabriel','San Roque','Tinibucan'],
    'Bacoor': ['Alima','Aniban','Banalo','Bayanan','Bayanan','Bayanan Ibaba','Bayanan Ilaya','Bayanan Itaas','Bayanan Ni Batoy','Bayanan Ni Bulik','Bayanan Ni Palo','BF Resort','Camachile','Camella Homes','City Proper','Daang Bukid','Digman','Dulo','Habay','Kaingin','Ligas','Mabolo','Maliksi','Mambog','Molino','Molino 1','Molino 2','Molino 3','Molino 4','Molino 5','Molino 6','Molino 7','Niog','Panapaan','Pekin','Pinakipakin','Poblacion','Pulang Lupa','Queens Row','Real','Salinas','San Nicolas','Santa Isabel','Santa Maria','Santo Cristo','Santo Domingo','Sineguelasan','Tabing Dagat','Tambo','Talaba','Timalan','Zapote'],
    'Imus': ['Alapan 1','Alapan 2','Bayanan 1','Bayanan 2','Bucandala 1','Bucandala 2','Bukandala 3','Carsadang Bago 1','Carsadang Bago 2','Kalamia','Lancaster 1','Lancaster 2','Lancaster 3','Lancaster 4','Lancaster 5','Mahabang Parang','Malagasang 1','Malagasang 2','Malagasang 3','Malagasang 4','Mediran','Palico 1','Palico 2','Pasong Buaya 1','Pasong Buaya 2','Pasong Buaya 3','Pinagbuklod','Poblacion 1-A','Poblacion 1-B','Poblacion 1-C','Poblacion 1-D','Poblacion 2-A','Poblacion 2-B','Poblacion 3-A','Poblacion 3-B','Poblacion 4-A','Poblacion 4-B','Poblacion 4-C','Poblacion 5-A','Poblacion 5-B','Poblacion 5-C','Poblacion 6-A','Poblacion 6-B','Poblacion 7-A','Poblacion 7-B','Poblacion 8-A','Poblacion 8-B','Poblacion 9','Tanzang Luma 1','Tanzang Luma 2','Tanzang Luma 3','Tanzang Luma 4','Tanzang Luma 5','Toclong 1','Toclong 2','Toclong 3','Toclong 4','Toclong 5','Toclong 6','Toclong 7','Toclong 8'],
    'Calamba': ['Bagong Kalsada','Banadero','Banlic','Barandal','Batangas','Bubuyan','Bucal','Bunggo','Burol','Camaligan','Canlubang','Dela Paz','Don Jose','Halang','Horizon','Kay-Anlog','La Mesa','Laguerta','Lawa','Lecheria','Lingga','Looc','Mabato','Majada Labas','Makiling','Mapagong','Masili','Maunlad','Mojon','Parian','Poblacion 1','Poblacion 2','Poblacion 3','Poblacion 4','Poblacion 5','Poblacion 6','Poblacion 7','Purok 1','Purok 2','Purok 3','Purok 4','Purok 5','Real','Saimsim','Sampiruhang Banga','San Cristobal','San Jose','San Juan','San Pedro','Santa Anita','Santa Cruz','Santo Angel','Santo Tomas','Sulyap','Tulo','Uwisan','Wawa'],
    'Santa Rosa': ['Aplaya','Balibago','Caingin','Dila','Dita','Don Jose','Ibaba','Labas','Macabling','Malitlit','Malusak','Market Area','Poblacion','Pulong Santa Cruz','Santo Domingo','Sinalhan','Tagapo','Tres Pinos'],
    'Biñan': ['Biñan Poblacion','Bolo','Canlalay','Casile','De La Paz','Ganado','Kaypian','Loma','Malaban','Malamig','Mampalasan','Platero','Poblacion','San Antonio','San Francisco','San Jose','San Vicente','Santa Cruz','Santo Domingo','Santo Niño','Santo Tomas','Soro-Soro','Suklayin','Sumilang','Tabi Mula','Tubigan','Tulo','Turba'],
    'Dasmariñas': ['Bagong Bayan','Burol','Burol 1','Burol 2','Burol 3','Datu Esperanza','Datu Pag-asa','Datu Pula','Datu Sadiman','Datu Sikat','Datu Sinag','Datu Tiyap','Datu Tejero','Emilia','Eugenio','Francia','Hidalgo','Langkaan','Luzviminda','Mabuhay','Maguyam','Malinta','Manggahan','Mangga','Manuel','Nueva','Paliparan','Pascal','Pasi','Pinagkaisahan','Poblacion','Prinza','Sabang','Saint Peter','Salawag','Salitran','San Andres','San Jose','San Juan','San Lorenzo','San Manuel','San Miguel','San Nicolas','Santa Cristina','Santa Fe','Santa Lucia','Santa Maria','Santo Cristo','Santo Niño','Santo Tomas','Sikat','Sitio 1','Sitio 2','Sitio 3','Sitio 4','Sitio 5','Sitio 6','Sitio 7','Sitio 8','Sitio 9','Sitio 10','Sitio 11','Sitio 12','Sitio 13','Sitio 14','Sitio 15','Sitio 16','Sitio 17','Sitio 18','Sitio 19','Sitio 20','Sitio 21','Sitio 22','Sitio 23','Sitio 24','Sitio 25'],
    'San Pablo': ['Bagong Bayan','Brgy. 1','Brgy. 2','Brgy. 3','Brgy. 4','Brgy. 5','Brgy. 6','Brgy. 7','Brgy. 8','Brgy. 9','Brgy. 10','Brgy. 11','Brgy. 12','Brgy. 13','Brgy. 14','Brgy. 15','Brgy. 16','Brgy. 17','Brgy. 18','Brgy. 19','Brgy. 20','Brgy. 21','Brgy. 22','Brgy. 23','Brgy. 24','Brgy. 25','Brgy. 26','Brgy. 27','Brgy. 28','Brgy. 29','Brgy. 30','Brgy. 31','Brgy. 32','Brgy. 33','Brgy. 34','Brgy. 35','Brgy. 36','Brgy. 37','Brgy. 38','Brgy. 39','Brgy. 40','Brgy. 41','Brgy. 42','Brgy. 43','Brgy. 44','Brgy. 45','Colago','Concepcion','Del Remedio','Dolores','San Antonio','San Bartolome','San Buenaventura','San Crispin','San Diego','San Francisco','San Gregorio','San Ignacio','San Isidro','San Jose','San Juan','San Lorenzo','San Lucas','San Marcos','San Mateo','San Miguel','San Nicolas','San Pedro','San Rafael','San Roque','San Simon','Santa Ana','Santa Catalina','Santa Clara','Santa Cruz','Santa Elena','Santa Felomina','Santa Isabel','Santa Maria','Santa Monica','Santa Veronica','Santo Angel','Santo Cristo','Santo Niño','Santiago'],
};

function getBarangays(city) {
    if (cityBarangays[city]) return cityBarangays[city];
    if (city === 'Antipolo City') return antipoloBarangays;
    const common = ['Poblacion', 'Barangay 1', 'Barangay 2', 'Barangay 3', 'Barangay 4', 'Barangay 5', 'Sitio 1', 'Sitio 2'];
    return common;
}

const countries = [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan',
    'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi',
    'Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic',
    'Denmark','Djibouti','Dominica','Dominican Republic',
    'Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia',
    'Fiji','Finland','France',
    'Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana',
    'Haiti','Honduras','Hungary',
    'Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy',
    'Ivory Coast','Jamaica','Japan','Jordan',
    'Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan',
    'Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg',
    'Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar',
    'Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway',
    'Oman',
    'Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal',
    'Qatar',
    'Romania','Russia','Rwanda',
    'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
    'Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu',
    'Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan',
    'Vanuatu','Vatican City','Venezuela','Vietnam',
    'Yemen',
    'Zambia','Zimbabwe'
];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById(sectionId);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const link = document.querySelector('.nav-links a[onclick*="' + sectionId + '"]');
    if (link) link.classList.add('active');
    document.getElementById('nav-links').classList.remove('show');
    document.getElementById('main-nav').style.display = 'block';
    document.body.style.paddingTop = '0px';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const footer = document.querySelector('.footer');
    if (footer) footer.style.display = '';
}

function toggleHamburger() { document.getElementById('nav-links').classList.toggle('show'); }

function toggleFaq(el) { el.parentElement.classList.toggle('active'); }

function searchHelp() {
    const q = document.getElementById('help-search-input').value.toLowerCase().trim();
    const div = document.getElementById('help-results');
    if (q.length < 2) { div.innerHTML = ''; return; }
    const articles = [
        { title: 'How to Enroll', desc: 'Step-by-step guide to the enrollment process' },
        { title: 'Understanding Your Grades', desc: 'How the grading system works at API' },
        { title: 'Payment Methods', desc: 'All accepted payment options and procedures' },
        { title: 'Scholarship Programs', desc: 'Available scholarships and how to apply' },
        { title: 'System Requirements', desc: 'Technical requirements for using the portal' },
    ];
    const results = articles.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q));
    if (results.length === 0) { div.innerHTML = '<p class="no-data">No articles found.</p>'; return; }
    div.innerHTML = results.map(a => '<div class="help-article" onclick="showSection(\'faq\')"><i class="fas fa-file-alt"></i><div><h4>' + a.title + '</h4><p>' + a.desc + '</p></div></div>').join('');
}

function filterNotifications(category, btn) {
    document.querySelectorAll('.notif-filter').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.notif-item').forEach(item => {
        if (category === 'all') item.classList.remove('hidden');
        else item.classList.toggle('hidden', item.getAttribute('data-category') !== category);
    });
}

function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    if (!emailInput) return false;
    const email = emailInput.value.trim();
    if (!email) { showNotification('Please enter your email.', 'error'); return false; }
    fetch(API_BASE + '/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email })
    }).then(r => r.json()).then(data => {
        if (data.success) { showNotification('Subscribed successfully!', 'success'); emailInput.value = ''; }
        else { showNotification(data.message || 'Subscription failed.', 'error'); }
    }).catch(() => showNotification('Connection error.', 'error'));
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    populateCountries();
    fetchSiteStats();
    loadGallery();
});

function fetchSiteStats() {
    fetch('/api/stats').then(r => r.json()).then(data => {
        if (!data.success) return;
        const statEls = document.querySelectorAll('.stat-number');
        if (statEls.length >= 1) statEls[0].setAttribute('data-target', data.programs || 12);
        if (statEls.length >= 2) statEls[1].setAttribute('data-target', data.students || 0);
        if (statEls.length >= 3) statEls[2].setAttribute('data-target', data.faculty || 50);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.stat-number').forEach(counter => animateCounter(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        const hero = document.querySelector('.hero');
        if (hero) observer.observe(hero);
    }).catch(() => {});
}

function toggleOtherInput(select, otherId) {
    const otherInput = document.getElementById(otherId);
    if (otherInput) otherInput.style.display = select.value === 'Other' ? 'block' : 'none';
}

function populateCountries() {
    const sel = document.getElementById('country');
    if (!sel) return;
    sel.innerHTML = '<option value="">Select country</option>';
    countries.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; sel.appendChild(o); });
}

function onCountryChange() {
    const country = document.getElementById('country').value;
    const regionSel = document.getElementById('region');
    const citySel = document.getElementById('city');
    const barangaySel = document.getElementById('barangay');
    citySel.innerHTML = '<option value="">Select city / municipality</option>';
    barangaySel.innerHTML = '<option value="">Select barangay</option>';
    regionSel.innerHTML = '<option value="">Select region</option>';
    if (country === 'Philippines') {
        Object.keys(phData).forEach(r => { const o = document.createElement('option'); o.value = r; o.textContent = r; regionSel.appendChild(o); });
        regionSel.disabled = false;
    } else if (country) {
        regionSel.innerHTML = '<option value="">Select region</option><option value="Other">Other</option>';
        regionSel.disabled = false;
    } else {
        regionSel.disabled = true;
        citySel.disabled = true;
        barangaySel.disabled = true;
    }
    document.getElementById('region-other').style.display = 'none';
    document.getElementById('city-other').style.display = 'none';
    document.getElementById('barangay-other').style.display = 'none';
}

function onRegionChange() {
    const region = document.getElementById('region').value;
    const citySel = document.getElementById('city');
    const barangaySel = document.getElementById('barangay');
    barangaySel.innerHTML = '<option value="">Select barangay</option>';
    citySel.innerHTML = '<option value="">Select city / municipality</option>';
    if (region === 'Other') {
        citySel.innerHTML = '<option value="">Select city / municipality</option><option value="Other">Other</option>';
        citySel.disabled = true;
        barangaySel.disabled = true;
        document.getElementById('city-other').style.display = 'none';
        document.getElementById('barangay-other').style.display = 'none';
        return;
    }
    if (region && phData[region]) {
        phData[region].forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; citySel.appendChild(o); });
        const o = document.createElement('option'); o.value = 'Other'; o.textContent = 'Other'; citySel.appendChild(o);
        citySel.disabled = false;
    } else {
        citySel.disabled = true;
        barangaySel.disabled = true;
    }
    document.getElementById('city-other').style.display = 'none';
    document.getElementById('barangay-other').style.display = 'none';
}

function onCityChange() {
    const city = document.getElementById('city').value;
    const barangaySel = document.getElementById('barangay');
    barangaySel.innerHTML = '<option value="">Select barangay</option>';
    if (city) {
        const brgys = city === 'Antipolo City' ? antipoloBarangays : (cityBarangays[city] || ['Poblacion', 'Barangay 1', 'Barangay 2', 'Barangay 3']);
        brgys.forEach(b => { const o = document.createElement('option'); o.value = b; o.textContent = b; barangaySel.appendChild(o); });
        const o = document.createElement('option'); o.value = 'Other'; o.textContent = 'Other'; barangaySel.appendChild(o);
        barangaySel.disabled = false;
    } else {
        barangaySel.disabled = true;
    }
    document.getElementById('barangay-other').style.display = 'none';
}

function onEditCountryChange() {
    const country = document.getElementById('edit-country').value;
    const regionSel = document.getElementById('edit-region');
    const citySel = document.getElementById('edit-city');
    const barangaySel = document.getElementById('edit-barangay');
    citySel.innerHTML = '<option value="">Select city / municipality</option>';
    barangaySel.innerHTML = '<option value="">Select barangay</option>';
    regionSel.innerHTML = '<option value="">Select region</option>';
    if (country === 'Philippines') {
        Object.keys(phData).forEach(r => { const o = document.createElement('option'); o.value = r; o.textContent = r; regionSel.appendChild(o); });
        regionSel.disabled = false;
    } else if (country) {
        regionSel.innerHTML = '<option value="">Select region</option><option value="Other">Other</option>';
        regionSel.disabled = false;
    } else {
        regionSel.disabled = true;
        citySel.disabled = true;
        barangaySel.disabled = true;
    }
    document.getElementById('edit-region-other').style.display = 'none';
    document.getElementById('edit-city-other').style.display = 'none';
    document.getElementById('edit-barangay-other').style.display = 'none';
}

function onEditRegionChange() {
    const region = document.getElementById('edit-region').value;
    const citySel = document.getElementById('edit-city');
    const barangaySel = document.getElementById('edit-barangay');
    barangaySel.innerHTML = '<option value="">Select barangay</option>';
    citySel.innerHTML = '<option value="">Select city / municipality</option>';
    if (region === 'Other') {
        citySel.innerHTML = '<option value="">Select city / municipality</option><option value="Other">Other</option>';
        citySel.disabled = true;
        barangaySel.disabled = true;
        document.getElementById('edit-city-other').style.display = 'none';
        document.getElementById('edit-barangay-other').style.display = 'none';
        return;
    }
    if (region && phData[region]) {
        phData[region].forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; citySel.appendChild(o); });
        const o = document.createElement('option'); o.value = 'Other'; o.textContent = 'Other'; citySel.appendChild(o);
        citySel.disabled = false;
    } else {
        citySel.disabled = true;
        barangaySel.disabled = true;
    }
    document.getElementById('edit-city-other').style.display = 'none';
    document.getElementById('edit-barangay-other').style.display = 'none';
}

function onEditCityChange() {
    const city = document.getElementById('edit-city').value;
    const barangaySel = document.getElementById('edit-barangay');
    barangaySel.innerHTML = '<option value="">Select barangay</option>';
    if (city) {
        const brgys = city === 'Antipolo City' ? antipoloBarangays : (cityBarangays[city] || ['Poblacion', 'Barangay 1', 'Barangay 2', 'Barangay 3']);
        brgys.forEach(b => { const o = document.createElement('option'); o.value = b; o.textContent = b; barangaySel.appendChild(o); });
        const o = document.createElement('option'); o.value = 'Other'; o.textContent = 'Other'; barangaySel.appendChild(o);
        barangaySel.disabled = false;
    } else {
        barangaySel.disabled = true;
    }
    document.getElementById('edit-barangay-other').style.display = 'none';
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (!target) return;
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString();
    }, 30);
}

function goToStep(step) {
    const currentStep = document.querySelector('.enroll-step-content.active');
    if (currentStep) {
        const current = parseInt(currentStep.getAttribute('data-step'));
        if (step > current) {
            document.querySelectorAll('.field-error').forEach(e => e.remove());
            let checks = [], firstEmpty = null;

            if (current === 1) {
                checks = [
                    { id: 'first_name', label: 'First Name is required' },
                    { id: 'middle_name', label: 'Middle Name is required' },
                    { id: 'last_name', label: 'Last Name is required' },
                    { id: 'date_of_birth', label: 'Date of Birth is required' },
                    { id: 'gender', label: 'Please select your gender' },
                    { id: 'nationality', label: 'Please select your nationality' },
                    { id: 'religion', label: 'Please select your religion' }
                ];
                for (const c of checks) {
                    const el = document.getElementById(c.id);
                    if (!el.value.trim()) { showFieldError(el, c.label); if (!firstEmpty) firstEmpty = el; }
                }
                const natEl = document.getElementById('nationality');
                if (natEl.value === 'Other') {
                    const otherEl = document.getElementById('nationality-other');
                    if (!otherEl.value.trim()) { showFieldError(otherEl, 'Please specify your nationality'); if (!firstEmpty) firstEmpty = otherEl; }
                }
                const relEl = document.getElementById('religion');
                if (relEl.value === 'Other') {
                    const otherEl = document.getElementById('religion-other');
                    if (!otherEl.value.trim()) { showFieldError(otherEl, 'Please specify your religion'); if (!firstEmpty) firstEmpty = otherEl; }
                }
            } else if (current === 2) {
                checks = [
                    { id: 'email', label: 'Email address is required' },
                    { id: 'phone', label: 'Phone number is required' },
                    { id: 'mother_name', label: 'Mother\'s name is required' },
                    { id: 'mother_phone', label: 'Mother\'s phone number is required' },
                    { id: 'father_name', label: 'Father\'s name is required' },
                    { id: 'father_phone', label: 'Father\'s phone number is required' },
                    { id: 'guardian_name', label: 'Guardian\'s name is required' },
                    { id: 'guardian_phone', label: 'Guardian\'s phone number is required' }
                ];
                for (const c of checks) {
                    const el = document.getElementById(c.id);
                    if (!el.value.trim()) { showFieldError(el, c.label); if (!firstEmpty) firstEmpty = el; }
                }
            } else if (current === 3) {
                checks = [
                    { id: 'country', label: 'Please select your country' },
                    { id: 'region', label: 'Please select your region' },
                    { id: 'city', label: 'Please select your city' },
                    { id: 'barangay', label: 'Please select your barangay' },
                    { id: 'address_line', label: 'Address line is required' }
                ];
                for (const c of checks) {
                    const el = document.getElementById(c.id);
                    if (el.disabled) continue;
                    if (!el.value.trim()) { showFieldError(el, c.label); if (!firstEmpty) firstEmpty = el; }
                }
                ['country','region','city','barangay'].forEach(id => {
                    const sel = document.getElementById(id);
                    if (sel.value === 'Other') {
                        const otherEl = document.getElementById(id + '-other');
                        if (!otherEl.value.trim()) { showFieldError(otherEl, 'Please specify'); if (!firstEmpty) firstEmpty = otherEl; }
                    }
                });
            }

            if (firstEmpty) { firstEmpty.focus(); return; }
        }
    }
    document.querySelectorAll('.enroll-step-content').forEach(s => s.classList.remove('active'));
    const stepContent = document.querySelector('.enroll-step-content[data-step="' + step + '"]');
    if (stepContent) stepContent.classList.add('active');
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const stepEl = document.querySelector('.step[data-step="' + step + '"]');
    if (stepEl) stepEl.classList.add('active');
}

function showFieldError(el, msg) {
    const err = document.createElement('div');
    err.className = 'field-error';
    err.textContent = msg;
    el.parentNode.appendChild(err);
}

function loadCourses() {
    fetch(API_BASE + '/api/courses').then(r => r.json()).then(data => {
        const select = document.getElementById('course_code');
        if (!select) return;
        select.innerHTML = '<option value="">Select program</option>';
        if (data.success && data.courses) {
            data.courses.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.course_code; opt.textContent = c.course_code + ' - ' + c.course_name;
                select.appendChild(opt);
            });
        }
    }).catch(() => {});
}

let pendingStudentId = null;

function submitEnrollment() {
    const first_name = document.getElementById('first_name').value.trim();
    const middle_name = document.getElementById('middle_name').value.trim();
    const last_name = document.getElementById('last_name').value.trim();
    const date_of_birth = document.getElementById('date_of_birth').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const religion = document.getElementById('religion').value;
    const email = document.getElementById('email').value.trim();
    const course_code = document.getElementById('course_code').value;

    const nationalVal = nationality === 'Other' ? document.getElementById('nationality-other').value.trim() : nationality;
    const religionVal = religion === 'Other' ? document.getElementById('religion-other').value.trim() : religion;

    document.querySelectorAll('.field-error').forEach(e => e.remove());
    if (!course_code) {
        showFieldError(document.getElementById('course_code'), 'Please select a program');
        document.getElementById('course_code').focus();
        return;
    }
    const yearLevel = document.getElementById('year_level').value;
    if (!yearLevel) {
        showFieldError(document.getElementById('year_level'), 'Please select a year level');
        document.getElementById('year_level').focus();
        return;
    }

    const tempPass = 'temp' + Date.now();
    const suffix = document.getElementById('suffix').value;
    // Save enrollment data for receipt
    const enrollData = {
        fullName: [first_name, middle_name, last_name, suffix].filter(Boolean).join(' '),
        course: course_code,
        yearLevel: yearLevel
    };
    window._enrollData = enrollData;

    fetch(API_BASE + '/api/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            first_name,
            middle_name: document.getElementById('middle_name').value.trim(),
            last_name,
            suffix: document.getElementById('suffix').value,
            date_of_birth: document.getElementById('date_of_birth').value,
            gender: document.getElementById('gender').value,
            nationality: (function(){ const s=document.getElementById('nationality'); return s.value==='Other'?document.getElementById('nationality-other').value.trim():s.value; })(),
            religion: (function(){ const s=document.getElementById('religion'); return s.value==='Other'?document.getElementById('religion-other').value.trim():s.value; })(),
            email,
            phone: document.getElementById('phone').value.trim(),
            mother_name: document.getElementById('mother_name').value.trim(),
            mother_phone: document.getElementById('mother_phone').value.trim(),
            father_name: document.getElementById('father_name').value.trim(),
            father_phone: document.getElementById('father_phone').value.trim(),
            guardian_name: document.getElementById('guardian_name').value.trim(),
            guardian_phone: document.getElementById('guardian_phone').value.trim(),
            barangay: (function(){ const s=document.getElementById('barangay'); return s.value==='Other'?document.getElementById('barangay-other').value.trim():s.value; })(),
            address_line: document.getElementById('address_line').value.trim(),
            country: (function(){ const s=document.getElementById('country'); return s.value==='Other'?document.getElementById('country-other').value.trim():s.value; })(),
            region: (function(){ const s=document.getElementById('region'); return s.value==='Other'?document.getElementById('region-other').value.trim():s.value; })(),
            city: (function(){ const s=document.getElementById('city'); return s.value==='Other'?document.getElementById('city-other').value.trim():s.value; })(),
            course_code,
            year_level: document.getElementById('year_level').value,
            password: tempPass
        })
    }).then(r => r.json()).then(data => {
        if (data.success) {
            pendingStudentId = data.student_id;
            document.getElementById('modal-student-id').textContent = data.student_id;
            document.getElementById('password-modal').style.display = 'flex';
            document.getElementById('enroll-form').reset();
            goToStep(1);
            document.querySelectorAll('.step').forEach(s => s.classList.remove('completed'));
        } else {
            showNotification(data.message || 'Registration failed.', 'error');
        }
    }).catch(() => showNotification('Connection error.', 'error'));
}

function setPassword() {
    const password = document.getElementById('modal-password').value;
    const confirm = document.getElementById('modal-confirm').value;
    if (!password || password.length < 6) { showNotification('Password must be at least 6 characters.', 'error'); return; }
    if (password !== confirm) { showNotification('Passwords do not match.', 'error'); return; }
    fetch(API_BASE + '/api/set-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: pendingStudentId, password })
    }).then(r => r.json()).then(data => {
        if (data.success) {
            document.getElementById('password-modal').style.display = 'none';
            document.getElementById('modal-password').value = '';
            document.getElementById('modal-confirm').value = '';
            const ed = window._enrollData || {};
            const sectionMap = { 'BSA':'M001','BSBA':'M002','BSCS':'M003','BSIT':'M004','BSIS':'M005','BELEMed':'M006','BSED':'M007','BSC':'M008','BSHM':'M009','BSTM':'M010','BSCpE':'M011','BPA':'M012' };
            let html = '<div style="text-align:center;padding:40px 20px;max-width:500px;margin:auto;">';
            html += '<div style="font-size:60px;color:#27ae60;margin-bottom:15px;"><i class="fas fa-check-circle"></i></div>';
            html += '<h2 style="color:#1B365D;margin:0 0 5px;">Congratulations!</h2>';
            html += '<p style="font-size:18px;color:#333;margin:0;">You are now enrolled at</p>';
            html += '<p style="font-size:20px;font-weight:700;color:#1B365D;margin:5px 0 20px;">Aguinaldo Polytechnic Institute</p>';
            html += '<div style="background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:20px;text-align:left;margin:20px 0;">';
            html += '<table style="width:100%;border-collapse:collapse;">';
            html += '<tr><td style="padding:6px 10px;font-size:13px;color:#666;">Student ID</td><td style="padding:6px 10px;font-size:13px;font-weight:600;">' + (pendingStudentId || 'N/A') + '</td></tr>';
            html += '<tr><td style="padding:6px 10px;font-size:13px;color:#666;">Full Name</td><td style="padding:6px 10px;font-size:13px;font-weight:600;">' + (ed.fullName || 'N/A') + '</td></tr>';
            html += '<tr><td style="padding:6px 10px;font-size:13px;color:#666;">Program</td><td style="padding:6px 10px;font-size:13px;font-weight:600;">' + (ed.course || 'N/A') + '</td></tr>';
            html += '<tr><td style="padding:6px 10px;font-size:13px;color:#666;">Section</td><td style="padding:6px 10px;font-size:13px;font-weight:600;">' + (sectionMap[ed.course] || 'N/A') + '</td></tr>';
            html += '<tr><td style="padding:6px 10px;font-size:13px;color:#666;">Year Level</td><td style="padding:6px 10px;font-size:13px;font-weight:600;">' + (ed.yearLevel || 'N/A') + '</td></tr>';
            html += '</table></div>';
            html += '<p style="font-size:13px;color:#888;margin-bottom:20px;">Your account has been activated. Please log in to access the student portal.</p>';
            html += '<button class="btn-primary" onclick="showSection(\'login\')" style="padding:12px 40px;font-size:16px;"><i class="fas fa-sign-in-alt"></i> Go to Login</button>';
            html += '</div>';
            const enrollContainer = document.querySelector('#enroll .enroll-container');
            if (enrollContainer) {
                enrollContainer.innerHTML = html;
            } else {
                showSection('home');
            }
            window._enrollData = null;
            pendingStudentId = null;
        } else {
            showNotification(data.message || 'Failed to set password.', 'error');
        }
    }).catch(() => showNotification('Connection error.', 'error'));
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email')?.value.trim() || document.getElementById('login-email-page')?.value.trim() || '';
    const password = document.getElementById('login-password')?.value || document.getElementById('login-password-page')?.value || '';

    if (!email || !password) {
        showNotification('Email and password are required.', 'error');
        return false;
    }

    fetch(API_BASE + '/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
    }).then(r => r.json()).then(data => {
        if (data.success) {
            currentUser = data.user;
            currentToken = data.token;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.role === 'operator') {
                showOperatorDashboard();
            } else {
                showStudentDashboard();
            }
        } else {
            showNotification(data.message || 'Login failed.', 'error');
        }
    }).catch(() => showNotification('Connection error.', 'error'));
    return false;
}

function logout() {
    currentUser = null;
    currentToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showSection('home');
    showNotification('Logged out successfully.', 'success');
}

function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (token && user) {
        currentToken = token;
        currentUser = user;
        if (user.role === 'operator') showOperatorDashboard();
        else showStudentDashboard();
        return true;
    }
    return false;
}

function showStudentDashboard() {
    showSection('student-dashboard');
    document.getElementById('main-nav').style.display = 'none';
    const sectionMap = { 'BSA':'M001','BSBA':'M002','BSCS':'M003','BSIT':'M004','BSIS':'M005','BELEMed':'M006','BSED':'M007','BSC':'M008','BSHM':'M009','BSTM':'M010','BSCpE':'M011','BPA':'M012' };
    document.getElementById('dashboard-header-title').textContent = currentUser.full_name;
    document.getElementById('dashboard-badge-id').textContent = 'ID: ' + currentUser.student_id;
    document.getElementById('dashboard-badge-gender').textContent = currentUser.gender || '—';
    document.getElementById('dashboard-section-info').textContent = (sectionMap[currentUser.course_code] || '—') + ' — ' + (currentUser.course_code || '');
    const footer = document.querySelector('.footer');
    if (footer) footer.style.display = 'none';
    loadDashboard();
    loadProfile();
    loadSchedule();
    loadCurriculum();
    loadNotifications();
}

function apiFetch(url, options) {
    const opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['Authorization'] = 'Bearer ' + currentToken;
    return fetch(API_BASE + url, opts).then(r => r.json());
}

let profileData = null;
function esc(v) { return (v || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function formatDate(d) { if (!d) return 'N/A'; try { const dt = new Date(d); if (isNaN(dt)) return d; return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } catch(e) { return d; } }
function showNotification(msg, type) {
    let el = document.getElementById('toast-msg');
    if (!el) {
        el = document.createElement('div');
        el.id = 'toast-msg';
        el.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.3s;max-width:400px;text-align:center;';
        document.body.appendChild(el);
    }
    el.style.background = type === 'error' ? '#dc3545' : '#27ae60';
    el.style.color = '#fff';
    el.textContent = msg;
    el.style.opacity = '1';
    el.style.display = 'block';
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.style.display = 'none', 300); }, 3000);
}

function loadProfile() {
    const div = document.getElementById('profile-display');
    div.innerHTML = '<p class="no-data">Loading...</p>';
    apiFetch('/api/profile').then(data => {
        if (!data.success || !data.user) { div.innerHTML = '<p class="no-data">Could not load profile.</p>'; return; }
        const u = data.user;
        profileData = u;
        if (u.course_code) { currentUser.course_code = u.course_code; localStorage.setItem('user', JSON.stringify(currentUser)); }
        if (u.gender) { currentUser.gender = u.gender; localStorage.setItem('user', JSON.stringify(currentUser)); }
        const genderEl = document.getElementById('dashboard-badge-gender');
        if (genderEl && u.gender) genderEl.textContent = u.gender;
        renderProfileView();
    });
}

function renderProfileView() {
    const div = document.getElementById('profile-display');
    document.getElementById('profile-edit-btn').innerHTML = '<i class="fas fa-pen"></i> Edit';
    document.getElementById('profile-edit-btn').setAttribute('onclick', 'editProfile()');
    const u = profileData;
    if (!u) { div.innerHTML = '<p class="no-data">No profile data.</p>'; return; }
    let html = '<div class="profile-sections">';

    // Personal Information
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-user"></i> Personal Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field"><label>Student ID</label><span>' + u.student_id + '</span></div>';
    html += '<div class="profile-field"><label>Full Name</label><span>' + u.full_name + '</span></div>';
    html += '<div class="profile-field"><label>Date of Birth</label><span>' + formatDate(u.date_of_birth) + '</span></div>';
    html += '<div class="profile-field"><label>Gender</label><span>' + (u.gender || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Nationality</label><span>' + (u.nationality || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Religion</label><span>' + (u.religion || 'N/A') + '</span></div>';
    html += '</div></div>';

    // Academic Information
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-graduation-cap"></i> Academic Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field"><label>Course / Program</label><span>' + (u.course_code || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Year</label><span>' + (u.year_level || '1st Year') + '</span></div>';
    html += '<div class="profile-field"><label>Role</label><span>' + u.role + '</span></div>';
    html += '<div class="profile-field"><label>Status</label><span>' + u.status + '</span></div>';
    html += '</div></div>';

    // Contact Information
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-envelope"></i> Contact Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field"><label>Email</label><span>' + u.email + '</span></div>';
    html += '<div class="profile-field"><label>Phone</label><span>' + (u.phone || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Mother</label><span>' + (u.mother_name || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Mother\'s Phone</label><span>' + (u.mother_phone || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Father</label><span>' + (u.father_name || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Father\'s Phone</label><span>' + (u.father_phone || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Guardian</label><span>' + (u.guardian_name || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Guardian\'s Phone</label><span>' + (u.guardian_phone || 'N/A') + '</span></div>';
    html += '</div></div>';

    // Address Information
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-map-marker-alt"></i> Address Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field"><label>Country</label><span>' + (u.country || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Region</label><span>' + (u.region || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>City</label><span>' + (u.city || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Barangay</label><span>' + (u.barangay || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Address</label><span>' + (u.address || 'N/A') + '</span></div>';
    html += '</div></div>';

    html += '</div>';
    div.innerHTML = html;
}

function editProfile() {
    const u = profileData;
    if (!u) return;
    const div = document.getElementById('profile-display');
    const btn = document.getElementById('profile-edit-btn');
    btn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    btn.setAttribute('onclick', 'renderProfileView()');

    let html = '<div class="profile-sections">';

    // Personal Information (read-only)
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-user"></i> Personal Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field"><label>Student ID</label><span>' + u.student_id + '</span></div>';
    html += '<div class="profile-field"><label>Full Name</label><span>' + u.full_name + '</span></div>';
    html += '<div class="profile-field"><label>Date of Birth</label><span>' + formatDate(u.date_of_birth) + '</span></div>';
    html += '<div class="profile-field"><label>Gender</label><span>' + (u.gender || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Nationality</label><span>' + (u.nationality || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Religion</label><span>' + (u.religion || 'N/A') + '</span></div>';
    html += '</div></div>';

    // Academic Information (read-only)
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-graduation-cap"></i> Academic Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field"><label>Course / Program</label><span>' + (u.course_code || 'N/A') + '</span></div>';
    html += '<div class="profile-field"><label>Year</label><span>' + (u.year_level || '1st Year') + '</span></div>';
    html += '<div class="profile-field"><label>Role</label><span>' + u.role + '</span></div>';
    html += '<div class="profile-field"><label>Status</label><span>' + u.status + '</span></div>';
    html += '</div></div>';

    // Contact Information (editable)
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-envelope"></i> Contact Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field-edit"><label>Email</label><span>' + esc(u.email) + '</span></div>';
    html += '<div class="profile-field-edit"><label>Phone</label><input type="text" id="edit-phone" value="' + esc(u.phone) + '" placeholder="Phone number"></div>';
    html += '<div class="profile-field-edit"><label>Mother</label><input type="text" id="edit-mother_name" value="' + esc(u.mother_name) + '" placeholder="Mother\'s full name"></div>';
    html += '<div class="profile-field-edit"><label>Mother\'s Phone</label><input type="text" id="edit-mother_phone" value="' + esc(u.mother_phone) + '" placeholder="Mother\'s phone"></div>';
    html += '<div class="profile-field-edit"><label>Father</label><input type="text" id="edit-father_name" value="' + esc(u.father_name) + '" placeholder="Father\'s full name"></div>';
    html += '<div class="profile-field-edit"><label>Father\'s Phone</label><input type="text" id="edit-father_phone" value="' + esc(u.father_phone) + '" placeholder="Father\'s phone"></div>';
    html += '<div class="profile-field-edit"><label>Guardian</label><input type="text" id="edit-guardian_name" value="' + esc(u.guardian_name) + '" placeholder="Guardian\'s full name"></div>';
    html += '<div class="profile-field-edit"><label>Guardian\'s Phone</label><input type="text" id="edit-guardian_phone" value="' + esc(u.guardian_phone) + '" placeholder="Guardian\'s phone"></div>';
    html += '</div></div>';

    // Address Information (editable)
    html += '<div class="profile-section"><div class="profile-section-header"><i class="fas fa-map-marker-alt"></i> Address Information</div><div class="profile-section-grid">';
    html += '<div class="profile-field-edit"><label>Country</label><select id="edit-country" onchange="onEditCountryChange(); toggleOtherInput(this, \'edit-country-other\')"><option value="">Select country</option></select><input type="text" id="edit-country-other" class="other-input" placeholder="Please specify" style="display:none;margin-top:6px;"></div>';
    html += '<div class="profile-field-edit"><label>Region</label><select id="edit-region" onchange="onEditRegionChange(); toggleOtherInput(this, \'edit-region-other\')" disabled><option value="">Select region</option></select><input type="text" id="edit-region-other" class="other-input" placeholder="Please specify" style="display:none;margin-top:6px;"></div>';
    html += '<div class="profile-field-edit"><label>City</label><select id="edit-city" onchange="onEditCityChange(); toggleOtherInput(this, \'edit-city-other\')" disabled><option value="">Select city / municipality</option></select><input type="text" id="edit-city-other" class="other-input" placeholder="Please specify" style="display:none;margin-top:6px;"></div>';
    html += '<div class="profile-field-edit"><label>Barangay</label><select id="edit-barangay" onchange="toggleOtherInput(this, \'edit-barangay-other\')" disabled><option value="">Select barangay</option></select><input type="text" id="edit-barangay-other" class="other-input" placeholder="Please specify" style="display:none;margin-top:6px;"></div>';
    html += '<div class="profile-field-edit"><label>Address</label><input type="text" id="edit-address" value="' + esc(u.address) + '" placeholder="Street address"></div>';
    html += '</div></div>';

    html += '</div>';
    html += '<div style="text-align:right;margin-top:15px;"><button class="btn-primary" onclick="saveProfile()"><i class="fas fa-save"></i> Save Changes</button></div>';
    div.innerHTML = html;
    // Initialize address dropdowns
    const countrySel = document.getElementById('edit-country');
    countries.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; countrySel.appendChild(o); });
    if (u.country) { countrySel.value = u.country; if (countrySel.value !== u.country) { document.getElementById('edit-country-other').value = u.country; document.getElementById('edit-country-other').style.display = 'block'; } }
    onEditCountryChange();
    setTimeout(() => {
        const regionSel = document.getElementById('edit-region');
        if (u.region) {
            if (regionSel.querySelector('option[value="' + u.region.replace(/"/g,'\\"') + '"]')) {
                regionSel.value = u.region;
            } else {
                document.getElementById('edit-region-other').value = u.region;
                document.getElementById('edit-region-other').style.display = 'block';
            }
        }
        onEditRegionChange();
        setTimeout(() => {
            const citySel = document.getElementById('edit-city');
            if (u.city) {
                if (citySel.querySelector('option[value="' + u.city.replace(/"/g,'\\"') + '"]')) {
                    citySel.value = u.city;
                } else {
                    document.getElementById('edit-city-other').value = u.city;
                    document.getElementById('edit-city-other').style.display = 'block';
                }
            }
            onEditCityChange();
            setTimeout(() => {
                const brgySel = document.getElementById('edit-barangay');
                if (u.barangay) {
                    if (brgySel.querySelector('option[value="' + u.barangay.replace(/"/g,'\\"') + '"]')) {
                        brgySel.value = u.barangay;
                    } else {
                        document.getElementById('edit-barangay-other').value = u.barangay;
                        document.getElementById('edit-barangay-other').style.display = 'block';
                    }
                }
            }, 50);
        }, 50);
    }, 50);
}

function saveProfile() {
    function getVal(id) { const sel = document.getElementById(id); if (sel && sel.tagName === 'SELECT' && sel.value === 'Other') { return document.getElementById(id + '-other').value || sel.value; } return sel ? sel.value : ''; }
    const data = {
        phone: document.getElementById('edit-phone').value,
        mother_name: document.getElementById('edit-mother_name').value,
        mother_phone: document.getElementById('edit-mother_phone').value,
        father_name: document.getElementById('edit-father_name').value,
        father_phone: document.getElementById('edit-father_phone').value,
        guardian_name: document.getElementById('edit-guardian_name').value,
        guardian_phone: document.getElementById('edit-guardian_phone').value,
        country: getVal('edit-country'),
        region: getVal('edit-region'),
        city: getVal('edit-city'),
        barangay: getVal('edit-barangay'),
        address: document.getElementById('edit-address').value
    };
    apiFetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.success) {
            Object.assign(profileData, data);
            showNotification('Profile updated successfully!', 'success');
            renderProfileView();
        } else {
            showNotification(res.message || 'Failed to update profile.', 'error');
        }
    }).catch(() => {
        showNotification('Connection error.', 'error');
    });
}

const sectionMap = { 'BSA':'M001','BSBA':'M002','BSCS':'M003','BSIT':'M004','BSIS':'M005','BELEMed':'M006','BSED':'M007','BSC':'M008','BSHM':'M009','BSTM':'M010','BSCpE':'M011','BPA':'M012' };

function loadSchedule() {
    const div = document.getElementById('schedule-display');
    div.innerHTML = '<p class="no-data">Loading schedule...</p>';
    Promise.all([
        apiFetch('/api/schedule/' + currentUser.student_id),
        apiFetch('/api/profile'),
        apiFetch('/api/my-grades')
    ]).then(([sched, prof, gradesData]) => {
        if (!sched.success || !sched.schedule || sched.schedule.length === 0) { div.innerHTML = '<p class="no-data">No schedule found.</p>'; return; }

        const course = currentUser.course_code || '';
        const u = prof.user || {};
        const yearLevel = u.year_level || '1st Year';
        const gradeMap = {};
        (gradesData.grades || []).forEach(g => { gradeMap[g.subject] = g.grade; });

        // Build curriculum lookup and get current trimester subjects
        let progData;
        if (curricula[course]) progData = curricula[course];
        else if (otherPrograms[course]) {
            progData = { name: otherPrograms[course].name, years: {} };
            Object.keys(otherPrograms[course].subs).forEach(year => {
                progData.years[year] = { trimesters: {} };
                Object.keys(otherPrograms[course].subs[year]).forEach(tri => {
                    progData.years[year].trimesters[tri] = otherPrograms[course].subs[year][tri].map(s => {
                        const parts = s.split(' - ');
                        const code = parts[0].split(' ').slice(0, 2).join('');
                        return { code: code || parts[0], units: 3, type: 'lecture', name: parts[1] || parts[0], prereq: 'None' };
                    });
                });
            });
        }

        // Determine current trimester (PH school year: 1st Tri = June-Sep, 2nd Tri = Oct-Jan, 3rd Tri = Feb-May)
        const month = new Date().getMonth();
        const triIdx = (month >= 5 && month <= 8) ? 0 : (month >= 9 || month <= 0 ? 1 : 2);
        const triNames = ['1st Trimester', '2nd Trimester', '3rd Trimester'];
        const yearNames = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        const currentTri = triNames[triIdx];
        const currentYear = yearNames[yearNames.indexOf(yearLevel) >= 0 ? yearNames.indexOf(yearLevel) : 0];

        // Get current trimester subjects from curriculum
        let currentSubjects = [];
        if (progData && progData.years && progData.years[currentYear] && progData.years[currentYear].trimesters) {
            currentSubjects = progData.years[currentYear].trimesters[currentTri] || [];
        }

        let html = '<div style="margin-bottom:15px;padding:12px 16px;background:linear-gradient(135deg,#14b8a6,#2dd4bf);border-radius:var(--radius-sm);display:flex;justify-content:space-between;flex-wrap:wrap;color:white;box-shadow:0 2px 8px rgba(0,0,0,0.1);">';
        html += '<span><strong>Section:</strong> ' + (sectionMap[currentUser.course_code] || 'N/A') + '</span>';
        html += '<span><strong>Program:</strong> ' + (currentUser.course_code || 'N/A') + '</span>';
        html += '<span><strong>' + currentYear + ' - ' + currentTri + '</strong></span>';
        html += '</div>';

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const timeDefs = [
            { start: '7:00 AM', end: '9:00 AM', hour: 7 },
            { start: '9:00 AM', end: '11:00 AM', hour: 9 },
            { start: '11:00 AM', end: '1:00 PM', hour: 11 },
            { start: '1:00 PM', end: '3:00 PM', hour: 13 },
            { start: '3:00 PM', end: '5:00 PM', hour: 15 },
            { start: '5:00 PM', end: '7:00 PM', hour: 17 }
        ];
        const timeSlots = timeDefs.map(t => ({ start: t.start, end: t.end, byDay: {} }));
        timeSlots.forEach(slot => { days.forEach(d => { slot.byDay[d] = null; }); });

        const rooms = ['201', '202', '203', '204', '205', '206', '301', '302', '303', '304', '305', '306'];
        const dayPairs = [['Monday','Wednesday'],['Tuesday','Thursday'],['Wednesday','Friday'],['Monday','Thursday'],['Tuesday','Friday'],['Monday','Wednesday']];
        currentSubjects.forEach((cs, i) => {
            const si = i % timeSlots.length;
            const se = sched.schedule[i] || null;
            const hasGrade = gradeMap[cs.code];
            const isPE = cs.code.startsWith('OLPHYE') || cs.code.startsWith('OLNSTP');
            const room = cs.code.startsWith('OLPHYE') ? 'GYM' : (se ? se.room : 'B.' + rooms[i % rooms.length]);
            const pair = dayPairs[i % dayPairs.length];
            const daysToAssign = isPE ? [pair[0]] : pair;
            daysToAssign.forEach(d => {
                if (!timeSlots[si].byDay[d]) {
                    timeSlots[si].byDay[d] = { code: cs.code, name: cs.name, room, hasGrade: !!hasGrade, gradeVal: hasGrade };
                }
            });
            if (se && !daysToAssign.includes(se.day) && !timeSlots[si].byDay[se.day]) {
                timeSlots[si].byDay[se.day] = { code: cs.code, name: cs.name, room, hasGrade: !!hasGrade, gradeVal: hasGrade };
            }
        });

        html += '<div style="overflow-x:auto;"><table class="timetable"><thead><tr><th>Time</th>';
        days.forEach(d => { html += '<th>' + d + '</th>'; });
        html += '</tr></thead><tbody>';
        timeSlots.forEach(slot => {
            html += '<tr><td class="time-col">' + slot.start + ' - ' + slot.end + '</td>';
            days.forEach(d => {
                const cell = slot.byDay[d];
                if (cell) {
                    html += '<td class="sched-cell"><div class="sched-subject">' + cell.code + '</div><div class="sched-room">' + cell.room + '</div></td>';
                } else {
                    html += '<td class="sched-cell vacant"></td>';
                }
            });
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        div.innerHTML = html;
    }).catch(() => { div.innerHTML = '<p class="no-data">Could not load schedule.</p>'; });
}

const subj = (code, units, type, name, prereq) => ({ code, units, type, name, prereq });

const curricula = {
    'BSIT': { name: 'BS in Information Technology', trimestral: true,
        years: {
            '1st Year': {
                trimesters: {
                    '1st Trimester': [
                        subj('OLENG01', 3, 'lecture', 'Purposive Communication', 'None'),
                        subj('OLFIL-01', 3, 'lecture', 'Komunikasyon sa Akademikong Filipino', 'None'),
                        subj('OLMATH01', 3, 'lecture', 'Mathematics in the Modern World', 'None'),
                        subj('OLNSTP-1', 3, 'lecture', 'National Service Training Program 1', 'None'),
                        subj('OLPHYE001', 2, 'lecture', 'Physical Fitness', 'None'),
                        subj('OLSOFAPP', 4, 'lecture_lab', 'Office Application Software (3/1)', 'None')
                    ],
                    '2nd Trimester': [
                            subj('OLCC01', 3, 'lecture', 'Introduction to Computing', 'None'),
                            subj('OLIT01', 4, 'lecture_lab', 'Living in the IT Era-Social Media App (3/1)', 'None'),
                            subj('OLNSTP-2', 3, 'lecture', 'National Service Training Program 2', 'OLNSTP-1'),
                            subj('OLPHYE002', 2, 'lecture', 'Rhythmic Activities', 'OLPHYE001'),
                            subj('OLSS01', 3, 'lecture', 'Reading in the Philippine History', 'None'),
                            subj('OLSTS01', 3, 'lecture', 'Science Technology and Society', 'None'),
                            subj('OLVAL01', 3, 'lecture', 'Understanding for Self', 'None')
                        ],
                        '3rd Trimester': [
                            subj('OLCC02', 4, 'lecture_lab', 'Fundamentals of Programming (3/1)', 'None'),
                            subj('OLFIL-02', 3, 'lecture', 'Pagbasa at Pagsulat tungo sa Pananaliksik', 'OLFIL-01'),
                            subj('OLIMFBDS', 4, 'lecture_lab', 'Fundamentals of Database System (3/1)', 'None'),
                            subj('OLPHYE003', 2, 'lecture', 'Dual Sports / Games', 'OLPHYE001'),
                            subj('OLSS02', 3, 'lecture', 'The Contemporary World', 'OLSS01'),
                            subj('OLVAL02', 3, 'lecture', 'Ethics', 'OLVAL01')
                        ]
                    }
                },
                '2nd Year': {
                    trimesters: {
                        '1st Trimester': [
                            subj('OLALTRI', 3, 'lecture', 'Advance Algebra and Trigonomentry', 'OLMATH01'),
                            subj('OLCC03', 4, 'lecture_lab', 'Intermediate Programming (3/1)', 'OLCC02'),
                            subj('OLHUM001', 3, 'lecture', 'Art Appreciation', 'None'),
                            subj('OLPHYE004', 2, 'lecture', 'Team Sports / Games', 'OLPHYE001'),
                            subj('OLWS1', 4, 'lecture_lab', 'Web systems and Technologies 1 (3/1)', 'OLCC02')
                        ],
                        '2nd Trimester': [
                            subj('OLCC04', 4, 'lecture_lab', 'Data Structure and Algorithms (3/1)', 'OLCC03'),
                            subj('OLHCI1', 4, 'lecture_lab', 'Human Computer Interaction 1 (3/1)', 'OLCC03'),
                            subj('OLLITE001', 3, 'lecture', 'Philippine Literature', 'None'),
                            subj('OLMS1', 3, 'lecture', 'Discrete Mathematics', 'OLALTRI'),
                            subj('OLPT1', 4, 'lecture_lab', 'Platform Technologies (3/1)', 'OLCC03')
                        ],
                        '3rd Trimester': [
                            subj('OLCISCO-01', 4, 'lecture_lab', 'Cisco Fundamentals of Networking 1 (3/1)', 'OLPT1'),
                            subj('OLIM1', 4, 'lecture_lab', 'Information Management (3/1)', 'OLCC04'),
                            subj('OLMS2', 3, 'lecture', 'Quantitative Method (including Modeling and Simulation)', 'OLMS1'),
                            subj('OLRIZALCRS', 3, 'lecture', 'Life and Works of Rizal', 'None'),
                            subj('OLSP1', 3, 'lecture', 'Social and Professional Issues 1', 'OLCC04')
                        ]
                    }
                },
                '3rd Year': {
                    trimesters: {
                        '1st Trimester': [
                            subj('OLIM2', 4, 'lecture_lab', 'Advance Database System (3/1)', 'OLIMFBDS'),
                            subj('OLSDF04', 4, 'lecture_lab', 'Object-Oriented Programming (3/1)', 'OLCC03'),
                            subj('OLSIA1', 4, 'lecture_lab', 'Systems Integration and Architecture 1 (3/1)', 'OLPT1'),
                            subj('OLSP2', 3, 'lecture', 'Social and Professional Issues 2', 'OLSP1')
                        ],
                        '2nd Trimester': [
                            subj('OLCAPS1', 3, 'lecture', 'Capstone Project and Research 1', 'OLSP1'),
                            subj('OLCISCO-02', 4, 'lecture_lab', 'Cisco Networking 2 (3/1)', 'OLCISCO-01'),
                            subj('OLIAS1', 4, 'lecture_lab', 'Information Assurance and Security 1 (3/1)', 'OLSIA1'),
                            subj('OLIPT1', 4, 'lecture_lab', 'Integrative Programming and Technologies 1 (3/1)', 'OLPT1')
                        ],
                        '3rd Trimester': [
                            subj('OLCAPS2', 3, 'thesis', 'Capstone Project and Research 2', 'OLCAPS1'),
                            subj('OLCC05', 4, 'lecture_lab', 'Applications Development and Emerging Technologies (3/1)', 'OLIM1'),
                            subj('OLIAS2', 4, 'lecture_lab', 'Information Assurance and Security 2 (3/1)', 'OLIAS1'),
                            subj('OLPF1', 4, 'lecture_lab', 'Event Driven Programming (3/1)', 'OLCC04')
                        ]
                    }
                },
                '4th Year': {
                    trimesters: {
                        '1st Trimester': [
                            subj('OLIPT2', 4, 'lecture_lab', 'Integrative Programming and Technologies 2 (3/1)', 'OLIPT1'),
                            subj('OLITPRAC 1', 6, 'practicum', 'Practicum (243 Hours)', '4th Year Standing'),
                            subj('OLSA01', 4, 'lecture_lab', 'System Administration and Maintenance (3/1)', 'OLIAS2')
                        ],
                        '2nd Trimester': [
                            subj('OLITPRAC 2', 6, 'practicum', 'Practicum (243 Hours)', '4th Year Standing')
                        ],
                        '3rd Trimester': []
                    }
                }
            }
        }
    };

    // Other programs get converted to trimester format with existing data
    const otherPrograms = {
        'BSA': { name: 'BS in Accountancy', subs: { '1st Year': { '1st Trimester': ['ACC 101 - Fundamentals of Accounting', 'BSA 101 - Business Math', 'ENG 101 - English Composition'], '2nd Trimester': ['ACC 102 - Financial Accounting', 'BSA 102 - Business Law', 'FIL 101 - Filipino'], '3rd Trimester': ['ACC 103 - Management Accounting', 'BSA 103 - Economics', 'MATH 102 - Statistics'] }, '2nd Year': { '1st Trimester': ['ACC 201 - Intermediate Accounting', 'ACC 202 - Cost Accounting', 'TAX 201 - Income Taxation'], '2nd Trimester': ['ACC 203 - Auditing', 'LAW 201 - Obligations & Contracts', 'ACC 204 - Accounting Research'], '3rd Trimester': ['ACC 205 - Financial Management', 'ACC 206 - Internal Auditing', 'ETHICS 201 - Business Ethics'] }, '3rd Year': { '1st Trimester': ['ACC 301 - Advanced Accounting', 'ACC 302 - Audit Practice', 'FIN 301 - Financial Management'], '2nd Trimester': ['ACC 303 - Accounting Research', 'ACC 304 - Internship', 'TAX 302 - Taxation 2'], '3rd Trimester': ['ACC 305 - Review 1', 'ACC 306 - Review 2', 'CAPSTONE 301 - Capstone'] }, '4th Year': { '1st Trimester': ['ACC 401 - Comprehensive Exam 1', 'ACC 402 - Comprehensive Exam 2', 'RES 401 - Research'], '2nd Trimester': ['ACC 403 - Thesis Writing', 'PRAC 401 - Practicum', 'ACC 404 - Review 3'], '3rd Trimester': [] } } },
        'BSBA': { name: 'BS in Business Administration', subs: { '1st Year': { '1st Trimester': ['BA 101 - Principles of Management', 'BA 102 - Business Economics', 'ENG 101 - English'], '2nd Trimester': ['BA 103 - Marketing Management', 'BA 104 - Business Communication', 'MATH 101 - College Algebra'], '3rd Trimester': ['BA 105 - Financial Accounting', 'BA 106 - Business Statistics', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['BA 201 - Financial Management', 'BA 202 - Human Resource Mgmt', 'STAT 201 - Statistics'], '2nd Trimester': ['BA 203 - Operations Management', 'BA 204 - Entrepreneurship', 'LAW 201 - Business Law'], '3rd Trimester': ['BA 205 - Organizational Behavior', 'BA 206 - Tax Principles', 'ETHICS 201 - Business Ethics'] }, '3rd Year': { '1st Trimester': ['BA 301 - Strategic Management', 'BA 302 - Managerial Finance', 'MKTG 301 - Marketing'], '2nd Trimester': ['BA 303 - Business Research', 'BA 304 - Internship', 'FIN 302 - Managerial Finance'], '3rd Trimester': ['BA 305 - Feasibility Study', 'BA 306 - Business Policy', 'CAPSTONE 301 - Capstone'] }, '4th Year': { '1st Trimester': ['BA 401 - Business Plan Dev', 'BA 402 - Comprehensive Review', 'RES 401 - Research'], '2nd Trimester': ['BA 403 - Thesis', 'PRAC 401 - Practicum', 'BA 404 - Business Ethics'], '3rd Trimester': [] } } },
        'BSCS': { name: 'BS in Computer Science', subs: { '1st Year': { '1st Trimester': ['CS 101 - Intro to Computing', 'CS 102 - Programming Fundamentals', 'MATH 101 - College Algebra'], '2nd Trimester': ['CS 103 - Data Structures', 'CS 104 - Discrete Math', 'ENG 101 - English'], '3rd Trimester': ['CS 105 - Digital Logic', 'CS 106 - Linear Algebra', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['CS 201 - Algorithms', 'CS 202 - OOP', 'STAT 201 - Probability'], '2nd Trimester': ['CS 203 - Database Systems', 'CS 204 - Software Engineering', 'NET 201 - Networking'], '3rd Trimester': ['CS 205 - Operating Systems', 'CS 206 - Automata Theory', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['CS 301 - Machine Learning', 'CS 302 - Compiler Design', 'MATH 301 - Numerical Analysis'], '2nd Trimester': ['CS 303 - AI', 'CS 304 - Internship', 'CS 305 - Research Methods'], '3rd Trimester': ['CS 306 - Advanced Topics', 'CAPSTONE 301 - Capstone 1', 'CAPSTONE 302 - Capstone 2'] }, '4th Year': { '1st Trimester': ['CS 401 - Thesis 1', 'CS 402 - Advanced Elective', 'RES 401 - Research'], '2nd Trimester': ['CS 403 - Thesis 2', 'PRAC 401 - Practicum', 'CS 404 - Seminar'], '3rd Trimester': [] } } },
        'BSIS': { name: 'BS in Information Systems', subs: { '1st Year': { '1st Trimester': ['IS 101 - Intro to IS', 'IS 102 - Programming Logic', 'MATH 101 - Algebra'], '2nd Trimester': ['IS 103 - Business Process', 'IS 104 - Web Design', 'ENG 101 - English'], '3rd Trimester': ['IS 105 - Database Fundamentals', 'IS 106 - Accounting', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['IS 201 - Database Design', 'IS 202 - Systems Analysis', 'STAT 201 - Statistics'], '2nd Trimester': ['IS 203 - Enterprise Architecture', 'IS 204 - Project Management', 'NET 201 - Networking'], '3rd Trimester': ['IS 205 - IT Infrastructure', 'IS 206 - Business Intelligence', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['IS 301 - Systems Security', 'IS 302 - Elective 1', 'IS 303 - Data Analytics'], '2nd Trimester': ['IS 304 - Internship', 'IS 305 - Research Methods', 'IS 306 - Systems Integration'], '3rd Trimester': ['IS 307 - Capstone 1', 'IS 308 - Capstone 2', 'IS 309 - Emerging Tech'] }, '4th Year': { '1st Trimester': ['IS 401 - Thesis 1', 'IS 402 - Elective 2', 'RES 401 - Research'], '2nd Trimester': ['IS 403 - Thesis 2', 'PRAC 401 - Practicum', 'IS 404 - Seminar'], '3rd Trimester': [] } } },
        'BELEMed': { name: 'Bachelor of Elementary Education', subs: { '1st Year': { '1st Trimester': ['ELE 101 - Foundations of Ed', 'ELE 102 - Child Development', 'ENG 101 - English'], '2nd Trimester': ['ELE 103 - Teaching Strategies', 'ELE 104 - Educational Psych', 'FIL 101 - Filipino'], '3rd Trimester': ['ELE 105 - Curriculum Basics', 'ELE 106 - Assessment 1', 'MATH 101 - Gen Math'] }, '2nd Year': { '1st Trimester': ['ELE 201 - Curriculum Dev', 'ELE 202 - Assessment in Learning', 'MATH 201 - Teaching Math'], '2nd Trimester': ['ELE 203 - Reading Instruction', 'ELE 204 - Science Education', 'SOC 201 - Soc Stud'], '3rd Trimester': ['ELE 205 - Inclusive Education', 'ELE 206 - Ed Tech', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['ELE 301 - Elective 1', 'ELE 302 - Research in Ed', 'ELE 303 - Internship 1'], '2nd Trimester': ['ELE 304 - Student Teaching 1', 'ELE 305 - Curriculum Design', 'ELE 306 - Specialization'], '3rd Trimester': ['ELE 307 - Student Teaching 2', 'CAPSTONE 301 - Capstone', 'RES 301 - Research'] }, '4th Year': { '1st Trimester': ['ELE 401 - Teaching Demo', 'ELE 402 - Advanced Pedagogy', 'RES 401 - Research'], '2nd Trimester': ['ELE 403 - Internship', 'PRAC 401 - Practicum', 'ELE 404 - Seminar'], '3rd Trimester': [] } } },
        'BSED': { name: 'BS in Secondary Education', subs: { '1st Year': { '1st Trimester': ['ED 101 - Foundations of Ed', 'ED 102 - Adolescent Psych', 'ENG 101 - English'], '2nd Trimester': ['ED 103 - Teaching Profession', 'ED 104 - Facilitating Learning', 'MATH 101 - Algebra'], '3rd Trimester': ['ED 105 - Assessment 1', 'ED 106 - Curriculum Basics', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['ED 201 - Assessment of Learning', 'ED 202 - Curriculum Dev', 'STAT 201 - Statistics'], '2nd Trimester': ['ED 203 - Tech in Teaching', 'ED 204 - Specialization 1', 'SOC 201 - Society'], '3rd Trimester': ['ED 205 - Inclusive Ed', 'ED 206 - Specialization 2', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['ED 301 - Elective', 'ED 302 - Research Methods', 'ED 303 - Internship 1'], '2nd Trimester': ['ED 304 - Student Teaching 1', 'ED 305 - Specialization 3', 'ED 306 - Assessment 2'], '3rd Trimester': ['ED 307 - Student Teaching 2', 'CAPSTONE 301 - Capstone', 'RES 301 - Research'] }, '4th Year': { '1st Trimester': ['ED 401 - Teaching Demo', 'ED 402 - Advanced Pedagogy', 'RES 401 - Research'], '2nd Trimester': ['ED 403 - Internship', 'PRAC 401 - Practicum', 'ED 404 - Seminar'], '3rd Trimester': [] } } },
        'BSC': { name: 'BS in Criminology', subs: { '1st Year': { '1st Trimester': ['CRIM 101 - Intro to Crim', 'CRIM 102 - Criminal Law 1', 'SOC 101 - Sociology'], '2nd Trimester': ['CRIM 103 - Criminal Law 2', 'CRIM 104 - Ethics', 'ENG 101 - English'], '3rd Trimester': ['CRIM 105 - Criminalistics', 'CRIM 106 - Psychology', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['CRIM 201 - Forensic Science', 'CRIM 202 - Criminal Proc', 'STAT 201 - Statistics'], '2nd Trimester': ['CRIM 203 - Juvenile Delinquency', 'CRIM 204 - Correctional Admin', 'PSY 201 - Psych'], '3rd Trimester': ['CRIM 205 - Criminal Inves', 'CRIM 206 - Drug Education', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['CRIM 301 - Specialized Crime', 'CRIM 302 - Elective 1', 'CRIM 303 - Crime Detection'], '2nd Trimester': ['CRIM 304 - Internship 1', 'CRIM 305 - Research Methods', 'CRIM 306 - Victimology'], '3rd Trimester': ['CRIM 307 - Thesis Writing', 'CAPSTONE 301 - Capstone', 'RES 301 - Research'] }, '4th Year': { '1st Trimester': ['CRIM 401 - Legal Medicine', 'CRIM 402 - Comprehensive Rev', 'RES 401 - Research'], '2nd Trimester': ['CRIM 403 - Internship 2', 'PRAC 401 - Practicum', 'CRIM 404 - Seminar'], '3rd Trimester': [] } } },
        'BSHM': { name: 'BS in Hospitality Management', subs: { '1st Year': { '1st Trimester': ['HM 101 - Intro to Hospitality', 'HM 102 - Food & Beverage', 'ENG 101 - English'], '2nd Trimester': ['HM 103 - Housekeeping', 'HM 104 - Front Office', 'MATH 101 - Business Math'], '3rd Trimester': ['HM 105 - Food Production', 'HM 106 - Sanitation', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['HM 201 - Tourism Management', 'HM 202 - Food Production', 'STAT 201 - Statistics'], '2nd Trimester': ['HM 203 - Hospitality Marketing', 'HM 204 - Event Management', 'ACC 201 - Accounting'], '3rd Trimester': ['HM 205 - Hospitality Law', 'HM 206 - Rooms Division', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['HM 301 - Restaurant Mgmt', 'HM 302 - Elective 1', 'HM 303 - Catering'], '2nd Trimester': ['HM 304 - Internship 1', 'HM 305 - Research Methods', 'HM 306 - Bar Management'], '3rd Trimester': ['HM 307 - Strategic Mgmt', 'CAPSTONE 301 - Capstone', 'RES 301 - Research'] }, '4th Year': { '1st Trimester': ['HM 401 - Advanced F&B', 'HM 402 - Elective 2', 'RES 401 - Research'], '2nd Trimester': ['HM 403 - Internship 2', 'PRAC 401 - Practicum', 'HM 404 - Seminar'], '3rd Trimester': [] } } },
        'BSTM': { name: 'BS in Tourism Management', subs: { '1st Year': { '1st Trimester': ['TM 101 - Intro to Tourism', 'TM 102 - Travel Geography', 'ENG 101 - English'], '2nd Trimester': ['TM 103 - Tourism Planning', 'TM 104 - Tour Guiding', 'MATH 101 - Business Math'], '3rd Trimester': ['TM 105 - Sustainable Tourism', 'TM 106 - Hospitality', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['TM 201 - Tourism Marketing', 'TM 202 - Transportation Mgmt', 'STAT 201 - Statistics'], '2nd Trimester': ['TM 203 - Event Management', 'TM 204 - Resort Management', 'ACC 201 - Accounting'], '3rd Trimester': ['TM 205 - Tourism Law', 'TM 206 - Cultural Tourism', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['TM 301 - Ecotourism', 'TM 302 - Elective 1', 'TM 303 - Tour Operations'], '2nd Trimester': ['TM 304 - Internship 1', 'TM 305 - Research Methods', 'TM 306 - Destination Mgmt'], '3rd Trimester': ['TM 307 - Strategic Mgmt', 'CAPSTONE 301 - Capstone', 'RES 301 - Research'] }, '4th Year': { '1st Trimester': ['TM 401 - Advanced Tourism', 'TM 402 - Elective 2', 'RES 401 - Research'], '2nd Trimester': ['TM 403 - Internship 2', 'PRAC 401 - Practicum', 'TM 404 - Seminar'], '3rd Trimester': [] } } },
        'BSCpE': { name: 'BS in Computer Engineering', subs: { '1st Year': { '1st Trimester': ['CE 101 - Intro to CpE', 'CE 102 - Programming Logic', 'MATH 101 - Calculus 1'], '2nd Trimester': ['CE 103 - Digital Logic', 'CE 104 - Circuit Analysis', 'ENG 101 - English'], '3rd Trimester': ['CE 105 - Electronics', 'CE 106 - Calculus 2', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['CE 201 - Microprocessors', 'CE 202 - Data Structures', 'MATH 201 - Calculus 3'], '2nd Trimester': ['CE 203 - Embedded Systems', 'CE 204 - Computer Arch', 'PHYS 201 - Physics'], '3rd Trimester': ['CE 205 - Signals', 'CE 206 - VLSI Design', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['CE 301 - Networks & Security', 'CE 302 - Elective 1', 'CE 303 - Robotics'], '2nd Trimester': ['CE 304 - Internship', 'CE 305 - Research Methods', 'CE 306 - AI'], '3rd Trimester': ['CE 307 - Capstone 1', 'CE 308 - Capstone 2', 'RES 301 - Research'] }, '4th Year': { '1st Trimester': ['CE 401 - CpE Laws', 'CE 402 - Advanced Elective', 'RES 401 - Research'], '2nd Trimester': ['CE 403 - Thesis', 'PRAC 401 - Practicum', 'CE 404 - Seminar'], '3rd Trimester': [] } } },
        'BPA': { name: 'Bachelor in Public Administration', subs: { '1st Year': { '1st Trimester': ['PA 101 - Intro to Public Admin', 'PA 102 - Phil Govt & Const', 'ENG 101 - English'], '2nd Trimester': ['PA 103 - Public Policy', 'PA 104 - Local Governance', 'SOC 101 - Society'], '3rd Trimester': ['PA 105 - Public Finance', 'PA 106 - Administrative Law', 'FIL 101 - Filipino'] }, '2nd Year': { '1st Trimester': ['PA 201 - HR in Govt', 'PA 202 - Research in PA', 'STAT 201 - Statistics'], '2nd Trimester': ['PA 203 - Program Evaluation', 'PA 204 - Econ 201', 'PA 205 - Org Communication'], '3rd Trimester': ['PA 206 - Public Ethics', 'PA 207 - Strategic Planning', 'ETHICS 201 - Ethics'] }, '3rd Year': { '1st Trimester': ['PA 301 - Elective 1', 'PA 302 - Fiscal Admin', 'PA 303 - Policy Analysis'], '2nd Trimester': ['PA 304 - Internship 1', 'PA 305 - Research Methods', 'PA 306 - NGO Management'], '3rd Trimester': ['PA 307 - Capstone 1', 'PA 308 - Capstone 2', 'RES 301 - Research'] }, '4th Year': { '1st Trimester': ['PA 401 - Special Topics', 'PA 402 - Elective 2', 'RES 401 - Research'], '2nd Trimester': ['PA 403 - Internship 2', 'PRAC 401 - Practicum', 'PA 404 - Seminar'], '3rd Trimester': [] } } }
    };

function loadCurriculum() {
    const div = document.getElementById('curriculum-display');
    const course = currentUser.course_code || '';
    const yearLevel = currentUser.year_level || '1st Year';

    if (!course) {
        div.innerHTML = '<p class="no-data">No curriculum data available for your program.</p>';
        return;
    }

    // Use detailed BSIT data if available, otherwise convert from otherPrograms
    let progData;
    if (curricula[course]) {
        progData = curricula[course];
    } else if (otherPrograms[course]) {
        // Convert other programs data to detailed format for rendering
        progData = { name: otherPrograms[course].name, years: {} };
        Object.keys(otherPrograms[course].subs).forEach(year => {
            progData.years[year] = { trimesters: {} };
            Object.keys(otherPrograms[course].subs[year]).forEach(tri => {
                progData.years[year].trimesters[tri] = otherPrograms[course].subs[year][tri].map(s => {
                    const parts = s.split(' - ');
                    const code = parts[0].split(' ').slice(0, 2).join('');
                    return subj(code || parts[0], 3, 'lecture', parts[1] || parts[0], 'None');
                });
            });
        });
    } else {
        div.innerHTML = '<p class="no-data">No curriculum data for your program.</p>';
        return;
    }

    // Determine which year/trimester is current
    const yearOrder = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const triOrder = ['1st Trimester', '2nd Trimester', '3rd Trimester'];
    const currentYearIdx = yearOrder.indexOf(yearLevel);
    let currentTriIdx = 0; // 1st Trimester is current for new students

    // Check if student has grades to determine progress
    apiFetch('/api/my-grades').then(gradeData => {
        const gradeMap = {};
        (gradeData.grades || []).forEach(g => { gradeMap[g.subject] = g.grade; });
        const existingGrades = Object.keys(gradeMap);

        let html = '<h4 style="margin-bottom:15px;">' + progData.name + ' - Prospectus</h4>';

        yearOrder.forEach((year, yi) => {
            const yearData = progData.years[year];
            if (!yearData) return;

            // Count total subjects and units for this year
            let totalSubs = 0, totalUnits = 0;
            triOrder.forEach(tri => {
                const subs = yearData.trimesters[tri] || [];
                subs.forEach(s => { totalSubs++; totalUnits += s.units; });
            });

            const isCurrentYear = yi === currentYearIdx;
            const isPastYear = yi < currentYearIdx;
            const yearColor = isCurrentYear ? '#27ae60' : (isPastYear ? 'var(--primary)' : '#ccc');

            html += '<div class="curri-year' + (isCurrentYear ? ' active' : (isPastYear ? ' completed' : '')) + '">';
            html += '<h4 style="color:' + (isCurrentYear ? 'white' : yearColor) + ';">' + year + '</h4>';
            html += '<p>' + (isCurrentYear ? 'Active Year &middot; ' : '') + totalSubs + ' subjects &middot; ' + totalUnits + ' units</p>';
            html += '</div>';

            triOrder.forEach((tri, ti) => {
                const subs = yearData.trimesters[tri] || [];
                if (subs.length === 0) return;

                const isPast = isPastYear || (isCurrentYear && ti < currentTriIdx);
                const isCurrent = isCurrentYear && ti === currentTriIdx;

                html += '<div class="curri-tri' + (isCurrent ? ' active-tri' : '') + '">';
                html += '<div class="curri-tri-header">';
                html += '<div class="curri-tri-info"><h5 style="color:' + (isCurrent ? '#27ae60' : 'var(--text-primary)') + ';">' + tri;
                if (isCurrent) html += ' <span style="font-size:11px;color:#27ae60;font-weight:600;">&middot; Active</span>';
                html += '</h5>';
                html += '<p>' + subs.length + ' subjects &middot; ' + subs.reduce((sum, s) => sum + s.units, 0) + ' units</p></div>';

                // GWA for this trimester
                const triGrades = subs.filter(s => existingGrades.includes(s.code));
                const gwa = triGrades.length > 0 ? (triGrades.reduce((sum, s) => {
                    const g = gradeData.grades.find(g => g.subject === s.code);
                    return sum + (g ? parseFloat(g.grade) : 0);
                }, 0) / triGrades.length).toFixed(2) : 'N/A';

                const gwaClass = gwa !== 'N/A' ? (parseFloat(gwa) <= 3.0 ? 'gwa-good' : 'gwa-fail') : 'gwa-na';
                const gwaColor = gwa !== 'N/A' ? (parseFloat(gwa) <= 3.0 ? '#2e7d32' : '#c62828') : '#1565c0';

                html += '<div class="curri-gwa ' + gwaClass + '"><div class="gwa-label">GWA</div><div class="gwa-value" style="color:' + gwaColor + ';">' + gwa + '</div></div>';
                html += '</div>';

                subs.forEach(s => {
                    const hasGrade = existingGrades.includes(s.code);
                    const gVal = hasGrade ? gradeData.grades.find(g => g.subject === s.code) : null;
                    const isPass = gVal && parseFloat(gVal.grade) <= 3.0;
                    const status = hasGrade ? (isPass ? gVal.grade + ' - Passed' : gVal.grade + ' - Failed') : (isCurrent ? 'Pending' : 'Not Taken');
                    const statusColor = hasGrade ? (isPass ? '#27ae60' : '#c62828') : (isCurrent ? '#e67e22' : '#999');

                    html += '<div class="curri-subj">';
                    html += '<div class="curri-subj-left">';
                    html += '<strong>' + s.code + '</strong>';
                    html += '<div class="subj-meta">' + s.units + ' units &middot; ' + s.type + '</div>';
                    html += '<div class="subj-name">' + s.name + '</div>';
                    html += '<div class="subj-prereq">Prerequisites: ' + s.prereq + '</div>';
                    if (hasGrade) {
                        const g = gradeData.grades.find(g => g.subject === s.code);
                        html += '<div class="subj-term" style="color:#888;">' + (g ? g.school_year + ' &middot; ' + g.semester : '') + '</div>';
                    } else if (isCurrent) {
                        html += '<div class="subj-term" style="color:#27ae60;">Active Term</div>';
                    } else {
                        html += '<div class="subj-term" style="color:#ccc;">-</div>';
                    }
                    html += '</div>';
                    html += '<span class="curri-status ' + (hasGrade ? (isPass ? 'passed' : 'failed') : (isCurrent ? 'pending' : 'not-taken')) + '">' + status + '</span>';
                    html += '</div>';
                });

                html += '</div>';
            });
        });

        div.innerHTML = html;
    }).catch(() => {
        div.innerHTML = '<p class="no-data">Could not load curriculum.</p>';
    });
}

function loadDashboard() {
    const div = document.getElementById('dashboard-overview');
    document.getElementById('dashboard-greeting').textContent = '';
    div.innerHTML = '<p class="no-data">Loading...</p>';
    const sid = currentUser.student_id;
    const name = currentUser.full_name;
    Promise.all([
        apiFetch('/api/profile'),
        apiFetch('/api/schedule/' + sid),
        apiFetch('/api/my-grades')
    ]).then(([prof, sched, grades]) => {
        const u = prof.user || {};
        const schedList = sched.schedule || [];
        const gradeList = grades.grades || [];
        const course = u.course_code || currentUser.course_code || '';
        const yearLevel = u.year_level || '1st Year';
        const today = new Date().toLocaleDateString('en-PH', { weekday: 'long' });

        // Build curriculum lookup
        let progData;
        if (curricula[course]) progData = curricula[course];
        else if (otherPrograms[course]) {
            progData = { name: otherPrograms[course].name, years: {} };
            Object.keys(otherPrograms[course].subs).forEach(year => {
                progData.years[year] = { trimesters: {} };
                Object.keys(otherPrograms[course].subs[year]).forEach(tri => {
                    progData.years[year].trimesters[tri] = otherPrograms[course].subs[year][tri].map(s => {
                        const parts = s.split(' - ');
                        const code = parts[0].split(' ').slice(0, 2).join('');
                        return { code: code || parts[0], units: 3, type: 'lecture', name: parts[1] || parts[0], prereq: 'None' };
                    });
                });
            });
        }

        const month = new Date().getMonth();
        const triIdx = (month >= 5 && month <= 8) ? 0 : (month >= 9 || month <= 0 ? 1 : 2);
        const triNames = ['1st Trimester', '2nd Trimester', '3rd Trimester'];
        const yearNames = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        const currentTri = triNames[triIdx];
        const currentYear = yearNames[yearNames.indexOf(yearLevel) >= 0 ? yearNames.indexOf(yearLevel) : 0];
        let currentSubjects = [];
        if (progData && progData.years && progData.years[currentYear] && progData.years[currentYear].trimesters) {
            currentSubjects = progData.years[currentYear].trimesters[currentTri] || [];
        }

        const roomsArr = ['201', '202', '203', '204', '205', '206', '301', '302', '303', '304', '305', '306'];
        const dayPairs = [['Monday','Wednesday'],['Tuesday','Thursday'],['Wednesday','Friday'],['Monday','Thursday'],['Tuesday','Friday'],['Monday','Wednesday']];
        const timeDefs = [
            { start: '7:00 AM', end: '9:00 AM' },
            { start: '9:00 AM', end: '11:00 AM' },
            { start: '11:00 AM', end: '1:00 PM' },
            { start: '1:00 PM', end: '3:00 PM' },
            { start: '3:00 PM', end: '5:00 PM' },
            { start: '5:00 PM', end: '7:00 PM' }
        ];

        // Build today's entries from curriculum
        let todayEntries = [];
        currentSubjects.forEach((cs, i) => {
            const se = schedList[i] || null;
            const isPE = cs.code.startsWith('OLPHYE') || cs.code.startsWith('OLNSTP');
            const room = cs.code.startsWith('OLPHYE') ? 'GYM' : (se ? se.room : 'B.' + roomsArr[i % roomsArr.length]);
            const pair = dayPairs[i % dayPairs.length];
            const t = timeDefs[i % timeDefs.length];
            const daysToAssign = isPE ? [pair[0]] : pair;
            daysToAssign.forEach(d => {
                if (d === today) {
                    todayEntries.push({ time: t.start + ' - ' + t.end, code: cs.code, room });
                }
            });
        });

        let html = '<div class="dash-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px;margin-bottom:25px;">';
        html += '<div class="dash-card" style="padding:20px;background:linear-gradient(135deg, #4f46e5, #7c6ff7);border-radius:var(--radius);color:white;box-shadow:0 4px 12px rgba(79,70,229,0.3);display:flex;align-items:center;gap:15px;"><i class="fas fa-graduation-cap" style="font-size:32px;opacity:0.9;"></i><div><h4 style="margin:0 0 3px;font-size:13px;opacity:0.9;">Program</h4><p style="margin:0;font-size:20px;font-weight:600;">' + (course || 'N/A') + '</p></div></div>';
        html += '<div class="dash-card" style="padding:20px;background:linear-gradient(135deg, #14b8a6, #2dd4bf);border-radius:var(--radius);color:white;box-shadow:0 4px 12px rgba(20,184,166,0.3);display:flex;align-items:center;gap:15px;"><i class="fas fa-layer-group" style="font-size:32px;opacity:0.9;"></i><div><h4 style="margin:0 0 3px;font-size:13px;opacity:0.9;">Year Level</h4><p style="margin:0;font-size:20px;font-weight:600;">' + (yearLevel || '1st Year') + '</p></div></div>';
        html += '<div class="dash-card" style="padding:20px;background:linear-gradient(135deg, #f97316, #fb923c);border-radius:var(--radius);color:white;box-shadow:0 4px 12px rgba(249,115,22,0.3);display:flex;align-items:center;gap:15px;"><i class="fas fa-book-open" style="font-size:32px;opacity:0.9;"></i><div><h4 style="margin:0 0 3px;font-size:13px;opacity:0.9;">Subjects</h4><p style="margin:0;font-size:20px;font-weight:600;">' + currentSubjects.length + '</p></div></div>';
        html += '<div class="dash-card" style="padding:20px;background:linear-gradient(135deg, #22c55e, #4ade80);border-radius:var(--radius);color:white;box-shadow:0 4px 12px rgba(34,197,94,0.3);display:flex;align-items:center;gap:15px;"><i class="fas fa-chart-line" style="font-size:32px;opacity:0.9;"></i><div><h4 style="margin:0 0 3px;font-size:13px;opacity:0.9;">GWA</h4><p style="margin:0;font-size:20px;font-weight:600;">' + (gradeList.length > 0 ? (gradeList.reduce((sum, g) => sum + parseFloat(g.grade), 0) / gradeList.length).toFixed(2) : 'N/A') + '</p></div></div>';
        html += '</div>';
        html += '<div style="background:#f8f9fa;border-radius:var(--radius);padding:20px;margin-bottom:20px;border:2px solid var(--primary);box-shadow:0 0 10px rgba(27,54,93,0.15);">';
        html += '<h4 style="margin:0 0 10px;font-size:15px;"><i class="fas fa-calendar-day" style="color:var(--primary);margin-right:8px;"></i>Today\'s Classes (' + today + ')</h4>';
        if (todayEntries.length === 0) {
            html += '<p class="no-data" style="margin:0;">No classes today.</p>';
        } else {
            html += '<div style="overflow-x:auto;"><table class="timetable" style="margin:0;"><thead><tr><th>Time</th><th>Subject</th><th>Room</th></tr></thead><tbody>';
            todayEntries.forEach(e => {
                html += '<tr><td class="time-col">' + e.time + '</td><td class="sched-cell"><div class="sched-subject">' + e.code + '</div></td><td class="sched-cell">' + e.room + '</td></tr>';
            });
            html += '</tbody></table></div>';
        }
        html += '</div>';

        // Weekly schedule timetable
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const timeSlots = timeDefs.map(t => ({ start: t.start, end: t.end, byDay: {} }));
        timeSlots.forEach(slot => { days.forEach(d => { slot.byDay[d] = null; }); });
        currentSubjects.forEach((cs, i) => {
            const si = i % timeSlots.length;
            const se = schedList[i] || null;
            const gradeObj = gradeList.find(g => g.subject === cs.code);
            const hasGrade = !!gradeObj;
            const gradeVal = gradeObj ? gradeObj.grade : null;
            const isPE = cs.code.startsWith('OLPHYE') || cs.code.startsWith('OLNSTP');
            const room = cs.code.startsWith('OLPHYE') ? 'GYM' : (se ? se.room : 'B.' + roomsArr[i % roomsArr.length]);
            const pair = dayPairs[i % dayPairs.length];
            const daysToAssign = isPE ? [pair[0]] : pair;
            daysToAssign.forEach(d => {
                if (!timeSlots[si].byDay[d]) {
                    timeSlots[si].byDay[d] = { code: cs.code, room, hasGrade, gradeVal };
                }
            });
            if (se && !daysToAssign.includes(se.day) && !timeSlots[si].byDay[se.day]) {
                timeSlots[si].byDay[se.day] = { code: cs.code, room, hasGrade, gradeVal };
            }
        });

        html += '<div style="background:#f8f9fa;border-radius:var(--radius);padding:20px;">';
        html += '<h4 style="margin:0 0 10px;font-size:15px;"><i class="fas fa-calendar-week" style="color:var(--primary);margin-right:8px;"></i>Weekly Schedule</h4>';
        html += '<div style="overflow-x:auto;"><table class="timetable" style="margin:0;"><thead><tr><th>Time</th>';
        days.forEach(d => { html += '<th>' + d + '</th>'; });
        html += '</tr></thead><tbody>';
        timeSlots.forEach(slot => {
            html += '<tr><td class="time-col">' + slot.start + ' - ' + slot.end + '</td>';
            days.forEach(d => {
                const cell = slot.byDay[d];
                if (cell) {
                    html += '<td class="sched-cell"><div class="sched-subject">' + cell.code + '</div><div class="sched-room">' + cell.room + '</div></td>';
                } else {
                    html += '<td class="sched-cell vacant"></td>';
                }
            });
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        html += '</div>';
        div.innerHTML = html;
    }).catch(() => { div.innerHTML = '<p class="no-data">Could not load dashboard.</p>'; });
}

function loadNotifications() {
    const div = document.getElementById('notifications-display');
    div.innerHTML = '<p class="no-data">Loading...</p>';
    const sid = currentUser.student_id;
    Promise.all([
        apiFetch('/api/schedule/' + sid)
    ]).then(([sched]) => {
        const schedList = sched.schedule || [];
        const today = new Date();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = dayNames[today.getDay()];
        const tomorrowName = dayNames[(today.getDay() + 1) % 7];
        const todayClasses = schedList.filter(s => s.day === todayName);
        const tomorrowClasses = schedList.filter(s => s.day === tomorrowName);
        let html = '';
        if (todayClasses.length > 0) {
            html += '<div style="background:#e8f5e9;border-radius:var(--radius);padding:16px;margin-bottom:15px;border-left:4px solid #27ae60;">';
            html += '<h4 style="margin:0 0 8px;font-size:14px;"><i class="fas fa-check-circle" style="color:#27ae60;margin-right:8px;"></i>Today\'s Schedule</h4>';
            todayClasses.forEach(s => { html += '<p style="margin:3px 0;font-size:13px;">&#8226; ' + s.subject + ' (' + s.time_start + ' - ' + s.time_end + ') - ' + s.room + '</p>'; });
            html += '</div>';
        }
        if (tomorrowClasses.length > 0) {
            html += '<div style="background:#fff3e0;border-radius:var(--radius);padding:16px;margin-bottom:15px;border-left:4px solid #e67e22;">';
            html += '<h4 style="margin:0 0 8px;font-size:14px;"><i class="fas fa-clock" style="color:#e67e22;margin-right:8px;"></i>Upcoming Tomorrow (' + tomorrowName + ')</h4>';
            tomorrowClasses.forEach(s => { html += '<p style="margin:3px 0;font-size:13px;">&#8226; ' + s.subject + ' (' + s.time_start + ' - ' + s.time_end + ') - ' + s.room + '</p>'; });
            html += '</div>';
        }
        if (schedList.length === 0) {
            html += '<div style="background:#f8f9fa;border-radius:var(--radius);padding:20px;text-align:center;"><p class="no-data" style="margin:0;">No schedule notifications available.</p></div>';
        }
        html += '<div style="background:#e8edf3;border-radius:var(--radius);padding:16px;margin-top:20px;">';
        html += '<h4 style="margin:0 0 8px;font-size:14px;"><i class="fas fa-bullhorn" style="color:var(--primary);margin-right:8px;"></i>Announcements</h4>';
        html += '<p style="margin:3px 0;font-size:13px;">&#8226; Enrollment for next semester opens soon.</p>';
        html += '<p style="margin:3px 0;font-size:13px;">&#8226; Please check your schedule regularly for updates.</p>';
        html += '<p style="margin:3px 0;font-size:13px;">&#8226; Contact the registrar for any concerns.</p>';
        html += '</div>';
        div.innerHTML = html;
    }).catch(() => { div.innerHTML = '<p class="no-data">Could not load notifications.</p>'; });
}

function generateReport() {
    const div = document.getElementById('report-result');
    div.innerHTML = '<p class="no-data">Loading...</p>';
    Promise.all([
        apiFetch('/api/generate-report', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ student_id: currentUser.student_id })
        }),
        apiFetch('/api/my-grades'),
        apiFetch('/api/fees/' + (currentUser.course_code || 'BSIT'))
    ]).then(([data, gradesData, feeData]) => {
        if (!data.success) { div.innerHTML = '<p class="no-data">Could not load registration data.</p>'; return; }
        const d = data.report_data || data;
        const s = d.student || {};
        const schedules = d.schedules || [];
        const gradeList = (gradesData.grades || []).map(g => g.subject);
        const fees = feeData.fees || {};
        const today = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
        const course = s.course_code || currentUser.course_code || '';
        const yearLevel = s.year_level || currentUser.year_level || '1st Year';

        // Build curriculum lookup
        let progData;
        if (curricula[course]) progData = curricula[course];
        else if (otherPrograms[course]) {
            progData = { name: otherPrograms[course].name, years: {} };
            Object.keys(otherPrograms[course].subs).forEach(year => {
                progData.years[year] = { trimesters: {} };
                Object.keys(otherPrograms[course].subs[year]).forEach(tri => {
                    progData.years[year].trimesters[tri] = otherPrograms[course].subs[year][tri].map(s => {
                        const parts = s.split(' - ');
                        const code = parts[0].split(' ').slice(0, 2).join('');
                        return { code: code || parts[0], units: 3, name: parts[1] || parts[0] };
                    });
                });
            });
        }

        // Determine current trimester
        const month = new Date().getMonth();
        const triIdx = (month >= 5 && month <= 8) ? 0 : (month >= 9 || month <= 0 ? 1 : 2);
        const triNames = ['1st Trimester', '2nd Trimester', '3rd Trimester'];
        const yearNames = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        const currentTri = triNames[triIdx];
        const currentYear = yearNames[yearNames.indexOf(yearLevel) >= 0 ? yearNames.indexOf(yearLevel) : 0];
        const currentSubjects = (progData && progData.years && progData.years[currentYear] && progData.years[currentYear].trimesters) ? (progData.years[currentYear].trimesters[currentTri] || []) : [];

        // Build timetable grid
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const timeDefs = [
            { start: '7:00 AM', end: '9:00 AM' },
            { start: '9:00 AM', end: '11:00 AM' },
            { start: '11:00 AM', end: '1:00 PM' },
            { start: '1:00 PM', end: '3:00 PM' },
            { start: '3:00 PM', end: '5:00 PM' },
            { start: '5:00 PM', end: '7:00 PM' }
        ];
        const timeSlots = timeDefs.map(t => ({ start: t.start, end: t.end, byDay: {} }));
        timeSlots.forEach(slot => { days.forEach(d => { slot.byDay[d] = null; }); });
        const roomsArr = ['201', '202', '203', '204', '205', '206', '301', '302', '303', '304', '305', '306'];
        const dayPairs = [['Monday','Wednesday'],['Tuesday','Thursday'],['Wednesday','Friday'],['Monday','Thursday'],['Tuesday','Friday'],['Monday','Wednesday']];
        currentSubjects.forEach((cs, i) => {
            const si = i % timeSlots.length;
            const se = schedules[i] || null;
            const isPE = cs.code.startsWith('OLPHYE') || cs.code.startsWith('OLNSTP');
            const room = cs.code.startsWith('OLPHYE') ? 'GYM' : (se ? se.room : 'B.' + roomsArr[i % roomsArr.length]);
            const pair = dayPairs[i % dayPairs.length];
            const daysToAssign = isPE ? [pair[0]] : pair;
            daysToAssign.forEach(d => {
                if (!timeSlots[si].byDay[d]) {
                    timeSlots[si].byDay[d] = { code: cs.code, room };
                }
            });
            if (se && !daysToAssign.includes(se.day) && !timeSlots[si].byDay[se.day]) {
                timeSlots[si].byDay[se.day] = { code: cs.code, room };
            }
        });

        let html = '<div class="reg-form">';
        html += '<div class="reg-header"><h2>Official Registration Form</h2><p>Aguinaldo Polytechnic Institute</p><p class="reg-sy">School Year ' + (new Date().getFullYear()) + ' - ' + (new Date().getFullYear() + 1) + '</p></div>';
        html += '<div class="reg-body">';
        html += '<div class="reg-section"><h4><i class="fas fa-user"></i> Student Information</h4><div class="reg-grid">';
        html += '<div class="reg-field"><label>Student ID</label><span>' + (s.student_id || 'N/A') + '</span></div>';
        html += '<div class="reg-field"><label>Full Name</label><span>' + ([s.first_name, s.middle_name, s.last_name, s.suffix].filter(Boolean).join(' ') || 'N/A') + '</span></div>';
        html += '<div class="reg-field"><label>Email</label><span>' + (s.email || 'N/A') + '</span></div>';
        html += '<div class="reg-field"><label>Program</label><span>' + (course || 'N/A') + '</span></div>';
        html += '<div class="reg-field"><label>Section</label><span>' + (sectionMap[course] || 'N/A') + '</span></div>';
        html += '<div class="reg-field"><label>Year Level</label><span>' + yearLevel + '</span></div>';
        html += '<div class="reg-field"><label>Status</label><span>' + (s.status || 'Enrolled') + '</span></div>';
        html += '</div></div>';
        html += '<div class="reg-section"><h4><i class="fas fa-calendar-alt"></i> Class Schedule (' + currentYear + ' - ' + currentTri + ')</h4>';
        html += '<div style="overflow:visible;"><table class="timetable" style="font-size:9px;min-width:0;width:100%;table-layout:fixed;"><thead><tr><th style="padding:2px 4px;font-size:10px;width:16%;">Time</th>';
        days.forEach(d => { html += '<th style="padding:2px 4px;font-size:10px;">' + d.substring(0,3) + '</th>'; });
        html += '</tr></thead><tbody>';
        timeSlots.forEach(slot => {
            html += '<tr><td style="padding:2px 4px;font-size:8px;white-space:nowrap;">' + slot.start + ' - ' + slot.end + '</td>';
            days.forEach(d => {
                const cell = slot.byDay[d];
                if (cell) {
                    html += '<td style="padding:2px 4px;text-align:center;border:1px solid #ddd;font-size:8px;"><div style="font-weight:600;">' + cell.code + '</div><div style="color:#888;font-size:7px;">' + cell.room + '</div></td>';
                } else {
                    html += '<td style="padding:2px 4px;text-align:center;border:1px solid #ddd;"></td>';
                }
            });
            html += '</tr>';
        });
        html += '</tbody></table></div></div>';
        // Tuition & Fees
        const feeItems = [
            { label: 'Tuition Fee', value: fees.tuition || 0 },
            { label: 'Computer Lab Fee', value: fees.comlab || 0 },
            { label: 'Portal Fee', value: fees.portal || 0 },
            { label: 'Mailing Fee', value: fees.mailing || 0 },
            { label: 'LMS Fee', value: fees.lms || 0 },
            { label: 'Other Fees', value: fees.other || 0 }
        ];
        const total = feeItems.reduce((sum, f) => sum + f.value, 0);
        html += '<div class="reg-section"><h4><i class="fas fa-money-bill"></i> Tuition & Fees</h4>';
        html += '<table class="schedule-table reg-table" style="width:100%;"><thead><tr><th>Description</th><th style="text-align:right;">Amount</th></tr></thead><tbody>';
        feeItems.forEach(f => {
            html += '<tr><td>' + f.label + '</td><td style="text-align:right;font-weight:600;">₱' + f.value.toLocaleString() + '.00</td></tr>';
        });
        html += '<tr style="background:#e8edf3;font-weight:700;"><td>TOTAL</td><td style="text-align:right;">₱' + total.toLocaleString() + '.00</td></tr>';
        html += '</tbody></table></div>';
        html += '<div class="reg-footer"><p><strong>Date Registered:</strong> ' + today + '</p><p><strong>Status:</strong> <span style="color:var(--success);font-weight:600;">OFFICIALLY ENROLLED</span></p></div>';
        html += '<div class="reg-stamp"><p>This serves as an official registration document.</p><p>Aguinaldo Polytechnic Institute • Registrar\'s Office</p></div>';
        html += '</div></div>';
        div.innerHTML = html;
    }).catch(() => { div.innerHTML = '<p class="no-data">Connection error. Could not load registration.</p>'; });
}

function downloadPDF() {
    const el = document.querySelector('.reg-form');
    if (!el) { showNotification('Please wait for the registration form to load.', 'error'); return; }
    const opt = { margin: [0.2, 0.25, 0.3, 0.25], filename: 'ORF-' + (currentUser.student_id || 'registration') + '.pdf', 
        image: { type: 'jpeg', quality: 0.95 }, html2canvas: { scale: 2, letterRendering: true, useCORS: true }, 
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(el).save();
}

function switchDashboardTab(tab, btn) {
    document.querySelectorAll('#student-dashboard .dashboard-tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.querySelectorAll('#student-dashboard .side-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    if (tab === 'report') generateReport();
    const iconMap = { 'dashboard': 'fa-th-large', 'profile': 'fa-id-card', 'schedule': 'fa-calendar-alt', 'curriculum': 'fa-book-open', 'report': 'fa-file-alt', 'notifications': 'fa-bell' };
    const labelMap = { 'dashboard': 'Dashboard', 'profile': 'Student Profile', 'schedule': 'Weekly Schedule', 'curriculum': 'Curriculum Prospectus', 'report': 'Academic Registration', 'notifications': 'Notifications' };
    const activeHeader = document.querySelector('#student-dashboard .dash-active-header i');
    const activeTitle = document.getElementById('dash-active-title');
    if (activeHeader) activeHeader.className = 'fas ' + (iconMap[tab] || 'fa-th-large');
    if (activeTitle) activeTitle.textContent = labelMap[tab] || 'Dashboard';
}

function showOperatorDashboard() {
    showSection('operator-dashboard');
    document.getElementById('main-nav').style.display = 'none';
    document.getElementById('operator-dashboard-info').textContent = 'Welcome, ' + currentUser.full_name;
    const footer = document.querySelector('.footer');
    if (footer) footer.style.display = 'none';
    loadAllSections();
}

function switchOperatorTab(tab, btn) {
    document.querySelectorAll('#operator-dashboard .dashboard-tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('op-' + tab).classList.add('active');
    document.querySelectorAll('#operator-dashboard .side-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    if (tab === 'students') {
        document.getElementById('op-section-students-view').style.display = 'none';
        document.getElementById('op-sections-view').style.display = 'block';
        loadAllSections();
    }
    if (tab === 'search') { document.getElementById('op-search-input').value = ''; operatorSearch(); }
    const iconMap = { 'search': 'fa-search', 'students': 'fa-layer-group', 'grades': 'fa-star' };
    const labelMap = { 'search': 'Search Students', 'students': 'All Sections', 'grades': 'Manage Grades' };
    const activeHeader = document.querySelector('#operator-dashboard .dash-active-header i');
    const activeTitle = document.getElementById('op-active-title');
    if (activeHeader) activeHeader.className = 'fas ' + (iconMap[tab] || 'fa-search');
    if (activeTitle) activeTitle.textContent = labelMap[tab] || 'Operator Dashboard';
}

function operatorSearchSuggest() {
    const q = document.getElementById('op-search-input').value.trim();
    const suggestDiv = document.getElementById('search-suggestions');
    if (q.length < 2) { suggestDiv.classList.remove('show'); return; }
    apiFetch('/api/operator/search?type=all&q=' + encodeURIComponent(q)).then(data => {
        if (!data.success || !data.students || data.students.length === 0) { suggestDiv.classList.remove('show'); return; }
        suggestDiv.innerHTML = data.students.slice(0, 5).map(s =>
            '<div class="search-suggestion-item" onclick="selectSuggestion(\'' + s.student_id + '\')">' + s.student_id + ' - ' + [s.first_name, s.middle_name, s.last_name, s.suffix].filter(Boolean).join(' ') + '</div>'
        ).join('');
        suggestDiv.classList.add('show');
    }).catch(() => { suggestDiv.classList.remove('show'); });
}

function selectSuggestion(id) {
    document.getElementById('op-search-input').value = id;
    document.getElementById('search-suggestions').classList.remove('show');
    operatorSearch();
}

let searchDebounce = null;
function debouncedSearch() {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(operatorSearch, 300);
}

function operatorSearch() {
    const q = document.getElementById('op-search-input').value.trim();
    const type = document.getElementById('op-search-type').value;
    const div = document.getElementById('op-search-results');
    document.getElementById('search-suggestions').classList.remove('show');
    if (q.length < 1) {
        div.innerHTML = '<p class="no-data">Loading all students...</p>';
        apiFetch('/api/operator/students').then(data => {
            if (!data.success || !data.students) { div.innerHTML = '<p class="no-data">No students found.</p>'; return; }
            if (data.students.length === 0) { div.innerHTML = '<p class="no-data">No students enrolled yet.</p>'; return; }
            div.innerHTML = '';
            data.students.forEach(s => {
                const name = [s.first_name, s.middle_name, s.last_name, s.suffix].filter(Boolean).join(' ');
                const card = document.createElement('div');
                card.className = 'search-result-card';
                card.innerHTML = '<h4>' + s.student_id + ' - ' + name + '</h4><p>Program: ' + (s.course_code || 'N/A') + ' | Section: ' + (sectionMap[s.course_code] || 'N/A') + ' | Status: ' + (s.status || 'N/A') + ' | Email: ' + s.email + '</p>' +
                '<div class="card-actions" style="margin-top:10px;display:flex;gap:8px;">' +
                '<button class="btn-primary" onclick="openGradeModal(\'' + s.student_id + '\',\'' + name.replace(/'/g, "\\'") + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-star"></i> Grades</button>' +
                '<button class="btn-secondary" onclick="openEditInfoModal(\'' + s.student_id + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-edit"></i> Edit Info</button>' +
                '<button class="btn-danger" onclick="dropStudent(\'' + s.student_id + '\',\'' + name.replace(/'/g, "\\'") + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-user-slash"></i> Drop</button>' +
                '</div>';
            div.appendChild(card);
        });
    });
    return;
}
div.innerHTML = '<p class="no-data">Searching...</p>';
apiFetch('/api/operator/search?type=' + type + '&q=' + encodeURIComponent(q)).then(data => {
    if (!data.success || !data.students) { div.innerHTML = '<p class="no-data">Search failed.</p>'; return; }
    if (data.students.length === 0) { div.innerHTML = '<p class="no-data">No students found.</p>'; return; }
    div.innerHTML = '';
    data.students.forEach(s => {
        const name = [s.first_name, s.middle_name, s.last_name, s.suffix].filter(Boolean).join(' ');
        const card = document.createElement('div');
        card.className = 'search-result-card';
        card.innerHTML = '<h4>' + s.student_id + ' - ' + name + '</h4><p>Program: ' + (s.course_code || 'N/A') + ' | Section: ' + (sectionMap[s.course_code] || 'N/A') + ' | Status: ' + (s.status || 'N/A') + ' | Email: ' + s.email + '</p>' +
            '<div class="card-actions" style="margin-top:10px;display:flex;gap:8px;">' +
            '<button class="btn-primary" onclick="openGradeModal(\'' + s.student_id + '\',\'' + name.replace(/'/g, "\\'") + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-star"></i> Grades</button>' +
            '<button class="btn-secondary" onclick="openEditInfoModal(\'' + s.student_id + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-edit"></i> Edit Info</button>' +
            '<button class="btn-danger" onclick="dropStudent(\'' + s.student_id + '\',\'' + name.replace(/'/g, "\\'") + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-user-slash"></i> Drop</button>' +
            '</div>';
        div.appendChild(card);
    });
    });
}

const sectionInfo = [
    { code: 'BSA', name: 'BS in Accountancy', section: 'M001' },
    { code: 'BSBA', name: 'BS in Business Administration', section: 'M002' },
    { code: 'BSCS', name: 'BS in Computer Science', section: 'M003' },
    { code: 'BSIT', name: 'BS in Information Technology', section: 'M004' },
    { code: 'BSIS', name: 'BS in Information Systems', section: 'M005' },
    { code: 'BELEMed', name: 'Bachelor of Elementary Education', section: 'M006' },
    { code: 'BSED', name: 'BS in Secondary Education', section: 'M007' },
    { code: 'BSC', name: 'BS in Criminology', section: 'M008' },
    { code: 'BSHM', name: 'BS in Hospitality Management', section: 'M009' },
    { code: 'BSTM', name: 'BS in Tourism Management', section: 'M010' },
    { code: 'BSCpE', name: 'BS in Computer Engineering', section: 'M011' },
    { code: 'BPA', name: 'Bachelor in Public Administration', section: 'M012' }
];

function loadAllSections() {
    const yearFilter = document.getElementById('op-year-filter').value;
    const div = document.getElementById('op-all-sections-list');
    div.innerHTML = '<p class="no-data">Loading...</p>';
    apiFetch('/api/operator/students').then(data => {
        if (!data.success || !data.students) { div.innerHTML = '<p class="no-data">No data.</p>'; return; }
        div.innerHTML = '';
        sectionInfo.forEach(info => {
            const count = data.students.filter(s => s.course_code === info.code && (s.year_level || '1st Year') === yearFilter).length;
            const card = document.createElement('div');
            card.className = 'search-result-card';
            card.style.cursor = 'pointer';
            card.onclick = function() { showSectionStudents(info.code); };
            card.innerHTML = '<h4>' + info.section + ' - ' + info.code + '</h4><p>' + info.name + ' | <strong>' + count + ' student(s)</strong> in ' + yearFilter + '</p>';
            div.appendChild(card);
        });
    });
}

function showSectionStudents(courseCode) {
    const yearFilter = document.getElementById('op-year-filter').value;
    const info = sectionInfo.find(s => s.code === courseCode);
    document.getElementById('op-sections-view').style.display = 'none';
    document.getElementById('op-section-students-view').style.display = 'block';
    document.getElementById('op-section-title').textContent = info.section + ' - ' + info.code + ' Students (' + yearFilter + ')';
    dropTargetSection = courseCode;
    const div = document.getElementById('op-section-students-list');
    div.innerHTML = '<p class="no-data">Loading...</p>';
    apiFetch('/api/operator/students').then(data => {
        if (!data.success || !data.students) { div.innerHTML = '<p class="no-data">No students found.</p>'; return; }
        const filtered = data.students.filter(s => s.course_code === courseCode && (s.year_level || '1st Year') === yearFilter);
        if (filtered.length === 0) { div.innerHTML = '<p class="no-data">No students enrolled in this section for ' + yearFilter + '.</p>'; return; }
        div.innerHTML = '';
        filtered.forEach(s => {
            const card = document.createElement('div');
            card.className = 'search-result-card';
            card.innerHTML = '<h4>' + s.student_id + ' - ' + [s.first_name, s.middle_name, s.last_name, s.suffix].filter(Boolean).join(' ') + '</h4><p>' + (s.year_level || '1st Year') + ' &middot; 1st Semester &middot; Status: ' + (s.status || 'N/A') + ' | Email: ' + s.email + '</p>' +
                '<div class="card-actions" style="margin-top:10px;display:flex;gap:8px;">' +
                '<button class="btn-primary" onclick="openGradeModal(\'' + s.student_id + '\',\'' + [s.first_name, s.middle_name, s.last_name, s.suffix].filter(Boolean).join(' ') + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-star"></i> Grades</button>' +
                '<button class="btn-secondary" onclick="openEditInfoModal(\'' + s.student_id + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-edit"></i> Edit Info</button>' +
                '<button class="btn-danger" onclick="dropStudent(\'' + s.student_id + '\',\'' + [s.first_name, s.middle_name, s.last_name, s.suffix].filter(Boolean).join(' ') + '\',\'' + courseCode + '\')" style="padding:6px 14px;font-size:13px;"><i class="fas fa-user-slash"></i> Drop</button>' +
                '</div>';
            div.appendChild(card);
        });
    });
}

function backToSections() {
    document.getElementById('op-section-students-view').style.display = 'none';
    document.getElementById('op-sections-view').style.display = 'block';
    loadAllSections();
}

function opAddGrade(event) {
    event.preventDefault();
    const student_id = document.getElementById('op-grade-student-id').value.trim();
    const subject = document.getElementById('op-grade-subject').value.trim();
    const grade = document.getElementById('op-grade-value').value;
    const semester = document.getElementById('op-grade-semester').value;
    const school_year = document.getElementById('op-grade-school-year').value.trim();
    if (!student_id || !subject || !grade || !semester || !school_year) { showNotification('All fields are required.', 'error'); return false; }
    apiFetch('/api/operator/grades', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ student_id, subject, grade: parseFloat(grade), semester, school_year })
    }).then(data => {
        if (data.success) { showNotification('Grade added successfully!', 'success'); document.getElementById('op-add-grade-form').reset(); }
        else { showNotification(data.message || 'Failed to add grade.', 'error'); }
    }).catch(() => showNotification('Connection error.', 'error'));
    return false;
}

function opViewGrades() {
    const studentId = document.getElementById('op-view-grade-id').value.trim();
    const div = document.getElementById('op-grade-results');
    if (!studentId) { div.innerHTML = '<p class="no-data">Enter a Student ID.</p>'; return; }
    div.innerHTML = '<p class="no-data">Loading...</p>';
    apiFetch('/api/operator/grades/' + studentId).then(data => {
        if (!data.success || !data.grades || data.grades.length === 0) { div.innerHTML = '<p class="no-data">No grades found for ' + studentId + '.</p>'; return; }
        let html = '<table class="grades-table"><thead><tr><th>Subject</th><th>Grade</th><th>Semester</th><th>School Year</th><th>Actions</th></tr></thead><tbody>';
        data.grades.forEach(g => {
            const pass = parseFloat(g.grade) <= 3.0;
            html += '<tr id="grade-row-' + g.id + '"><td>' + g.subject + '</td><td class="' + (pass ? 'grade-pass' : 'grade-fail') + '">' + g.grade + '</td><td>' + g.semester + '</td><td>' + g.school_year + '</td>' +
                '<td><button class="btn-primary" onclick="opEditGrade(' + g.id + ',\'' + studentId + '\')" style="padding:3px 8px;font-size:11px;margin-right:4px;"><i class="fas fa-edit"></i></button>' +
                '<button class="btn-danger" onclick="opDeleteGrade(' + g.id + ',\'' + studentId + '\')" style="padding:3px 8px;font-size:11px;"><i class="fas fa-trash"></i></button></td></tr>';
        });
        html += '</tbody></table>';
        div.innerHTML = html;
    });
}

function opEditGrade(id, studentId) {
    const row = document.getElementById('grade-row-' + id);
    const cells = row.querySelectorAll('td');
    const subject = cells[0].textContent;
    const grade = cells[1].textContent;
    const semester = cells[2].textContent;
    const schoolYear = cells[3].textContent;
    row.innerHTML = '<td><input type="text" id="edit-subject-' + id + '" value="' + subject + '" style="width:100%;padding:4px;border:1px solid #ccc;border-radius:4px;"></td>' +
        '<td><input type="number" id="edit-grade-' + id + '" value="' + grade + '" step="0.25" min="1.00" max="5.00" style="width:80px;padding:4px;border:1px solid #ccc;border-radius:4px;"></td>' +
        '<td><select id="edit-semester-' + id + '" style="padding:4px;border:1px solid #ccc;border-radius:4px;">' +
        '<option value="1st Semester"' + (semester === '1st Semester' ? ' selected' : '') + '>1st Semester</option>' +
        '<option value="2nd Semester"' + (semester === '2nd Semester' ? ' selected' : '') + '>2nd Semester</option>' +
        '<option value="3rd Semester"' + (semester === '3rd Semester' ? ' selected' : '') + '>3rd Semester</option>' +
        '</select></td>' +
        '<td><input type="text" id="edit-sy-' + id + '" value="' + schoolYear + '" style="width:120px;padding:4px;border:1px solid #ccc;border-radius:4px;"></td>' +
        '<td><button class="btn-primary" onclick="opSaveGrade(' + id + ',\'' + studentId + '\')" style="padding:3px 8px;font-size:11px;margin-right:4px;"><i class="fas fa-check"></i></button>' +
        '<button class="btn-secondary" onclick="opViewGradesById(\'' + studentId + '\')" style="padding:3px 8px;font-size:11px;"><i class="fas fa-times"></i></button></td>';
}

function opSaveGrade(id, studentId) {
    const subject = document.getElementById('edit-subject-' + id).value.trim();
    const grade = document.getElementById('edit-grade-' + id).value;
    const semester = document.getElementById('edit-semester-' + id).value;
    const school_year = document.getElementById('edit-sy-' + id).value.trim();
    if (!subject || !grade || !semester || !school_year) { showNotification('All fields required.', 'error'); return; }
    apiFetch('/api/operator/grades/' + id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, grade: parseFloat(grade), semester, school_year })
    }).then(data => {
        if (data.success) { opViewGradesById(studentId); }
        else { showNotification(data.message || 'Failed to update.', 'error'); }
    });
}

function opDeleteGrade(id, studentId) {
    if (!confirm('Delete this grade?')) return;
    apiFetch('/api/operator/grades/' + id, { method: 'DELETE' }).then(data => {
        if (data.success) { opViewGradesById(studentId); }
        else { showNotification(data.message || 'Failed to delete.', 'error'); }
    });
}

function opViewGradesById(studentId) {
    document.getElementById('op-view-grade-id').value = studentId;
    opViewGrades();
}

function openGradeModal(studentId, studentName) {
    document.getElementById('grade-modal').style.display = 'flex';
    document.getElementById('grade-modal-student').textContent = studentName + ' (' + studentId + ')';
    const body = document.getElementById('grade-modal-body');
    body.innerHTML = '<p class="no-data">Loading...</p>';
    Promise.all([
        apiFetch('/api/operator/students/' + studentId),
        apiFetch('/api/operator/grades/' + studentId)
    ]).then(([prof, gradesData]) => {
        const u = prof.user || {};
        const course = u.course_code || '';

        // Build curriculum lookup
        let progData;
        if (!course) { body.innerHTML = '<p class="no-data">Student has no program assigned.</p>'; return; }
        if (curricula[course]) progData = curricula[course];
        else if (otherPrograms[course]) {
            progData = { name: otherPrograms[course].name, years: {} };
            Object.keys(otherPrograms[course].subs).forEach(year => {
                progData.years[year] = { trimesters: {} };
                Object.keys(otherPrograms[course].subs[year]).forEach(tri => {
                    progData.years[year].trimesters[tri] = otherPrograms[course].subs[year][tri].map(s => {
                        const parts = s.split(' - ');
                        const code = parts[0].split(' ').slice(0, 2).join('');
                        return { code: code || parts[0], units: 3, name: parts[1] || parts[0] };
                    });
                });
            });
        } else { body.innerHTML = '<p class="no-data">Curriculum not found for this program.</p>'; return; }

        // Build grade lookup
        const gradeMap = {};
        (gradesData.grades || []).forEach(g => { gradeMap[g.subject] = g; });

        let html = '<div style="overflow-x:auto;"><table class="grades-table"><thead><tr><th>Subject</th><th>Grade</th><th>Actions</th></tr></thead><tbody>';
        const yearNames = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
        const triNames = ['1st Trimester', '2nd Trimester', '3rd Trimester'];
        yearNames.forEach(year => {
            if (!progData.years || !progData.years[year]) return;
            triNames.forEach(tri => {
                const subs = (progData.years[year].trimesters && progData.years[year].trimesters[tri]) || [];
                if (subs.length === 0) return;
                html += '<tr style="background:#e8edf3;font-weight:600;"><td colspan="3" style="padding:8px 12px;font-size:13px;">' + year + ' - ' + tri + '</td></tr>';
                subs.forEach(cs => {
                    const existing = gradeMap[cs.code];
                    if (existing) {
                        const pass = parseFloat(existing.grade) <= 3.0;
                        html += '<tr id="gmodal-row-' + existing.id + '"><td>' + cs.code + '</td><td class="' + (pass ? 'grade-pass' : 'grade-fail') + '">' + existing.grade + '</td>' +
                            '<td><button class="btn-primary" onclick="gmodalEdit(' + existing.id + ',\'' + studentId + '\')" style="padding:3px 8px;font-size:11px;margin-right:4px;"><i class="fas fa-edit"></i></button>' +
                            '<button class="btn-danger" onclick="gmodalDelete(' + existing.id + ',\'' + studentId + '\')" style="padding:3px 8px;font-size:11px;"><i class="fas fa-trash"></i></button></td></tr>';
                    } else {
                        html += '<tr><td>' + cs.code + '</td><td><input type="number" id="gnew-' + cs.code + '" placeholder="1.00-5.00" step="0.25" min="1.00" max="5.00" style="width:90px;padding:4px;border:1px solid #ccc;border-radius:4px;"></td>' +
                            '<td><button class="btn-success" onclick="gmodalAddGrade(\'' + studentId + '\',\'' + cs.code + '\')" style="padding:3px 10px;font-size:11px;"><i class="fas fa-check"></i></button></td></tr>';
                    }
                });
            });
        });
        html += '</tbody></table></div>';
        body.innerHTML = html;
    }).catch(() => { body.innerHTML = '<p class="no-data">Failed to load data.</p>'; });
}

function closeGradeModal() {
    document.getElementById('grade-modal').style.display = 'none';
}

let editInfoStudentId = '';

function openEditInfoModal(studentId) {
    editInfoStudentId = studentId;
    document.getElementById('edit-info-modal').style.display = 'flex';
    document.getElementById('edit-info-student-label').textContent = studentId;
    apiFetch('/api/operator/students/' + studentId).then(data => {
        const u = data.user || {};
        document.getElementById('edit-first-name').value = u.first_name || '';
        document.getElementById('edit-middle-name').value = u.middle_name || '';
        document.getElementById('edit-last-name').value = u.last_name || '';
        document.getElementById('edit-suffix').value = u.suffix || '';
        document.getElementById('edit-email').value = u.email || '';
        document.getElementById('edit-phone').value = u.phone || '';
        document.getElementById('edit-year-level').value = u.year_level || '1st Year';
        document.getElementById('edit-status').value = u.status || 'enrolled';
    }).catch(() => showNotification('Failed to load student info.', 'error'));
}

function closeEditInfoModal() {
    document.getElementById('edit-info-modal').style.display = 'none';
}

function saveEditInfo() {
    const first_name = document.getElementById('edit-first-name').value.trim();
    const last_name = document.getElementById('edit-last-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    if (!first_name || !last_name || !email) { showNotification('First Name, Last Name, and Email are required.', 'error'); return; }
    const data = {
        student_id: editInfoStudentId,
        first_name,
        middle_name: document.getElementById('edit-middle-name').value.trim(),
        last_name,
        suffix: document.getElementById('edit-suffix').value.trim(),
        email,
        phone: document.getElementById('edit-phone').value.trim(),
        year_level: document.getElementById('edit-year-level').value,
        status: document.getElementById('edit-status').value
    };
    apiFetch('/api/operator/students/' + editInfoStudentId + '/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.success) { showNotification('Student info updated.', 'success'); closeEditInfoModal(); loadAllSections(); }
        else { showNotification(res.message || 'Update failed.', 'error'); }
    }).catch(() => showNotification('Connection error.', 'error'));
}

function gmodalEdit(id, studentId) {
    const row = document.getElementById('gmodal-row-' + id);
    const cells = row.querySelectorAll('td');
    const subject = cells[0].textContent;
    const grade = cells[1].textContent;
    row.innerHTML = '<td>' + subject + '</td>' +
        '<td><input type="number" id="gm-edit-grade-' + id + '" value="' + grade + '" step="0.25" min="1.00" max="5.00" class="enroll-input" style="width:80px;"></td>' +
        '<td><button class="btn-primary" onclick="gmodalSave(' + id + ',\'' + studentId + '\')" style="padding:3px 8px;font-size:11px;margin-right:4px;"><i class="fas fa-check"></i></button>' +
        '<button class="btn-secondary" onclick="openGradeModal(\'' + studentId + '\',\'' + document.getElementById('grade-modal-student').textContent.split(' (')[0] + '\')" style="padding:3px 8px;font-size:11px;"><i class="fas fa-times"></i></button></td>';
}

function gmodalSave(id, studentId) {
    const grade = document.getElementById('gm-edit-grade-' + id).value;
    if (!grade) { showNotification('Enter a grade.', 'error'); return; }
    const row = document.getElementById('gmodal-row-' + id);
    const subject = row.querySelector('td:first-child').textContent;
    const month = new Date().getMonth();
    const cy = new Date().getFullYear();
    const triIdx = (month >= 5 && month <= 8) ? 0 : (month >= 9 || month <= 0 ? 1 : 2);
    const triNames = ['1st Trimester', '2nd Trimester', '3rd Trimester'];
    const semester = triNames[triIdx];
    const school_year = month >= 5 ? (cy + '-' + (cy + 1)) : ((cy - 1) + '-' + cy);
    apiFetch('/api/operator/grades/' + id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, grade: parseFloat(grade), semester, school_year })
    }).then(data => {
        if (data.success) { openGradeModal(studentId, document.getElementById('grade-modal-student').textContent.replace(/\(.*$/, '').trim()); }
        else { showNotification(data.message || 'Failed to update.', 'error'); }
    });
}

function gmodalDelete(id, studentId) {
    if (!confirm('Delete this grade?')) return;
    apiFetch('/api/operator/grades/' + id, { method: 'DELETE' }).then(data => {
        if (data.success) { openGradeModal(studentId, document.getElementById('grade-modal-student').textContent.replace(/\(.*$/, '').trim()); }
        else { showNotification(data.message || 'Failed to delete.', 'error'); }
    });
}

function gmodalAddGrade(studentId, code) {
    const grade = document.getElementById('gnew-' + code).value;
    if (!grade || grade < 1.00 || grade > 5.00) { showNotification('Enter a valid grade (1.00 - 5.00).', 'error'); return; }
    const month = new Date().getMonth();
    const cy = new Date().getFullYear();
    const triIdx = (month >= 5 && month <= 8) ? 0 : (month >= 9 || month <= 0 ? 1 : 2);
    const triNames = ['1st Trimester', '2nd Trimester', '3rd Trimester'];
    const semester = triNames[triIdx];
    const school_year = month >= 5 ? (cy + '-' + (cy + 1)) : ((cy - 1) + '-' + cy);
    apiFetch('/api/operator/grades', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, subject: code, grade: parseFloat(grade), semester, school_year })
    }).then(data => {
        if (data.success) { openGradeModal(studentId, document.getElementById('grade-modal-student').textContent.replace(/\(.*$/, '').trim()); }
        else { showNotification(data.message || 'Failed to add grade.', 'error'); }
    }).catch(() => showNotification('Connection error.', 'error'));
}

let dropTargetId = null;
let dropTargetSection = null;

function dropStudent(studentId, studentName, section) {
    dropTargetId = studentId;
    dropTargetSection = section || null;
    document.getElementById('drop-student-name').textContent = studentName;
    document.getElementById('drop-student-id-display').textContent = studentId;
    document.getElementById('drop-modal').style.display = 'flex';
}

function closeDropModal() {
    document.getElementById('drop-modal').style.display = 'none';
    dropTargetId = null;
    dropTargetSection = null;
}

function confirmDrop() {
    if (!dropTargetId) return;
    apiFetch('/api/operator/students/' + dropTargetId + '/drop', { method: 'PUT' }).then(data => {
        if (data.success) {
            showNotification('Student dropped successfully.', 'success');
            closeDropModal();
            if (dropTargetSection) {
                showSectionStudents(dropTargetSection);
            } else {
                loadAllSections();
            }
        } else {
            showNotification(data.message || 'Failed to drop student.', 'error');
        }
    }).catch(() => {
        showNotification('Connection error.', 'error');
        closeDropModal();
    });
}

function handleContact(event) {
    event.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !email || !subject || !message) { showNotification('All fields are required.', 'error'); return false; }
    fetch(API_BASE + '/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, subject, message })
    }).then(r => r.json()).then(data => {
        if (data.success) { showNotification('Message sent successfully!', 'success'); document.getElementById('contact-form').reset(); }
        else { showNotification(data.message || 'Failed to send.', 'error'); }
    }).catch(() => showNotification('Connection error.', 'error'));
    return false;
}

document.addEventListener('click', function(e) {
    const suggest = document.getElementById('search-suggestions');
    if (suggest && !e.target.closest('.search-bar')) suggest.classList.remove('show');
});

if (!checkAuth()) {
    showSection('home');
}

// ==================== AI CHAT ====================
let chatHistory = [];

function toggleChat() {
    const w = document.getElementById('chat-window');
    w.classList.toggle('chat-hidden');
    if (!w.classList.contains('chat-hidden')) {
        document.getElementById('chat-input').focus();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const msgs = document.getElementById('chat-messages');
    msgs.innerHTML += '<div class="chat-msg chat-user">' + escapeHtml(msg) + '</div>';
    msgs.innerHTML += '<div class="chat-typing">AI is thinking...</div>';
    msgs.scrollTop = msgs.scrollHeight;
    input.value = '';

    apiFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: chatHistory })
    }).then(data => {
        msgs.querySelector('.chat-typing')?.remove();
        if (data.success) {
            msgs.innerHTML += '<div class="chat-msg chat-bot">' + escapeHtml(data.reply) + '</div>';
            chatHistory.push({ role: 'user', text: msg });
            chatHistory.push({ role: 'assistant', text: data.reply });
        } else {
            msgs.innerHTML += '<div class="chat-msg chat-bot">' + escapeHtml(data.reply || 'Sorry, I had trouble responding.') + '</div>';
        }
        msgs.scrollTop = msgs.scrollHeight;
    }).catch(() => {
        msgs.querySelector('.chat-typing')?.remove();
        msgs.innerHTML += '<div class="chat-msg chat-bot">Connection error. Please try again.</div>';
        msgs.scrollTop = msgs.scrollHeight;
    });
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}

// === CAMPUS GALLERY ===
function switchGallery(tab, el) {
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const prefixes = { main: 'campus', library: 'library', science: 'scilab', computer: 'comlab' };
    const display = document.getElementById('gallery-display');
    let html = '';
    for (let i = 1; i <= 4; i++) {
        html += '<img src="/images/' + prefixes[tab] + '-' + i + '.jpg" alt="' + tab + ' ' + i + '" onclick="openGalleryModal(this.src)">';
    }
    display.innerHTML = html;
}

function openGalleryModal(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('gallery-lightbox').style.display = 'flex';
}

function closeGalleryModal() {
    document.getElementById('gallery-lightbox').style.display = 'none';
}

// Load Main Building gallery on page load
function loadGallery() {
    const defaultTab = document.querySelector('.gallery-tab.active');
    if (defaultTab) switchGallery('main', defaultTab);
}
