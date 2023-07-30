export const parseTime = (preparationTime) => {
    let res = '';
    let hours = Math.floor(preparationTime / 3600);
    res += hours > 0 ? `${hours}h` : '';

    let min = Math.floor((preparationTime % 3600) / 60);
    if (min > 0 && res != '') res += ' ';
    res += min > 0 ? `${min}m` : '';

    let sec = Math.floor((preparationTime % 3600) % 60);
    if (sec > 0 && res != '') res += ' ';
    res += sec > 0 ? `${sec}s` : '';
    
    if (res == '') res = '0s';
    return res;
};
