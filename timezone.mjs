var timezone = {}

import MYjson from '../tz.json' assert{type:'json'}
timezone.data = MYjson
export default timezone;

timezone.lookup = function (country, region) {
    return this.data[[country, region].join('_')] || this.data[[country, ''].join('_')];
};

// console.log(timezone.lookup('ID','02'))