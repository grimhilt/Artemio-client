export const isImage = (type) => {
    if (!type) return false;
    return type.split('/')[0] === 'image';
};

export const isVideo = (type) => {
    if (!type) return false;
    return type.split('/')[0] === 'video';
};

