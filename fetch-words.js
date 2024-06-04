'use strict';
const fs = require('fs');
const got = require('got');

const add = [
	'blep',
	'yeet'
]

const remove = [
	'bulldyke*',
	'cummin*',
	'dyke*',
	'dyki*',
	'faggot*',
	'kike*',
	'nigger*',
	'raghead*',
	'shemale*',
	'spic',
	'spics',
	'towelhead*',
	'tranny',
	'wetback*'
];

const profanity = [
	'anilingus*',
	'arsehole*',
	'asshole*',
	'autoerotic*',
	'bastard*',
	'bestiality',
	'blowjob*',
	'bitch*',
	'boner*',
	'clit',
	'clito*',
	'clits',
	'cocksuck*',
	'cocktease*',
	'cuck',
	'cucking',
	'cuckold*',
	'cum',
	'cums',
	'cunt*',
	'dick',
	'dicks',
	'dickhead*',
	'dildo*',
	'ejaculat*',
	'felch*',
	'fellat*',
	'*fuck*',
	'genital*',
	'homoeroti*',
	'handjob*',
	'honky',
	'honkey*',
	'hooker*',
	'incest*',
	'jizz*',
	'lovemak*',
	'masturbat*',
	'milf',
	'milfs',
	'*orgasm*',
	'orgy',
	'outbitch*',
	'pedophil*',
	'piss*',
	'poontang*',
	'poop*',
	'porn*',
	'pubes',
	'punan*',
	'pussy',
	'rape',
	'rapes',
	'raping',
	'rapist*',
	'sadism*',
	'semen*',
	'*shit*',
	'schlong*',
	'slut',
	'sluts',
	'slutt*',
	'sodom*',
	'sonofabitch',
	'strappado*',
	'superbitch*',
	'swinger*',
	'threesome*',
	'tittie*',
	'titty',
	'tribadism*',
	'twat',
	'twats',
	'twink',
	'twinkie',
	'twinkling',
	'twinks',
	'vibrator*',
	'vulva*',
	'wank*',
	'zoophile*',
	'zoophilia*',
];

const url = 'https://raw.githubusercontent.com/atebits/Words/master/Words/en.txt';

function matches(word, glob) {
	const endsWith = glob.startsWith('*')
	const startsWith = glob.endsWith('*')
	if (endsWith && startsWith) {
		return word.includes(glob.slice(1, -1))
	} else if (startsWith) {
		return word.startsWith(glob.slice(0, -1))
	} else if (endsWith) {
		return word.endsWith(glob.slice(1))
	} else {
		return word === glob
	}
}

(async () => {
	const {body} = await got(url);
	const wordsProfanity = [];
	const words = body.trim().split('\n')
		.filter((word) => word.length >= 3)
		.filter((word) => !remove.some((glob) => matches(word, glob)))
		.filter((word) => {
			const isProfanity = profanity.some((glob) => matches(word, glob));
			if (isProfanity) {
				wordsProfanity.push(word);
			}
			return !isProfanity;
		});

	fs.writeFileSync('words.txt', words.concat(add).sort().join('\n'));
	fs.writeFileSync('words-profanity.txt', wordsProfanity.sort().join('\n'));
})().catch(error => {
	console.error(error);
	process.exit(1); // eslint-disable-line unicorn/no-process-exit
});
