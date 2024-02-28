export const countTotalSkills = (data, skills) => {
    const filteredData = data.filter((data) => 
        Object.prototype.hasOwnProperty.call(data.attrs, 'language')
        && skills.includes(data.attrs.language)
    )
    
    const results = {}
    filteredData && filteredData.forEach((data) => {
        if (Object.prototype.hasOwnProperty.call(results, data.attrs.language)) {
            results[data.attrs.language] += 1;
        } else {
            results[data.attrs.language] = 1;
        }
    })
    return results;
}

export const countUserSkills = (skillsData, userData) => {

    const skillsObjectIdsToLanguage = skillsData.reduce((acc, data) => {
        acc[data.id] = data.attrs.language
        return acc
    }, {})

    const results = {}

    userData.forEach((data) => {
        if (Object.keys(skillsObjectIdsToLanguage).includes(String(data.objectId))) {
            const language = skillsObjectIdsToLanguage[String(data.objectId)]
            if (Object.prototype.hasOwnProperty.call(results, language)) {
                results[language] += 1;
            } else {
                results[language] = 1;
            }
        }
    })

    return results
};