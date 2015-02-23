# CLDR-2-PHP-converter
Convert CLDR DateTime format to PHP formats

# Links
https://github.com/nielsdefeyter/CLDR-2-PHP-converter
http://cldr.unicode.org/
http://cldr.unicode.org/index/downloads/cldr-26-0-1
http://en.wikipedia.org/wiki/Date_format_by_country
http://userguide.icu-project.org/formatparse/datetime

# Mapping
<pre>
// Era is not implemented.
"GGGGG": fallback_replacement,
"GGGG": fallback_replacement,
"GGG": fallback_replacement,
"GG": fallback_replacement,
"G": fallback_replacement,
// Year.
"yyyy": "Y", // 1999
"yy": "y", // 99
"y": "Y", // 1999
// Month.
"MMMM": "F",
"MMM": "M",
"MM": "m",
"M": "m",
// Day.
"dd": "d",
"d": "j",
// Day of week.
"EEEEEE": fallback_replacement, // Tu
"EEEEE": fallback_replacement, // T
"EEEE": "l", // Tuesday
"EEE": "D", // Tue
"EE": "D", // Tue
"E": "D", // Tue
// Am/PM
"a": "a",
// hours
"HH": "H", // 24-hour format of an hour with leading zeros
"H": "G", // 24-hour format of an hour without leading zeros
"h": "h", // 12-hour format of an hour with leading zeros
"K": "g", // 12-hour format of an hour without leading zero
// minutes
"mm": "i", // Minutes with leading zeros
"ss": "s", // Seconds, with leading zeros
// timezone.
"z": "T", // Timezone abbreviation
"zz": "T", // Timezone abbreviation
"zzz": "T", // Timezone abbreviation
"zzzz": "e", // Timezone
</pre>