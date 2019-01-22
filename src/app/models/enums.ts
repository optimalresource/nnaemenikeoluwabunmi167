export class States {
    types = [
        { id: 1, state: "Abia", lga: ["Aba North", "Aba South", "Arochukwu", "Bende", "Isiala Ngwa South", "Ikwuano", "Isiala", "Ngwa North", "Isukwuato", "Ukwa West", "Ukwa East", "Umuahia", "Umuahia South"] },
        { id: 2, state: "Adamawa", lga: ['Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Jada', 'Yola North', 'Lamurde', 'Madagali', 'Maiha', 'Mayo-Belwa', 'Michika', 'Mubi South', 'Numna', 'Shelleng', 'Song', 'Toungo', 'Jimeta', 'Yola South', 'Hung'] },
        { id: 3, state: "Anambra", lga: ['Aguata', 'Anambra', 'Anambra West', 'Anaocha', 'Awka South', 'Awka North', 'Ogbaru', 'Onitsha South', 'Onitsha North', 'Orumba North', 'Orumba South', 'Oyi'] },
        { id: 4, state: "Akwa Ibom", lga: ['Abak', 'eastern Obolo', 'Eket', 'Essien Udim', 'Etimekpo', 'Etinan', 'Ibeno', 'Ibesikpo Asutan', 'Ibiono Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 'Ini', 'Itu', 'Mbo', 'Mkpat Enin', 'Nsit Ibom', 'Nsit Ubium', 'Obot Akara', 'Okobo', 'Onna', 'Orukanam', 'Oron', 'Udung Uko', 'Ukanafun', 'Esit Eket', 'Uruan', 'Urue Offoung', 'Oruko Ete', 'Uyo'] },
        { id: 5, state: "Bauchi", lga: ['Alkaleri', 'Bauchi', 'Bogoro', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 'Giade', 'Jama`are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'hira', 'Tafawa Balewa', 'Itas gadau', 'Toro', 'Warji', 'Zaki', 'Dambam'] },
        { id: 6, state: "Bayelsa", lga: ['Brass', 'Ekeremor', 'Kolok/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa', 'Membe'] },
        { id: 7, state: "Benue", lga: ['Ador', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer east', 'Gwer west', 'Kastina,-ala', 'Konshisha', 'Kwande', 'Logo', 'Makurdii', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu', 'Oturkpo', 'Tarka', 'Ukum', 'Vandekya'] },
        { id: 8, state: "Borno", lga: ['Abadan', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwagubio', 'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kalka/Balge', 'Konduga', 'Kukawa', 'Kwaya-ku', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar', 'Monguno', 'Ngala', 'Nganzai', 'Shani'] },
        { id: 9, state: "Cross River", lga: ['Abia', 'Akampa', 'Akpabuyo', 'Bakassi', 'Bekwara', 'Biase', 'Boki', 'Calabar south', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 'Ugep north', 'Yala', 'Yarkur'] },
        { id: 10, state: "Delta", lga: ['Aniocha south', 'Anioha', 'Bomadi', 'Burutu', 'Ethiope west', 'Ethiope east', 'Ika south', 'Ika north east', 'Isoko south', 'Isoko north', 'Ndokwa east', 'Ndokwa west', 'Okpe,Oshimili north', 'Oshimili south', 'Patani', 'Sapele', 'Udu', 'Ughelli south', 'Ughelli north', 'Ukwuani', 'Uviwie', 'Warri central', 'Warri north', 'Warri south'] },
        { id: 11, state: "Ebonyi", lga: ['Abakaliki', 'Afikpo south', 'Afikpo north', 'Ebonyi', 'Ezza', 'Ezza south', 'Ikwo', 'Ishielu', 'Ivo', 'Ohaozara', 'Ohaukwu', 'Onicha', 'Izzi'] },
        { id: 12, state: "Edo", lga: ['Akoko-Edo', 'Egor', 'Essann east', 'Esan south east', 'Esan central', 'Esan west', 'Etsako central', 'Etsako east', 'Etsako', 'Orhionwon', 'Ivia north', 'Ovia south west', 'Owan west', 'Owan south', 'Uhunwonde'] },
        { id: 13, state: "Ekiti", lga: ['Ado Ekiti', 'Effon Alaiye', 'Ekiti south west', 'Ekiti west', 'Ekiti east', 'Emure/ise', 'Orun', 'Ido', 'Osi', 'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun', 'Ise/Orun', 'Moba', 'Oye', 'Aiyekire'] },
        { id: 14, state: "Enugu", lga: ['Awgu', 'Aninri', 'Enugu east', 'Enugu south', 'Enugu north', 'Ezeagu', 'Igbo Eze north', 'Igbi etiti', 'Isi Uzo', 'Nsukka', 'Oji river', 'Undenu', 'Uzo Uwani', 'Udi',] },
        { id: 15, state: "FCT - Abuja", lga: ['Abaji', 'Abuja Municipal', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali'] },
        { id: 16, state: "Gombe", lga: ['Akko', 'Balanga', 'Billiri', 'Dukku', 'Dunakaye', 'Gombe', 'Kaltungo', 'Kwami', 'Nafada/Bajoga', 'Shomgom', 'Yamaltu/Deba'] },
        { id: 17, state: "Imo", lga: ['Aboh-mbaise', 'Ahiazu-Mbaise', 'Ehime-Mbaino', 'Ezinhite', 'Ideato North', 'Ideato south', 'Ihitte/Uboma', 'Ikeduru', 'Isiala', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 'Nwangele', 'Nkwere', 'Obowo', 'Aguta', 'Ohaji Egbema', 'Okigwe', 'Onuimo', 'Orlu', 'Orsu', 'Oru west', 'Oru', 'Owerri', 'Owerri North', 'Owerri south'] },
        { id: 18, state: "Jigawa", lga: ['Auyo', 'Babura', 'Birnin- Kudu', 'Birniwa', 'Buji', 'Dute', 'Garki', 'Gagarawa', 'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadeji', 'Jahun', 'Kafin-Hausa', 'kaugama', 'Kazaure', 'Kirikisamma', 'Birnin-magaji', 'Maigatari', 'Malamaduri', 'Miga', 'Ringim', 'Roni', 'Sule Tankarka', 'Taura', 'Yankwasi'] },
        { id: 19, state: "Kaduna", lga: ['Brnin Gwari', 'Chukun', 'Giwa', 'Kajuru', 'Igabi', 'Ikara', 'Jaba', 'Jema`a', 'Kachia', 'Kaduna North', 'Kaduna south', 'Kagarok', 'Kauru', 'Kabau', 'Kudan', 'Kere', 'Makarfi', 'Sabongari', 'Sanga', 'Soba', 'Zangon-Kataf', 'Zaria'] },
        { id: 20, state: "Kano", lga: ['Ajigi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin kudu', 'Dawakin tofa', 'doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun mallam', 'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kano', 'Karay', 'Kibiya', 'Kiru', 'Kumbtso', 'Kunch', 'Kura', 'Maidobi', 'Makoda', 'MInjibir Nassarawa', 'Rano', 'Rimin gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudunwada', 'Ungogo', 'Warawa', 'Wudil'] },
        { id: 21, state: "Katsina", lga: ['Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dan- Musa', 'Dandume', 'Danja', 'Daura', 'Dutsi', 'Dutsin `ma', 'Faskar', 'Funtua', 'Ingawa', 'Jibiya', 'Kafur', 'Kaita', 'Kankara', 'Kankiya', 'Katsina', 'Furfi', 'Kusada', 'Mai aduwa', 'Malumfashi', 'Mani', 'Mash', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 'Sandamu', 'Zango'] },
        { id: 22, state: "Kebbi", lga: ['Aliero', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza', 'Dandi', 'Danko', 'Fakai', 'Gwandu', 'Jeda', 'Kalgo', 'Koko-besse', 'Maiyaama', 'Ngaski', 'Sakaba', 'Shanga', 'Suru', 'Wasugu', 'Yauri', 'Zuru'] },
        { id: 23, state: "Kogi", lga: ['Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Yagba east', 'Ibaji', 'Idah', 'Igalamela', 'Ijumu', 'Kabba bunu', 'Kogi', 'Mopa muro', 'Ofu', 'Ogori magongo', 'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba west'] },
        { id: 24, state: "Kwara", lga: ['Asa', 'Baruten', 'Ede', 'Ekiti', 'Ifelodun', 'Ilorin south', 'Ilorin west', 'Ilorin east', 'Irepodun', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke ero', 'Oyun', 'Pategi'] },
        { id: 25, state: "Lagos", lga: ['Agege', 'Alimosho Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako/Ijaye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'] },
        { id: 26, state: "Nasarawa", lga: ['Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nassarawa', 'Nassarawa/Eggon', 'Obi', 'Toto', 'Wamba'] },
        { id: 27, state: "Niger", lga: ['Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchanga', 'Edati', 'Gbako', 'Gurara', 'Kitcha', 'Kontagora', 'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mokwa', 'Moshegu', 'Muya', 'Paiko', 'Rafi', 'Shiroro', 'Suleija', 'Tawa-Wushishi'] },
        { id: 28, state: "Ogun", lga: ['Abeokuta south', 'Abeokuta north', 'Ado-odo/otta', 'Agbado south', 'Agbado north', 'Ewekoro', 'Idarapo', 'Ifo', 'Ijebu east', 'Ijebu north', 'Ikenne', 'Ilugun Alaro', 'Imeko afon', 'Ipokia', 'Obafemi/owode', 'Odeda', 'Odogbolu', 'Ogun waterside', 'Sagamu'] },
        { id: 29, state: "Ondo", lga: ['Akoko north', 'Akoko north east', 'Akoko south east', 'Akoko south', 'Akure north', 'Akure', 'Idanre', 'Ifedore', 'Ese odo', 'Ilaje', 'Ilaje oke-igbo', 'Irele', 'Odigbo', 'Okitipupa', 'Ondo', 'Ondo east', 'Ose', 'Owo'] },
        { id: 30, state: "Osun", lga: ['Atakumosa west', 'Atakumosa east', 'Ayeda-ade', 'Ayedire', 'Bolawaduro', 'Boripe', 'Ede', 'Ede north', 'Egbedore', 'Ejigbo', 'Ife north', 'Ife central', 'Ife south', 'Ife east', 'Ifedayo', 'Ifelodun', 'Ilesha west', 'Ila-orangun', 'Ilesah east', 'Irepodun', 'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo-otin', 'ola oluwa', 'olorunda', 'Oriade', 'Orolu', 'Osogbo'] },
        { id: 31, state: "Oyo", lga: ['Afijio', 'Akinyele', 'Attba', 'Atigbo', 'Egbeda', 'Ibadan', 'north east', 'Ibadan central', 'Ibadan south east', 'Ibadan west south', 'Ibarapa east', 'Ibarapa north', 'Ido', 'Ifedapo', 'Ifeloju', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 'Iwajowa olorunshogo', 'Kajola', 'Lagelu', 'Ogbomosho north', 'Ogbomosho south', 'Ogo oluwa', 'Oluyole', 'Ona ara', 'Ore lope', 'Orire', 'Oyo east', 'Oyo west', 'Saki east', 'Saki west', 'Surulere'] },
        { id: 32, state: "Plateau", lga: ['Barkin/ladi', 'Bassa', 'Bokkos', 'Jos', 'north', 'Jos east', 'Jos south', 'Kanam', 'kiyom', 'Langtang north', 'Langtang south', 'Mangu', 'Mikang', 'Pankshin', 'Qua`an pan', 'Shendam', 'Wase'] },
        { id: 33, state: "Rivers", lga: ['Abua/Odial', 'Ahoada west', 'Akuku toru', 'Andoni', 'Asari toru', 'Bonny', 'Degema', 'Eleme', 'Emohua', 'Etche', 'Gokana', 'Ikwerre', 'Oyigbo', 'Khana', 'Obio/Akpor', 'Ogba east/Edoni', 'Ogu/bolo', 'Okrika', 'Omumma', 'Opobo/Nkoro', 'Portharcourt', 'Tai'] },
        { id: 34, state: "Sokoto", lga: ['Binji', 'Bodinga', 'Dange/shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illella', 'Kebbe', 'Kware', 'Rabah', 'Sabon-Birni', 'Shagari', 'Silame', 'Sokoto south', 'Sokoto north', 'Tambuwal', 'Tangaza', 'Tureta', 'Wamakko,Wurno', 'Yabo'] },
        { id: 35, state: "Taraba", lga: ['Akdo-kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'K/Lamido', 'Kurmi', 'lan', 'Sardauna', 'Tarum', 'Ussa', 'Wukari', 'Yorro', 'Zing'] },
        { id: 36, state: "Yobe", lga: ['Borsari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gogaram', 'Gujba', 'Gulani', 'Jakusko', 'Karasuwa', 'Machina', 'Nagere', 'Nguru', 'Potiskum', 'Tarmua', 'Yunusari', 'Yusufari', 'G ashua'] },
        { id: 37, state: "Zamfara", lga: ['Anka', 'bukkuyum', 'Dungudu', 'Chafe', 'Gummi', 'Gusau', 'Isa', 'Kaura/Namoda', 'Mradun', 'Maru', 'Shinkafi', 'Talata/Mafara', 'Zumi'] }
    ]
}

export class CasualtyLevel {
    types = [
        { id: 1, number: 'One' },
        { id: 2, number: 'Two' },
        { id: 3, number: 'Three' },
        { id: 4, number: 'Four' },
        { id: 5, number: 'Five' },
        { id: 6, number: 'Six' }
    ]
}

export class Relationship {
    types = [
        { id: 1, rship: 'Sister' },
        { id: 2, rship: 'Brother' },
        { id: 3, rship: 'Uncle' },
        { id: 4, rship: 'Aunty' },
        { id: 5, rship: 'Mother' },
        { id: 6, rship: 'Father' },
        { id: 7, rship: 'Colleague' },
        { id: 8, rship: 'Boss' },
        { id: 9, rship: 'Neighbor' },
        { id: 10, rship: 'Child' },
        { id: 11, rship: 'Wife' },
        { id: 12, rship: 'Husband' },
        { id: 13, rship: 'Friend' },
        { id: 14, rship: 'Others' }
    ]
}