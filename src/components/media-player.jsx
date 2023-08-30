import { Image } from '@mantine/core';
import { isImage } from '../tools/fileUtil';

const MediaPlayer = ({ file, fileId, shouldContain }) => {
    return isImage(file.type) ? (
        <Image
            src={'/api/files/' + (fileId ?? file.id)}
            alt={file?.name ?? ''}
            width={shouldContain ? undefined : 150}
            fit={shouldContain ? 'contain' : 'cover'}
            radius="md"
            withPlaceholder
        />
    ) : (
        <>
            <video controls width={150}>
                <source src={'/api/files/' + (fileId ?? file.id)} type={file.type} />
                Sorry, your browser doesn't support videos.
            </video>
        </>
    );
};

export default MediaPlayer;
