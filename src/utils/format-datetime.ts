import {
    format,
    formatDistanceToNow as dateFnsFormatDistanceToNow,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateTime(rawDate: string): string {
    const date = new Date(rawDate)

    return format(date, "dd/MM/yyyy 'às' HH'h'mm", { locale: ptBR })
}

export function formatDistanceToNow(rawDate: string): string {
    const date = new Date(rawDate)

    return dateFnsFormatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: true,
    })
}

export function formatHour(timestamps: number): string {
    const date = new Date(timestamps)

    return format(date, 'HH:mm:ss', { locale: ptBR })
}

console.log(formatDateTime('2025-08-01T10:00:00Z')) // Example usage
console.log(formatDistanceToNow('2025-08-01T10:00:00Z'))
