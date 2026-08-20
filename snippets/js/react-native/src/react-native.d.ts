declare module "react-native" {
    export interface TurboModule {}

    export const TurboModuleRegistry: {
        getEnforcing<T>(name: string): T;
    };
}

declare const console: {
    log(...data: unknown[]): void;
    error(...data: unknown[]): void;
};
