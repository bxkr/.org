export interface Tracks {
    recenttracks: Recenttracks;
}

export interface Recenttracks {
    track:   Track[];
    "@attr": RecenttracksAttr;
}

export interface RecenttracksAttr {
    user:       string;
    totalPages: string;
    page:       string;
    perPage:    string;
    total:      string;
}

export interface Track {
    artist:     Album;
    streamable: string;
    image:      Image[];
    mbid:       string;
    album:      Album;
    name:       string;
    "@attr"?:   TrackAttr;
    url:        string;
    date?:      DateClass;
}

export interface TrackAttr {
    nowplaying: string;
}

export interface Album {
    mbid:    string;
    "#text": string;
}

export interface DateClass {
    uts:     string;
    "#text": string;
}

export interface Image {
    size:    Size;
    "#text": string;
}

export enum Size {
    Extralarge = "extralarge",
    Large = "large",
    Medium = "medium",
    Small = "small",
}
