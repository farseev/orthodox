/* The Divine Liturgy of St John Chrysostom — bilingual data.
   Church Slavonic (cs) is verbatim; English (en) follows established
   Orthodox liturgical usage. The Creed, the Lord's Prayer and the
   pre-Communion prayer also carry the site's verified translations. */
const LITURGY_DATA = {
 lead:{
  en:"The Divine Liturgy of St John Chrysostom, in Church Slavonic and English, side by side. Use the search (magnifier) to find your place, or the contents (lines) to jump to a section. The tone of the week and the day's readings are marked where they change.",
  ru:"Божественная литургия святого Иоанна Златоуста — церковнославянский текст и перевод рядом. Пользуйтесь поиском, чтобы найти нужное место, или содержанием для перехода к разделу."
 },
 sections:[

 {id:"opening", t:{en:"The Opening Blessing"}, tcs:"Начало",
  lines:[
   {r:"d", cs:"Благослови, владыко.", en:"Master, give the blessing."},
   {r:"p", cs:"Благословено Царство Отца и Сына и Святаго Духа, ныне и присно и во веки веков.", en:"Blessed is the Kingdom of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"greatLitany", t:{en:"The Great Litany"}, tcs:"Великая ектения",
  lines:[
   {r:"d", cs:"Миром Господу помолимся.", en:"In peace let us pray to the Lord."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"ru", en:"“Lord, have mercy” is sung after each petition.", ru:"«Господи, помилуй» — на каждое прошение."},
   {r:"d", cs:"О свышнем мире и спасении душ наших, Господу помолимся.", en:"For the peace from above and the salvation of our souls, let us pray to the Lord."},
   {r:"d", cs:"О мире всего мира, благостоянии Святых Божиих Церквей и соединении всех, Господу помолимся.", en:"For the peace of the whole world, the good estate of the holy churches of God, and the union of all, let us pray to the Lord."},
   {r:"d", cs:"О святем храме сем и с верою, благоговением и страхом Божиим входящих в онь, Господу помолимся.", en:"For this holy temple, and for those who enter it with faith, reverence, and the fear of God, let us pray to the Lord."},
   {r:"d", cs:"О Великом Господине и Отце нашем Святейшем Патриархе (имя), и о Господине нашем Преосвященнейшем митрополите (имя), честнем пресвитерстве, во Христе диаконстве, о всем причте и людех, Господу помолимся.", en:"For our Great Lord and Father, His Holiness Patriarch (name), and for our lord the Most Reverend Metropolitan (name); for the honourable priesthood, the diaconate in Christ, for all the clergy and the people, let us pray to the Lord."},
   {r:"d", cs:"О Богохранимей стране нашей, властех и воинстве ея, Господу помолимся.", en:"For our God-protected land, its authorities and armed forces, let us pray to the Lord."},
   {r:"d", cs:"О граде сем, всяком граде, стране и верою живущих в них, Господу помолимся.", en:"For this city, for every city and country, and for the faithful who dwell in them, let us pray to the Lord."},
   {r:"d", cs:"О благорастворении воздухов, о изобилии плодов земных и временех мирных, Господу помолимся.", en:"For seasonable weather, an abundance of the fruits of the earth, and peaceful times, let us pray to the Lord."},
   {r:"d", cs:"О плавающих, путешествующих, недугующих, страждущих, плененных и о спасении их, Господу помолимся.", en:"For travellers by land, sea, and air; for the sick and the suffering; for captives and their salvation, let us pray to the Lord."},
   {r:"d", cs:"О избавитися нам от всякия скорби, гнева и нужды, Господу помолимся.", en:"For our deliverance from all tribulation, wrath, danger, and necessity, let us pray to the Lord."},
   {r:"d", cs:"Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.", en:"Help us, save us, have mercy on us, and keep us, O God, by Thy grace."},
   {r:"d", cs:"Пресвятую, Пречистую, Преблагословенную, Славную Владычицу нашу Богородицу и Приснодеву Марию, со всеми святыми помянувше, сами себе и друг друга, и весь живот наш Христу Богу предадим.", en:"Calling to remembrance our most holy, most pure, most blessed and glorious Lady Theotokos and ever-Virgin Mary, with all the saints, let us commend ourselves and one another, and all our life unto Christ our God."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"Яко подобает Тебе всякая слава, честь и поклонение, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.", en:"For unto Thee are due all glory, honour, and worship: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"antiphon1", t:{en:"The First Antiphon"}, tcs:"Антифон 1-й",
  lines:[
   {r:"ru", en:"On Sundays and feasts the Psalm-antiphons below are sung. On ordinary weekdays the daily antiphons (“It is good to give thanks…”) are used instead.", ru:"В воскресные и праздничные дни поются изобразительные антифоны; в будни — вседневные."},
   {r:"c", cs:"Благослови, душе моя, Господа. Благословен еси, Господи. Благослови, душе моя, Господа, и вся внутренняя моя имя святое Его.", en:"Bless the Lord, O my soul. Blessed art Thou, O Lord. Bless the Lord, O my soul, and all that is within me bless His holy Name."},
   {r:"c", cs:"Благослови, душе моя, Господа, и не забывай всех воздаяний Его, очищающаго вся беззакония твоя, исцеляющаго вся недуги твоя, избавляющаго от истления живот твой, венчающаго тя милостию и щедротами.", en:"Bless the Lord, O my soul, and forget not all that He hath done for thee: who forgiveth all thine iniquities, who healeth all thine infirmities, who redeemeth thy life from corruption, who crowneth thee with mercy and compassion."},
   {r:"c", cs:"Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.", en:"Glory to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen."},
   {r:"c", cs:"Благослови, душе моя, Господа, и вся внутренняя моя имя святое Его. Благословен еси, Господи.", en:"Bless the Lord, O my soul, and all that is within me bless His holy Name. Blessed art Thou, O Lord."}
  ]},

 {id:"littleLitany1", t:{en:"The Little Litany"}, tcs:"Малая ектения",
  lines:[
   {r:"d", cs:"Паки и паки миром Господу помолимся.", en:"Again and again in peace let us pray to the Lord."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"d", cs:"Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.", en:"Help us, save us, have mercy on us, and keep us, O God, by Thy grace."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"d", cs:"Пресвятую, Пречистую, Преблагословенную, Славную Владычицу нашу Богородицу и Приснодеву Марию, со всеми святыми помянувше, сами себе, и друг друга, и весь живот наш Христу Богу предадим.", en:"Calling to remembrance our most holy, most pure, most blessed and glorious Lady Theotokos and ever-Virgin Mary, with all the saints, let us commend ourselves and one another, and all our life unto Christ our God."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"Яко Твоя держава, и Твое есть Царство, и сила, и слава, Отца и Сына и Святаго Духа, ныне и присно и во веки веков.", en:"For Thine is the dominion, and Thine is the Kingdom, and the power, and the glory: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"antiphon2", t:{en:"The Second Antiphon"}, tcs:"Антифон 2-й",
  lines:[
   {r:"c", cs:"Хвали, душе моя, Господа. Восхвалю Господа в животе моем, пою Богу моему, дондеже есмь.", en:"Praise the Lord, O my soul. I will praise the Lord while I live; I will chant unto my God for as long as I have my being."},
   {r:"c", cs:"Блажен, емуже Бог Иаковль помощник его, упование его на Господа Бога своего, сотворшаго небо и землю, море и вся, яже в них.", en:"Blessed is he whose helper is the God of Jacob, whose hope is in the Lord his God, who hath made heaven and earth, the sea and all that is therein."},
   {r:"c", cs:"Воцарится Господь во век, Бог твой, Сионе, в род и род.", en:"The Lord shall reign for ever; thy God, O Sion, unto generation and generation."},
   {r:"c", cs:"Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.", en:"Glory to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen."},
   {r:"c", cs:"Единородный Сыне и Слове Божий, Безсмертен Сый, и изволивый спасения нашего ради воплотитися от Святыя Богородицы и Приснодевы Марии, непреложно вочеловечивыйся; распныйся же, Христе Боже, смертию смерть поправый, един Сый Святыя Троицы, спрославляемый Отцу и Святому Духу, спаси нас.", en:"O only-begotten Son and Word of God, who, being immortal, didst deign for our salvation to become incarnate of the holy Theotokos and ever-Virgin Mary, and without change didst become man, and wast crucified, O Christ our God, trampling down death by death; who art one of the Holy Trinity, glorified together with the Father and the Holy Spirit: save us."}
  ]},

 {id:"littleLitany2", t:{en:"The Little Litany"}, tcs:"Малая ектения",
  lines:[
   {r:"d", cs:"Паки и паки миром Господу помолимся.", en:"Again and again in peace let us pray to the Lord."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"d", cs:"Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.", en:"Help us, save us, have mercy on us, and keep us, O God, by Thy grace."},
   {r:"d", cs:"Пресвятую, Пречистую... Богородицу и Приснодеву Марию, со всеми святыми помянувше, сами себе, и друг друга, и весь живот наш Христу Богу предадим.", en:"Calling to remembrance our most holy Lady Theotokos and ever-Virgin Mary, with all the saints, let us commend ourselves and one another, and all our life unto Christ our God."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"Яко благ и Человеколюбец Бог еси, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.", en:"For Thou art a good God and lovest mankind, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"beatitudes", t:{en:"The Third Antiphon — The Beatitudes"}, tcs:"Антифон 3-й. Блаженны",
  lines:[
   {r:"c", cs:"Во Царствии Твоем помяни нас, Господи, егда приидеши во Царствии Твоем.", en:"In Thy Kingdom remember us, O Lord, when Thou comest in Thy Kingdom."},
   {r:"c", cs:"Блажени нищии духом, яко тех есть Царство Небесное.", en:"Blessed are the poor in spirit, for theirs is the Kingdom of Heaven."},
   {r:"c", cs:"Блажени плачущии, яко тии утешатся.", en:"Blessed are they that mourn, for they shall be comforted."},
   {r:"c", cs:"Блажени кротции, яко тии наследят землю.", en:"Blessed are the meek, for they shall inherit the earth."},
   {r:"c", cs:"Блажени алчущии и жаждущии правды, яко тии насытятся.", en:"Blessed are they that hunger and thirst after righteousness, for they shall be filled."},
   {r:"c", cs:"Блажени милостивии, яко тии помиловани будут.", en:"Blessed are the merciful, for they shall obtain mercy."},
   {r:"c", cs:"Блажени чистии сердцем, яко тии Бога узрят.", en:"Blessed are the pure in heart, for they shall see God."},
   {r:"c", cs:"Блажени миротворцы, яко тии сынове Божии нарекутся.", en:"Blessed are the peacemakers, for they shall be called the sons of God."},
   {r:"c", cs:"Блажени изгнани правды ради, яко тех есть Царство Небесное.", en:"Blessed are they that are persecuted for righteousness' sake, for theirs is the Kingdom of Heaven."},
   {r:"c", cs:"Блажени есте, егда поносят вам, и изженут, и рекут всяк зол глагол на вы, лжуще Мене ради.", en:"Blessed are ye when men shall revile you and persecute you, and shall say all manner of evil against you falsely, for My sake."},
   {r:"c", cs:"Радуйтеся и веселитеся, яко мзда ваша многа на небесех.", en:"Rejoice and be exceeding glad, for great is your reward in the heavens."}
  ]},

 {id:"entrance", t:{en:"The Little Entrance"}, tcs:"Вход с Евангелием",
  lines:[
   {r:"d", cs:"Премудрость, прости.", en:"Wisdom! Stand upright."},
   {r:"c", cs:"Приидите, поклонимся и припадем ко Христу. Спаси ны, Сыне Божий, воскресый из мертвых (или: во святых дивен сый), поющия Ти: аллилуиа.", en:"O come, let us worship and fall down before Christ. O Son of God, who art risen from the dead (or: who art wondrous in the saints), save us who chant unto Thee: Alleluia."}
  ]},

 {id:"troparia", t:{en:"Troparia and Kontakia of the Day"}, tcs:"Тропари и кондаки",
  lines:[
   {r:"slot", h:{en:"Variable — the day's hymns"}, en:"Here the troparia and kontakia of the resurrection (by tone), of the temple, of the feast, and of the saint(s) commemorated today are sung, in the appointed order. These change every day; take them from the parish's order of service, the Menaion, or the Octoechos."}
  ]},

 {id:"trisagion", t:{en:"The Trisagion"}, tcs:"Трисвятое",
  lines:[
   {r:"c", cs:"Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)", en:"Holy God, Holy Mighty, Holy Immortal, have mercy on us. (Thrice)"},
   {r:"c", cs:"Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь. Святый Безсмертный, помилуй нас.", en:"Glory to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen. Holy Immortal, have mercy on us."},
   {r:"c", cs:"Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас.", en:"Holy God, Holy Mighty, Holy Immortal, have mercy on us."},
   {r:"ru", en:"On the Nativity, Theophany, Lazarus Saturday, Great Saturday, Pascha and Pentecost, instead of the Trisagion is sung: “As many as have been baptized into Christ have put on Christ. Alleluia.” On the Exaltation of the Cross and the Third Sunday of Lent: “Before Thy Cross we bow down in worship, O Master, and Thy holy Resurrection we glorify.”", ru:"В Рождество, Богоявление, Лазареву и Великую субботы, на Пасху и в Пятидесятницу вместо Трисвятого поется «Елицы во Христа крестистеся…»; на Воздвижение и в Крестопоклонную неделю — «Кресту Твоему покланяемся, Владыко…»."}
  ]},

 {id:"prokeimenon", t:{en:"The Prokeimenon and Alleluia"}, tcs:"Прокимен и Аллилуиа",
  lines:[
   {r:"ru", en:"The reader announces the prokeimenon in the tone of the day; the choir sings it, then the verse, then it is repeated. After the Epistle the Alleluia is sung three times in the same tone. The set shown is for the chosen date — on Sundays the resurrectional tone, on weekdays the daily prokeimenon.", ru:"Прокимен и аллилуиарий поются на глас дня. Ниже показан набор для выбранной даты — в воскресенье воскресный глас, в будни дневной прокимен."},
   {r:"table", rows:[
     {tag:"Tone 1 · Глас 1", glas:"1", cs:"Прокимен: Буди, Господи, милость Твоя на нас, якоже уповахом на Тя. · Аллилуиа: Бог даяй отмщение мне, и покоривый люди под мя.", en:"Prokeimenon: Let Thy mercy, O Lord, be upon us, according as we have hoped in Thee. · Alleluia: It is God that giveth me vengeance, and hath subdued peoples under me."},
     {tag:"Tone 2 · Глас 2", glas:"2", cs:"Прокимен: Крепость моя и пение мое Господь, и бысть мне во спасение. · Аллилуиа: Услышит тя Господь в день печали, защитит тя имя Бога Иаковля.", en:"Prokeimenon: The Lord is my strength and my song, and is become my salvation. · Alleluia: The Lord hear thee in the day of affliction; the Name of the God of Jacob defend thee."},
     {tag:"Tone 3 · Глас 3", glas:"3", cs:"Прокимен: Пойте Богу нашему, пойте; пойте Цареви нашему, пойте. · Аллилуиа: На Тя, Господи, уповах, да не постыжуся во век.", en:"Prokeimenon: Sing praises to our God, sing praises; sing praises unto our King, sing praises. · Alleluia: In Thee, O Lord, have I hoped; let me never be put to shame."},
     {tag:"Tone 4 · Глас 4", glas:"4", cs:"Прокимен: Яко возвеличишася дела Твоя, Господи, вся премудростию сотворил еси. · Аллилуиа: Наляцы, и успевай, и царствуй, истины ради и кротости и правды.", en:"Prokeimenon: How magnified are Thy works, O Lord; in wisdom hast Thou made them all. · Alleluia: Bend Thy bow, proceed prosperously, and be king, for the sake of truth, meekness and righteousness."},
     {tag:"Tone 5 · Глас 5", glas:"5", cs:"Прокимен: Ты, Господи, сохраниши ны и соблюдеши ны от рода сего и во век. · Аллилуиа: Милости Твоя, Господи, во век воспою, в род и род возвещу истину Твою усты моими.", en:"Prokeimenon: Thou, O Lord, shalt keep us and preserve us from this generation and for ever. · Alleluia: Thy mercies, O Lord, will I sing for ever; unto generation and generation will I proclaim Thy truth with my mouth."},
     {tag:"Tone 6 · Глас 6", glas:"6", cs:"Прокимен: Спаси, Господи, люди Твоя, и благослови достояние Твое. · Аллилуиа: Живый в помощи Вышняго, в крове Бога Небеснаго водворится.", en:"Prokeimenon: O Lord, save Thy people, and bless Thine inheritance. · Alleluia: He that dwelleth in the help of the Most High shall abide in the shelter of the God of heaven."},
     {tag:"Tone 7 · Глас 7", glas:"7", cs:"Прокимен: Господь крепость людем Своим даст, Господь благословит люди Своя миром. · Аллилуиа: Благо есть исповедатися Господеви, и пети Имени Твоему, Вышний.", en:"Prokeimenon: The Lord will give strength unto His people; the Lord will bless His people with peace. · Alleluia: It is good to give thanks unto the Lord, and to chant unto Thy Name, O Most High."},
     {tag:"Tone 8 · Глас 8", glas:"8", cs:"Прокимен: Помолитеся и воздадите Господеви Богу нашему. · Аллилуиа: Приидите, возрадуемся Господеви, воскликнем Богу Спасителю нашему.", en:"Prokeimenon: Make your vows and pay them to the Lord our God. · Alleluia: O come, let us rejoice in the Lord; let us shout with jubilation unto God our Saviour."}
   ]},
   {r:"ru", _grp:"dayprok", en:"Daily prokeimena (weekdays):", ru:"Прокимны дневные (будничные):"},
   {r:"table", rows:[
     {tag:"Monday", day:"mon", cs:"Прокимен: Творяй ангелы Своя духи, и слуги Своя пламень огненный.", en:"Prokeimenon: He maketh His angels spirits, and His ministers a flame of fire."},
     {tag:"Tuesday", day:"tue", cs:"Прокимен: Возвеселится праведник о Господе, и уповает на Него.", en:"Prokeimenon: The righteous shall be glad in the Lord, and shall hope in Him."},
     {tag:"Wednesday", day:"wed", cs:"Прокимен (Богородичен): Величит душа Моя Господа, и возрадовася дух Мой о Бозе Спасе Моем.", en:"Prokeimenon (of the Theotokos): My soul doth magnify the Lord, and my spirit hath rejoiced in God my Saviour."},
     {tag:"Thursday", day:"thu", cs:"Прокимен: Во всю землю изыде вещание их, и в концы вселенныя глаголы их.", en:"Prokeimenon: Their sound is gone forth into all the earth, and their words unto the ends of the world."},
     {tag:"Friday", day:"fri", cs:"Прокимен: Возносите Господа Бога нашего, и покланяйтеся подножию ногу Его, яко свято есть.", en:"Prokeimenon: Exalt ye the Lord our God, and worship the footstool of His feet, for it is holy."},
     {tag:"Saturday", day:"sat", cs:"Прокимен: Веселитеся о Господе, и радуйтеся, праведнии. · Заупокойный: Души их во благих водворятся.", en:"Prokeimenon: Be glad in the Lord and rejoice, ye righteous. · For the departed: Their souls shall dwell among good things."}
   ]}
  ]},

 {id:"epistle", t:{en:"The Epistle"}, tcs:"Апостол",
  lines:[
   {r:"d", cs:"Премудрость.", en:"Wisdom!"},
   {r:"rd", cs:"Деяний святых апостол чтение. (Или: послания святаго апостола Павла чтение, и т.п.)", en:"The reading from the Acts of the holy Apostles. (Or: from the Epistle of St Paul, etc.)"},
   {r:"d", cs:"Вонмем.", en:"Let us attend."},
   {r:"slot", h:{en:"Variable — today's Epistle"}, en:"The reader reads the appointed Epistle for the day (from the daily cycle from Pascha and the fixed calendar). Take the exact reference from the parish's order of service or the Apostol."},
   {r:"p", cs:"Мир ти, чтущему.", en:"Peace be unto thee that readest."},
   {r:"rd", cs:"И духови твоему.", en:"And to thy spirit."},
   {r:"ru", en:"The Alleluia (above, in the tone of the day) is now sung three times, with its verses.", ru:"Поется Аллилуиа с его стихами на глас дня (см. выше)."}
  ]},

 {id:"gospel", t:{en:"The Gospel"}, tcs:"Евангелие",
  lines:[
   {r:"p", cs:"Премудрость, прости, услышим святаго Евангелия. Мир всем.", en:"Wisdom! Stand upright. Let us hear the holy Gospel. Peace be unto all."},
   {r:"c", cs:"И духови твоему.", en:"And to thy spirit."},
   {r:"d", cs:"От (имя) святаго Евангелия чтение.", en:"The reading from the holy Gospel according to (Name)."},
   {r:"c", cs:"Слава Тебе, Господи, слава Тебе.", en:"Glory to Thee, O Lord, glory to Thee."},
   {r:"p", cs:"Вонмем.", en:"Let us attend."},
   {r:"slot", h:{en:"Variable — today's Gospel"}, en:"The appointed Gospel for the day is read. Take the exact reference from the parish's order of service or the Gospel lectionary."},
   {r:"c", cs:"Слава Тебе, Господи, слава Тебе.", en:"Glory to Thee, O Lord, glory to Thee."}
  ]},

 {id:"augmentedLitany", t:{en:"The Augmented Litany"}, tcs:"Сугубая ектения",
  lines:[
   {r:"d", cs:"Рцем вси от всея души, и от всего помышления нашего рцем.", en:"Let us all say with our whole soul and with our whole mind, let us say."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"d", cs:"Господи Вседержителю, Боже отец наших, молим Ти ся, услыши и помилуй.", en:"O Lord Almighty, the God of our fathers, we pray Thee, hearken and have mercy."},
   {r:"d", cs:"Помилуй нас, Боже, по велицей милости Твоей, молим Ти ся, услыши и помилуй.", en:"Have mercy on us, O God, according to Thy great mercy, we pray Thee, hearken and have mercy."},
   {r:"c", cs:"Господи, помилуй. (Трижды, на каждое прошение)", en:"Lord, have mercy. (Thrice, after each petition)"},
   {r:"d", cs:"Еще молимся о Великом Господине и Отце нашем Святейшем Патриархе (имя), и о Господине нашем Преосвященнейшем митрополите (имя), и всей во Христе братии нашей.", en:"Again we pray for our Great Lord and Father, His Holiness Patriarch (name), and for our lord the Most Reverend Metropolitan (name), and for all our brethren in Christ."},
   {r:"d", cs:"Еще молимся о Богохранимей стране нашей, властех и воинстве ея, да тихое и безмолвное житие поживем во всяком благочестии и чистоте.", en:"Again we pray for our God-protected land, its authorities and armed forces, that we may lead a calm and peaceful life in all godliness and purity."},
   {r:"d", cs:"Еще молимся о блаженных и приснопамятных создателех святаго храма сего, и о всех преждепочивших отцех и братиях, зде лежащих и повсюду, православных.", en:"Again we pray for the blessed and ever-memorable founders of this holy temple, and for all our fathers and brethren gone to their rest before us, the Orthodox here and everywhere laid to rest."},
   {r:"d", cs:"Еще молимся о милости, жизни, мире, здравии, спасении, посещении, прощении и оставлении грехов рабов Божиих, братии святаго храма сего.", en:"Again we pray for mercy, life, peace, health, salvation, and visitation for the servants of God, the brethren of this holy temple, and for the pardon and remission of their sins."},
   {r:"d", cs:"Еще молимся о плодоносящих и добродеющих во святем и всечестнем храме сем, труждающихся, поющих и предстоящих людех, ожидающих от Тебе великия и богатыя милости.", en:"Again we pray for those who bring offerings and do good works in this holy and all-venerable temple, for those who labour and those who sing, and for the people here present, who await Thy great and rich mercy."},
   {r:"p", cs:"Яко Милостив и Человеколюбец Бог еси, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.", en:"For Thou art a merciful God who lovest mankind, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"departedLitany", t:{en:"The Litany for the Departed"}, tcs:"Ектения об усопших",
  lines:[
   {r:"ru", en:"On many days of the year this litany for the departed follows.", ru:"В некоторые дни за сугубой ектенией читается ектения об усопших."},
   {r:"d", cs:"Помилуй нас, Боже, по велицей милости Твоей, молим Ти ся, услыши и помилуй.", en:"Have mercy on us, O God, according to Thy great mercy, we pray Thee, hearken and have mercy."},
   {r:"c", cs:"Господи, помилуй. (На каждое прошение)", en:"Lord, have mercy. (After each petition)"},
   {r:"d", cs:"Еще молимся о упокоении душ усопших рабов Божиих (имена) и о еже проститися им всякому прегрешению, вольному же и невольному.", en:"Again we pray for the repose of the souls of the departed servants of God (names), and that they may be forgiven every transgression, both voluntary and involuntary."},
   {r:"c", cs:"Подай, Господи.", en:"Grant this, O Lord."},
   {r:"p", cs:"Яко Ты еси воскресение, и живот, и покой усопших раб Твоих, Христе Боже наш, и Тебе славу возсылаем, со Безначальным Твоим Отцем, и Пресвятым, и Благим, и Животворящим Твоим Духом, ныне и присно и во веки веков.", en:"For Thou art the resurrection, the life, and the repose of Thy departed servants, O Christ our God, and unto Thee do we send up glory, with Thine unoriginate Father and Thy most holy, good, and life-creating Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"catechumens", t:{en:"The Litany of the Catechumens"}, tcs:"Ектения об оглашенных",
  lines:[
   {r:"d", cs:"Помолитеся, оглашеннии, Господеви.", en:"Ye catechumens, pray to the Lord."},
   {r:"c", cs:"Господи, помилуй. (На каждое прошение)", en:"Lord, have mercy. (After each petition)"},
   {r:"d", cs:"Вернии, о оглашенных помолимся, да Господь помилует их.", en:"Ye faithful, let us pray for the catechumens, that the Lord will have mercy on them."},
   {r:"d", cs:"Огласит их словом истины.", en:"That He will teach them the word of truth."},
   {r:"d", cs:"Открыет им Евангелие правды.", en:"That He will reveal to them the Gospel of righteousness."},
   {r:"d", cs:"Соединит их Святей Своей, Соборней и Апостольстей Церкви.", en:"That He will unite them to His holy, catholic and apostolic Church."},
   {r:"d", cs:"Спаси, помилуй, заступи и сохрани их, Боже, Твоею благодатию.", en:"Save them, have mercy on them, help them, and keep them, O God, by Thy grace."},
   {r:"d", cs:"Оглашеннии, главы ваша Господеви приклоните.", en:"Ye catechumens, bow your heads unto the Lord."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"Да и тии с нами славят пречестное и великолепое Имя Твое, Отца и Сына и Святаго Духа, ныне и присно и во веки веков.", en:"That they also with us may glorify Thine all-honourable and majestic Name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."},
   {r:"d", cs:"Елицы оглашеннии, изыдите; оглашеннии, изыдите; елицы оглашеннии, изыдите. Да никто от оглашенных.", en:"As many as are catechumens, depart; catechumens, depart; as many as are catechumens, depart. Let none of the catechumens remain."}
  ]},

 {id:"cherubic", t:{en:"The Cherubic Hymn"}, tcs:"Херувимская песнь",
  lines:[
   {r:"c", cs:"Иже Херувимы тайно образующе, и Животворящей Троице Трисвятую песнь припевающе, всякое ныне житейское отложим попечение.", en:"Let us who mystically represent the Cherubim, and who sing the thrice-holy hymn to the Life-creating Trinity, now lay aside all earthly care."},
   {r:"ru", en:"On Great Thursday “Of Thy Mystical Supper…” is sung instead; on Great Saturday, “Let all mortal flesh keep silence…”.", ru:"В Великий четверг вместо Херувимской поется «Вечери Твоея Тайныя…», в Великую субботу — «Да молчит всякая плоть…»."}
  ]},

 {id:"greatEntrance", t:{en:"The Great Entrance"}, tcs:"Великий вход",
  lines:[
   {r:"d", cs:"Великаго Господина и Отца нашего (имя), Святейшаго Патриарха Московскаго и всея Руси, и Господина нашего Преосвященнейшаго (имя) да помянет Господь Бог во Царствии Своем, всегда, ныне и присно и во веки веков.", en:"Our Great Lord and Father (name), His Holiness the Patriarch of Moscow and all Rus', and our lord the Most Reverend (name): may the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages."},
   {r:"p", cs:"Вас и всех православных христиан да помянет Господь Бог во Царствии Своем, всегда, ныне и присно и во веки веков.", en:"May the Lord God remember you all, and all Orthodox Christians, in His Kingdom, always, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь. Яко да Царя всех подымем, ангельскими невидимо дориносима чинми. Аллилуиа, аллилуиа, аллилуиа.", en:"Amen. That we may receive the King of all, invisibly upborne in triumph by the ranks of angels. Alleluia, alleluia, alleluia."}
  ]},

 {id:"supplication1", t:{en:"The Litany of Supplication"}, tcs:"Просительная ектения",
  lines:[
   {r:"d", cs:"Исполним молитву нашу Господеви.", en:"Let us complete our prayer unto the Lord."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"d", cs:"О предложенных честных Дарех Господу помолимся.", en:"For the precious Gifts here set forth, let us pray to the Lord."},
   {r:"d", cs:"О избавитися нам от всякия скорби, гнева и нужды, Господу помолимся.", en:"For our deliverance from all tribulation, wrath, danger, and necessity, let us pray to the Lord."},
   {r:"d", cs:"Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.", en:"Help us, save us, have mercy on us, and keep us, O God, by Thy grace."},
   {r:"d", cs:"Дне всего совершенна, свята, мирна и безгрешна, у Господа просим.", en:"That the whole day may be perfect, holy, peaceful, and sinless, let us ask of the Lord."},
   {r:"c", cs:"Подай, Господи. (На каждое прошение)", en:"Grant this, O Lord. (After each petition)"},
   {r:"d", cs:"Ангела мирна, верна наставника, хранителя душ и телес наших, у Господа просим.", en:"An angel of peace, a faithful guide, a guardian of our souls and bodies, let us ask of the Lord."},
   {r:"d", cs:"Прощения и оставления грехов и прегрешений наших, у Господа просим.", en:"Pardon and remission of our sins and offences, let us ask of the Lord."},
   {r:"d", cs:"Добрых и полезных душам нашим и мира мирови, у Господа просим.", en:"All things good and profitable for our souls, and peace for the world, let us ask of the Lord."},
   {r:"d", cs:"Прочее время живота нашего в мире и покаянии скончати, у Господа просим.", en:"That we may complete the remaining time of our life in peace and repentance, let us ask of the Lord."},
   {r:"d", cs:"Христианския кончины живота нашего, безболезнены, непостыдны, мирны, и добраго ответа на Страшнем Судищи Христове, просим.", en:"A Christian ending to our life — painless, blameless, and peaceful — and a good defence before the dread judgement seat of Christ, let us ask."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"Щедротами Единороднаго Сына Твоего, с Нимже благословен еси, со Пресвятым и Благим и Животворящим Твоим Духом, ныне и присно и во веки веков.", en:"Through the compassions of Thine only-begotten Son, with whom Thou art blessed, together with Thy most holy, good, and life-creating Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"kiss", t:{en:"The Kiss of Peace"}, tcs:"Возлюбим друг друга",
  lines:[
   {r:"p", cs:"Мир всем.", en:"Peace be unto all."},
   {r:"c", cs:"И духови твоему.", en:"And to thy spirit."},
   {r:"d", cs:"Возлюбим друг друга, да единомыслием исповемы.", en:"Let us love one another, that with one mind we may confess:"},
   {r:"c", cs:"Отца и Сына и Святаго Духа, Троицу Единосущную и Нераздельную.", en:"The Father, and the Son, and the Holy Spirit: the Trinity one in essence and undivided."},
   {r:"d", cs:"Двери, двери, премудростию вонмем.", en:"The doors! The doors! In wisdom let us attend."}
  ]},

 {id:"creed", t:{en:"The Symbol of Faith (Nicene Creed)"}, tcs:"Символ веры",
  lines:[
   {r:"a", cs:"Верую во Единаго Бога Отца Вседержителя, Творца небу и земли, видимым же всем и невидимым. И во Единаго Господа Иисуса Христа, Сына Божия, Единороднаго, Иже от Отца рожденнаго прежде всех век. Света от Света, Бога истинна от Бога истинна, рожденна, несотворенна, единосущна Отцу, Имже вся быша. Нас ради человек, и нашего ради спасения сшедшаго с Небес, и воплотившагося от Духа Свята и Марии Девы, и вочеловечшася. Распятаго же за ны при Понтийстем Пилате, и страдавша, и погребенна. И воскресшаго в третий день по Писанием. И возшедшаго на Небеса, и седяща одесную Отца. И паки грядущаго со славою судити живым и мертвым, Егоже Царствию не будет конца. И в Духа Святаго, Господа, Животворящаго, Иже от Отца исходящаго, Иже со Отцем и Сыном спокланяема и сславима, глаголавшаго пророки. Во едину Святую, Соборную и Апостольскую Церковь. Исповедую едино Крещение во оставление грехов. Чаю воскресения мертвых, и жизни будущаго века. Аминь.", en:"I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible. And in one Lord Jesus Christ, the Son of God, the Only-begotten, begotten of the Father before all ages; Light of Light, true God of true God, begotten, not made; of one essence with the Father, by Whom all things were made. Who for us men, and for our salvation, came down from heaven, and was incarnate of the Holy Spirit and the Virgin Mary, and became man. And was crucified also for us under Pontius Pilate, and suffered, and was buried. And the third day He rose again, according to the Scriptures. And ascended into heaven, and sitteth at the right hand of the Father. And He shall come again with glory to judge the living and the dead, Whose Kingdom shall have no end. And in the Holy Spirit, the Lord, the Giver of Life, Who proceedeth from the Father, Who with the Father and the Son together is worshipped and glorified, Who spake by the prophets. In one, Holy, Catholic, and Apostolic Church. I acknowledge one Baptism for the remission of sins. I look for the resurrection of the dead, and the life of the age to come. Amen.", zh:"我信独一之上帝，全能的父，创造天地和一切有形无形之万物的主。我信独一之主耶稣基督，上帝的独生子，在万世之前，为父所生；出于光明的光明，出于真神的真神，受生而非受造，与父同一本体，万物皆藉他而造成。他为我们世人，并为我们的得救，从天降临，因圣灵由童贞女玛利亚成肉身而为人。在本丢彼拉多手下，为我们钉十字架，受难，安葬。照圣经所载，第三日复活。升天，坐于父之右边。将来必有荣耀再降临，审判活人死人；他的国度永无穷尽。我信圣灵，是主，是赋予生命者，由父发出，与父子同受敬拜，同受尊荣，昔日藉众先知发言。我信独一、神圣、大公、使徒所传的教会。我承认为赦罪而设的独一洗礼。我盼望死者复活，并来世的生命。阿民。", ms:"Aku percaya kepada satu Tuhan, Bapa Yang Maha Kuasa, Pencipta langit dan bumi, dan segala sesuatu yang kelihatan dan tidak kelihatan. Dan kepada satu Tuhan Yesus Kristus, Anak Tunggal Allah, yang diperanakkan dari Sang Bapa sebelum segala zaman; Terang dari Terang, Allah sejati dari Allah sejati, diperanakkan, bukan diciptakan, satu hakikat dengan Sang Bapa, yang melalui-Nya segala sesuatu dijadikan. Yang kerana kita manusia dan kerana keselamatan kita telah turun dari syurga, dan menjelma oleh Roh Kudus dan Perawan Maria, serta menjadi manusia. Yang disalibkan bagi kita di bawah Pontius Pilatus, menderita dan dimakamkan. Dan bangkit pada hari yang ketiga, sesuai dengan Kitab Suci. Dan naik ke syurga, dan duduk di sebelah kanan Sang Bapa. Dan akan datang kembali dengan kemuliaan untuk menghakimi orang yang hidup dan yang mati; kerajaan-Nya tidak akan berkesudahan. Dan kepada Roh Kudus, Tuhan yang menghidupkan, yang berasal dari Sang Bapa, yang bersama Sang Bapa dan Sang Putra disembah dan dimuliakan, yang telah bersabda melalui para nabi. Kepada satu Gereja yang kudus, am dan rasuli. Aku mengaku satu baptisan untuk pengampunan dosa. Aku menantikan kebangkitan orang mati, dan kehidupan pada zaman yang akan datang. Amin.", ta:"ஒரே கடவுளாகிய, சர்வவல்லமையுள்ள பிதாவை, வானத்தையும் பூமியையும், காணப்படும், காணப்படாத யாவற்றையும் படைத்தவரை, நான் விசுவாசிக்கிறேன். ஒரே கர்த்தராகிய இயேசு கிறிஸ்துவை, கடவுளின் ஒரே பேறான குமாரனை, எல்லா யுகங்களுக்கும் முன் பிதாவினால் பிறந்தவரை; ஒளியிலிருந்து ஒளி, மெய்யான கடவுளிலிருந்து மெய்யான கடவுள், படைக்கப்படாமல் பிறந்தவரை, பிதாவுடன் ஒரே சாராம்சமுள்ளவரை, யாவும் அவர் மூலமாய் உண்டாக்கப்பட்டவரை நான் விசுவாசிக்கிறேன். நமக்காக, நம் இரட்சிப்புக்காக வானத்திலிருந்து இறங்கி, பரிசுத்த ஆவியாலும் கன்னி மரியாளிடமிருந்தும் மனிதாவதாரம் எடுத்து மனிதரானார். பொந்தியு பிலாத்துவின் காலத்தில் நமக்காகச் சிலுவையில் அறையப்பட்டு, பாடுபட்டு, அடக்கம் செய்யப்பட்டார். வேதவாக்கியங்களின்படி மூன்றாம் நாள் உயிர்த்தெழுந்தார். வானத்திற்கு ஏறி, பிதாவின் வலதுபக்கத்தில் அமர்ந்திருக்கிறார். உயிருள்ளோரையும் மரித்தோரையும் நியாயந்தீர்க்க மகிமையுடன் மறுபடியும் வருவார்; அவருடைய அரசுக்கு முடிவில்லை. கர்த்தரும் ஜீவனளிப்பவருமாகிய பரிசுத்த ஆவியை, பிதாவினிடத்திலிருந்து புறப்படுகிறவரை, பிதாவோடும் குமாரனோடும் ஒன்றாய் ஆராதிக்கப்பட்டு மகிமைப்படுத்தப்படுகிறவரை, தீர்க்கதரிசிகள் மூலம் பேசினவரை நான் விசுவாசிக்கிறேன். ஒரே பரிசுத்த, சர்வலோக, அப்போஸ்தல திருச்சபையை விசுவாசிக்கிறேன். பாவமன்னிப்புக்கான ஒரே ஞானஸ்நானத்தை அறிக்கையிடுகிறேன். மரித்தோரின் உயிர்த்தெழுதலையும், வரும் யுகத்தின் ஜீவனையும் எதிர்பார்க்கிறேன். ஆமென்.", id:"Aku percaya kepada satu Allah, Bapa Yang Mahakuasa, Pencipta langit dan bumi, dan segala sesuatu yang kelihatan dan tidak kelihatan. Dan kepada satu Tuhan Yesus Kristus, Putra Allah yang Tunggal, yang diperanakkan dari Bapa sebelum segala zaman; Terang dari Terang, Allah sejati dari Allah sejati, diperanakkan, bukan diciptakan, sehakikat dengan Bapa, yang melalui-Nya segala sesuatu dijadikan. Yang karena kita manusia dan karena keselamatan kita telah turun dari surga, dan menjelma oleh Roh Kudus dari Perawan Maria, dan menjadi manusia. Yang disalibkan bagi kita di bawah Pontius Pilatus, menderita dan dimakamkan. Dan bangkit pada hari ketiga, sesuai dengan Kitab Suci. Dan naik ke surga, dan duduk di sebelah kanan Bapa. Dan akan datang kembali dengan kemuliaan untuk menghakimi orang yang hidup dan yang mati; kerajaan-Nya tidak akan berkesudahan. Dan kepada Roh Kudus, Tuhan yang menghidupkan, yang keluar dari Bapa, yang bersama Bapa dan Putra disembah dan dimuliakan, yang telah bersabda melalui para nabi. Kepada satu Gereja yang kudus, katolik (am) dan apostolik. Aku mengaku satu baptisan untuk pengampunan dosa. Aku menantikan kebangkitan orang mati, dan kehidupan pada zaman yang akan datang. Amin.", vi:"Tôi tin kính một Thiên Chúa là Cha toàn năng, Đấng tạo thành trời đất, muôn vật hữu hình và vô hình. Tôi tin kính một Chúa Giêsu Kitô, Con Một Thiên Chúa, sinh bởi Đức Chúa Cha từ trước muôn đời; Người là Ánh Sáng bởi Ánh Sáng, Thiên Chúa thật bởi Thiên Chúa thật, được sinh ra mà không phải được tạo thành, đồng bản thể với Đức Chúa Cha, nhờ Người mà muôn vật được tạo thành. Vì loài người chúng ta và để cứu độ chúng ta, Người đã từ trời xuống thế, bởi phép Đức Chúa Thánh Thần, Người đã nhập thể từ Đức Trinh Nữ Maria, và đã làm người. Người chịu đóng đinh vào thập giá vì chúng ta thời Phongxiô Philatô, chịu khổ hình và mai táng. Ngày thứ ba Người sống lại đúng như lời Kinh Thánh. Người lên trời, ngự bên hữu Đức Chúa Cha. Và Người sẽ lại đến trong vinh quang để phán xét kẻ sống và kẻ chết, Nước Người sẽ không bao giờ cùng. Tôi tin kính Đức Chúa Thánh Thần là Chúa và là Đấng ban sự sống, Người bởi Đức Chúa Cha mà ra, Người được phụng thờ và tôn vinh cùng với Đức Chúa Cha và Đức Chúa Con, Người đã dùng các tiên tri mà phán dạy. Tôi tin kính một Hội Thánh duy nhất, thánh thiện, công giáo (phổ quát) và tông truyền. Tôi tuyên xưng có một phép rửa để tha tội. Tôi trông đợi kẻ chết sống lại và sự sống đời sau. Amen.", th:"ข้าพเจ้าเชื่อในพระเจ้าองค์เดียว พระบิดาผู้ทรงฤทธานุภาพ ผู้ทรงสร้างฟ้าสวรรค์และแผ่นดินโลก และสรรพสิ่งทั้งที่เห็นได้และเห็นไม่ได้ และในพระเยซูคริสต์องค์เดียว พระบุตรองค์เดียวของพระเจ้า ผู้ทรงบังเกิดจากพระบิดาก่อนกาลเวลาทั้งปวง ทรงเป็นแสงสว่างจากแสงสว่าง พระเจ้าแท้จากพระเจ้าแท้ ทรงบังเกิดมิใช่ทรงถูกสร้าง ทรงมีสภาวะเดียวกันกับพระบิดา สรรพสิ่งบังเกิดขึ้นโดยพระองค์ เพราะเห็นแก่เราทั้งหลายและเพื่อความรอดของเรา พระองค์เสด็จลงมาจากสวรรค์ ทรงรับสภาพมนุษย์โดยพระวิญญาณบริสุทธิ์จากพระนางมารีย์พรหมจารี และทรงบังเกิดเป็นมนุษย์ ในสมัยปอนทิอัสปีลาต พระองค์ทรงถูกตรึงกางเขนเพื่อเรา ทรงทนทุกข์และถูกฝังไว้ ในวันที่สามทรงคืนพระชนม์ตามพระคัมภีร์ เสด็จขึ้นสวรรค์ ประทับเบื้องขวาพระบิดา และจะเสด็จกลับมาด้วยพระสิริเพื่อพิพากษาคนเป็นและคนตาย พระอาณาจักรของพระองค์จะไม่มีที่สิ้นสุด และในพระวิญญาณบริสุทธิ์ องค์พระผู้เป็นเจ้า ผู้ประทานชีวิต ผู้ทรงเนื่องมาจากพระบิดา ผู้ทรงรับการนมัสการและการถวายพระสิริร่วมกับพระบิดาและพระบุตร ผู้ตรัสไว้ทางบรรดาผู้เผยพระวจนะ ข้าพเจ้าเชื่อในพระศาสนจักรเดียว ศักดิ์สิทธิ์ สากล และสืบมาแต่อัครสาวก ข้าพเจ้ายอมรับศีลล้างบาปเดียวเพื่อการยกโทษบาป ข้าพเจ้ารอคอยการคืนชีพของคนตาย และชีวิตในโลกหน้า อาเมน", ko:"나는 한 분이신 하느님, 전능하신 아버지, 하늘과 땅과 유형무형한 만물의 창조주를 믿나이다. 또한 한 분이신 주 예수 그리스도, 하느님의 외아들, 만세 전에 아버지께로부터 나신 분을 믿나이다. 빛으로부터 나신 빛이요, 참 하느님으로부터 나신 참 하느님이시며, 지음을 받지 않고 나셨으며, 아버지와 본질이 같으시고, 그로 말미암아 만물이 지어졌나이다. 그분은 우리 사람을 위하여, 우리의 구원을 위하여 하늘에서 내려오시어, 성령으로 동정녀 마리아에게서 육신을 취하시고 사람이 되셨나이다. 본시오 빌라도 치하에서 우리를 위하여 십자가에 못 박히시고, 고난을 받으시고, 묻히셨나이다. 성경 말씀대로 사흗날에 부활하시고, 하늘에 오르시어 아버지 오른편에 앉아 계시나이다. 산 이와 죽은 이를 심판하러 영광 중에 다시 오시리니, 그분의 나라는 끝이 없으리이다. 또한 주님이시요 생명을 주시는 성령을 믿나이다. 성령께서는 아버지께로부터 나오시고, 아버지와 아들과 더불어 같은 흠숭과 영광을 받으시며, 예언자들을 통하여 말씀하셨나이다. 하나이요 거룩하고 보편되며 사도로부터 이어오는 교회를 믿나이다. 죄를 사하는 하나의 세례를 고백하나이다. 죽은 이들의 부활과 내세의 삶을 기다리나이다. 아멘.", ja:"私は信じます、唯一の神、全能の父、天と地、見えるものと見えないもの、すべての造り主を。また唯一の主イイスス・ハリストス、神の独り子を信じます。主は万世の前に父から生まれ、光からの光、まことの神からのまことの神であり、造られたのではなく生まれ、父と一体であって、すべては主によって造られました。主は私たち人間のため、また私たちの救いのために天から降り、聖神と処女マリヤによって肉体を受け、人となられました。ポンティ・ピラトのもとで私たちのために十字架につけられ、苦しみを受け、葬られ、聖書のとおり三日目に復活し、天に昇り、父の右に座しておられます。主は生ける者と死せる者を裁くために、栄光をもって再び来られます。その国は終わることがありません。また私は聖神、主、生命を与える方を信じます。聖神は父から出て、父と子とともに拝まれ、崇められ、預言者たちを通して語られました。また私は、唯一の聖なる公なる使徒の教会を信じます。罪の赦しのための唯一の洗礼を認めます。死者の復活と来世の生命を待ち望みます。アミン。", tl:"Sumasampalataya ako sa iisang Diyos, ang Amang Makapangyarihan sa lahat, na May-likha ng langit at lupa, ng lahat ng nakikita at di-nakikita. At sa iisang Panginoong Jesukristo, ang Bugtong na Anak ng Diyos, na ipinanganak ng Ama bago pa ang lahat ng panahon; Liwanag buhat sa Liwanag, tunay na Diyos buhat sa tunay na Diyos, ipinanganak, hindi nilikha, kaisa sa pagka-Diyos ng Ama, na sa pamamagitan Niya nilikha ang lahat. Na dahil sa ating mga tao at sa ating kaligtasan ay bumaba mula sa langit, at nagkatawang-tao sa pamamagitan ng Espiritu Santo kay Mariang Birhen, at naging tao. Ipinako Siya sa krus para sa atin sa ilalim ni Poncio Pilato, nagdusa at inilibing. At muling nabuhay sa ikatlong araw ayon sa mga Kasulatan. At umakyat sa langit, at naluluklok sa kanan ng Ama. At muli Siyang paparito na may kaluwalhatian upang hukuman ang mga buhay at mga patay; ang Kanyang kaharian ay walang katapusan. At sa Espiritu Santo, ang Panginoon at Tagapagbigay-buhay, na nagmumula sa Ama, na sinasamba at niluluwalhati kasama ng Ama at ng Anak, na nagsalita sa pamamagitan ng mga propeta. Sa iisang Simbahang banal, katoliko (pangkalahatan) at apostoliko. Ipinapahayag ko ang iisang binyag para sa kapatawaran ng mga kasalanan. Hinihintay ko ang muling pagkabuhay ng mga patay, at ang buhay sa darating na panahon. Amen."}
  ]},

 {id:"anaphora", t:{en:"The Anaphora (The Eucharistic Offering)"}, tcs:"Анафора",
  lines:[
   {r:"d", cs:"Станем добре, станем со страхом, вонмем, Святое Возношение в мире приносити.", en:"Let us stand well; let us stand with fear; let us attend, that we may offer the holy oblation in peace."},
   {r:"c", cs:"Милость мира, Жертву хваления.", en:"A mercy of peace, a sacrifice of praise."},
   {r:"p", cs:"Благодать Господа нашего Иисуса Христа, и любы Бога и Отца, и причастие Святаго Духа, буди со всеми вами.", en:"The grace of our Lord Jesus Christ, and the love of God the Father, and the communion of the Holy Spirit, be with you all."},
   {r:"c", cs:"И со духом твоим.", en:"And with thy spirit."},
   {r:"p", cs:"Горе имеим сердца.", en:"Let us lift up our hearts."},
   {r:"c", cs:"Имамы ко Господу.", en:"We lift them up unto the Lord."},
   {r:"p", cs:"Благодарим Господа.", en:"Let us give thanks unto the Lord."},
   {r:"c", cs:"Достойно и праведно есть покланятися Отцу и Сыну и Святому Духу, Троице Единосущней и Нераздельней.", en:"It is meet and right to worship the Father, and the Son, and the Holy Spirit: the Trinity one in essence and undivided."},
   {r:"p", cs:"Победную песнь поюще, вопиюще, взывающе и глаголюще:", en:"Singing the triumphal hymn, shouting, proclaiming, and saying:"},
   {r:"c", cs:"Свят, Свят, Свят Господь Саваоф, исполнь небо и земля славы Твоея; осанна в вышних, благословен Грядый во Имя Господне, осанна в вышних.", en:"Holy, holy, holy, Lord of Sabaoth; heaven and earth are full of Thy glory. Hosanna in the highest. Blessed is He that cometh in the Name of the Lord. Hosanna in the highest."},
   {r:"p", cs:"Приимите, ядите, сие есть Тело Мое, еже за вы ломимое во оставление грехов.", en:"Take, eat: this is My Body, which is broken for you for the remission of sins."},
   {r:"c", cs:"Аминь.", en:"Amen."},
   {r:"p", cs:"Пийте от нея вси, сия есть Кровь Моя Новаго Завета, яже за вы и за многи изливаемая во оставление грехов.", en:"Drink of it, all of you: this is My Blood of the New Testament, which is shed for you and for many for the remission of sins."},
   {r:"c", cs:"Аминь.", en:"Amen."},
   {r:"p", cs:"Твоя от Твоих Тебе приносяще о всех и за вся.", en:"Thine own of Thine own we offer unto Thee, on behalf of all and for all."},
   {r:"c", cs:"Тебе поем, Тебе благословим, Тебе благодарим, Господи, и молим Ти ся, Боже наш.", en:"We praise Thee, we bless Thee, we give thanks unto Thee, O Lord, and we pray unto Thee, O our God."},
   {r:"p", cs:"Изрядно о Пресвятей, Пречистей, Преблагословенней, Славней Владычице нашей Богородице и Приснодеве Марии.", en:"Especially for our most holy, most pure, most blessed and glorious Lady Theotokos and ever-Virgin Mary."},
   {r:"c", cs:"Достойно есть, яко воистинну блажити Тя, Богородицу, Присноблаженную и Пренепорочную и Матерь Бога нашего. Честнейшую Херувим и Славнейшую без сравнения Серафим, без истления Бога Слова рождшую, сущую Богородицу Тя величаем.", en:"It is truly meet to bless thee, the Theotokos, ever-blessed and most blameless, and the Mother of our God. More honourable than the Cherubim, and beyond compare more glorious than the Seraphim, who without corruption gavest birth to God the Word: true Theotokos, we magnify thee."},
   {r:"ru", en:"On the great feasts, in place of “It is truly meet…” the festal refrain and irmos (the zadostoinik) are sung. At the Liturgy of St Basil the Great, “In thee rejoiceth…” is sung.", ru:"В двунадесятые праздники вместо «Достойно есть…» поется задостойник; на литургии святителя Василия Великого — «О Тебе радуется…»."},
   {r:"p", cs:"В первых помяни, Господи, Великаго Господина и Отца нашего (имя), Святейшаго Патриарха Московскаго и всея Руси, и Господина нашего Преосвященнейшаго (имя), ихже даруй святым Твоим Церквам в мире, целых, честных, здравых, долгоденствующих, право правящих слово Твоея истины.", en:"Among the first, remember, O Lord, our Great Lord and Father (name), His Holiness the Patriarch of Moscow and all Rus', and our lord the Most Reverend (name); grant them unto Thy holy churches in peace, safety, honour, and health, and length of days, rightly dividing the word of Thy truth."},
   {r:"c", cs:"И всех и вся.", en:"And all mankind."},
   {r:"p", cs:"И даждь нам единеми усты и единем сердцем славити и воспевати Пречестное и Великолепое Имя Твое, Отца и Сына и Святаго Духа, ныне и присно и во веки веков.", en:"And grant that with one mouth and one heart we may glorify and praise Thine all-honourable and majestic Name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."},
   {r:"p", cs:"И да будут милости Великаго Бога и Спаса нашего Иисуса Христа со всеми вами.", en:"And the mercies of our great God and Saviour Jesus Christ be with you all."},
   {r:"c", cs:"И со духом твоим.", en:"And with thy spirit."}
  ]},

 {id:"supplication2", t:{en:"The Litany before the Lord's Prayer"}, tcs:"Просительная ектения",
  lines:[
   {r:"d", cs:"Вся святыя помянувше, паки и паки миром Господу помолимся.", en:"Having remembered all the saints, again and again in peace let us pray to the Lord."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"d", cs:"О принесенных и освященных Честных Дарех Господу помолимся.", en:"For the precious Gifts offered and sanctified, let us pray to the Lord."},
   {r:"d", cs:"Яко да Человеколюбец Бог наш, приемь я во святый и пренебесный и мысленный Свой Жертвенник, в воню благоухания духовнаго, возниспослет нам Божественную благодать и дар Святаго Духа, помолимся.", en:"That our God who loveth mankind, having received them upon His holy and most heavenly and noetic altar as a savour of spiritual fragrance, may send down upon us the divine grace and the gift of the Holy Spirit, let us pray."},
   {r:"d", cs:"Соединение веры и причастие Святаго Духа испросивше, сами себе, и друг друга, и весь живот наш Христу Богу предадим.", en:"Having asked for the unity of the faith and the communion of the Holy Spirit, let us commend ourselves and one another, and all our life unto Christ our God."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"И сподоби нас, Владыко, со дерзновением, неосужденно смети призывати Тебе, Небеснаго Бога Отца, и глаголати:", en:"And make us worthy, O Master, that with boldness and without condemnation we may dare to call upon Thee, the heavenly God, as Father, and to say:"}
  ]},

 {id:"ourFather", t:{en:"The Lord's Prayer"}, tcs:"Отче наш",
  lines:[
   {r:"a", cs:"Отче наш, Иже еси на Небесех! Да святится Имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли. Хлеб наш насущный даждь нам днесь, и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избави нас от лукаваго.", en:"Our Father, who art in heaven, hallowed be Thy Name. Thy Kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from the evil one.", zh:"我们在天上的父：愿人都尊你的名为圣。愿你的国降临。愿你的旨意行在地上，如同行在天上。我们日用的饮食，今日赐给我们。免我们的债，如同我们免了人的债。不叫我们遇见试探，救我们脱离凶恶。", ms:"Ya Bapa kami yang di syurga, dikuduskanlah nama-Mu. Datanglah kerajaan-Mu. Jadilah kehendak-Mu di bumi seperti di syurga. Berikanlah kami pada hari ini makanan kami yang secukupnya, dan ampunkanlah kesalahan kami sebagaimana kami mengampuni orang yang bersalah kepada kami. Dan janganlah membawa kami ke dalam pencubaan, tetapi lepaskanlah kami daripada yang jahat.", ta:"பரமண்டலங்களில் இருக்கிற எங்கள் பிதாவே, உம்முடைய நாமம் பரிசுத்தப்படுவதாக; உம்முடைய ராஜ்யம் வருவதாக; உம்முடைய சித்தம் பரமண்டலத்தில் செய்யப்படுவதுபோல் பூமியிலும் செய்யப்படுவதாக; எங்கள் அனுதின உணவை இன்று எங்களுக்குத் தாரும்; எங்களுக்கு விரோதமாய்க் குற்றம் செய்தவர்களை நாங்கள் மன்னிப்பதுபோல எங்கள் குற்றங்களை மன்னியும்; எங்களைச் சோதனைக்குள் பிரவேசிக்கப்பண்ணாமல், தீமையினின்று எங்களை இரட்சித்தருளும்.", id:"Bapa kami yang di surga, dikuduskanlah nama-Mu. Datanglah Kerajaan-Mu, jadilah kehendak-Mu di bumi seperti di surga. Berikanlah kami pada hari ini makanan kami yang secukupnya, dan ampunilah kami akan kesalahan kami, seperti kami juga mengampuni orang yang bersalah kepada kami; dan janganlah membawa kami ke dalam pencobaan, tetapi lepaskanlah kami dari yang jahat.", vi:"Lạy Cha chúng con ở trên trời, chúng con nguyện danh Cha cả sáng, Nước Cha trị đến, ý Cha thể hiện dưới đất cũng như trên trời. Xin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con như chúng con cũng tha kẻ có nợ chúng con; xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi sự dữ.", th:"ข้าแต่พระบิดาของข้าพเจ้าทั้งหลาย ผู้สถิตในสวรรค์ ขอพระนามของพระองค์เป็นที่สักการะ ขอพระอาณาจักรของพระองค์มาถึง ขอให้น้ำพระทัยของพระองค์สำเร็จในแผ่นดินโลกเหมือนในสวรรค์ ขอประทานอาหารประจำวันแก่ข้าพเจ้าทั้งหลายในวันนี้ และโปรดยกโทษบาปของข้าพเจ้า เหมือนข้าพเจ้ายกโทษผู้ที่ทำผิดต่อข้าพเจ้า และขออย่าทรงนำข้าพเจ้าเข้าสู่การทดลอง แต่โปรดช่วยข้าพเจ้าให้พ้นจากความชั่วร้าย", ko:"하늘에 계신 우리 아버지, 아버지의 이름이 거룩히 빛나시며, 아버지의 나라가 임하시며, 아버지의 뜻이 하늘에서와 같이 땅에서도 이루어지소서. 오늘 우리에게 일용할 양식을 주시고, 우리가 우리에게 잘못한 이를 용서하듯이 우리 죄를 용서하시고, 우리를 시험에 들지 않게 하시고, 다만 악에서 구하소서.", ja:"天におられる私たちの父よ、み名が聖とされますように。み国が来ますように。みこころが天に行われるとおり、地にも行われますように。私たちの日ごとの糧を今日もお与えください。私たちが人の過ちを赦すように、私たちの過ちをお赦しください。私たちを誘惑に陥らせず、悪からお救いください。", tl:"Ama namin, sumasalangit Ka, sambahin ang ngalan Mo. Mapasaamin ang kaharian Mo, sundin ang loob Mo dito sa lupa para nang sa langit. Bigyan Mo kami ngayon ng aming kakanin sa araw-araw, at patawarin Mo kami sa aming mga sala, para nang pagpapatawad namin sa nagkakasala sa amin; at huwag Mo kaming ipahintulot sa tukso, at iadya Mo kami sa lahat ng masama."},
   {r:"p", cs:"Яко Твое есть Царство, и сила, и слава, Отца и Сына и Святаго Духа, ныне и присно и во веки веков.", en:"For Thine is the Kingdom, and the power, and the glory: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."},
   {r:"p", cs:"Мир всем.", en:"Peace be unto all."},
   {r:"c", cs:"И духови твоему.", en:"And to thy spirit."},
   {r:"d", cs:"Главы ваша Господеви приклоните.", en:"Bow your heads unto the Lord."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"Благодатию, и щедротами, и человеколюбием Единороднаго Сына Твоего, с Нимже благословен еси, со Пресвятым и Благим и Животворящим Твоим Духом, ныне и присно и во веки веков.", en:"By the grace, compassion, and love for mankind of Thine only-begotten Son, with whom Thou art blessed, together with Thy most holy, good, and life-creating Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"holyThings", t:{en:"Holy Things for the Holy"}, tcs:"Святая святым",
  lines:[
   {r:"d", cs:"Вонмем.", en:"Let us attend."},
   {r:"p", cs:"Святая святым.", en:"Holy Things are for the holy."},
   {r:"c", cs:"Един Свят, един Господь Иисус Христос, во славу Бога Отца. Аминь.", en:"One is Holy, one is Lord: Jesus Christ, to the glory of God the Father. Amen."}
  ]},

 {id:"communionVerse", t:{en:"The Communion Verse"}, tcs:"Причастен",
  lines:[
   {r:"ru", en:"While the clergy commune, the choir sings the communion verse of the day (each ends with a threefold Alleluia); on feasts the festal verse is used. The verse shown is for the chosen date.", ru:"Причастен дня поется, пока причащаются священнослужители; в конце — «аллилуиа» трижды. Ниже показан причастен выбранной даты. В праздники поется праздничный причастен."},
   {r:"table", rows:[
     {tag:"Sunday", day:"sun", cs:"Хвалите Господа с небес, хвалите Его в вышних. Аллилуиа, аллилуиа, аллилуиа.", en:"Praise the Lord from the heavens; praise Him in the highest. Alleluia, alleluia, alleluia."},
     {tag:"Monday", day:"mon", cs:"Творяй ангелы Своя духи, и слуги Своя пламень огненный. Аллилуиа.", en:"He maketh His angels spirits, and His ministers a flame of fire. Alleluia."},
     {tag:"Tuesday", day:"tue", cs:"В память вечную будет праведник, от слуха зла не убоится. Аллилуиа.", en:"In everlasting remembrance shall the righteous be; he shall not be afraid of evil tidings. Alleluia."},
     {tag:"Wednesday", day:"wed", cs:"Чашу спасения прииму и Имя Господне призову. Аллилуиа.", en:"I will take the cup of salvation, and I will call upon the Name of the Lord. Alleluia."},
     {tag:"Thursday", day:"thu", cs:"Во всю землю изыде вещание их, и в концы вселенныя глаголы их. Аллилуиа.", en:"Their sound is gone forth into all the earth, and their words unto the ends of the world. Alleluia."},
     {tag:"Friday", day:"fri", cs:"Спасение соделал еси посреде земли, Боже. Аллилуиа.", en:"Thou hast wrought salvation in the midst of the earth, O God. Alleluia."},
     {tag:"Saturday", day:"sat", cs:"Радуйтеся, праведнии, о Господе, правым подобает похвала. · Заупокойный: Блажени, яже избрал и приял еси, Господи. Аллилуиа.", en:"Rejoice in the Lord, O ye righteous; praise is meet for the upright. · For the departed: Blessed are they whom Thou hast chosen and taken, O Lord. Alleluia."}
   ]}
  ]},

 {id:"communion", t:{en:"Holy Communion"}, tcs:"Причащение",
  lines:[
   {r:"d", cs:"Со страхом Божиим и верою приступите!", en:"With the fear of God and with faith, draw near."},
   {r:"c", cs:"Благословен Грядый во Имя Господне, Бог Господь и явися нам.", en:"Blessed is He that cometh in the Name of the Lord; God is the Lord, and hath appeared unto us."},
   {r:"ru", en:"Before receiving, the communicants say with the priest the prayer before Communion:", ru:"Причастники читают вместе со священником молитву перед Причащением:"},
   {r:"a", cs:"Верую, Господи, и исповедую, яко Ты еси́ вои́стину Христо́с, Сын Бо́га жива́го, прише́дый в мир гре́шныя спасти́, от ни́хже пе́рвый есмь аз. Еще́ верую, яко сие́ есть са́мое пречи́стое Те́ло Твое́, и сия́ есть са́мая честна́я Кровь Твоя́. Молю́ся у́бо Тебе́: поми́луй мя и прости́ ми прегреше́ния моя́, во́льная и нево́льная, я́же сло́вом, я́же де́лом, я́же ве́дением и неве́дением, и сподо́би мя неосужде́нно причасти́тися пречи́стых Твои́х Та́ин, во оставле́ние грехо́в и в жизнь ве́чную. Ами́нь.\n\nВе́чери Твоея́ та́йныя днесь, Сы́не Бо́жий, прича́стника мя приими́; не бо враго́м Твои́м та́йну пове́м, ни лобза́ния Ти дам, я́ко Иу́да, но я́ко разбо́йник испове́дую Тя: помяни́ мя, Го́споди, во Ца́рствии Твое́м.\n\nДа не в суд или́ во осужде́ние бу́дет мне причаще́ние Святы́х Твои́х Та́ин, Го́споди, но во исцеле́ние души́ и те́ла. Ами́нь.", en:"I believe, O Lord, and I confess that Thou art truly the Christ, the Son of the living God, Who camest into the world to save sinners, of whom I am first. Moreover, I believe that this is truly Thine own most pure Body, and that this is truly Thine own precious Blood. Therefore I pray Thee: have mercy upon me and forgive my transgressions, both voluntary and involuntary, of word and of deed, of knowledge and of ignorance; and make me worthy to partake without condemnation of Thy most pure Mysteries, for the remission of sins and unto life everlasting. Amen.\n\nOf Thy Mystical Supper, O Son of God, accept me today as a communicant; for I will not speak of Thy Mystery to Thine enemies, neither like Judas will I give Thee a kiss; but like the thief will I confess Thee: Remember me, O Lord, in Thy Kingdom.\n\nMay the communion of Thy Holy Mysteries be neither to my judgment, nor to my condemnation, O Lord, but to the healing of soul and body. Amen.", zh:"主啊，我信，并且承认：你真是基督，永生上帝之子，你降世为要拯救罪人，而我是其中的首恶。我又信：这真是你至洁的圣体，这真是你宝贵的圣血。因此我求你：怜悯我，赦免我一切自愿与非自愿、言语与行为、明知与不知所犯的过犯；使我无罪地领受你至洁的奥秘，得蒙罪的赦免，并获永生。阿民。\n\n上帝之子啊，求你今日收纳我作你奥秘晚餐的领受者；因为我必不向你的仇敌泄露此奥秘，也不像犹大与你亲嘴，惟愿像那强盗一样向你承认：主啊，当你在你国里的时候，求你记念我。\n\n主啊，愿领受你的圣奥秘，不至于成为我的审判与定罪，而成为我灵魂与身体的医治。阿民。", ms:"Aku percaya, ya Tuhan, dan aku mengaku bahawa Engkaulah sebenarnya Kristus, Anak Allah yang hidup, yang datang ke dunia untuk menyelamatkan orang berdosa, dan akulah yang paling utama di antaranya. Aku juga percaya bahawa inilah sebenarnya Tubuh-Mu yang maha suci, dan inilah sebenarnya Darah-Mu yang berharga. Maka aku memohon kepada-Mu: kasihanilah aku dan ampunkanlah segala pelanggaranku, yang disengajakan dan yang tidak disengajakan, dengan perkataan dan perbuatan, dengan pengetahuan dan tanpa pengetahuan; dan jadikanlah aku layak menyambut Misteri-Mu yang maha suci tanpa penghukuman, untuk pengampunan dosa dan kehidupan kekal. Amin.\n\nYa Anak Allah, terimalah aku pada hari ini sebagai peserta Perjamuan Rahsia-Mu; kerana aku tidak akan membuka rahsia-Mu kepada musuh-musuh-Mu, dan tidak akan mencium-Mu seperti Yudas; tetapi seperti penyamun itu aku mengaku Engkau: Ingatlah aku, ya Tuhan, di dalam kerajaan-Mu.\n\nYa Tuhan, semoga penyambutan Misteri Kudus-Mu bukan menjadi penghakiman atau penghukuman bagiku, tetapi menjadi penyembuhan jiwa dan tubuh. Amin.", ta:"ஆண்டவரே, நான் விசுவாசிக்கிறேன், அறிக்கையிடுகிறேன்: ஜீவனுள்ள கடவுளின் குமாரனாகிய கிறிஸ்து நீரே; பாவிகளை இரட்சிக்க உலகிற்கு வந்தீர், அவர்களில் நானே முதன்மையானவன். மேலும், இது உண்மையிலேயே உம்முடைய மகா பரிசுத்த சரீரம் என்றும், இது உண்மையிலேயே உம்முடைய விலையேறப்பெற்ற இரத்தம் என்றும் விசுவாசிக்கிறேன். ஆகையால் உம்மை மன்றாடுகிறேன்: என்மேல் இரக்கமாயிரும்; அறிந்தும் அறியாமலும், சொல்லாலும் செயலாலும், விருப்பத்துடனும் விருப்பமின்றியும் நான் செய்த குற்றங்களை மன்னியும்; உம்முடைய மகா பரிசுத்த இரகசியங்களை நான் தண்டனையின்றி பெற்று, பாவமன்னிப்பையும் நித்திய ஜீவனையும் அடையத் தகுதியுள்ளவனாக்கும். ஆமென்.\n\nகடவுளின் குமாரனே, உம்முடைய இரகசிய இராவிருந்தில் இன்று என்னைப் பங்குபெறுபவனாக ஏற்றுக்கொள்ளும்; உம்முடைய பகைவர்களுக்கு இந்த இரகசியத்தை நான் வெளிப்படுத்தமாட்டேன், யூதாசைப்போல் உம்மை முத்தமிடவும் மாட்டேன்; கள்ளனைப்போல் உம்மை அறிக்கையிடுகிறேன்: ஆண்டவரே, உம்முடைய ராஜ்யத்தில் என்னை நினைத்தருளும்.\n\nஆண்டவரே, உம்முடைய பரிசுத்த இரகசியங்களைப் பெறுவது எனக்கு நியாயத்தீர்ப்பாகவோ ஆக்கினைத்தீர்ப்பாகவோ அன்றி, ஆன்மாவுக்கும் சரீரத்துக்கும் குணமாக்குதலாக இருப்பதாக. ஆமென்.", id:"Aku percaya, ya Tuhan, dan mengaku bahwa Engkau sungguh Kristus, Putra Allah yang hidup, yang datang ke dunia untuk menyelamatkan orang berdosa, dan akulah yang pertama di antaranya. Aku juga percaya bahwa inilah sungguh Tubuh-Mu yang mahakudus, dan inilah sungguh Darah-Mu yang berharga. Karena itu aku memohon kepada-Mu: kasihanilah aku dan ampunilah pelanggaranku, baik yang disengaja maupun yang tidak, dengan perkataan maupun perbuatan, dengan pengetahuan maupun tanpa pengetahuan; dan jadikanlah aku layak menyambut Misteri-Mu yang mahakudus tanpa penghukuman, untuk pengampunan dosa dan hidup kekal. Amin.\n\nYa Putra Allah, terimalah aku pada hari ini sebagai peserta Perjamuan Rahasia-Mu; sebab aku tidak akan membuka rahasia-Mu kepada musuh-musuh-Mu, dan tidak akan mencium-Mu seperti Yudas; tetapi seperti penyamun itu aku mengaku Engkau: Ingatlah aku, ya Tuhan, dalam Kerajaan-Mu.\n\nYa Tuhan, semoga penyambutan Misteri Kudus-Mu tidak menjadi penghakiman atau penghukuman bagiku, melainkan penyembuhan jiwa dan tubuh. Amin.", vi:"Lạy Chúa, con tin và tuyên xưng rằng Chúa thật là Đức Kitô, Con Thiên Chúa hằng sống, đã đến thế gian để cứu những người tội lỗi, mà con là người thứ nhất. Con cũng tin rằng đây thật là chính Mình Cực Thánh của Chúa, và đây thật là chính Máu châu báu của Chúa. Vậy con nài xin Chúa: xin thương xót con và tha thứ những lỗi lầm của con, cố ý cũng như vô tình, trong lời nói cũng như việc làm, trong hiểu biết cũng như vô tri; và xin cho con được xứng đáng lãnh nhận các Mầu nhiệm Cực Thánh của Chúa mà không bị kết án, để được tha tội và được sự sống đời đời. Amen.\n\nLạy Con Thiên Chúa, xin nhận con hôm nay làm người dự phần Bữa Tiệc Mầu nhiệm của Chúa; vì con sẽ không nói Mầu nhiệm của Chúa cho kẻ thù của Chúa, cũng không hôn Chúa như Giuđa; nhưng như người trộm lành, con tuyên xưng Chúa: Lạy Chúa, xin nhớ đến con khi Chúa vào Nước của Chúa.\n\nLạy Chúa, xin cho việc con hiệp thông các Mầu nhiệm Thánh của Chúa không trở nên sự xét xử hay kết án cho con, nhưng nên sự chữa lành hồn và xác. Amen.", th:"ข้าแต่พระเจ้า ข้าพเจ้าเชื่อและสารภาพว่า พระองค์ทรงเป็นพระคริสต์อย่างแท้จริง พระบุตรของพระเจ้าผู้ทรงพระชนม์ ผู้เสด็จมาในโลกเพื่อช่วยคนบาปให้รอด ซึ่งข้าพเจ้าเป็นคนแรกในบรรดาคนเหล่านั้น ยิ่งกว่านั้น ข้าพเจ้าเชื่อว่านี่คือพระกายอันบริสุทธิ์ยิ่งของพระองค์อย่างแท้จริง และนี่คือพระโลหิตอันประเสริฐของพระองค์อย่างแท้จริง เหตุฉะนั้นข้าพเจ้าจึงวิงวอนต่อพระองค์ ขอทรงเมตตาข้าพเจ้า และทรงยกโทษการล่วงละเมิดของข้าพเจ้า ทั้งที่จงใจและมิได้จงใจ ทั้งด้วยวาจาและการกระทำ ทั้งที่รู้และไม่รู้ และขอทรงโปรดให้ข้าพเจ้ามีค่าควรรับพระธรรมล้ำลึกอันบริสุทธิ์ของพระองค์โดยปราศจากการปรับโทษ เพื่อการยกบาปและเพื่อชีวิตนิรันดร์ อาเมน\n\nข้าแต่พระบุตรของพระเจ้า ขอทรงรับข้าพเจ้าในวันนี้ให้เป็นผู้ร่วมในพระกระยาหารอันลึกลับของพระองค์ เพราะข้าพเจ้าจะไม่เปิดเผยความล้ำลึกของพระองค์แก่ศัตรูของพระองค์ และจะไม่จูบพระองค์อย่างยูดาส แต่จะสารภาพพระองค์อย่างโจรผู้นั้นว่า ข้าแต่พระเจ้า ขอทรงระลึกถึงข้าพเจ้าเมื่อพระองค์เสด็จเข้าในพระอาณาจักรของพระองค์\n\nข้าแต่พระเจ้า ขอให้การรับพระธรรมล้ำลึกอันบริสุทธิ์ของพระองค์มิได้เป็นการพิพากษาหรือการปรับโทษแก่ข้าพเจ้า แต่เป็นการรักษาทั้งจิตวิญญาณและร่างกาย อาเมน", ko:"주님, 저는 믿으며 고백하나이다. 당신은 참으로 그리스도, 살아 계신 하느님의 아드님이시며, 죄인을 구원하러 세상에 오셨으니, 그중에 제가 첫째로소이다. 또한 저는 믿나이다. 이것이 참으로 당신의 지극히 순결하신 몸이며, 이것이 참으로 당신의 보배로우신 피임을. 그러므로 당신께 비오니, 저에게 자비를 베푸시고, 알고 지은 죄와 모르고 지은 죄, 말과 행위로, 뜻하고 뜻하지 않고 지은 저의 모든 허물을 용서하시며, 죄 사함과 영원한 생명을 위하여 당신의 지극히 순결하신 신비를 단죄 없이 받게 하소서. 아멘.\n\n하느님의 아드님이여, 오늘 저를 당신의 신비로운 만찬의 참여자로 받아 주소서. 저는 당신의 원수들에게 당신의 신비를 말하지 아니하며, 유다처럼 당신께 입 맞추지 아니하고, 오직 강도처럼 당신을 고백하나이다. 주님, 당신의 나라에서 저를 기억하소서.\n\n주님, 당신의 거룩한 신비를 받음이 저에게 심판이나 단죄가 되지 않고, 영혼과 육신의 치유가 되게 하소서. 아멘.", ja:"主よ、私は信じ、告白します。あなたはまことに生ける神の子ハリストスであり、罪人を救うために世に来られました。私はその罪人の中の第一の者です。また私は信じます。これはまことにあなたの至浄なる御体であり、これはまことにあなたの尊き御血であることを。ゆえに私はあなたに祈ります。私を憐れみ、故意と不本意、言葉と行い、知ってと知らずに犯した私のすべての過ちを赦し、罪の赦しと永遠の生命のために、あなたの至浄なる機密を、罪に定められることなくいただく者としてください。アミン。\n\n神の子よ、今日、私をあなたの神秘の晩餐にあずかる者としてお受け入れください。私はあなたの敵にあなたの機密を語らず、ユダのようにあなたに口づけせず、ただ盗賊のようにあなたを告白します。主よ、あなたの国で私を思い起こしてください。\n\n主よ、あなたの聖なる機密をいただくことが、私にとって裁きや罪の宣告とならず、魂と体の癒やしとなりますように。アミン。", tl:"Sumasampalataya ako, O Panginoon, at ipinagtatapat na Ikaw nga ang Kristo, ang Anak ng buhay na Diyos, na naparito sa sanlibutan upang iligtas ang mga makasalanan, na ako ang pinakauna. Sumasampalataya rin ako na ito nga ang Iyong kasakdal-sakdalang Katawan, at ito nga ang Iyong mahalagang Dugo. Kaya't nagsusumamo ako sa Iyo: kaawaan Mo ako at patawarin ang aking mga kasalanan, sinadya man o hindi, sa salita man o sa gawa, sa kaalaman man o sa kamangmangan; at gawin Mo akong karapat-dapat na makatanggap nang walang kahatulan ng Iyong kasakdal-sakdalang mga Misteryo, para sa kapatawaran ng mga kasalanan at sa buhay na walang hanggan. Amen.\n\nO Anak ng Diyos, tanggapin Mo ako ngayon bilang kabahagi sa Iyong Mahiwagang Hapunan; sapagkat hindi ko sasabihin ang Iyong Misteryo sa Iyong mga kaaway, ni hahagkan Kita na gaya ni Judas; kundi gaya ng magnanakaw ay ipinagtatapat Kita: Alalahanin Mo ako, O Panginoon, sa Iyong Kaharian.\n\nO Panginoon, nawa ang pakikinabang sa Iyong Banal na mga Misteryo ay huwag maging hatol o kahatulan sa akin, kundi kagalingan ng kaluluwa at katawan. Amen."},
   {r:"p", cs:"Причащается раб Божий (имя) Честнаго и Святаго Тела и Крове Господа и Бога и Спаса нашего Иисуса Христа, во оставление грехов своих и в Жизнь Вечную.", en:"The servant of God (name) partaketh of the precious and holy Body and Blood of our Lord and God and Saviour Jesus Christ, for the remission of sins and unto life everlasting."},
   {r:"c", cs:"Тело Христово приимите, Источника безсмертнаго вкусите.", en:"Receive ye the Body of Christ; taste ye the Fountain of immortality."}
  ]},

 {id:"afterCommunion", t:{en:"After Communion"}, tcs:"По причащении",
  lines:[
   {r:"p", cs:"Спаси, Боже, люди Твоя и благослови достояние Твое.", en:"Save, O God, Thy people, and bless Thine inheritance."},
   {r:"c", cs:"Видехом Свет истинный, прияхом Духа Небеснаго, обретохом веру истинную, Нераздельней Троице покланяемся: Та бо нас спасла есть.", en:"We have seen the true Light, we have received the heavenly Spirit, we have found the true faith, worshipping the undivided Trinity; for the Trinity hath saved us."},
   {r:"p", cs:"Всегда, ныне и присно и во веки веков.", en:"Always, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь. Да исполнятся уста наша хваления Твоего, Господи, яко да поем славу Твою, яко сподобил еси нас причаститися Святым Твоим, Божественным, Безсмертным и Животворящим Тайнам; соблюди нас во Твоей святыни, весь день поучатися правде Твоей. Аллилуиа, аллилуиа, аллилуиа.", en:"Amen. Let our mouths be filled with Thy praise, O Lord, that we may sing of Thy glory; for Thou hast made us worthy to partake of Thy holy, divine, immortal, and life-creating Mysteries. Keep us in Thy holiness, that all the day long we may meditate upon Thy righteousness. Alleluia, alleluia, alleluia."}
  ]},

 {id:"thanksgivingLitany", t:{en:"The Litany of Thanksgiving"}, tcs:"Благодарственная ектения",
  lines:[
   {r:"d", cs:"Прости приимше Божественных, Святых, Пречистых, Безсмертных, Небесных и Животворящих, Страшных Христовых Таин, достойно благодарим Господа.", en:"Standing upright, having partaken of the divine, holy, most pure, immortal, heavenly, life-creating, and dread Mysteries of Christ, let us worthily give thanks unto the Lord."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"d", cs:"Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.", en:"Help us, save us, have mercy on us, and keep us, O God, by Thy grace."},
   {r:"d", cs:"День весь совершен, свят, мирен и безгрешен испросивше, сами себе, и друг друга, и весь живот наш Христу Богу предадим.", en:"Having asked that the whole day may be perfect, holy, peaceful, and sinless, let us commend ourselves and one another, and all our life unto Christ our God."},
   {r:"c", cs:"Тебе, Господи.", en:"To Thee, O Lord."},
   {r:"p", cs:"Яко Ты еси Освящение наше, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.", en:"For Thou art our sanctification, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."}
  ]},

 {id:"dismissal", t:{en:"The Dismissal"}, tcs:"Отпуст",
  lines:[
   {r:"p", cs:"С миром изыдем.", en:"Let us depart in peace."},
   {r:"c", cs:"О имени Господни.", en:"In the Name of the Lord."},
   {r:"d", cs:"Господу помолимся.", en:"Let us pray to the Lord."},
   {r:"c", cs:"Господи, помилуй.", en:"Lord, have mercy."},
   {r:"p", cs:"Благословляяй благословящия Тя, Господи, и освящаяй на Тя уповающия, спаси люди Твоя и благослови достояние Твое, исполнение Церкве Твоея сохрани, освяти любящия благолепие дому Твоего; Ты тех возпрослави Божественною Твоею силою, и не остави нас, уповающих на Тя. Мир мирови Твоему даруй, Церквам Твоим, священником, и всем людем Твоим. Яко всякое даяние благо, и всяк дар совершен свыше есть, сходяй от Тебе, Отца Светов; и Тебе славу, и благодарение, и поклонение возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.", en:"The Prayer behind the Ambo: O Lord, who blessest them that bless Thee, and sanctifiest them that put their trust in Thee: save Thy people and bless Thine inheritance; preserve the fullness of Thy Church; sanctify them that love the beauty of Thy house; glorify them in return by Thy divine power, and forsake not us that hope in Thee. Give peace to Thy world, to Thy churches, to the priests, and to all Thy people. For every good gift and every perfect gift is from above, coming down from Thee, the Father of lights; and unto Thee do we send up glory, and thanksgiving, and worship: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь. Буди Имя Господне благословено отныне и до века. (Трижды)", en:"Amen. Blessed be the Name of the Lord, henceforth and for evermore. (Thrice)"},
   {r:"ru", en:"Psalm 33 (“I will bless the Lord at all times…”) is sung.", ru:"Поется псалом 33 «Благословлю Господа на всякое время…»."},
   {r:"p", cs:"Благословение Господне на вас, Того благодатию и человеколюбием, всегда, ныне и присно и во веки веков.", en:"The blessing of the Lord be upon you, through His grace and love for mankind, always, now and ever, and unto ages of ages."},
   {r:"c", cs:"Аминь.", en:"Amen."},
   {r:"p", cs:"Слава Тебе, Христе Боже, Упование наше, слава Тебе.", en:"Glory to Thee, O Christ God, our hope, glory to Thee."},
   {r:"c", cs:"Слава, и ныне. Господи, помилуй. (Трижды) Благослови.", en:"Glory to the Father… Now and ever… Lord, have mercy. (Thrice) Father, bless."},
   {r:"slot", h:{en:"Variable — the Dismissal of the day"}, en:"The priest gives the dismissal, naming the day (Sunday: “May Christ our true God, who rose from the dead…”), the saints of the temple and of the day, and the holy ancestors of God Joachim and Anna, and all the saints."},
   {r:"c", cs:"Великаго Господина и Отца нашего (имя), Святейшаго Патриарха Московскаго и всея Руси, и Господина нашего Преосвященнейшаго (имя), братию святаго храма сего и вся православныя христианы, Господи, сохрани их на многая лета.", en:"Our Great Lord and Father (name), His Holiness the Patriarch of Moscow and all Rus', and our lord the Most Reverend (name), the brethren of this holy temple, and all Orthodox Christians: O Lord, preserve them for many years."}
  ]}

 ]
};
if(typeof window!=="undefined") window.LITURGY_DATA=LITURGY_DATA;
