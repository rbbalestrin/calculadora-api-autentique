import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  WritableSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignatureCardComponent } from "../signature-card/signature-card.component";
import { SignatoryMethod } from "../app.component";

@Component({
  selector: "app-signatures",
  standalone: true,
  imports: [CommonModule, SignatureCardComponent],
  templateUrl: "./signatures.component.html",
  styleUrls: ["./signatures.component.scss"], // Corrigido para "styleUrls"
})
export class SignaturesComponent {
  // Certifique-se de que o sinal é fornecido (pode ser passado pelo componente pai)
  @Input() signatories!: WritableSignal<SignatoryMethod[]>;
  @Output() updateSignatory = new EventEmitter<{
    index: number;
    signatory: any;
  }>();
  @Output() removeSignatory = new EventEmitter<number>();

  // Em vez de emitir um evento para adicionar, atualizamos o sinal diretamente
  onAddSignatory() {
    this.signatories.update((s: SignatoryMethod[]) => [
      ...s,
      {
        email: false,
        whatsapp: false,
        sms: false,
        linkEmail: false,
        linkSms: false,
        linkWhatsapp: false,
        smsValidation: false,
        expanded: true,
      },
    ]);
  }

  onUpdateSignatory({
    index,
    signatory,
  }: {
    index: number;
    signatory: SignatoryMethod;
  }) {
    this.signatories.update((s: SignatoryMethod[]) => {
      const updated = [...s];
      updated[index] = signatory;
      return updated;
    });
  }

  onRemoveSignatory(index: number) {
    this.removeSignatory.emit(index);
  }
}
