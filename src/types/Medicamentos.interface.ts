export type MedicamentoLocal = {
  numero: string;
  farmaco: string;
  formaFarmaceutica: string;
  concentracion: string;
  registroSanitario: string;
  titular: string;
  indicacionTerapeuticas: string;
};

export type MedicamentoProps = {
  medicamento: MedicamentoLocal;
  scaleFactor: number;
};