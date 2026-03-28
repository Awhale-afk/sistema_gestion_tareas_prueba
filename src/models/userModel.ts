/**
 * Interfaz que define la estructura de un usuario
 * @interface User
 */
export interface User{
    id?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    
}