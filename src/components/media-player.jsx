import { Image } from '@mantine/core';

const MediaPlayer = ({ file, fileId, shouldContain }) => {
    const isImage = () => file.type.split('/')[0] === 'image';
    return isImage() ? (
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
