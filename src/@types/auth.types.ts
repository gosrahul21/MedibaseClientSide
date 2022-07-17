
export type AuthProps = {
    children: JSX.Element
}

export type AuthState = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: any;
}