export interface FileData {
    name: string;
    device: string;
    path: string;
    status: 'available' | 'scheduled';
}