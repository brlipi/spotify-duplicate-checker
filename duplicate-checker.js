function checkForDuplicates(tracks) {
    var duplicates = [];
    for(let i = 0; i < tracks.length-1; i++) {
        for(let j = i+1; j < tracks.length; j++) {
            if(tracks[j].id == tracks[i].id) {
                duplicates.push(tracks[i]);
            }
        }
    }

    return duplicates;
}

module.exports = { checkForDuplicates };
