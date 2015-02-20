/**
 * Created by Niels de Feyter on 29/01/15.
 */
$(document).ready(function () {

    // Change event
    $("#convert").click(function () {

        // Get input value.
        var cldrValue = $("#cldr-format").val().trim();

        // Get converted value
        var phpValue = convertCLDRtoPHP(cldrValue, "*");
        $("#php-format").text(phpValue);

        // Get converted value (compliance mode)
        var phpValue = convertCLDRtoPHP(cldrValue, "");
        $("#php-format-compliance").text(phpValue);
    });
});

// Converter function
function convertCLDRtoPHP(cldrValue, fallback_replacement) {
    // Get an array with partials that can be replaced sorted by length.
    var replacements = delimitCLDRDateTimeString(cldrValue);

    // Replace each partial with its corresponding PHP format.
    $(replacements).each(function () {
        cldrValue = cldrValue.replace(this, returnMapping(this, fallback_replacement));
    });
    // Remove spaces before commas.
    cldrValue = cldrValue.replace(" ,", ",");

    // Return result.
    return cldrValue;
}

// Delimit function
function delimitCLDRDateTimeString(text) {
    var splitters = [", ", " ", ",", "-", "/", "\\.", "'", ":"];

    var textSplitted = text.split(new RegExp(splitters.join('|'), ''));

    // Sort by value length (long first).
    textSplitted.sort(function (a, b) {
        return b.length - a.length; // ASC -> a - b; DESC -> b - a
    });

    return textSplitted;
}

// Replace with mapping.
function returnMapping(partial, fallback_replacement) {

    if (fallback_replacement === undefined) {
        fallback_replacement = "*";
    }

    var map =
    {
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
    };

    // Return replacement if needle is found.
    if (partial in map) {
        return map[partial];
    }

    // Return fallback by default.
    return fallback_replacement;
}
