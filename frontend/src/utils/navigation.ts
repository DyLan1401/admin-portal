export function isActiveRoute(pathname: string, href: string) {
    if (href === "/admin/dashboard") {
        return pathname === href;
    }
    return pathname.startsWith(href);
}