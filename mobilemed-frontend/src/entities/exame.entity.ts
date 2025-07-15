import { DICOM } from "./dicom.entity";

export interface Exame {
    IDExame: string | null;
    IDPaciente: string | null;
    NomeExame: string | null;
    DataExame: string | null;
    DICOM: DICOM | null;
}