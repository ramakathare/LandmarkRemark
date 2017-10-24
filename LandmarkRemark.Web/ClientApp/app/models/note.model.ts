export interface INotes {
    lat: number;
    lng: number;
    notes: string;
    date: Date;
    user: string;
    draggable: boolean;
    isHome: boolean;
    address: string;
    noteId: number;
    isOwner: boolean;
    isLocal: boolean;
    Editable?: boolean;
}
