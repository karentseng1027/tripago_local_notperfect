export function getMoodIcon(group) {
    switch (group) {
        case 'Thunder':
            return 'fa fa-bolt';
        case 'Drizzle':
            return 'fa fa-tint';
        case 'Rain':
            return 'fa fa-umbrella';
        case 'Snow':
            return 'fa fa-snowflake-o';
        case 'Windy':
            return 'owf owf-905';
        case 'Clear':
            return 'fa fa-sun-o';
        case 'Clouds':
            return 'fa fa-cloud';
        default:
            return 'fa fa-question-circle';
    }
}

export function getTransIcon(type) {
    switch (type){
        case 'Airplane':
            return 'fa fa-plane';
        case 'Train':
            return 'fa fa-train';
        case 'Bus':
            return 'fa fa-bus';
        case 'Subway':
            return 'fa fa-subway';
        case 'Taxi':
            return 'fa fa-taxi';
        case 'Ship':
            return 'fa fa-ship';
        case 'Rocket':
            return 'fa fa-rocket';
        case 'na':
            return 'fa fa-question-circle-o';
        default:
            return 'fa fa-question-circle-o';
    }
}

export function getSiteIcon(type) {
    switch (type) {
        case 'Scenery':
            return 'local_florist'
        case 'Museum':
            return 'color_lens';
        case 'Multimedia':
            return 'movie';
        case 'Outdoor Activity':
            return 'wb_sunny';
        case 'Beach':
            return 'beach_access';
        case 'Others': 
            return 'tag_faces';
        case 'na':
            return 'fa fa-question-circle-o';
        default:
            return 'fa fa-question-circle-o';

    }
}
