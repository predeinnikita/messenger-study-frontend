export function getPath(): string[] {
    return window.location.pathname.split('/').slice(1);
}