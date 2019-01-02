import comprimento from '../data/comprimento';
import volume from '../data/volume';

export class MedidasService {
    
    getMedidas(tipo) {
        switch(tipo) {
            case 'comprimento':
                return comprimento;
            case 'volume':
                return volume;
            default:
                return null;
        }
    }

    convert (valor1: number, medida1: string, medida2: string, tipo: string): number {
        let medida = this.getMedidas(tipo);
        console.log("convertendo", medida);
        return ((valor1 / medida[medida2]['toDefault']) * medida[medida1]['toDefault']);
    }
}