export interface GameParams {
    title: string;
    id: string;
    bannerUrl: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            games: GameParams;
        }
    }
}