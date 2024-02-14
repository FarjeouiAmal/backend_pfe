export class UpdateRestoDto {
    readonly email: string;
    readonly nom: string;
    readonly adresse: string;
    readonly téléphone: number;
    readonly role: string; // Change the type to string
    readonly matricule: string;
    readonly dateInscrit: Date;
    readonly password: string;
}
