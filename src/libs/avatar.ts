export function getAvatarURL(username: string) {
    return `https://api.dicebear.com/9.x/initials/svg?seed=${username}&radius=50&backgroundColor=F8BA8C`
}
