/**La clase Config establece que datos se deben buscar y que de que tipo son.
Están programados para SOLO lectura, no se pueden modificar por fuera de la clase
@class Config*/
declare class Config {
    private static instance;
    /**Configuración del puerto del servidor
     * @readonly
     * @type {number}
     */
    readonly PORT: number;
    /**Configuración de la dirección URL de la base de datos
     * @readonly
     * @type {string}
     */
    readonly DB_URL: string;
    /**Configuración del token
     * @readonly
     * @type {string}
     */
    readonly TOKEN: string;
    private constructor();
    static getInstance(): Config;
}
/**Exporta una constante que guarda la instancia de la clase Config definida arriba*/
export declare const config: Config;
export {};
