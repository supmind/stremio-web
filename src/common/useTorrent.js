// Copyright (C) 2017-2023 Smart code 203358507

const React = require('react');
const magnet = require('magnet-uri');
const { useServices } = require('stremio/services');
const useToast = require('stremio/common/Toast/useToast');

const useTorrent = () => {
    const { core } = useServices();
    const toast = useToast();
    const createTorrentTimeout = React.useRef(null);
    const createTorrentFromMagnet = React.useCallback((text) => {
        const parsed = magnet.decode(text);
        if (parsed && typeof parsed.infoHash === 'string') {
            core.transport.dispatch({
                action: 'StreamingServer',
                args: {
                    action: 'CreateTorrent',
                    args: text
                }
            });
            clearTimeout(createTorrentTimeout.current);
            createTorrentTimeout.current = setTimeout(() => {
                toast.show({
                    type: 'error',
                    title: 'It\'s taking a long time to get metadata from the torrent.',
                    timeout: 10000
                });
            }, 10000);
        }
    }, [core.transport, toast]);
    React.useEffect(() => {
        const onStreamingServerUpdate = ({ torrent }) => {
            if (torrent !== null) {
                const [, { type }] = torrent;
                if (type === 'Ready') {
                    clearTimeout(createTorrentTimeout.current);
                }
            }
        };
        core.transport.on('streaming_server', onStreamingServerUpdate);
        return () => {
            core.transport.off('streaming_server', onStreamingServerUpdate);
            clearTimeout(createTorrentTimeout.current);
        };
    }, [core.transport]);
    return {
        createTorrentFromMagnet
    };
};

module.exports = useTorrent;
