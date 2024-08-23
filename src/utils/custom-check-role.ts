'use client'

export function checkRole() {
    const userRole = window.sessionStorage.getItem('role')
    console.log(`userRole: ${userRole}`)
    return userRole
}