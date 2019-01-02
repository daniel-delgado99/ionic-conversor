import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MedidasService } from '../../services/medidas';

@Component({
	selector: 'page-conversor',
	templateUrl: 'conversor.html'
})
export class ConversorPage implements OnInit{
	medidasForm: FormGroup;
	medidas: any;
	medidasArray = [];
	medida: string = 'comprimento';

	constructor (private medidasService: MedidasService) {}

	ngOnInit() {
		this.medidasForm = new FormGroup({
			'valor1': new FormControl(1),
			'valor2': new FormControl(1000),
			'medida1': new FormControl('km'),
			'medida2': new FormControl('m')
		});

		this.setMedida();
	}

	setMedida() {
		this.medidas = this.medidasService.getMedidas(this.medida);
		this.medidasArray = [];
		for (let medida in this.medidas) {
			this.medidasArray.push(medida)
		}
		this.patchValue()
	}

	patchValue() {
		this.medidasForm.get('valor1').patchValue(0);
		this.medidasForm.get('valor2').patchValue(0);
		this.medidasForm.get('medida1').patchValue('');
		this.medidasForm.get('medida2').patchValue('');
	}

	onChange(i: number) {
		let form = this.medidasForm;
		let medida1 = form.value.medida1;
		let medida2 = form.value.medida2;
		let valor1 = form.value.valor1;
		let valor2 = form.value.valor2;

		if (medida1 && medida2) { 
			if (i == 0) {
				form.get('valor2').setValue(this.medidasService.convert(valor1, medida1, medida2, this.medida));
				// form.get('valor2').setValue((valor1 / this.medidas[medida2]['m']) * this.medidas[medida1]['m']);
				// form.get('valor2').setValue(valor1 * this.medidas[medida1][medida2]);
			} else {
				form.get('valor1').setValue(this.medidasService.convert(valor2, medida2, medida1, this.medida));
				// form.get('valor1').setValue((valor2 / this.medidas[medida1]['m']) * this.medidas[medida2]['m']);
				// form.get('valor1').setValue(valor2 * this.medidas[medida2][medida1]);
			}
		}
	}
}
