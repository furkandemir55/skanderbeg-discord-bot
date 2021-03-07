require('dotenv').config();

const fetch = require('node-fetch')
const apiKey = process.env.API_KEY
//const saveId = "bed1ad"
const apiUrl = "https://skanderbeg.pm/api.php"

const constructUrl = (save, scope, params) => {
    return `${apiUrl}?key=${apiKey}&scope=${scope}&save=${save}${params}format=json`
}

const getHighest = async (save, params) => {
    const result = await getCountryData(save, params)
    const highestStuff = {}
    params.value.forEach(param => {
        const paramArray = Object.values(result).map(value => {
            if (typeof value[0][param] === 'undefined') return 0.0
            return parseFloat(value[0][param])
        })
        let max;
        max = paramArray.reduce((a, b) => {
            return Math.max(a, b)
        })
        if (param === 'subsidies' && max < 1) return highestStuff[param] = ["NONE"]
        highestStuff[param] = Object.keys(result).filter(tag => parseFloat(result[tag][0][param]) === max)
    })
    console.log(highestStuff)
    return highestStuff
}

const getCountryData = async (save, values) => {
    let params = '&';
    if (values.value) params += `value=${values.value.join(';')}&`
    if (values.playersOnly) params += `playersOnly=true&`
    console.log(constructUrl(save, 'getCountryData', params))
    const res = await fetch(constructUrl(save, 'getCountryData', params))
    return await res.json()
}
// getHighest('bed1ad', {
//     value: ['monthly_income', 'total_development', 'buildings_value', 'technology', 'subsidies', 'army_professionalism',
//         'max_manpower', 'total_casualties', 'totalRulerManaGain', 'naval_strength', 'provinces', 'forts',
//         'monthly_income', 'army_tradition', 'expenses', 'total_army', 'army_size', 'battleCasualties', 'attritionCasualties',
//         'manpower_dev', 'armyStrength', 'totalManaGainAverage', 'quality', 'total_mana_spent', 'total_mana_spent_on_deving',
//         'spent_on_advisors'],
//     playersOnly: true
// })
module.exports = {getHighest: getHighest}