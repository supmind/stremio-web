type Auth = {
    key: string,
    user: {
        _id: string,
        avatar: string,
        email: string,
        trakt: {
            access_token: string,
            created_at: number,
            expires_in: number,
        },
        isNewUser: boolean,
    },
};

type Settings = {
    audioLanguage: string,
    audioPassthrough: boolean,
    autoFrameRateMatching: boolean,
    bingeWatching: boolean,
    hardwareDecoding: boolean,
    escExitFullscreen: boolean,
    interfaceLanguage: string,
    quitOnClose: boolean,
    hideSpoilers: boolean,
    nextVideoNotificationDuration: number,
    playInBackground: boolean,
    playerType: string | null,
    secondaryAudioLanguage: string | null,
    secondarySubtitlesLanguage: string | null,
    seekTimeDuration: number,
    seekShortTimeDuration: number,
    subtitlesBackgroundColor: string,
    subtitlesBold: boolean,
    subtitlesFont: string,
    subtitlesLanguage: string | null,
    subtitlesOffset: number,
    subtitlesOutlineColor: string,
    subtitlesSize: number,
    subtitlesTextColor: string,
    surroundSound: boolean,
    pauseOnMinimize: boolean,
};

type Profile = {
    auth: Auth | null,
    settings: Settings,
};

type Notifications = {
    uid: string,
    created: string,
    items: Record<string, NotificationItem[]>,
};

type NotificationItem = {
    metaId: string,
    videoId: string,
    videoReleased: string,
};

type SearchHistoryItem = {
    query: string,
    deepLinks: {
        search: string,
    },
};

type SearchHistory = SearchHistoryItem[];

type Ctx = {
    profile: Profile,
    notifications: Notifications,
    searchHistory: SearchHistory,
};
