import { format } from "date-fns";

export function fDate(date: string | number | Date) {
    return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date: string | number | Date) {
    return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date: string | number | Date) {
    return format(new Date(date), "dd/MM/yyyy hh:mm p");
}
