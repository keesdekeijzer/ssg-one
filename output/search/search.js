
document.getElementById("searchForm").addEventListener("submit", search);
function search() {var terms = new Array();
var pages = new Array();
var notfoundtext = "No results found";
var foundtext = "Resultaten:";
terms[1] = new Array();terms[1]['word'] = 'mijn';terms[1]['count'] = 4;terms[1]['page'] = '7';
terms[2] = new Array();terms[2]['word'] = 'zevende';terms[2]['count'] = 6;terms[2]['page'] = '7';
terms[3] = new Array();terms[3]['word'] = 'post';terms[3]['count'] = 3;terms[3]['page'] = '7';
terms[4] = new Array();terms[4]['word'] = '-';terms[4]['count'] = 3;terms[4]['page'] = '7';
terms[5] = new Array();terms[5]['word'] = 'code';terms[5]['count'] = 3;terms[5]['page'] = '7';
terms[6] = new Array();terms[6]['word'] = 'blogpost';terms[6]['count'] = 3;terms[6]['page'] = '7';
terms[7] = new Array();terms[7]['word'] = 'welkom';terms[7]['count'] = 1;terms[7]['page'] = '7';
terms[8] = new Array();terms[8]['word'] = 'bij';terms[8]['count'] = 1;terms[8]['page'] = '7';
terms[9] = new Array();terms[9]['word'] = 'dit';terms[9]['count'] = 1;terms[9]['page'] = '7';
terms[10] = new Array();terms[10]['word'] = 'is';terms[10]['count'] = 1;terms[10]['page'] = '7';
terms[11] = new Array();terms[11]['word'] = 'markdown';terms[11]['count'] = 1;terms[11]['page'] = '7';
terms[12] = new Array();terms[12]['word'] = 'def';terms[12]['count'] = 1;terms[12]['page'] = '7';
terms[13] = new Array();terms[13]['word'] = 'hello';terms[13]['count'] = 1;terms[13]['page'] = '7';
terms[14] = new Array();terms[14]['word'] = 'print';terms[14]['count'] = 1;terms[14]['page'] = '7';
terms[15] = new Array();terms[15]['word'] = 'hallo';terms[15]['count'] = 1;terms[15]['page'] = '7';
terms[16] = new Array();terms[16]['word'] = 'wereld';terms[16]['count'] = 1;terms[16]['page'] = '7';
terms[17] = new Array();terms[17]['word'] = 'mijn';terms[17]['count'] = 4;terms[17]['page'] = '0';
terms[18] = new Array();terms[18]['word'] = 'eerste';terms[18]['count'] = 6;terms[18]['page'] = '0';
terms[19] = new Array();terms[19]['word'] = 'post';terms[19]['count'] = 5;terms[19]['page'] = '0';
terms[20] = new Array();terms[20]['word'] = 'blogpost';terms[20]['count'] = 3;terms[20]['page'] = '0';
terms[21] = new Array();terms[21]['word'] = 'welkom';terms[21]['count'] = 1;terms[21]['page'] = '0';
terms[22] = new Array();terms[22]['word'] = 'bij';terms[22]['count'] = 1;terms[22]['page'] = '0';
terms[23] = new Array();terms[23]['word'] = 'dit';terms[23]['count'] = 1;terms[23]['page'] = '0';
terms[24] = new Array();terms[24]['word'] = 'is';terms[24]['count'] = 1;terms[24]['page'] = '0';
terms[25] = new Array();terms[25]['word'] = 'markdown';terms[25]['count'] = 7;terms[25]['page'] = '0';
terms[26] = new Array();terms[26]['word'] = 'ssg';terms[26]['count'] = 5;terms[26]['page'] = '0';
terms[27] = new Array();terms[27]['word'] = 'one';terms[27]['count'] = 6;terms[27]['page'] = '0';
terms[28] = new Array();terms[28]['word'] = 'static';terms[28]['count'] = 4;terms[28]['page'] = '0';
terms[29] = new Array();terms[29]['word'] = 'site';terms[29]['count'] = 1;terms[29]['page'] = '0';
terms[30] = new Array();terms[30]['word'] = 'generator';terms[30]['count'] = 1;terms[30]['page'] = '0';
terms[31] = new Array();terms[31]['word'] = 'directory';terms[31]['count'] = 3;terms[31]['page'] = '0';
terms[32] = new Array();terms[32]['word'] = 'structuur';terms[32]['count'] = 2;terms[32]['page'] = '0';
terms[33] = new Array();terms[33]['word'] = 'content';terms[33]['count'] = 4;terms[33]['page'] = '0';
terms[34] = new Array();terms[34]['word'] = 'posts';terms[34]['count'] = 3;terms[34]['page'] = '0';
terms[35] = new Array();terms[35]['word'] = 'bestanden';terms[35]['count'] = 4;terms[35]['page'] = '0';
terms[36] = new Array();terms[36]['word'] = 'met';terms[36]['count'] = 6;terms[36]['page'] = '0';
terms[37] = new Array();terms[37]['word'] = 'metadata';terms[37]['count'] = 4;terms[37]['page'] = '0';
terms[38] = new Array();terms[38]['word'] = 'titel';terms[38]['count'] = 3;terms[38]['page'] = '0';
terms[39] = new Array();terms[39]['word'] = 'datum';terms[39]['count'] = 2;terms[39]['page'] = '0';
terms[40] = new Array();terms[40]['word'] = 'tags';terms[40]['count'] = 2;terms[40]['page'] = '0';
terms[41] = new Array();terms[41]['word'] = 'pages';terms[41]['count'] = 1;terms[41]['page'] = '0';
terms[42] = new Array();terms[42]['word'] = 'templates';terms[42]['count'] = 4;terms[42]['page'] = '0';
terms[43] = new Array();terms[43]['word'] = 'jinja2';terms[43]['count'] = 2;terms[43]['page'] = '0';
terms[44] = new Array();terms[44]['word'] = 'voor';terms[44]['count'] = 8;terms[44]['page'] = '0';
terms[45] = new Array();terms[45]['word'] = 'bijvoorbeeld';terms[45]['count'] = 3;terms[45]['page'] = '0';
terms[46] = new Array();terms[46]['word'] = 'base';terms[46]['count'] = 1;terms[46]['page'] = '0';
terms[47] = new Array();terms[47]['word'] = 'html';terms[47]['count'] = 8;terms[47]['page'] = '0';
terms[48] = new Array();terms[48]['word'] = 'en';terms[48]['count'] = 7;terms[48]['page'] = '0';
terms[49] = new Array();terms[49]['word'] = 'assets';terms[49]['count'] = 2;terms[49]['page'] = '0';
terms[50] = new Array();terms[50]['word'] = 'zoals';terms[50]['count'] = 1;terms[50]['page'] = '0';
terms[51] = new Array();terms[51]['word'] = 'css';terms[51]['count'] = 1;terms[51]['page'] = '0';
terms[52] = new Array();terms[52]['word'] = 'js';terms[52]['count'] = 1;terms[52]['page'] = '0';
terms[53] = new Array();terms[53]['word'] = 'afbeeldingen';terms[53]['count'] = 1;terms[53]['page'] = '0';
terms[54] = new Array();terms[54]['word'] = 'output';terms[54]['count'] = 3;terms[54]['page'] = '0';
terms[55] = new Array();terms[55]['word'] = 'waar';terms[55]['count'] = 1;terms[55]['page'] = '0';
terms[56] = new Array();terms[56]['word'] = 'de';terms[56]['count'] = 5;terms[56]['page'] = '0';
terms[57] = new Array();terms[57]['word'] = 'uiteindelijke';terms[57]['count'] = 1;terms[57]['page'] = '0';
terms[58] = new Array();terms[58]['word'] = 'pagina';terms[58]['count'] = 4;terms[58]['page'] = '0';
terms[59] = new Array();terms[59]['word'] = 's';terms[59]['count'] = 4;terms[59]['page'] = '0';
terms[60] = new Array();terms[60]['word'] = 'worden';terms[60]['count'] = 1;terms[60]['page'] = '0';
terms[61] = new Array();terms[61]['word'] = 'weggeschreven';terms[61]['count'] = 1;terms[61]['page'] = '0';
terms[62] = new Array();terms[62]['word'] = 'acties';terms[62]['count'] = 1;terms[62]['page'] = '0';
terms[63] = new Array();terms[63]['word'] = 'inlezen';terms[63]['count'] = 1;terms[63]['page'] = '0';
terms[64] = new Array();terms[64]['word'] = 'frontmatter';terms[64]['count'] = 2;terms[64]['page'] = '0';
terms[65] = new Array();terms[65]['word'] = 'scheiden';terms[65]['count'] = 1;terms[65]['page'] = '0';
terms[66] = new Array();terms[66]['word'] = 'van';terms[66]['count'] = 3;terms[66]['page'] = '0';
terms[67] = new Array();terms[67]['word'] = 'tekst';terms[67]['count'] = 1;terms[67]['page'] = '0';
terms[68] = new Array();terms[68]['word'] = 'naar';terms[68]['count'] = 4;terms[68]['page'] = '0';
terms[69] = new Array();terms[69]['word'] = 'omzetten';terms[69]['count'] = 1;terms[69]['page'] = '0';
terms[70] = new Array();terms[70]['word'] = 'elke';terms[70]['count'] = 1;terms[70]['page'] = '0';
terms[71] = new Array();terms[71]['word'] = 'wegschrijven';terms[71]['count'] = 1;terms[71]['page'] = '0';
terms[72] = new Array();terms[72]['word'] = 'als';terms[72]['count'] = 2;terms[72]['page'] = '0';
terms[73] = new Array();terms[73]['word'] = 'index';terms[73]['count'] = 3;terms[73]['page'] = '0';
terms[74] = new Array();terms[74]['word'] = 'een';terms[74]['count'] = 6;terms[74]['page'] = '0';
terms[75] = new Array();terms[75]['word'] = 'eigen';terms[75]['count'] = 1;terms[75]['page'] = '0';
terms[76] = new Array();terms[76]['word'] = 'zodat';terms[76]['count'] = 1;terms[76]['page'] = '0';
terms[77] = new Array();terms[77]['word'] = 'je';terms[77]['count'] = 2;terms[77]['page'] = '0';
terms[78] = new Array();terms[78]['word'] = 'mooie';terms[78]['count'] = 1;terms[78]['page'] = '0';
terms[79] = new Array();terms[79]['word'] = 'urls';terms[79]['count'] = 1;terms[79]['page'] = '0';
terms[80] = new Array();terms[80]['word'] = 'krijgt';terms[80]['count'] = 1;terms[80]['page'] = '0';
terms[81] = new Array();terms[81]['word'] = 'alles';terms[81]['count'] = 1;terms[81]['page'] = '0';
terms[82] = new Array();terms[82]['word'] = 'uit';terms[82]['count'] = 1;terms[82]['page'] = '0';
terms[83] = new Array();terms[83]['word'] = 'kopieren';terms[83]['count'] = 2;terms[83]['page'] = '0';
terms[84] = new Array();terms[84]['word'] = 'python';terms[84]['count'] = 5;terms[84]['page'] = '0';
terms[85] = new Array();terms[85]['word'] = 'libraries';terms[85]['count'] = 1;terms[85]['page'] = '0';
terms[86] = new Array();terms[86]['word'] = 'omzetting';terms[86]['count'] = 1;terms[86]['page'] = '0';
terms[87] = new Array();terms[87]['word'] = 'build';terms[87]['count'] = 2;terms[87]['page'] = '0';
terms[88] = new Array();terms[88]['word'] = 'functie';terms[88]['count'] = 2;terms[88]['page'] = '0';
terms[89] = new Array();terms[89]['word'] = 'door';terms[89]['count'] = 1;terms[89]['page'] = '0';
terms[90] = new Array();terms[90]['word'] = 'alle';terms[90]['count'] = 2;terms[90]['page'] = '0';
terms[91] = new Array();terms[91]['word'] = 'in';terms[91]['count'] = 1;terms[91]['page'] = '0';
terms[92] = new Array();terms[92]['word'] = 'lopen';terms[92]['count'] = 1;terms[92]['page'] = '0';
terms[93] = new Array();terms[93]['word'] = 'elk';terms[93]['count'] = 1;terms[93]['page'] = '0';
terms[94] = new Array();terms[94]['word'] = 'bestand';terms[94]['count'] = 3;terms[94]['page'] = '0';
terms[95] = new Array();terms[95]['word'] = 'generen';terms[95]['count'] = 2;terms[95]['page'] = '0';
terms[96] = new Array();terms[96]['word'] = 'toepassen';terms[96]['count'] = 1;terms[96]['page'] = '0';
terms[97] = new Array();terms[97]['word'] = 'extra';terms[97]['count'] = 1;terms[97]['page'] = '0';
terms[98] = new Array();terms[98]['word'] = 'functionaliteit';terms[98]['count'] = 1;terms[98]['page'] = '0';
terms[99] = new Array();terms[99]['word'] = 'blog';terms[99]['count'] = 2;terms[99]['page'] = '0';
terms[100] = new Array();terms[100]['word'] = 'tag';terms[100]['count'] = 1;terms[100]['page'] = '0';
terms[101] = new Array();terms[101]['word'] = 'rss';terms[101]['count'] = 1;terms[101]['page'] = '0';
terms[102] = new Array();terms[102]['word'] = 'feed';terms[102]['count'] = 1;terms[102]['page'] = '0';
terms[103] = new Array();terms[103]['word'] = 'sitemap';terms[103]['count'] = 1;terms[103]['page'] = '0';
terms[104] = new Array();terms[104]['word'] = 'xml';terms[104]['count'] = 1;terms[104]['page'] = '0';
terms[105] = new Array();terms[105]['word'] = 'live';terms[105]['count'] = 3;terms[105]['page'] = '0';
terms[106] = new Array();terms[106]['word'] = 'reload';terms[106]['count'] = 1;terms[106]['page'] = '0';
terms[107] = new Array();terms[107]['word'] = 'server';terms[107]['count'] = 4;terms[107]['page'] = '0';
terms[108] = new Array();terms[108]['word'] = 'caching';terms[108]['count'] = 1;terms[108]['page'] = '0';
terms[109] = new Array();terms[109]['word'] = 'alleen';terms[109]['count'] = 1;terms[109]['page'] = '0';
terms[110] = new Array();terms[110]['word'] = 'gewijzigde';terms[110]['count'] = 1;terms[110]['page'] = '0';
terms[111] = new Array();terms[111]['word'] = 'opnieuw';terms[111]['count'] = 2;terms[111]['page'] = '0';
terms[112] = new Array();terms[112]['word'] = 'plugin';terms[112]['count'] = 1;terms[112]['page'] = '0';
terms[113] = new Array();terms[113]['word'] = 'systeem';terms[113]['count'] = 1;terms[113]['page'] = '0';
terms[114] = new Array();terms[114]['word'] = 'uitbreidingen';terms[114]['count'] = 1;terms[114]['page'] = '0';
terms[115] = new Array();terms[115]['word'] = 'cli';terms[115]['count'] = 1;terms[115]['page'] = '0';
terms[116] = new Array();terms[116]['word'] = 'tool';terms[116]['count'] = 1;terms[116]['page'] = '0';
terms[117] = new Array();terms[117]['word'] = 'commandline';terms[117]['count'] = 1;terms[117]['page'] = '0';
terms[118] = new Array();terms[118]['word'] = 'interface';terms[118]['count'] = 1;terms[118]['page'] = '0';
terms[119] = new Array();terms[119]['word'] = 'serve';terms[119]['count'] = 2;terms[119]['page'] = '0';
terms[120] = new Array();terms[120]['word'] = 'sg';terms[120]['count'] = 1;terms[120]['page'] = '0';
terms[121] = new Array();terms[121]['word'] = 'new';terms[121]['count'] = 1;terms[121]['page'] = '0';
terms[122] = new Array();terms[122]['word'] = 'configuratie';terms[122]['count'] = 2;terms[122]['page'] = '0';
terms[123] = new Array();terms[123]['word'] = 'via';terms[123]['count'] = 1;terms[123]['page'] = '0';
terms[124] = new Array();terms[124]['word'] = 'config';terms[124]['count'] = 1;terms[124]['page'] = '0';
terms[125] = new Array();terms[125]['word'] = 'yaml';terms[125]['count'] = 1;terms[125]['page'] = '0';
terms[126] = new Array();terms[126]['word'] = 'sitetitel';terms[126]['count'] = 1;terms[126]['page'] = '0';
terms[127] = new Array();terms[127]['word'] = 'beschrijving';terms[127]['count'] = 1;terms[127]['page'] = '0';
terms[128] = new Array();terms[128]['word'] = 'basis';terms[128]['count'] = 1;terms[128]['page'] = '0';
terms[129] = new Array();terms[129]['word'] = 'url';terms[129]['count'] = 4;terms[129]['page'] = '0';
terms[130] = new Array();terms[130]['word'] = 'paden';terms[130]['count'] = 1;terms[130]['page'] = '0';
terms[131] = new Array();terms[131]['word'] = 'menu';terms[131]['count'] = 1;terms[131]['page'] = '0';
terms[132] = new Array();terms[132]['word'] = 'navigatie';terms[132]['count'] = 1;terms[132]['page'] = '0';
terms[133] = new Array();terms[133]['word'] = 'bloginstellingen';terms[133]['count'] = 1;terms[133]['page'] = '0';
terms[134] = new Array();terms[134]['word'] = 'aantal';terms[134]['count'] = 1;terms[134]['page'] = '0';
terms[135] = new Array();terms[135]['word'] = 'op';terms[135]['count'] = 3;terms[135]['page'] = '0';
terms[136] = new Array();terms[136]['word'] = 'sortering';terms[136]['count'] = 1;terms[136]['page'] = '0';
terms[137] = new Array();terms[137]['word'] = 'slug';terms[137]['count'] = 2;terms[137]['page'] = '0';
terms[138] = new Array();terms[138]['word'] = 'i';terms[138]['count'] = 1;terms[138]['page'] = '0';
terms[139] = new Array();terms[139]['word'] = 'p';terms[139]['count'] = 1;terms[139]['page'] = '0';
terms[140] = new Array();terms[140]['word'] = 'v';terms[140]['count'] = 1;terms[140]['page'] = '0';
terms[141] = new Array();terms[141]['word'] = 'development';terms[141]['count'] = 1;terms[141]['page'] = '0';
terms[142] = new Array();terms[142]['word'] = 'lokale';terms[142]['count'] = 1;terms[142]['page'] = '0';
terms[143] = new Array();terms[143]['word'] = 'webserver';terms[143]['count'] = 1;terms[143]['page'] = '0';
terms[144] = new Array();terms[144]['word'] = 'die';terms[144]['count'] = 3;terms[144]['page'] = '0';
terms[145] = new Array();terms[145]['word'] = 'automatisch';terms[145]['count'] = 2;terms[145]['page'] = '0';
terms[146] = new Array();terms[146]['word'] = 'ververst';terms[146]['count'] = 1;terms[146]['page'] = '0';
terms[147] = new Array();terms[147]['word'] = 'iets';terms[147]['count'] = 1;terms[147]['page'] = '0';
terms[148] = new Array();terms[148]['word'] = 'aanpast';terms[148]['count'] = 1;terms[148]['page'] = '0';
terms[149] = new Array();terms[149]['word'] = 'nodig';terms[149]['count'] = 1;terms[149]['page'] = '0';
terms[150] = new Array();terms[150]['word'] = 'watchdog';terms[150]['count'] = 1;terms[150]['page'] = '0';
terms[151] = new Array();terms[151]['word'] = 'het';terms[151]['count'] = 1;terms[151]['page'] = '0';
terms[152] = new Array();terms[152]['word'] = 'opmerken';terms[152]['count'] = 1;terms[152]['page'] = '0';
terms[153] = new Array();terms[153]['word'] = 'bestandswijzigingen';terms[153]['count'] = 1;terms[153]['page'] = '0';
terms[154] = new Array();terms[154]['word'] = 'livereload';terms[154]['count'] = 1;terms[154]['page'] = '0';
terms[155] = new Array();terms[155]['word'] = 'draaien';terms[155]['count'] = 1;terms[155]['page'] = '0';
terms[156] = new Array();terms[156]['word'] = 'browser';terms[156]['count'] = 1;terms[156]['page'] = '0';
terms[157] = new Array();terms[157]['word'] = 'verversen';terms[157]['count'] = 1;terms[157]['page'] = '0';
terms[158] = new Array();terms[158]['word'] = 'gebruik';terms[158]['count'] = 1;terms[158]['page'] = '0';
terms[159] = new Array();terms[159]['word'] = 'normaal';terms[159]['count'] = 1;terms[159]['page'] = '0';
terms[160] = new Array();terms[160]['word'] = 'builden';terms[160]['count'] = 1;terms[160]['page'] = '0';
terms[161] = new Array();terms[161]['word'] = 'py';terms[161]['count'] = 2;terms[161]['page'] = '0';
terms[162] = new Array();terms[162]['word'] = 'starten';terms[162]['count'] = 1;terms[162]['page'] = '0';
terms[163] = new Array();terms[163]['word'] = 'website';terms[163]['count'] = 1;terms[163]['page'] = '0';
terms[164] = new Array();terms[164]['word'] = 'wordt';terms[164]['count'] = 1;terms[164]['page'] = '0';
terms[165] = new Array();terms[165]['word'] = 'gegenereerd';terms[165]['count'] = 1;terms[165]['page'] = '0';
terms[166] = new Array();terms[166]['word'] = 'http';terms[166]['count'] = 1;terms[166]['page'] = '0';
terms[167] = new Array();terms[167]['word'] = 'localhost';terms[167]['count'] = 1;terms[167]['page'] = '0';
terms[168] = new Array();terms[168]['word'] = '5500';terms[168]['count'] = 1;terms[168]['page'] = '0';
terms[169] = new Array();terms[169]['word'] = 'shortcodes';terms[169]['count'] = 4;terms[169]['page'] = '0';
terms[170] = new Array();terms[170]['word'] = '1';terms[170]['count'] = 1;terms[170]['page'] = '0';
terms[171] = new Array();terms[171]['word'] = 'per';terms[171]['count'] = 1;terms[171]['page'] = '0';
terms[172] = new Array();terms[172]['word'] = 'shortcode';terms[172]['count'] = 1;terms[172]['page'] = '0';
terms[173] = new Array();terms[173]['word'] = 'loader';terms[173]['count'] = 1;terms[173]['page'] = '0';
terms[174] = new Array();terms[174]['word'] = 'aytomatisch';terms[174]['count'] = 1;terms[174]['page'] = '0';
terms[175] = new Array();terms[175]['word'] = 'laadt';terms[175]['count'] = 1;terms[175]['page'] = '0';
terms[176] = new Array();terms[176]['word'] = 'centrale';terms[176]['count'] = 1;terms[176]['page'] = '0';
terms[177] = new Array();terms[177]['word'] = 'toepast';terms[177]['count'] = 1;terms[177]['page'] = '0';
terms[178] = new Array();terms[178]['word'] = 'button';terms[178]['count'] = 3;terms[178]['page'] = '0';
terms[179] = new Array();terms[179]['word'] = 'voorbeeld';terms[179]['count'] = 2;terms[179]['page'] = '0';
terms[180] = new Array();terms[180]['word'] = 'tussen';terms[180]['count'] = 2;terms[180]['page'] = '0';
terms[181] = new Array();terms[181]['word'] = 'text';terms[181]['count'] = 2;terms[181]['page'] = '0';
terms[182] = new Array();terms[182]['word'] = 'lees';terms[182]['count'] = 1;terms[182]['page'] = '0';
terms[183] = new Array();terms[183]['word'] = 'meer';terms[183]['count'] = 1;terms[183]['page'] = '0';
terms[184] = new Array();terms[184]['word'] = 'about';terms[184]['count'] = 1;terms[184]['page'] = '0';
terms[185] = new Array();terms[185]['word'] = 'stijl';terms[185]['count'] = 1;terms[185]['page'] = '0';
terms[186] = new Array();terms[186]['word'] = 'download';terms[186]['count'] = 1;terms[186]['page'] = '0';
terms[187] = new Array();terms[187]['word'] = 'files';terms[187]['count'] = 1;terms[187]['page'] = '0';
terms[188] = new Array();terms[188]['word'] = 'app';terms[188]['count'] = 1;terms[188]['page'] = '0';
terms[189] = new Array();terms[189]['word'] = 'zip';terms[189]['count'] = 1;terms[189]['page'] = '0';
terms[190] = new Array();terms[190]['word'] = 'style';terms[190]['count'] = 1;terms[190]['page'] = '0';
terms[191] = new Array();terms[191]['word'] = 'primary';terms[191]['count'] = 1;terms[191]['page'] = '0';
terms[192] = new Array();terms[192]['word'] = 'mijn';terms[192]['count'] = 4;terms[192]['page'] = '2';
terms[193] = new Array();terms[193]['word'] = 'achtste';terms[193]['count'] = 6;terms[193]['page'] = '2';
terms[194] = new Array();terms[194]['word'] = 'post';terms[194]['count'] = 3;terms[194]['page'] = '2';
terms[195] = new Array();terms[195]['word'] = '-';terms[195]['count'] = 3;terms[195]['page'] = '2';
terms[196] = new Array();terms[196]['word'] = 'gallery';terms[196]['count'] = 6;terms[196]['page'] = '2';
terms[197] = new Array();terms[197]['word'] = 'blogpost';terms[197]['count'] = 3;terms[197]['page'] = '2';
terms[198] = new Array();terms[198]['word'] = 'met';terms[198]['count'] = 2;terms[198]['page'] = '2';
terms[199] = new Array();terms[199]['word'] = 'een';terms[199]['count'] = 3;terms[199]['page'] = '2';
terms[200] = new Array();terms[200]['word'] = 'welkom';terms[200]['count'] = 1;terms[200]['page'] = '2';
terms[201] = new Array();terms[201]['word'] = 'bij';terms[201]['count'] = 1;terms[201]['page'] = '2';
terms[202] = new Array();terms[202]['word'] = 'dit';terms[202]['count'] = 1;terms[202]['page'] = '2';
terms[203] = new Array();terms[203]['word'] = 'is';terms[203]['count'] = 1;terms[203]['page'] = '2';
terms[204] = new Array();terms[204]['word'] = 'markdown';terms[204]['count'] = 1;terms[204]['page'] = '2';
terms[205] = new Array();terms[205]['word'] = 'deze';terms[205]['count'] = 1;terms[205]['page'] = '2';
terms[206] = new Array();terms[206]['word'] = 'pagina';terms[206]['count'] = 1;terms[206]['page'] = '2';
terms[207] = new Array();terms[207]['word'] = 'moet';terms[207]['count'] = 1;terms[207]['page'] = '2';
terms[208] = new Array();terms[208]['word'] = 'hebben';terms[208]['count'] = 1;terms[208]['page'] = '2';
terms[209] = new Array();terms[209]['word'] = 'mijn';terms[209]['count'] = 4;terms[209]['page'] = '10';
terms[210] = new Array();terms[210]['word'] = 'tiende';terms[210]['count'] = 6;terms[210]['page'] = '10';
terms[211] = new Array();terms[211]['word'] = 'post';terms[211]['count'] = 3;terms[211]['page'] = '10';
terms[212] = new Array();terms[212]['word'] = '-';terms[212]['count'] = 6;terms[212]['page'] = '10';
terms[213] = new Array();terms[213]['word'] = 'warning';terms[213]['count'] = 5;terms[213]['page'] = '10';
terms[214] = new Array();terms[214]['word'] = 'hero';terms[214]['count'] = 4;terms[214]['page'] = '10';
terms[215] = new Array();terms[215]['word'] = 'blogpost';terms[215]['count'] = 3;terms[215]['page'] = '10';
terms[216] = new Array();terms[216]['word'] = 'met';terms[216]['count'] = 2;terms[216]['page'] = '10';
terms[217] = new Array();terms[217]['word'] = 'een';terms[217]['count'] = 3;terms[217]['page'] = '10';
terms[218] = new Array();terms[218]['word'] = 'welkom';terms[218]['count'] = 1;terms[218]['page'] = '10';
terms[219] = new Array();terms[219]['word'] = 'bij';terms[219]['count'] = 1;terms[219]['page'] = '10';
terms[220] = new Array();terms[220]['word'] = 'dit';terms[220]['count'] = 2;terms[220]['page'] = '10';
terms[221] = new Array();terms[221]['word'] = 'is';terms[221]['count'] = 2;terms[221]['page'] = '10';
terms[222] = new Array();terms[222]['word'] = 'markdown';terms[222]['count'] = 1;terms[222]['page'] = '10';
terms[223] = new Array();terms[223]['word'] = 'belangrijk';terms[223]['count'] = 1;terms[223]['page'] = '10';
terms[224] = new Array();terms[224]['word'] = 'deze';terms[224]['count'] = 1;terms[224]['page'] = '10';
terms[225] = new Array();terms[225]['word'] = 'pagina';terms[225]['count'] = 1;terms[225]['page'] = '10';
terms[226] = new Array();terms[226]['word'] = 'moet';terms[226]['count'] = 1;terms[226]['page'] = '10';
terms[227] = new Array();terms[227]['word'] = 'image';terms[227]['count'] = 1;terms[227]['page'] = '10';
terms[228] = new Array();terms[228]['word'] = 'hebben';terms[228]['count'] = 1;terms[228]['page'] = '10';
terms[229] = new Array();terms[229]['word'] = 'mijn';terms[229]['count'] = 4;terms[229]['page'] = '1';
terms[230] = new Array();terms[230]['word'] = 'negende';terms[230]['count'] = 6;terms[230]['page'] = '1';
terms[231] = new Array();terms[231]['word'] = 'post-';terms[231]['count'] = 3;terms[231]['page'] = '1';
terms[232] = new Array();terms[232]['word'] = 'button';terms[232]['count'] = 3;terms[232]['page'] = '1';
terms[233] = new Array();terms[233]['word'] = 'blogpost';terms[233]['count'] = 3;terms[233]['page'] = '1';
terms[234] = new Array();terms[234]['word'] = 'welkom';terms[234]['count'] = 1;terms[234]['page'] = '1';
terms[235] = new Array();terms[235]['word'] = 'bij';terms[235]['count'] = 1;terms[235]['page'] = '1';
terms[236] = new Array();terms[236]['word'] = 'dit';terms[236]['count'] = 2;terms[236]['page'] = '1';
terms[237] = new Array();terms[237]['word'] = 'is';terms[237]['count'] = 2;terms[237]['page'] = '1';
terms[238] = new Array();terms[238]['word'] = 'markdown';terms[238]['count'] = 1;terms[238]['page'] = '1';
terms[239] = new Array();terms[239]['word'] = 'een';terms[239]['count'] = 1;terms[239]['page'] = '1';
terms[240] = new Array();terms[240]['word'] = 'waarschuwing';terms[240]['count'] = 1;terms[240]['page'] = '1';
terms[241] = new Array();terms[241]['word'] = 'download';terms[241]['count'] = 1;terms[241]['page'] = '1';
terms[242] = new Array();terms[242]['word'] = 'mijn';terms[242]['count'] = 4;terms[242]['page'] = '5';
terms[243] = new Array();terms[243]['word'] = 'derde';terms[243]['count'] = 6;terms[243]['page'] = '5';
terms[244] = new Array();terms[244]['word'] = 'post';terms[244]['count'] = 3;terms[244]['page'] = '5';
terms[245] = new Array();terms[245]['word'] = 'blogpost';terms[245]['count'] = 3;terms[245]['page'] = '5';
terms[246] = new Array();terms[246]['word'] = 'welkom';terms[246]['count'] = 1;terms[246]['page'] = '5';
terms[247] = new Array();terms[247]['word'] = 'bij';terms[247]['count'] = 1;terms[247]['page'] = '5';
terms[248] = new Array();terms[248]['word'] = 'dit';terms[248]['count'] = 1;terms[248]['page'] = '5';
terms[249] = new Array();terms[249]['word'] = 'is';terms[249]['count'] = 1;terms[249]['page'] = '5';
terms[250] = new Array();terms[250]['word'] = 'markdown';terms[250]['count'] = 1;terms[250]['page'] = '5';
terms[251] = new Array();terms[251]['word'] = 'mijn';terms[251]['count'] = 4;terms[251]['page'] = '11';
terms[252] = new Array();terms[252]['word'] = 'zesde';terms[252]['count'] = 6;terms[252]['page'] = '11';
terms[253] = new Array();terms[253]['word'] = 'post';terms[253]['count'] = 3;terms[253]['page'] = '11';
terms[254] = new Array();terms[254]['word'] = 'blogpost';terms[254]['count'] = 3;terms[254]['page'] = '11';
terms[255] = new Array();terms[255]['word'] = 'welkom';terms[255]['count'] = 1;terms[255]['page'] = '11';
terms[256] = new Array();terms[256]['word'] = 'bij';terms[256]['count'] = 1;terms[256]['page'] = '11';
terms[257] = new Array();terms[257]['word'] = 'dit';terms[257]['count'] = 1;terms[257]['page'] = '11';
terms[258] = new Array();terms[258]['word'] = 'is';terms[258]['count'] = 1;terms[258]['page'] = '11';
terms[259] = new Array();terms[259]['word'] = 'markdown';terms[259]['count'] = 1;terms[259]['page'] = '11';
terms[260] = new Array();terms[260]['word'] = 'mijn';terms[260]['count'] = 4;terms[260]['page'] = '8';
terms[261] = new Array();terms[261]['word'] = 'vijfde';terms[261]['count'] = 5;terms[261]['page'] = '8';
terms[262] = new Array();terms[262]['word'] = 'post';terms[262]['count'] = 3;terms[262]['page'] = '8';
terms[263] = new Array();terms[263]['word'] = 'blogpost';terms[263]['count'] = 3;terms[263]['page'] = '8';
terms[264] = new Array();terms[264]['word'] = 'welkom';terms[264]['count'] = 1;terms[264]['page'] = '8';
terms[265] = new Array();terms[265]['word'] = 'bij';terms[265]['count'] = 1;terms[265]['page'] = '8';
terms[266] = new Array();terms[266]['word'] = 'vijdfe';terms[266]['count'] = 1;terms[266]['page'] = '8';
terms[267] = new Array();terms[267]['word'] = 'dit';terms[267]['count'] = 1;terms[267]['page'] = '8';
terms[268] = new Array();terms[268]['word'] = 'is';terms[268]['count'] = 1;terms[268]['page'] = '8';
terms[269] = new Array();terms[269]['word'] = 'markdown';terms[269]['count'] = 1;terms[269]['page'] = '8';
terms[270] = new Array();terms[270]['word'] = 'mijn';terms[270]['count'] = 4;terms[270]['page'] = '6';
terms[271] = new Array();terms[271]['word'] = 'tweede';terms[271]['count'] = 6;terms[271]['page'] = '6';
terms[272] = new Array();terms[272]['word'] = 'post';terms[272]['count'] = 3;terms[272]['page'] = '6';
terms[273] = new Array();terms[273]['word'] = 'blogpost';terms[273]['count'] = 3;terms[273]['page'] = '6';
terms[274] = new Array();terms[274]['word'] = 'welkom';terms[274]['count'] = 1;terms[274]['page'] = '6';
terms[275] = new Array();terms[275]['word'] = 'bij';terms[275]['count'] = 1;terms[275]['page'] = '6';
terms[276] = new Array();terms[276]['word'] = 'dit';terms[276]['count'] = 1;terms[276]['page'] = '6';
terms[277] = new Array();terms[277]['word'] = 'is';terms[277]['count'] = 1;terms[277]['page'] = '6';
terms[278] = new Array();terms[278]['word'] = 'markdown';terms[278]['count'] = 1;terms[278]['page'] = '6';
terms[279] = new Array();terms[279]['word'] = 'mijn';terms[279]['count'] = 4;terms[279]['page'] = '4';
terms[280] = new Array();terms[280]['word'] = 'elfde';terms[280]['count'] = 6;terms[280]['page'] = '4';
terms[281] = new Array();terms[281]['word'] = 'post';terms[281]['count'] = 3;terms[281]['page'] = '4';
terms[282] = new Array();terms[282]['word'] = 'blogpost';terms[282]['count'] = 3;terms[282]['page'] = '4';
terms[283] = new Array();terms[283]['word'] = 'welkom';terms[283]['count'] = 1;terms[283]['page'] = '4';
terms[284] = new Array();terms[284]['word'] = 'bij';terms[284]['count'] = 1;terms[284]['page'] = '4';
terms[285] = new Array();terms[285]['word'] = 'dit';terms[285]['count'] = 1;terms[285]['page'] = '4';
terms[286] = new Array();terms[286]['word'] = 'is';terms[286]['count'] = 1;terms[286]['page'] = '4';
terms[287] = new Array();terms[287]['word'] = 'markdown';terms[287]['count'] = 1;terms[287]['page'] = '4';
terms[288] = new Array();terms[288]['word'] = 'mijn';terms[288]['count'] = 4;terms[288]['page'] = '9';
terms[289] = new Array();terms[289]['word'] = 'vierde';terms[289]['count'] = 6;terms[289]['page'] = '9';
terms[290] = new Array();terms[290]['word'] = 'post';terms[290]['count'] = 3;terms[290]['page'] = '9';
terms[291] = new Array();terms[291]['word'] = 'blogpost';terms[291]['count'] = 3;terms[291]['page'] = '9';
terms[292] = new Array();terms[292]['word'] = 'welkom';terms[292]['count'] = 1;terms[292]['page'] = '9';
terms[293] = new Array();terms[293]['word'] = 'bij';terms[293]['count'] = 1;terms[293]['page'] = '9';
terms[294] = new Array();terms[294]['word'] = 'dit';terms[294]['count'] = 1;terms[294]['page'] = '9';
terms[295] = new Array();terms[295]['word'] = 'is';terms[295]['count'] = 1;terms[295]['page'] = '9';
terms[296] = new Array();terms[296]['word'] = 'markdown';terms[296]['count'] = 1;terms[296]['page'] = '9';
terms[297] = new Array();terms[297]['word'] = 'mijn';terms[297]['count'] = 4;terms[297]['page'] = '3';
terms[298] = new Array();terms[298]['word'] = 'twaalfde';terms[298]['count'] = 6;terms[298]['page'] = '3';
terms[299] = new Array();terms[299]['word'] = 'post';terms[299]['count'] = 3;terms[299]['page'] = '3';
terms[300] = new Array();terms[300]['word'] = 'blogpost';terms[300]['count'] = 3;terms[300]['page'] = '3';
terms[301] = new Array();terms[301]['word'] = 'welkom';terms[301]['count'] = 1;terms[301]['page'] = '3';
terms[302] = new Array();terms[302]['word'] = 'bij';terms[302]['count'] = 1;terms[302]['page'] = '3';
terms[303] = new Array();terms[303]['word'] = 'dit';terms[303]['count'] = 1;terms[303]['page'] = '3';
terms[304] = new Array();terms[304]['word'] = 'is';terms[304]['count'] = 1;terms[304]['page'] = '3';
terms[305] = new Array();terms[305]['word'] = 'markdown';terms[305]['count'] = 1;terms[305]['page'] = '3';
pages[0] = new Array();pages[0]['page'] = '/posts/eerste-post/';pages[0]['title'] = 'eerste-post';
pages[1] = new Array();pages[1]['page'] = '/posts/negende-post/';pages[1]['title'] = 'negende-post';
pages[2] = new Array();pages[2]['page'] = '/posts/achtste-post/';pages[2]['title'] = 'achtste-post';
pages[3] = new Array();pages[3]['page'] = '/posts/twaalfde-post/';pages[3]['title'] = 'twaalfde-post';
pages[4] = new Array();pages[4]['page'] = '/posts/elfde-post/';pages[4]['title'] = 'elfde-post';
pages[5] = new Array();pages[5]['page'] = '/posts/derde-post/';pages[5]['title'] = 'derde-post';
pages[6] = new Array();pages[6]['page'] = '/posts/tweede-post/';pages[6]['title'] = 'tweede-post';
pages[7] = new Array();pages[7]['page'] = '/posts/zevende-post/';pages[7]['title'] = 'zevende-post';
pages[8] = new Array();pages[8]['page'] = '/posts/vijfde-post/';pages[8]['title'] = 'vijfde-post';
pages[9] = new Array();pages[9]['page'] = '/posts/vierde-post/';pages[9]['title'] = 'vierde-post';
pages[10] = new Array();pages[10]['page'] = '/posts/tiende-post/';pages[10]['title'] = 'tiende-post';
pages[11] = new Array();pages[11]['page'] = '/posts/zesde-post/';pages[11]['title'] = 'zesde-post';


        var input = document.getElementById('searchbar').value.toLowerCase();
        const input_array = input.split(" ");
        var number_of_search_items = input_array.length;
        var item=0;
        var i=0;
        var list="";
        var pos=-1;
        var max = terms.length;
        var results = new Array();
        var number_of_results=0;
        var final_results = new Array();
        var page_titles = new Array();
        event.preventDefault();
        for(item=0; item<number_of_search_items; item++){
            if(input_array[item]!="") {
                for(i=1; i<max; i++) { 
                    if(input_array[item]==terms[i]['word']){
                        number_of_results +=1;
                        if (!final_results[terms[i]['page']]){
                            final_results[terms[i]['page']] = 0
                        }
                        final_results[terms[i]['page']] = final_results[terms[i]['page']] + terms[i]['count']
                        results[terms[i]['page']] = terms[i]['count']
                        page_titles[terms[i]['page']] = pages[terms[i]['page']]['title'];
                    }   
                    pos=-1;
                }
            }
        }
        // determine highest score
        var highest = 0;
        for (var k in final_results){
            if (final_results.hasOwnProperty(k)) {
                 if (final_results[k] > highest) {
                    highest = final_results[k];
                 }
            }
        }
       
        list = ""
        for (i=highest; i>0; i--) {
            for (var k in final_results){
                if (final_results.hasOwnProperty(k)) {
                    if (final_results[k] == i) {
                         list= list + '(' + final_results[k] + ') <a href="' + pages[k]['page'] + '">'+ page_titles[k] + '</a>' + '<br>';
                    }
                 }
            }
        }
        if(list==""){ 
            document.getElementById("listing").innerHTML = "<span class='red_msg'>" + notfoundtext + "</span>";
            document.getElementById("listing").style.display = "block";
        } else { 
            results = '<h2>' + foundtext + '</h2>' + list;
            document.getElementById("listing").innerHTML = results;
            document.getElementById("listing").style.display = "block";
        }
    }
    